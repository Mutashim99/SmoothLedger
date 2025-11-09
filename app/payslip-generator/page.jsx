/* File: app/payslip-generator/page.jsx */

"use client";

import React, { useState, useRef, Fragment, useMemo, useEffect } from "react";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiDownload2Line,
  RiImageAddLine,
  RiPaintFill,
  RiText,
  RiCloseLine,
  RiEyeLine,
  RiCheckLine,
  RiDraftLine,
  RiErrorWarningLine,
  RiSaveLine,
  RiUserAddLine,
  RiSave3Line,
  RiFolderOpenLine,
  RiDeleteBin2Line,
  RiInformationLine,
} from "react-icons/ri";
import { Dialog, Transition, RadioGroup, Switch } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// --- Helper: Editable Field Component ---
function EditableField({
  value,
  onChange,
  placeholder,
  type = "text",
  area = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const editClasses =
    "p-1 -m-1 bg-blue-100 dark:bg-blue-900/50 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-slate-900";

  if (isEditing) {
    if (area) {
      return (
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`${editClasses} w-full resize-none`}
          rows={3}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${editClasses} w-auto`}
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`p-1 -m-1 cursor-text min-h-[28px] ${
        area ? "block w-full" : "inline-block"
      } ${!value ? "opacity-60 italic" : ""}`}
    >
      {value || placeholder}
    </span>
  );
}
// --- End of Helper Component ---

// --- List of Currencies ---
const currencyList = [
  { code: "USD", name: "USD ($)" },
  { code: "EUR", name: "EUR (€)" },
  { code: "GBP", name: "GBP (£)" },
  { code: "JPY", name: "JPY (¥)" },
  { code: "AUD", name: "AUD (A$)" },
  { code: "CAD", name: "CAD (C$)" },
  { code: "CHF", name: "CHF (Fr)" },
  { code: "CNY", name: "CNY (¥)" },
  { code: "INR", name: "INR (₹)" },
  { code: "BRL", name: "BRL (R$)" },
  { code: "PKR", name: "PKR (Rs)" },
  { code: "AED", name: "AED (د.إ)" },
  { code: "SAR", name: "SAR (﷼)" },
];

// --- Payslip Generator Page ---
export default function PayslipGeneratorPage() {
  // --- STATE MANAGEMENT ---

  // 1. Payslip Data
  const [companyName, setCompanyName] = useState("Your Company Name");
  const [companyAddress, setCompanyAddress] = useState(
    "123 Main St\nCity, State 12345"
  );
  const [logo, setLogo] = useState(null);

  const [employeeName, setEmployeeName] = useState("Employee Name");
  const [employeeId, setEmployeeId] = useState("EMP-001");
  const [employeePosition, setEmployeePosition] = useState("Job Title");

  const [payPeriodStart, setPayPeriodStart] = useState(
    new Date(new Date().setDate(1)).toISOString().split("T")[0]
  );
  const [payPeriodEnd, setPayPeriodEnd] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .split("T")[0]
  );
  const [payDate, setPayDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [earnings, setEarnings] = useState([
    { id: 1, name: "Base Pay", amount: 3000 },
    { id: 2, name: "Bonus", amount: 500 },
  ]);
  const [deductions, setDeductions] = useState([
    { id: 1, name: "Income Tax", amount: 400 },
    { id: 2, name: "Insurance", amount: 100 },
  ]);

  // 2. Styling & Template State
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [textColor, setTextColor] = useState("#111827");
  const [fontFamily, setFontFamily] = useState("Inter, sans-serif");
  const [fontSize, setFontSize] = useState(14);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [watermark, setWatermark] = useState("");
  const [bgWatermark, setBgWatermark] = useState(null);
  const [bgWatermarkOpacity, setBgWatermarkOpacity] = useState(0.1);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  // 3. UI State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "" });

  // 4. Local Storage State
  const [saveMyDetails, setSaveMyDetails] = useState(false);
  const [savedEmployees, setSavedEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [savedPayslips, setSavedPayslips] = useState([]);
  const [selectedPayslipId, setSelectedPayslipId] = useState("");

  // --- REFS ---
  const payslipPrintRef = useRef(null);
  const logoUploadRef = useRef(null);
  const bgWatermarkUploadRef = useRef(null);

  // Load data from Local Storage on mount
  useEffect(() => {
    setIsTemplateModalOpen(true);

    try {
      const savedDetails = localStorage.getItem(
        "smoothledger-payslip-mydetails"
      );
      if (savedDetails) {
        const { name, address } = JSON.parse(savedDetails);
        setCompanyName(name);
        setCompanyAddress(address);
        setSaveMyDetails(true);
      }
      const employees = localStorage.getItem("smoothledger-employees");
      if (employees) {
        setSavedEmployees(JSON.parse(employees));
      }
      const payslips = localStorage.getItem("smoothledger-payslips");
      if (payslips) {
        setSavedPayslips(JSON.parse(payslips));
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }, []);

  // Auto-save "My Details" if toggle is on
  useEffect(() => {
    if (saveMyDetails) {
      try {
        const details = { name: companyName, address: companyAddress };
        localStorage.setItem(
          "smoothledger-payslip-mydetails",
          JSON.stringify(details)
        );
      } catch (error) {
        console.error("Error saving to local storage:", error);
      }
    }
  }, [companyName, companyAddress, saveMyDetails]);

  // --- DERIVED STATE & CALCULATIONS ---
  const grossEarnings = useMemo(
    () => earnings.reduce((acc, item) => acc + item.amount, 0),
    [earnings]
  );
  const totalDeductions = useMemo(
    () => deductions.reduce((acc, item) => acc + item.amount, 0),
    [deductions]
  );
  const netPay = useMemo(
    () => grossEarnings - totalDeductions,
    [grossEarnings, totalDeductions]
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // --- EVENT HANDLERS ---
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };
  const handleBgWatermarkUpload = (e) => {
    const file = e.target.files[0];
    if (file) setBgWatermark(URL.createObjectURL(file));
  };

  // Earnings Handlers
  const handleEarningChange = (index, field, value) => {
    const newEarnings = [...earnings];
    newEarnings[index][field] = (field === "amount") ? (parseFloat(value) || 0) : value;
    setEarnings(newEarnings);
  };
  const addEarning = () => {
    if (earnings.length + deductions.length >= 16) {
      setIsLimitModalOpen(true);
      return;
    }
    setEarnings([...earnings, { id: Date.now(), name: "New Earning", amount: 0 }]);
  };
  const removeEarning = (id) => {
    setEarnings(earnings.filter((item) => item.id !== id));
  };

  // Deductions Handlers
  const handleDeductionChange = (index, field, value) => {
    const newDeductions = [...deductions];
    newDeductions[index][field] = (field === "amount") ? (parseFloat(value) || 0) : value;
    setDeductions(newDeductions);
  };
  const addDeduction = () => {
    if (earnings.length + deductions.length >= 16) {
      setIsLimitModalOpen(true);
      return;
    }
    setDeductions([...deductions, { id: Date.now(), name: "New Deduction", amount: 0 }]);
  };
  const removeDeduction = (id) => {
    setDeductions(deductions.filter((item) => item.id !== id));
  };

  // --- Local Storage Handlers ---
  const handleSaveMyDetailsToggle = (isOn) => {
    setSaveMyDetails(isOn);
    if (!isOn) {
      localStorage.removeItem("smoothledger-payslip-mydetails");
    }
  };

  const handleSaveEmployee = () => {
    if (
      !employeeName ||
      !employeeName.trim() ||
      !employeeId ||
      !employeeId.trim()
    ) {
      setNotification({
        show: true,
        message: "Please enter an Employee Name and ID to save.",
      });
      return;
    }

    const employeeData = {
      id: employeeId,
      name: employeeName,
      position: employeePosition,
    };

    const newEmployeesList = [...savedEmployees];
    const existingIndex = newEmployeesList.findIndex(
      (emp) => emp.id === employeeId
    );

    if (existingIndex !== -1) {
      newEmployeesList[existingIndex] = employeeData; // Update
    } else {
      newEmployeesList.push(employeeData); // Add new
    }

    try {
      setSavedEmployees(newEmployeesList);
      localStorage.setItem(
        "smoothledger-employees",
        JSON.stringify(newEmployeesList)
      );
      setSelectedEmployeeId(employeeData.id);
      setNotification({
        show: true,
        message: `Employee "${employeeData.name}" saved!`,
      });
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleLoadEmployee = (e) => {
    const empId = e.target.value;
    setSelectedEmployeeId(empId);
    if (empId) {
      const empToLoad = savedEmployees.find((emp) => emp.id === empId);
      if (empToLoad) {
        setEmployeeName(empToLoad.name);
        setEmployeeId(empToLoad.id);
        setEmployeePosition(empToLoad.position);
      }
    }
  };

  // --- Save/Load Payslip Handlers ---
  const handleSavePayslip = () => {
    const payslipId = `${payPeriodEnd}_${employeeId || "no-id"}`;
    const payslipLabel = `${employeeName} - ${payPeriodEnd}`;

    const payslipData = {
      id: payslipId,
      label: payslipLabel,
      companyName,
      companyAddress,
      employeeName,
      employeeId,
      employeePosition,
      payPeriodStart,
      payPeriodEnd,
      payDate,
      earnings,
      deductions,
      accentColor,
      textColor,
      fontFamily,
      fontSize,
      currencyCode,
    };

    const newSavedPayslips = [...savedPayslips];
    const existingIndex = newSavedPayslips.findIndex((p) => p.id === payslipId);

    let message = "";
    if (existingIndex !== -1) {
      newSavedPayslips[existingIndex] = payslipData;
      message = `Payslip for ${employeeName} updated!`;
    } else {
      newSavedPayslips.push(payslipData);
      message = `Payslip for ${employeeName} saved!`;
    }

    try {
      setSavedPayslips(newSavedPayslips);
      localStorage.setItem(
        "smoothledger-payslips",
        JSON.stringify(newSavedPayslips)
      );
      setSelectedPayslipId(payslipData.id);
      setNotification({ show: true, message });
    } catch (error) {
      console.error("Error saving payslip:", error);
      setNotification({
        show: true,
        message: "Error saving. Storage might be full.",
      });
    }
  };

  const handleLoadPayslip = (e) => {
    const payslipId = e.target.value;
    setSelectedPayslipId(payslipId);
    if (!payslipId) return;

    const slipToLoad = savedPayslips.find((p) => p.id === payslipId);
    if (slipToLoad) {
      setCompanyName(slipToLoad.companyName);
      setCompanyAddress(slipToLoad.companyAddress);
      setEmployeeName(slipToLoad.employeeName);
      setEmployeeId(slipToLoad.employeeId);
      setEmployeePosition(slipToLoad.employeePosition);
      setPayPeriodStart(slipToLoad.payPeriodStart);
      setPayPeriodEnd(slipToLoad.payPeriodEnd);
      setPayDate(slipToLoad.payDate);
      setEarnings(slipToLoad.earnings);
      setDeductions(slipToLoad.deductions);
      setAccentColor(slipToLoad.accentColor);
      setTextColor(slipToLoad.textColor);
      setFontFamily(slipToLoad.fontFamily);
      setFontSize(slipToLoad.fontSize);
      setCurrencyCode(slipToLoad.currencyCode);
    }
  };

  const handleDeletePayslip = () => {
    if (!selectedPayslipId) {
      setNotification({
        show: true,
        message: "Please select a payslip to delete.",
      });
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete this payslip? This cannot be undone.`
      )
    ) {
      return;
    }

    const newSavedPayslips = savedPayslips.filter(
      (p) => p.id !== selectedPayslipId
    );

    try {
      setSavedPayslips(newSavedPayslips);
      localStorage.setItem(
        "smoothledger-payslips",
        JSON.stringify(newSavedPayslips)
      );
      setSelectedPayslipId("");
      setNotification({ show: true, message: `Payslip deleted.` });
    } catch (error) {
      console.error("Error deleting payslip:", error);
    }
  };

  // PDF Download
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const element = payslipPrintRef.current;
    if (!element) return;

    const scale = 2;
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    const scaledImgHeight = pdfWidth / ratio;

    let finalImgHeight = scaledImgHeight;
    let finalImgWidth = pdfWidth;

    if (scaledImgHeight > pdfHeight) {
      finalImgHeight = pdfHeight;
      finalImgWidth = pdfHeight * ratio;
    }

    const x = (pdfWidth - finalImgWidth) / 2;
    pdf.addImage(imgData, "PNG", x, 0, finalImgWidth, finalImgHeight);
    pdf.save(`SmoothLedger-Payslip-${employeeName}.pdf`);
    setIsDownloading(false);
  };

  // --- STYLES ---
  const mainStyles = {
    fontFamily: fontFamily,
    color: textColor,
    fontSize: `${fontSize}px`,
  };

  // --- TEMPLATE DEFINITIONS ---
  const templates = [
    { id: "modern", name: "Modern", preview: "/previews/payslip-modern.png" },
    {
      id: "classic",
      name: "Classic",
      preview: "/previews/payslip-classic.png",
    },
    {
      id: "compact",
      name: "Compact",
      preview: "/previews/payslip-compact.png",
    },
    { id: "bold", name: "Bold", preview: "/previews/payslip-bold.png" },
    {
      id: "minimal",
      name: "Minimal",
      preview: "/previews/payslip-minimal.png",
    },
  ];

  const renderPayslipTemplate = () => {
    const commonProps = {
      companyName,
      setCompanyName,
      companyAddress,
      setCompanyAddress,
      logo,
      employeeName,
      setEmployeeName,
      employeeId,
      setEmployeeId,
      employeePosition,
      setEmployeePosition,
      payPeriodStart,
      setPayPeriodStart,
      payPeriodEnd,
      setPayPeriodEnd,
      payDate,
      setPayDate,
      earnings,
      handleEarningChange,
      addEarning,
      removeEarning,
      deductions,
      handleDeductionChange,
      addDeduction,
      removeDeduction,
      grossEarnings,
      totalDeductions,
      netPay,
      formatCurrency,
    };

    switch (selectedTemplate) {
      case "classic":
        return <TemplatePayslipClassic {...commonProps} />;
      case "compact":
        return <TemplatePayslipCompact {...commonProps} />;
      case "bold":
        return <TemplatePayslipBold {...commonProps} />;
      case "minimal":
        return <TemplatePayslipMinimal {...commonProps} />;
      case "modern":
      default:
        return <TemplatePayslipModern {...commonProps} />;
    }
  };

  // --- RENDER ---
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-900">
        {/* --- 1. Controls Panel (Sidebar) --- */}
        {/* UPDATED: Added sticky positioning and fixed height for desktop scroll */}
        <aside className="w-full lg:w-80 xl:w-96 bg-white dark:bg-slate-950 p-6 border-r border-slate-200 dark:border-slate-800 space-y-8 overflow-y-auto lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Payslip Studio
          </h2>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all disabled:bg-slate-400"
          >
            {isDownloading ? (
              "Downloading..."
            ) : (
              <>
                <RiDownload2Line className="h-5 w-5" /> Download PDF
              </>
            )}
          </motion.button>

          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <RiEyeLine className="h-5 w-5" /> Change Template
          </button>

          {/* UPDATED: Re-ordered sections */}
          <div className="space-y-6">
            
            {/* Styling */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiPaintFill className="inline mr-2" />
                Styling
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="accentColor"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Accent Color
                  </label>
                  <input
                    type="color"
                    id="accentColor"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded-full border-none cursor-pointer"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="textColor"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Text Color
                  </label>
                  <input
                    type="color"
                    id="textColor"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-8 h-8 rounded-full border-none cursor-pointer"
                    style={{ backgroundColor: textColor }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="fontFamily"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Font
                  </label>
                  <select
                    id="fontFamily"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Inter, sans-serif">Inter (Modern)</option>
                    <option value="Roboto, sans-serif">Roboto (Clean)</option>
                    <option value="Merriweather, serif">
                      Merriweather (Serif)
                    </option>
                    <option value="Lato, sans-serif">Lato (Elegant)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="fontSize"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    id="fontSize"
                    min="10"
                    max="18"
                    step="1"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Save & Load */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiSave3Line className="inline mr-2" />
                Save & Load
              </h3>
              <div className="mt-4 space-y-4">
                <button
                  onClick={handleSavePayslip}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
                >
                  <RiSave3Line className="h-5 w-5" /> Save Current Payslip
                </button>
                <div className="space-y-2">
                  <label
                    htmlFor="load-payslip"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Load Payslip
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="load-payslip"
                      value={selectedPayslipId}
                      onChange={handleLoadPayslip}
                      className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Load a saved payslip...</option>
                      {savedPayslips.map((slip) => (
                        <option key={slip.id} value={slip.id}>
                          {slip.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleDeletePayslip}
                      title="Delete Selected Payslip"
                      className="p-2 bg-red-100 dark:bg-red-900/50 rounded-md hover:bg-red-200 dark:hover:bg-red-900"
                      disabled={!selectedPayslipId}
                    >
                      <RiDeleteBin2Line className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-Save */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiSaveLine className="inline mr-2" />
                Auto-Save
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Save My Details
                  </span>
                  <Switch
                    checked={saveMyDetails}
                    onChange={handleSaveMyDetailsToggle}
                    className={`${
                      saveMyDetails
                        ? "bg-blue-600"
                        : "bg-slate-300 dark:bg-slate-700"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span className="sr-only">Save My Details</span>
                    <span
                      className={`${
                        saveMyDetails ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="employees"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Saved Employees
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="employees"
                      value={selectedEmployeeId}
                      onChange={handleLoadEmployee}
                      className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Load an employee...</option>
                      {savedEmployees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name} ({emp.id})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleSaveEmployee}
                      title="Save Current Employee"
                      className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <RiUserAddLine className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Document */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiDraftLine className="inline mr-2" />
                Document
              </h3>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="currency"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Currency
                  </label>
                  <select
                    id="currency"
                    value={currencyCode}
                    onChange={(e) => setCurrencyCode(e.target.value)}
                    className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    {currencyList.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="watermark"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Text Watermark
                  </label>
                  <input
                    type="text"
                    id="watermark"
                    value={watermark}
                    onChange={(e) => setWatermark(e.target.value)}
                    placeholder="e.g. DRAFT, CONFIDENTIAL"
                    className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="bgWatermark"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Background Image Watermark
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={bgWatermarkUploadRef}
                    onChange={handleBgWatermarkUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => bgWatermarkUploadRef.current.click()}
                    className="mt-2 w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-500 transition-colors"
                  >
                    <RiImageAddLine className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {bgWatermark ? "Change Image" : "Upload Image"}
                    </span>
                  </button>
                  {bgWatermark && (
                    <>
                      <button
                        onClick={() => setBgWatermark(null)}
                        className="mt-2 w-full text-sm text-red-500 hover:text-red-700"
                      >
                        Remove Image
                      </button>
                      <label
                        htmlFor="bgOpacity"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Opacity: {Math.round(bgWatermarkOpacity * 100)}%
                      </label>
                      <input
                        type="range"
                        id="bgOpacity"
                        min="0.05"
                        max="0.5"
                        step="0.05"
                        value={bgWatermarkOpacity}
                        onChange={(e) =>
                          setBgWatermarkOpacity(parseFloat(e.target.value))
                        }
                        className="w-full"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Logo Uploader */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiImageAddLine className="inline mr-2" />
                Company Logo
              </h3>
              <input
                type="file"
                accept="image/*"
                ref={logoUploadRef}
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                onClick={() => logoUploadRef.current.click()}
                className="mt-4 w-full flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-500 transition-colors"
              >
                {logo ? (
                  <img
                    src={logo}
                    alt="Uploaded Logo"
                    className="max-h-24 object-contain"
                  />
                ) : (
                  <>
                    <RiImageAddLine className="h-8 w-8" />
                    <span className="text-sm font-medium">
                      Click to upload logo
                    </span>
                  </>
                )}
              </button>
              {logo && (
                <button
                  onClick={() => setLogo(null)}
                  className="mt-2 w-full text-sm text-red-500 hover:text-red-700"
                >
                  Remove Logo
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* --- 2. Main Editor Area (Whiteboard) --- */}
        <main
          className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto"
          style={{ fontFamily: mainStyles.fontFamily }}
        >
          {/* UPDATED: Removed max-w-4xl from mobile */}
          <div className="w-full max-w-4xl mx-auto">
            <div
              ref={payslipPrintRef}
              // UPDATED: A4 aspect ratio is now responsive (lg: only)
              className={`bg-white shadow-2xl overflow-hidden relative ${
                selectedTemplate === "classic" ? "" : "rounded-lg"
              } w-full lg:aspect-[210/297]`}
              style={{
                "--accent-color": accentColor,
                color: mainStyles.color,
                fontSize: mainStyles.fontSize,
              }}
            >
              {bgWatermark && (
                <div
                  className="absolute inset-0 w-full h-full z-0"
                  style={{
                    backgroundImage: `url(${bgWatermark})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    opacity: bgWatermarkOpacity,
                  }}
                />
              )}
              {watermark && (
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <span
                    className="text-[6vw] sm:text-[6em] font-bold rotate-[-30deg] uppercase whitespace-nowrap opacity-10"
                  >
                    {watermark}
                  </span>
                </div>
              )}

              {renderPayslipTemplate()}
            </div>
          </div>
        </main>
      </div>

      {/* --- 3. Template Selector Modal --- */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        templates={templates}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />

      {/* --- 4. Limit Reached Modal --- */}
      <LimitModal
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
      />

      {/* --- 5. Notification Modal --- */}
      <NotificationModal
        isOpen={notification.show}
        message={notification.message}
        onClose={() => setNotification({ show: false, message: "" })}
      />
    </>
  );
}

// --- TEMPLATE COMPONENTS (Responsiveness Added) ---

// --- Template 1: Modern Payslip ---
function TemplatePayslipModern({
  companyName, setCompanyName, companyAddress, setCompanyAddress, logo,
  employeeName, setEmployeeName, employeeId, setEmployeeId, employeePosition, setEmployeePosition,
  payPeriodStart, setPayPeriodStart, payPeriodEnd, setPayPeriodEnd, payDate, setPayDate,
  earnings, handleEarningChange, addEarning, removeEarning,
  deductions, handleDeductionChange, addDeduction, removeDeduction,
  grossEarnings, totalDeductions, netPay, formatCurrency
}) {
  return (
    <div className="p-8 sm:p-10 md:p-12 relative">
      <div className="relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b-2" style={{ borderColor: "var(--accent-color)" }}>
          <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
            {logo ? (<img src={logo} alt="Logo" className="max-h-24 max-w-48 object-contain"/>) : (
              <h1 className="font-bold" style={{ fontSize: "2em", color: "var(--accent-color)" }}>
                <EditableField value={companyName} onChange={setCompanyName} placeholder="Company Name" />
              </h1>
            )}
            <div className="mt-2 text-[0.9em] whitespace-pre-wrap opacity-70">
              <EditableField value={companyAddress} onChange={setCompanyAddress} area={true} placeholder="Company Address" />
            </div>
          </div>
          <div className="w-full sm:w-1/2 text-left sm:text-right">
            <h2 className="font-bold uppercase" style={{ fontSize: "2.2em" }}>Payslip</h2>
            <div className="mt-2 text-[0.9em] opacity-70">
              <span className="font-semibold">Pay Date: </span>
              <EditableField type="date" value={payDate} onChange={setPayDate} placeholder="Pay Date" />
            </div>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-[0.9em]">
          <div>
            <h3 className="text-[1.1em] font-semibold uppercase opacity-70 mb-2">Employee Details</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <EditableField value={employeeName} onChange={setEmployeeName} placeholder="Employee Name" />
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Employee ID:</span>
                <EditableField value={employeeId} onChange={setEmployeeId} placeholder="EMP-001" />
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Position:</span>
                <EditableField value={employeePosition} onChange={setEmployeePosition} placeholder="Job Title" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[1.1em] font-semibold uppercase opacity-70 mb-2">Pay Period</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Period Start:</span>
                <EditableField type="date" value={payPeriodStart} onChange={setPayPeriodStart} placeholder="Start Date" />
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Period End:</span>
                <EditableField type="date" value={payPeriodEnd} onChange={setPayPeriodEnd} placeholder="End Date" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-[1.2em] font-semibold pb-2 border-b-2" style={{ borderColor: "var(--accent-color)" }}>Earnings</h3>
            <div className="mt-2 space-y-2">
              {earnings.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleEarningChange(index, "name", v)} placeholder="Earning Name" /></div>
                  <div className="w-28 text-right"><EditableField type="number" value={item.amount} onChange={(v) => handleEarningChange(index, "amount", v)} placeholder="0.00" /></div>
                  <button data-html2canvas-ignore="true" onClick={() => removeEarning(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
                </div>
              ))}
            </div>
            <button data-html2canvas-ignore="true" onClick={addEarning} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add Earning</button>
            <div className="mt-4 pt-2 border-t border-slate-300 flex justify-between font-semibold text-[1.1em]">
              <span>Gross Earnings:</span><span>{formatCurrency(grossEarnings)}</span>
            </div>
          </div>
          <div>
            <h3 className="text-[1.2em] font-semibold pb-2 border-b-2" style={{ borderColor: "var(--accent-color)" }}>Deductions</h3>
            <div className="mt-2 space-y-2">
              {deductions.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleDeductionChange(index, "name", v)} placeholder="Deduction Name" /></div>
                  <div className="w-28 text-right"><EditableField type="number" value={item.amount} onChange={(v) => handleDeductionChange(index, "amount", v)} placeholder="0.00" /></div>
                  <button data-html2canvas-ignore="true" onClick={() => removeDeduction(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
                </div>
              ))}
            </div>
            <button data-html2canvas-ignore="true" onClick={addDeduction} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add Deduction</button>
            <div className="mt-4 pt-2 border-t border-slate-300 flex justify-between font-semibold text-[1.1em]">
              <span>Total Deductions:</span><span>{formatCurrency(totalDeductions)}</span>
            </div>
          </div>
        </section>

        <section className="mt-10 pt-6" style={{ borderTop: "2px solid var(--accent-color)" }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-lg" style={{ backgroundColor: "var(--accent-color)" }}>
            <h2 className="text-white font-bold mb-2 sm:mb-0" style={{ fontSize: "1.8em" }}>Net Pay</h2>
            <span className="text-white font-bold" style={{ fontSize: "1.8em" }}>{formatCurrency(netPay)}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Template 2: Classic Payslip ---
function TemplatePayslipClassic({
  companyName, setCompanyName, companyAddress, setCompanyAddress, logo,
  employeeName, setEmployeeName, employeeId, setEmployeeId, employeePosition, setEmployeePosition,
  payPeriodStart, setPayPeriodStart, payPeriodEnd, setPayPeriodEnd, payDate, setPayDate,
  earnings, handleEarningChange, addEarning, removeEarning,
  deductions, handleDeductionChange, addDeduction, removeDeduction,
  grossEarnings, totalDeductions, netPay, formatCurrency
}) {
  return (
    <div className="relative border-2 border-black h-full">
      <div className="p-8 sm:p-10 md:p-12 relative z-10">
        <header className="text-center pb-6 border-b-2 border-black">
          {logo && (<img src={logo} alt="Logo" className="max-h-20 object-contain mx-auto mb-4"/>)}
          <h1 className="font-bold" style={{ fontSize: "2em" }}>
            <EditableField value={companyName} onChange={setCompanyName} placeholder="Company Name" />
          </h1>
          <div className="mt-1 text-[0.9em] whitespace-pre-wrap opacity-70">
            <EditableField value={companyAddress} onChange={setCompanyAddress} area={true} placeholder="Company Address" />
          </div>
          <h2 className="font-semibold uppercase mt-4" style={{ fontSize: "1.5em" }}>Pay Statement</h2>
        </header>

        <section className="mt-6 pb-6 border-b border-black text-[0.9em]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="font-semibold block opacity-70">Employee</span>
              <EditableField value={employeeName} onChange={setEmployeeName} placeholder="Employee Name" />
            </div>
            <div>
              <span className="font-semibold block opacity-70">Employee ID</span>
              <EditableField value={employeeId} onChange={setEmployeeId} placeholder="EMP-001" />
            </div>
            <div>
              <span className="font-semibold block opacity-70">Position</span>
              <EditableField value={employeePosition} onChange={setEmployeePosition} placeholder="Job Title" />
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="font-semibold block opacity-70">Pay Period Start</span>
              <EditableField type="date" value={payPeriodStart} onChange={setPayPeriodStart} placeholder="Start Date" />
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="font-semibold block opacity-70">Pay Period End</span>
              <EditableField type="date" value={payPeriodEnd} onChange={setPayPeriodEnd} placeholder="End Date" />
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="font-semibold block opacity-70">Pay Date</span>
              <EditableField type="date" value={payDate} onChange={setPayDate} placeholder="Pay Date" />
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-[1.1em] font-semibold uppercase opacity-70 mb-2">Earnings</h3>
            {earnings.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleEarningChange(index, "name", v)} placeholder="Earning Name" /></div>
                <div className="w-28 text-right"><EditableField type="number" value={item.amount} onChange={(v) => handleEarningChange(index, "amount", v)} placeholder="0.00" /></div>
                <button data-html2canvas-ignore="true" onClick={() => removeEarning(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
              </div>
            ))}
            <button data-html2canvas-ignore="true" onClick={addEarning} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add Earning</button>
          </div>
          <div>
            <h3 className="text-[1.1em] font-semibold uppercase opacity-70 mb-2">Deductions</h3>
            {deductions.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleDeductionChange(index, "name", v)} placeholder="Deduction Name" /></div>
                <div className="w-28 text-right"><EditableField type="number" value={item.amount} onChange={(v) => handleDeductionChange(index, "amount", v)} placeholder="0.00" /></div>
                <button data-html2canvas-ignore="true" onClick={() => removeDeduction(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
              </div>
            ))}
            <button data-html2canvas-ignore="true" onClick={addDeduction} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add Deduction</button>
          </div>
        </section>
        
        <section className="mt-6 pt-6 border-t-2 border-black">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[1.1em]">
            <div className="p-4 bg-slate-100 rounded">
              <span className="font-semibold block opacity-70">Gross Earnings</span>
              <span className="font-bold text-slate-800">{formatCurrency(grossEarnings)}</span>
            </div>
             <div className="p-4 bg-slate-100 rounded">
              <span className="font-semibold block opacity-70">Total Deductions</span>
              <span className="font-bold text-slate-800">{formatCurrency(totalDeductions)}</span>
            </div>
             <div className="p-4 rounded text-white" style={{ backgroundColor: "var(--accent-color)" }}>
              <span className="font-semibold block opacity-70 text-white/80">Net Pay</span>
              <span className="font-bold">{formatCurrency(netPay)}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


// --- Template 3: Compact Payslip ---
function TemplatePayslipCompact({
  companyName, setCompanyName,
  employeeName, setEmployeeName, employeeId, setEmployeeId, employeePosition, setEmployeePosition,
  payPeriodStart, setPayPeriodStart, payPeriodEnd, setPayPeriodEnd, payDate, setPayDate,
  earnings, handleEarningChange, addEarning, removeEarning,
  deductions, handleDeductionChange, addDeduction, removeDeduction,
  grossEarnings, totalDeductions, netPay, formatCurrency
}) {
  return (
    <div className="p-8 sm:p-10 md:p-12 relative">
      <div className="relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-start pb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="font-bold" style={{ fontSize: "1.8em" }}>
              <EditableField value={companyName} onChange={setCompanyName} placeholder="Company Name" />
            </h1>
            <div className="mt-1 text-[0.9em] opacity-70">
              <EditableField value={employeeName} onChange={setEmployeeName} placeholder="Employee Name" />
            </div>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="font-bold uppercase" style={{ fontSize: "1.8em" }}>Pay Summary</h2>
            <div className="mt-1 text-[0.9em] opacity-70">
              <EditableField type="date" value={payDate} onChange={setPayDate} placeholder="Pay Date" />
            </div>
          </div>
        </header>

        <section className="mt-6 p-6 rounded-lg" style={{ backgroundColor: "var(--accent-color)", color: "white" }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <span className="font-semibold mb-1 sm:mb-0" style={{ fontSize: "1.5em" }}>Net Pay</span>
            <span className="font-bold" style={{ fontSize: "2.5em" }}>{formatCurrency(netPay)}</span>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-[1.1em] font-semibold uppercase opacity-70 mb-2">Earnings</h3>
            {earnings.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleEarningChange(index, "name", v)} placeholder="Earning Name" /></div>
                <div className="w-28 text-right"><EditableField type="number" value={item.amount} onChange={(v) => handleEarningChange(index, "amount", v)} placeholder="0.00" /></div>
                <button data-html2canvas-ignore="true" onClick={() => removeEarning(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
              </div>
            ))}
            <button data-html2canvas-ignore="true" onClick={addEarning} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add</button>
            <div className="mt-4 pt-2 border-t border-slate-300 flex justify-between font-semibold text-[1.1em]">
              <span>Gross:</span>
              <span>{formatCurrency(grossEarnings)}</span>
            </div>
          </div>
          <div>
            <h3 className="text-[1.1em] font-semibold uppercase opacity-70 mb-2">Deductions</h3>
            {deductions.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleDeductionChange(index, "name", v)} placeholder="Deduction Name" /></div>
                <div className="w-28 text-right"><EditableField type="number" value={item.amount} onChange={(v) => handleDeductionChange(index, "amount", v)} placeholder="0.00" /></div>
                <button data-html2canvas-ignore="true" onClick={() => removeDeduction(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
              </div>
            ))}
            <button data-html2canvas-ignore="true" onClick={addDeduction} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add</button>
             <div className="mt-4 pt-2 border-t border-slate-300 flex justify-between font-semibold text-[1.1em]">
              <span>Total:</span>
              <span>{formatCurrency(totalDeductions)}</span>
            </div>
          </div>
        </section>
        
        <section className="mt-6 pt-6 border-t border-slate-200 text-[0.9em]">
          <h3 className="text-[1.1em] font-semibold uppercase opacity-70 mb-2">Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 opacity-70">
            <div>
              <span className="font-semibold block">Position</span>
              <EditableField value={employeePosition} onChange={setEmployeePosition} placeholder="Job Title" />
            </div>
            <div>
              <span className="font-semibold block">Employee ID</span>
              <EditableField value={employeeId} onChange={setEmployeeId} placeholder="EMP-001" />
            </div>
            <div>
              <span className="font-semibold block">Pay Period</span>
              <EditableField type="date" value={payPeriodStart} onChange={setPayPeriodStart} placeholder="Start" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Template 4: Bold Payslip ---
function TemplatePayslipBold({
  companyName, setCompanyName,
  employeeName, setEmployeeName,
  payDate, setPayDate,
  earnings, handleEarningChange, addEarning, removeEarning,
  deductions, handleDeductionChange, addDeduction, removeDeduction,
  grossEarnings, totalDeductions, netPay, formatCurrency
}) {
  return (
    <div className="relative">
      <header className="p-8 sm:p-10 md:p-12" style={{ backgroundColor: "var(--accent-color)", color: "white" }}>
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="mb-4 sm:mb-0">
            <h1 className="font-bold" style={{ fontSize: "2.5em" }}>
              <EditableField value={companyName} onChange={setCompanyName} placeholder="Company Name" />
            </h1>
            <h2 className="font-semibold uppercase" style={{ fontSize: "1.5em", opacity: 0.8 }}>Pay Statement</h2>
          </div>
        </div>
      </header>
      
      <div className="p-8 sm:p-10 md:p-12 relative z-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-[1.1em] font-bold uppercase opacity-70 mb-2">Employee</h3>
            <div className="text-[1.2em] font-semibold">
              <EditableField value={employeeName} onChange={setEmployeeName} placeholder="Employee Name" />
            </div>
          </div>
          <div className="text-left sm:text-right">
            <h3 className="text-[1.1em] font-bold uppercase opacity-70 mb-2">Pay Date</h3>
            <div className="text-[1.2em] font-semibold">
              <EditableField type="date" value={payDate} onChange={setPayDate} placeholder="Pay Date" />
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-[1.2em] font-bold pb-2">Earnings</h3>
            <div className="mt-2 space-y-2">
              {earnings.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleEarningChange(index, "name", v)} placeholder="Earning Name" /></div>
                  <div className="w-28 text-right font-medium"><EditableField type="number" value={item.amount} onChange={(v) => handleEarningChange(index, "amount", v)} placeholder="0.00" /></div>
                  <button data-html2canvas-ignore="true" onClick={() => removeEarning(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
                </div>
              ))}
            </div>
            <button data-html2canvas-ignore="true" onClick={addEarning} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add Earning</button>
          </div>
          <div>
            <h3 className="text-[1.2em] font-bold pb-2">Deductions</h3>
            <div className="mt-2 space-y-2">
              {deductions.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleDeductionChange(index, "name", v)} placeholder="Deduction Name" /></div>
                  <div className="w-28 text-right font-medium"><EditableField type="number" value={item.amount} onChange={(v) => handleDeductionChange(index, "amount", v)} placeholder="0.00" /></div>
                  <button data-html2canvas-ignore="true" onClick={() => removeDeduction(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
                </div>
              ))}
            </div>
            <button data-html2canvas-ignore="true" onClick={addDeduction} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add Deduction</button>
          </div>
        </section>

        <section className="mt-10 pt-6 border-t-4 border-double border-black">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[1.1em] font-semibold">Gross Earnings:</span>
            <span className="text-[1.1em] font-semibold">{formatCurrency(grossEarnings)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[1.1em] font-semibold">Total Deductions:</span>
            <span className="text-[1.1em] font-semibold">{formatCurrency(totalDeductions)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-2 border-black rounded-lg">
            <h2 className="font-bold mb-2 sm:mb-0" style={{ fontSize: "1.8em" }}>NET PAY</h2>
            <span className="font-bold" style={{ fontSize: "2.2em", color: "var(--accent-color)" }}>{formatCurrency(netPay)}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Template 5: Minimal Payslip ---
function TemplatePayslipMinimal({
  companyName, setCompanyName,
  employeeName, setEmployeeName, payDate, setPayDate,
  earnings, handleEarningChange, addEarning, removeEarning,
  deductions, handleDeductionChange, addDeduction, removeDeduction,
  grossEarnings, totalDeductions, netPay, formatCurrency
}) {
  return (
    <div className="p-8 sm:p-10 md:p-12 relative">
      <div className="relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b border-slate-300">
          <h1 className="font-semibold mb-4 sm:mb-0" style={{ fontSize: "1.5em" }}>
            <EditableField value={companyName} onChange={setCompanyName} placeholder="Company Name" />
          </h1>
          <h2 className="font-semibold uppercase opacity-70" style={{ fontSize: "1.2em" }}>Payslip</h2>
        </header>

        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[0.9em] opacity-80">
          <div>
            <span className="text-[0.9em] font-medium uppercase opacity-60 block">Employee</span>
            <EditableField value={employeeName} onChange={setEmployeeName} placeholder="Employee Name" />
          </div>
          <div>
            <span className="text-[0.9em] font-medium uppercase opacity-60 block">Pay Date</span>
            <EditableField type="date" value={payDate} onChange={setPayDate} placeholder="Pay Date" />
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-[1em] font-medium uppercase opacity-60 mb-3">Earnings</h3>
            <div className="mt-2 space-y-2">
              {earnings.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleEarningChange(index, "name", v)} placeholder="Earning Name" /></div>
                  <div className="w-28 text-right"><EditableField type="number" value={item.amount} onChange={(v) => handleEarningChange(index, "amount", v)} placeholder="0.00" /></div>
                  <button data-html2canvas-ignore="true" onClick={() => removeEarning(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
                </div>
              ))}
            </div>
            <button data-html2canvas-ignore="true" onClick={addEarning} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add Earning</button>
          </div>
          <div>
            <h3 className="text-[1em] font-medium uppercase opacity-60 mb-3">Deductions</h3>
            <div className="mt-2 space-y-2">
              {deductions.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <div className="flex-1"><EditableField value={item.name} onChange={(v) => handleDeductionChange(index, "name", v)} placeholder="Deduction Name" /></div>
                  <div className="w-28 text-right"><EditableField type="number" value={item.amount} onChange={(v) => handleDeductionChange(index, "amount", v)} placeholder="0.00" /></div>
                  <button data-html2canvas-ignore="true" onClick={() => removeDeduction(item.id)} className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><RiDeleteBinLine /></button>
                </div>
              ))}
            </div>
            <button data-html2canvas-ignore="true" onClick={addDeduction} className="mt-2 flex items-center gap-1 text-[0.9em] font-medium" style={{ color: "var(--accent-color)" }}><RiAddLine /> Add Deduction</button>
          </div>
        </section>
        
        <section className="mt-10 pt-6 border-t border-slate-300">
          <div className="w-full max-w-sm ml-auto space-y-2">
            <div className="flex justify-between items-center text-[1.1em]">
              <span className="font-medium opacity-70">Gross Earnings:</span>
              <span className="font-medium">{formatCurrency(grossEarnings)}</span>
            </div>
            <div className="flex justify-between items-center text-[1.1em]">
              <span className="font-medium opacity-70">Total Deductions:</span>
              <span className="font-medium">{formatCurrency(totalDeductions)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-300">
              <span className="font-semibold" style={{ fontSize: "1.2em" }}>Net Pay:</span>
              <span className="font-bold" style={{ fontSize: "1.5em", color: "var(--accent-color)" }}>{formatCurrency(netPay)}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


// --- Template Modal Component ---
function TemplateModal({
  isOpen,
  onClose,
  templates,
  selectedTemplate,
  setSelectedTemplate,
}) {
  const handleSelect = (id) => {
    setSelectedTemplate(id);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-slate-900 dark:text-white">Choose a Template</Dialog.Title>
                  <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><RiCloseLine className="h-5 w-5" /></button>
                </div>

                <RadioGroup value={selectedTemplate} onChange={handleSelect} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a template</RadioGroup.Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {templates.map((template) => (
                      <RadioGroup.Option
                        key={template.id}
                        value={template.id}
                        className={({ active, checked }) =>
                          `relative flex cursor-pointer rounded-lg border-2 p-2 focus:outline-none transition-all
                          ${checked ? "border-blue-500 ring-2 ring-blue-500" : "border-slate-200 dark:border-slate-700 hover:border-blue-300"}
                          ${active ? "ring-2 ring-offset-2 ring-blue-400" : ""}`
                        }
                      >
                        {({ checked }) => (
                          <>
                            <div className="flex w-full flex-col items-center gap-2">
                              <div className="w-full h-36 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center text-slate-400">
                                <RiImageAddLine className="h-10 w-10" />
                              </div>
                              <RadioGroup.Label as="span" className="font-medium text-sm text-slate-800 dark:text-slate-200">{template.name}</RadioGroup.Label>
                              {checked && (
                                <div className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-blue-500 text-white"><RiCheckLine className="h-4 w-4" /></div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// --- Limit Reached Modal Component ---
function LimitModal({ isOpen, onClose }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
                    <RiErrorWarningLine className="h-6 w-6 text-orange-600 dark:text-orange-400" aria-hidden="true"/>
                  </div>
                  <div className="ml-4 text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
                      One-Page Limit Reached
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    This free tool is designed for single-page documents. To
                    keep your payslip clean and printable, you cannot add
                    any more items.
                  </p>
                </div>
                <div className="mt-5">
                  <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={onClose}>
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// --- Notification Modal Component ---
function NotificationModal({ isOpen, message, onClose }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <RiInformationLine className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true"/>
                  </div>
                  <div className="ml-4 text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
                      Notification
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {message}
                  </p>
                </div>
                <div className="mt-5">
                  <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={onClose}>
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}