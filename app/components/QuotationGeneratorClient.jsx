/* File: app/quotation-generator/page.jsx */

"use client";

import React, { useState, useRef, Fragment, useMemo, useEffect } from "react";
import Image from "next/image"; // NEW: Import Image component
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
  RiMailSendLine, // NEW: For email modal
  RiLoader4Line, // NEW: For loading spinner
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

// --- Quotation Generator Page ---
export default function QuotationGeneratorClient() {
  // --- STATE MANAGEMENT ---

  // 1. Quotation Data
  const initialItem = { id: 1, name: "Service or Product", qty: 1, price: 100 };
  const [from, setFrom] = useState(
    "Your Company\n123 Main St\nCity, State 12345"
  );
  const [to, setTo] = useState(
    "Potential Client\n456 Client Ave\nCity, State 67890"
  );
  const [quoteNumber, setQuoteNumber] = useState("QUOTE-001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState("");
  const [items, setItems] = useState([initialItem]);
  const [termsConditions, setTermsConditions] = useState(
    "This quotation is valid for 30 days. Prices are subject to change after this period."
  );
  const [tax, setTax] = useState(5);
  const [discount, setDiscount] = useState(0);
  const [logo, setLogo] = useState(null);

  // 2. Styling & Template State
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [textColor, setTextColor] = useState("#111827");
  const [fontFamily, setFontFamily] = useState("Inter, sans-serif");
  const [fontSize, setFontSize] = useState(14);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [watermark, setWatermark] = useState("DRAFT");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.1); // NEW
  const [watermarkSize, setWatermarkSize] = useState(6); // NEW
  const [bgWatermark, setBgWatermark] = useState(null);
  const [bgWatermarkOpacity, setBgWatermarkOpacity] = useState(0.1);
  const [bgWatermarkSize, setBgWatermarkSize] = useState(100); // NEW
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  // 3. UI State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // 4. Local Storage State
  const [saveMyDetails, setSaveMyDetails] = useState(false);
  const [savedClients, setSavedClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [savedQuotations, setSavedQuotations] = useState([]);
  const [selectedQuotationId, setSelectedQuotationId] = useState("");

  // --- REFS ---
  const quotationPrintRef = useRef(null);
  const logoUploadRef = useRef(null);
  const bgWatermarkUploadRef = useRef(null);

  // Load data from Local Storage on mount
  useEffect(() => {
    setIsTemplateModalOpen(true);

    try {
      const savedFrom = localStorage.getItem(
        "smoothledger-quotation-mydetails"
      );
      if (savedFrom) {
        setFrom(savedFrom);
        setSaveMyDetails(true);
      }
      const clients = localStorage.getItem("smoothledger-clients");
      if (clients) {
        setSavedClients(JSON.parse(clients));
      }
      const quotations = localStorage.getItem("smoothledger-quotations");
      if (quotations) {
        setSavedQuotations(JSON.parse(quotations));
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }, []);

  // Auto-save "My Details" if toggle is on
  useEffect(() => {
    if (saveMyDetails) {
      try {
        localStorage.setItem("smoothledger-quotation-mydetails", from);
      } catch (error) {
        console.error("Error saving to local storage:", error);
      }
    }
  }, [from, saveMyDetails]);

  // Check if user has already subscribed
  useEffect(() => {
    if (localStorage.getItem("smoothledger-subscribed") === "true") {
      setIsDirty(false);
    }
  }, []);

  // --- DERIVED STATE & CALCULATIONS ---
  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.qty * item.price, 0),
    [items]
  );
  const taxAmount = useMemo(() => (subtotal * tax) / 100, [subtotal, tax]);
  const discountAmount = useMemo(
    () => (subtotal * discount) / 100,
    [subtotal, discount]
  );
  const total = useMemo(
    () => subtotal + taxAmount - discountAmount,
    [subtotal, taxAmount, discountAmount]
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // --- Wrapper functions to set isDirty ---
  const setFromWrapper = (value) => {
    setFrom(value);
    setIsDirty(true);
  };
  const setToWrapper = (value) => {
    setTo(value);
    setIsDirty(true);
  };
  const setQuoteNumberWrapper = (value) => {
    setQuoteNumber(value);
    setIsDirty(true);
  };
  const setDateWrapper = (value) => {
    setDate(value);
    setIsDirty(true);
  };
  const setExpiryDateWrapper = (value) => {
    setExpiryDate(value);
    setIsDirty(true);
  };
  const setItemsWrapper = (value) => {
    setItems(value);
    setIsDirty(true);
  };
  const setTermsConditionsWrapper = (value) => {
    setTermsConditions(value);
    setIsDirty(true);
  };
  const setTaxWrapper = (value) => {
    setTax(value);
    setIsDirty(true);
  };
  const setDiscountWrapper = (value) => {
    setDiscount(value);
    setIsDirty(true);
  };
  const setLogoWrapper = (value) => {
    setLogo(value);
    setIsDirty(true);
  };
  const setAccentColorWrapper = (value) => {
    setAccentColor(value);
    setIsDirty(true);
  };
  const setTextColorWrapper = (value) => {
    setTextColor(value);
    setIsDirty(true);
  };
  const setFontFamilyWrapper = (value) => {
    setFontFamily(value);
    setIsDirty(true);
  };
  const setFontSizeWrapper = (value) => {
    setFontSize(value);
    setIsDirty(true);
  };
  const setCurrencyCodeWrapper = (value) => {
    setCurrencyCode(value);
    setIsDirty(true);
  };
  const setWatermarkWrapper = (value) => {
    setWatermark(value);
    setIsDirty(true);
  };
  const setBgWatermarkWrapper = (value) => {
    setBgWatermark(value);
    setIsDirty(true);
  };
  // NEW WRAPPERS FOR WATERMARK
  const setWatermarkOpacityWrapper = (value) => {
    setWatermarkOpacity(value);
    setIsDirty(true);
  };
  const setWatermarkSizeWrapper = (value) => {
    setWatermarkSize(value);
    setIsDirty(true);
  };
  const setBgWatermarkOpacityWrapper = (value) => {
    setBgWatermarkOpacity(value);
    setIsDirty(true);
  };
  const setBgWatermarkSizeWrapper = (value) => {
    setBgWatermarkSize(value);
    setIsDirty(true);
  };

  // --- EVENT HANDLERS ---
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoWrapper(URL.createObjectURL(file));
    }
  };
  const handleBgWatermarkUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBgWatermarkWrapper(URL.createObjectURL(file));
    }
  };

  // Line Items
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] =
      field === "qty" || field === "price" ? parseFloat(value) || 0 : value;
    setItemsWrapper(newItems);
  };

  const addItem = () => {
    if (items.length >= 12) {
      setIsLimitModalOpen(true);
      return;
    }
    setItemsWrapper([
      ...items,
      { id: Date.now(), name: "New Item", qty: 1, price: 0 },
    ]);
  };

  const removeItem = (id) => {
    setItemsWrapper(items.filter((item) => item.id !== id));
  };

  // --- Local Storage Handlers ---
  const handleSaveMyDetailsToggle = (isOn) => {
    setSaveMyDetails(isOn);
    if (!isOn) {
      localStorage.removeItem("smoothledger-quotation-mydetails");
    }
  };

  const handleSaveClient = () => {
    if (!to || !to.trim()) return;
    const clientName = to.split("\n")[0];

    if (savedClients.some((client) => client.value === to)) {
      setNotification({ show: true, message: "This client is already saved." });
      return;
    }

    const newClient = { name: clientName, value: to };
    const newClientsList = [...savedClients, newClient];

    try {
      setSavedClients(newClientsList);
      localStorage.setItem(
        "smoothledger-clients",
        JSON.stringify(newClientsList)
      );
      setSelectedClient(to);
      setNotification({ show: true, message: `Client "${clientName}" saved!` });
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  const handleLoadClient = (e) => {
    const clientValue = e.target.value;
    setSelectedClient(clientValue);
    if (clientValue) {
      setToWrapper(clientValue);
    }
  };

  // --- Save/Load Quotation Handlers ---
  const handleSaveQuotation = () => {
    if (!quoteNumber || !quoteNumber.trim()) {
      setNotification({
        show: true,
        message: "Please enter a Quotation Number to save.",
      });
      return;
    }

    const clientName = to.split("\n")[0] || "No Client";
    const quotationData = {
      id: quoteNumber,
      clientName: clientName,
      from,
      to,
      quoteNumber,
      date,
      expiryDate,
      items,
      termsConditions,
      tax,
      discount,
      accentColor,
      textColor,
      fontFamily,
      fontSize,
      currencyCode,
    };

    const newSavedQuotations = [...savedQuotations];
    const existingIndex = newSavedQuotations.findIndex(
      (q) => q.id === quoteNumber
    );

    let message = "";
    if (existingIndex !== -1) {
      newSavedQuotations[existingIndex] = quotationData;
      message = `Quotation ${quotationData.id} updated!`;
    } else {
      newSavedQuotations.push(quotationData);
      message = `Quotation ${quotationData.id} saved!`;
    }

    try {
      setSavedQuotations(newSavedQuotations);
      localStorage.setItem(
        "smoothledger-quotations",
        JSON.stringify(newSavedQuotations)
      );
      setSelectedQuotationId(quotationData.id);
      setNotification({ show: true, message });
    } catch (error) {
      console.error("Error saving quotation:", error);
      setNotification({
        show: true,
        message: "Error saving. Storage might be full.",
      });
    }
  };

  const handleLoadQuotation = (e) => {
    const quotationId = e.target.value;
    setSelectedQuotationId(quotationId);
    if (!quotationId) return;

    const quoteToLoad = savedQuotations.find((q) => q.id === quotationId);

    // Loading data should not trigger isDirty
    if (quoteToLoad) {
      setFrom(quoteToLoad.from);
      setTo(quoteToLoad.to);
      setQuoteNumber(quoteToLoad.quoteNumber);
      setDate(quoteToLoad.date);
      setExpiryDate(quoteToLoad.expiryDate);
      setItems(quoteToLoad.items);
      setTermsConditions(quoteToLoad.termsConditions);
      setTax(quoteToLoad.tax);
      setDiscount(quoteToLoad.discount);
      setAccentColor(quoteToLoad.accentColor);
      setTextColor(quoteToLoad.textColor);
      setFontFamily(quoteToLoad.fontFamily);
      setFontSize(quoteToLoad.fontSize);
      setCurrencyCode(quoteToLoad.currencyCode);
    }
  };

  const handleDeleteQuotation = () => {
    if (!selectedQuotationId) {
      setNotification({
        show: true,
        message: "Please select a quotation to delete.",
      });
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete quotation ${selectedQuotationId}? This cannot be undone.`
      )
    ) {
      return;
    }

    const newSavedQuotations = savedQuotations.filter(
      (q) => q.id !== selectedQuotationId
    );

    try {
      setSavedQuotations(newSavedQuotations);
      localStorage.setItem(
        "smoothledger-quotations",
        JSON.stringify(newSavedQuotations)
      );
      setSelectedQuotationId("");
      setNotification({
        show: true,
        message: `Quotation ${selectedQuotationId} deleted.`,
      });
    } catch (error) {
      console.error("Error deleting quotation:", error);
    }
  };

  // PDF Download
  const startDownload = async () => {
    setIsDownloading(true);
    const element = quotationPrintRef.current;
    if (!element) return;

    const originalWidth = element.style.width;
    element.style.width = "794px";

    const scale = 2;
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: 1200,
    });

    element.style.width = originalWidth;

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
    pdf.save(`SmoothLedger-Quotation-${quoteNumber}.pdf`);
    setIsDownloading(false);
  };

  const handleDownloadClick = () => {
    if (isDirty) {
      setIsEmailModalOpen(true);
    } else {
      startDownload();
    }
  };

  const handleEmailSubmit = async (email) => {
    setIsSubscribing(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe");
      }
      localStorage.setItem("smoothledger-subscribed", "true");
    } catch (error) {
      console.error("Subscription error:", error.message);
    } finally {
      setIsSubscribing(false);
      setIsEmailModalOpen(false);
      startDownload();
    }
  };

  // --- STYLES ---
  const mainStyles = {
    fontFamily: fontFamily,
    color: textColor,
    fontSize: `${fontSize}px`,
  };

  // --- TEMPLATE DEFINITIONS ---
  const templates = [
    { id: "modern", name: "Modern", preview: "/previews/modern.png" },
    { id: "classic", name: "Classic", preview: "/previews/classic.png" },
    { id: "bold", name: "Bold", preview: "/previews/bold.png" },
    { id: "minimal", name: "Minimal", preview: "/previews/minimal.png" },
    { id: "creative", name: "Creative", preview: "/previews/creative.png" },
  ];

  const renderQuotationTemplate = () => {
    const commonProps = {
      from,
      setFrom: setFromWrapper,
      to,
      setTo: setToWrapper,
      quoteNumber,
      setQuoteNumber: setQuoteNumberWrapper,
      date,
      setDate: setDateWrapper,
      expiryDate,
      setExpiryDate: setExpiryDateWrapper,
      items,
      handleItemChange,
      removeItem,
      addItem,
      termsConditions,
      setTermsConditions: setTermsConditionsWrapper,
      tax,
      setTax: setTaxWrapper,
      discount,
      setDiscount: setDiscountWrapper,
      subtotal,
      total,
      logo,
      formatCurrency,
    };

    switch (selectedTemplate) {
      case "classic":
        return <TemplateQuotationClassic {...commonProps} />;
      case "bold":
        return <TemplateQuotationBold {...commonProps} />;
      case "minimal":
        return <TemplateQuotationMinimal {...commonProps} />;
      case "creative":
        return <TemplateQuotationCreative {...commonProps} />;
      case "modern":
      default:
        return <TemplateQuotationModern {...commonProps} />;
    }
  };

  // --- RENDER ---
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-900">
        {/* --- 1. Controls Panel (Sidebar) --- */}
        <aside className="w-full lg:w-80 xl:w-96 bg-white dark:bg-slate-950 p-6 border-r border-slate-200 dark:border-slate-800 space-y-8 overflow-y-auto lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Quotation Studio
          </h2>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadClick}
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

          {/* --- NEW RE-ORDERED SIDEBAR --- */}
          <div className="space-y-6">
            {/* 1. Document Details */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiDraftLine className="inline mr-2" />
                Document Details
              </h3>
              <div className="mt-4 space-y-4">
                {/* Currency */}
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
                    onChange={(e) => setCurrencyCodeWrapper(e.target.value)}
                    className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    {currencyList.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Text Watermark */}
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
                    onChange={(e) => setWatermarkWrapper(e.target.value)}
                    placeholder="e.g. DRAFT, CONFIDENTIAL"
                    className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {/* Text Size */}
                <div className="space-y-2">
                  <label
                    htmlFor="watermarkSize"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Text Size: {watermarkSize}em
                  </label>
                  <input
                    type="range"
                    id="watermarkSize"
                    min="2"
                    max="12"
                    step="0.5"
                    value={watermarkSize}
                    onChange={(e) =>
                      setWatermarkSizeWrapper(parseFloat(e.target.value))
                    }
                    className="w-full"
                    disabled={!watermark}
                  />
                </div>
                {/* Text Opacity */}
                <div className="space-y-2">
                  <label
                    htmlFor="watermarkOpacity"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Text Opacity: {Math.round(watermarkOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    id="watermarkOpacity"
                    min="0.05"
                    max="0.5"
                    step="0.01"
                    value={watermarkOpacity}
                    onChange={(e) =>
                      setWatermarkOpacityWrapper(parseFloat(e.target.value))
                    }
                    className="w-full"
                    disabled={!watermark}
                  />
                </div>
              </div>
            </div>

            {/* 2. Branding */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiImageAddLine className="inline mr-2" />
                Branding
              </h3>
              <div className="mt-4 space-y-4">
                {/* Company Logo */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Your Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={logoUploadRef}
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => logoUploadRef.current.click()}
                    className="mt-2 w-full flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-500 transition-colors"
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
                      onClick={() => setLogoWrapper(null)}
                      className="mt-2 w-full text-sm text-red-500 hover:text-red-700"
                    >
                      Remove Logo
                    </button>
                  )}
                </div>
                {/* BG Image Watermark */}
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
                        onClick={() => setBgWatermarkWrapper(null)}
                        className="mt-2 w-full text-sm text-red-500 hover:text-red-700"
                      >
                        Remove Image
                      </button>
                      <label
                        htmlFor="bgOpacity"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Image Opacity: {Math.round(bgWatermarkOpacity * 100)}%
                      </label>
                      <input
                        type="range"
                        id="bgOpacity"
                        min="0.05"
                        max="0.5"
                        step="0.01"
                        value={bgWatermarkOpacity}
                        onChange={(e) =>
                          setBgWatermarkOpacityWrapper(
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full"
                      />
                      <label
                        htmlFor="bgSize"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Size: {bgWatermarkSize}%
                      </label>
                      <input
                        type="range"
                        id="bgSize"
                        min="20"
                        max="150"
                        step="5"
                        value={bgWatermarkSize}
                        onChange={(e) =>
                          setBgWatermarkSizeWrapper(parseFloat(e.target.value))
                        }
                        className="w-full"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Styling */}
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
                    onChange={(e) => setAccentColorWrapper(e.target.value)}
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
                    onChange={(e) => setTextColorWrapper(e.target.value)}
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
                    onChange={(e) => setFontFamilyWrapper(e.target.value)}
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
                    onChange={(e) =>
                      setFontSizeWrapper(parseInt(e.target.value, 10))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 4. Save & Load */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiSave3Line className="inline mr-2" />
                Save & Load
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
                    htmlFor="clients"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Saved Clients
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="clients"
                      value={selectedClient}
                      onChange={handleLoadClient}
                      className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Load a client...</option>
                      {savedClients.map((client, index) => (
                        <option key={index} value={client.value}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleSaveClient}
                      title="Save Current Client"
                      className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <RiUserAddLine className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSaveQuotation}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
                >
                  <RiSave3Line className="h-5 w-5" /> Save Current Quotation
                </button>
                <div className="space-y-2">
                  <label
                    htmlFor="load-quotation"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Load Quotation
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="load-quotation"
                      value={selectedQuotationId}
                      onChange={handleLoadQuotation}
                      className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Load a saved quotation...</option>
                      {savedQuotations.map((q) => (
                        <option key={q.id} value={q.id}>
                          {q.id} - {q.clientName}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleDeleteQuotation}
                      title="Delete Selected Quotation"
                      className="p-2 bg-red-100 dark:bg-red-900/50 rounded-md hover:bg-red-200 dark:hover:bg-red-900"
                      disabled={!selectedQuotationId}
                    >
                      <RiDeleteBin2Line className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- 2. Main Editor Area (Whiteboard) --- */}
        <main
          className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto"
          style={{ fontFamily: mainStyles.fontFamily }}
        >
          <div className="max-w-4xl mx-auto">
            <div
              ref={quotationPrintRef}
              className={`bg-white shadow-2xl overflow-hidden relative ${
                selectedTemplate === "classic" ? "" : "lg:rounded-lg"
              } w-full ${
                selectedTemplate === "classic" ? "" : "lg:aspect-[210/297]"
              }`}
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
                    backgroundSize: `${bgWatermarkSize}%`, // UPDATED
                    opacity: bgWatermarkOpacity,
                  }}
                />
              )}
              {watermark && (
                <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
                  <span
                    className="font-bold rotate-[-30deg] uppercase whitespace-nowrap"
                    style={{
                      fontSize: `${watermarkSize}em`,
                      opacity: watermarkOpacity,
                      color: "currentColor",
                    }}
                  >
                    {watermark}
                  </span>
                </div>
              )}

              {renderQuotationTemplate()}
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

      {/* --- 6. NEW: Email Capture Modal --- */}
      <EmailCaptureModal
        isOpen={isEmailModalOpen}
        isSubscribing={isSubscribing}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleEmailSubmit}
        onSkip={startDownload} // Allow user to skip and just download
      />
    </>
  );
}

// --- TEMPLATE COMPONENTS (Responsiveness Added) ---
// --- Template 1: Modern ---
function TemplateQuotationModern({
  from,
  setFrom,
  to,
  setTo,
  quoteNumber,
  setQuoteNumber,
  date,
  setDate,
  expiryDate,
  setExpiryDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  termsConditions,
  setTermsConditions,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
}) {
  return (
    <div className="p-8 sm:p-10 md:p-12 relative" style={{ fontSize: "1em" }}>
      <div className="relative z-10">
        <header
          className="flex flex-col sm:flex-row justify-between items-start pb-8 border-b-2"
          style={{ borderColor: "var(--accent-color)" }}
        >
          <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                className="max-h-24 max-w-48 object-contain"
              />
            ) : (
              <div
                className="font-bold"
                style={{ fontSize: "2.2em", color: "var(--accent-color)" }}
              >
                Your Logo Here
              </div>
            )}
            <div className="mt-4 text-[0.9em] whitespace-pre-wrap">
              <EditableField
                value={from}
                onChange={setFrom}
                area={true}
                placeholder="Your Company Info"
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 text-left sm:text-right">
            <h1
              className="font-bold uppercase"
              style={{ fontSize: "2.5em", lineHeight: "1" }}
            >
              Quotation
            </h1>
            <div className="mt-4 text-[1em] space-y-1">
              <div className="flex justify-start sm:justify-end gap-2 items-center">
                <span className="font-semibold">Quote #</span>
                <EditableField
                  value={quoteNumber}
                  onChange={setQuoteNumber}
                  placeholder="QUOTE-001"
                />
              </div>
              <div className="flex justify-start sm:justify-end gap-2 items-center">
                <span className="font-semibold">Date:</span>
                <EditableField
                  type="date"
                  value={date}
                  onChange={setDate}
                  placeholder="Date"
                />
              </div>
              <div className="flex justify-start sm:justify-end gap-2 items-center">
                <span className="font-semibold">Valid Until:</span>
                <EditableField
                  type="date"
                  value={expiryDate}
                  onChange={setExpiryDate}
                  placeholder="Expiry Date"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-[0.9em] font-semibold uppercase opacity-70">
            Prepared For
          </h2>
          <div className="mt-2 text-[1em] whitespace-pre-wrap">
            <EditableField
              value={to}
              onChange={setTo}
              area={true}
              placeholder="Client's Info"
            />
          </div>
        </section>

        <section className="mt-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr
                  className="text-[0.9em] uppercase opacity-70"
                  style={{ borderBottom: "2px solid var(--accent-color)" }}
                >
                  <th className="py-3 pr-4 w-1/2">Item</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 pl-4 text-right">Total</th>
                  <th className="py-3 pl-2" data-html2canvas-ignore="true"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-200">
                    <td className="py-3 pr-4 text-[1em]">
                      <EditableField
                        value={item.name}
                        onChange={(v) => handleItemChange(index, "name", v)}
                        placeholder="Item Name"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-center">
                      <EditableField
                        type="number"
                        value={item.qty}
                        onChange={(v) => handleItemChange(index, "qty", v)}
                        placeholder="1"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-right">
                      <EditableField
                        type="number"
                        value={item.price}
                        onChange={(v) => handleItemChange(index, "price", v)}
                        placeholder="0.00"
                      />
                    </td>
                    <td className="py-3 pl-4 text-[1em] text-right">
                      {formatCurrency(item.qty * item.price)}
                    </td>
                    <td
                      className="py-3 pl-2 text-right"
                      data-html2canvas-ignore="true"
                    >
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addItem}
            className="mt-4 flex items-center gap-1 text-[0.9em] font-medium transition-colors"
            style={{ color: "var(--accent-color)" }}
            data-html2canvas-ignore="true"
          >
            <RiAddLine /> Add Item
          </button>
        </section>

        <section className="mt-8 flex flex-col items-end">
          <div className="w-full max-w-xs text-[0.9em] space-y-2">
            <div className="flex justify-between">
              <span className="opacity-70">Subtotal:</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Tax (%):</span>
              <EditableField
                type="number"
                value={tax}
                onChange={setTax}
                placeholder="0"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Discount (%):</span>
              <EditableField
                type="number"
                value={discount}
                onChange={setDiscount}
                placeholder="0"
              />
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-[1.2em]">
              <span className="opacity-70">Total:</span>
              <span className="font-bold">{formatCurrency(total)}</span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-[0.9em] font-semibold uppercase opacity-70">
            Terms & Conditions
          </h2>
          <div className="mt-2 text-[0.9em]">
            <EditableField
              value={termsConditions}
              onChange={setTermsConditions}
              area={true}
              placeholder="This quotation is valid for..."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Template 2: Bold ---
function TemplateQuotationBold({
  from,
  setFrom,
  to,
  setTo,
  quoteNumber,
  setQuoteNumber,
  date,
  setDate,
  expiryDate,
  setExpiryDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  termsConditions,
  setTermsConditions,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
}) {
  return (
    <div className="relative" style={{ fontSize: "1em" }}>
      <header
        className="p-8 sm:p-10 md:p-12 text-white"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="mb-6 sm:mb-0">
            {logo ? (
              <div className="bg-white/20 p-2 rounded-lg inline-block">
                <img
                  src={logo}
                  alt="Logo"
                  className="max-h-20 max-w-40 object-contain "
                />
              </div>
            ) : (
              <div className="font-bold" style={{ fontSize: "2.2em" }}>
                Your Logo
              </div>
            )}
          </div>
          <div className="text-left sm:text-right">
            <h1 className="font-bold uppercase" style={{ fontSize: "2.8em" }}>
              Quotation
            </h1>
            <div className="mt-4 text-[1em]">
              <div className="flex justify-start sm:justify-end gap-2 items-center">
                <span className="font-semibold">Quote #</span>
                <EditableField
                  value={quoteNumber}
                  onChange={setQuoteNumber}
                  placeholder="QUOTE-001"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[0.9em]">
          <div>
            <h2 className="font-semibold uppercase mb-2">From</h2>
            <EditableField
              value={from}
              onChange={setFrom}
              area={true}
              placeholder="Your Company Info"
            />
          </div>
          <div>
            <h2 className="font-semibold uppercase mb-2">To</h2>
            <EditableField
              value={to}
              onChange={setTo}
              area={true}
              placeholder="Client's Info"
            />
          </div>
          <div>
            <h2 className="font-semibold uppercase mb-2">Details</h2>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Date:</span>
              <EditableField
                type="date"
                value={date}
                onChange={setDate}
                placeholder="Date"
              />
            </div>
            <div className="flex gap-2 mt-1 items-center">
              <span className="font-semibold">Valid Until:</span>
              <EditableField
                type="date"
                value={expiryDate}
                onChange={setExpiryDate}
                placeholder="Expiry Date"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 sm:p-10 md:p-12 relative z-10">
        <section>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="text-[0.9em] uppercase opacity-70">
                  <th className="py-3 pr-4 w-1/2">Item</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 pl-4 text-right">Total</th>
                  <th className="py-3 pl-2" data-html2canvas-ignore="true"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-200">
                    <td className="py-3 pr-4 text-[1em]">
                      <EditableField
                        value={item.name}
                        onChange={(v) => handleItemChange(index, "name", v)}
                        placeholder="Item Name"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-center">
                      <EditableField
                        type="number"
                        value={item.qty}
                        onChange={(v) => handleItemChange(index, "qty", v)}
                        placeholder="1"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-right">
                      <EditableField
                        type="number"
                        value={item.price}
                        onChange={(v) => handleItemChange(index, "price", v)}
                        placeholder="0.00"
                      />
                    </td>
                    <td className="py-3 pl-4 text-[1em] text-right">
                      {formatCurrency(item.qty * item.price)}
                    </td>
                    <td
                      className="py-3 pl-2 text-right"
                      data-html2canvas-ignore="true"
                    >
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addItem}
            className="mt-4 flex items-center gap-1 text-[0.9em] font-medium transition-colors"
            style={{ color: "var(--accent-color)" }}
            data-html2canvas-ignore="true"
          >
            <RiAddLine /> Add Item
          </button>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-[0.9em] font-semibold uppercase opacity-70">
              Terms & Conditions
            </h2>
            <div className="mt-2 text-[0.9em]">
              <EditableField
                value={termsConditions}
                onChange={setTermsConditions}
                area={true}
                placeholder="This quotation is valid for..."
              />
            </div>
          </div>
          <div className="space-y-2 text-[0.9em]">
            <div className="flex justify-between p-4 bg-slate-100 rounded-lg">
              <span className="text-slate-500">Subtotal:</span>
              <span className="font-medium text-slate-800">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between p-4 items-center">
              <span className="opacity-70">Tax (%):</span>
              <EditableField
                type="number"
                value={tax}
                onChange={setTax}
                placeholder="0"
              />
            </div>
            <div className="flex justify-between p-4 items-center">
              <span className="opacity-70">Discount (%):</span>
              <EditableField
                type="number"
                value={discount}
                onChange={setDiscount}
                placeholder="0"
              />
            </div>
            <div
              className="flex justify-between p-4 rounded-lg text-white"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              <span className="font-bold text-[1.2em]">Total:</span>
              <span className="font-bold text-[1.2em]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Template 3: Classic ---
function TemplateQuotationClassic({
  from,
  setFrom,
  to,
  setTo,
  quoteNumber,
  setQuoteNumber,
  date,
  setDate,
  expiryDate,
  setExpiryDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  termsConditions,
  setTermsConditions,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
}) {
  return (
    <div
      className="relative border-2 border-black h-full"
      style={{ fontSize: "1em" }}
    >
      <div className="p-8 sm:p-10 md:p-12 relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-start pb-8">
          <div className="text-left w-full sm:w-auto mb-6 sm:mb-0">
            <h1 className="font-bold uppercase" style={{ fontSize: "2.8em" }}>
              Quotation
            </h1>
            <div className="mt-4 text-[0.9em] whitespace-pre-wrap">
              <EditableField
                value={from}
                onChange={setFrom}
                area={true}
                placeholder="Your Company Info"
              />
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                className="max-h-24 max-w-48 object-contain sm:ml-auto"
              />
            ) : (
              <div className="text-[1.2em] font-bold opacity-70">
                [Your Logo]
              </div>
            )}
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8 border-b-2 border-black">
          <div>
            <h2 className="text-[0.9em] font-semibold uppercase opacity-70">
              PREPARED FOR
            </h2>
            <div className="mt-2 text-[1em] whitespace-pre-wrap">
              <EditableField
                value={to}
                onChange={setTo}
                area={true}
                placeholder="Client's Info"
              />
            </div>
          </div>
          <div className="text-left sm:text-right text-[0.9em] space-y-1 mt-6 sm:mt-0">
            <div className="flex justify-start sm:justify-end gap-2 items-center">
              <span className="font-semibold">Quote #:</span>
              <EditableField
                value={quoteNumber}
                onChange={setQuoteNumber}
                placeholder="QUOTE-001"
              />
            </div>
            <div className="flex justify-start sm:justify-end gap-2 items-center">
              <span className="font-semibold">Date:</span>
              <EditableField
                type="date"
                value={date}
                onChange={setDate}
                placeholder="Date"
              />
            </div>
            <div className="flex justify-start sm:justify-end gap-2 items-center">
              <span className="font-semibold">Valid Until:</span>
              <EditableField
                type="date"
                value={expiryDate}
                onChange={setExpiryDate}
                placeholder="Expiry Date"
              />
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="text-[0.9em] uppercase bg-slate-100">
                  <th className="py-3 px-4 w-1/2 font-bold border-b-2 border-black text-slate-900">
                    Item
                  </th>
                  <th className="py-3 px-4 text-center font-bold border-b-2 border-black text-slate-900">
                    Qty
                  </th>
                  <th className="py-3 px-4 text-right font-bold border-b-2 border-black text-slate-900">
                    Price
                  </th>
                  <th className="py-3 pl-4 text-right font-bold border-b-2 border-black text-slate-900">
                    Total
                  </th>
                  <th className="py-3 pl-2" data-html2canvas-ignore="true"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-300">
                    <td className="py-3 pr-4 text-[1em]">
                      <EditableField
                        value={item.name}
                        onChange={(v) => handleItemChange(index, "name", v)}
                        placeholder="Item Name"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-center">
                      <EditableField
                        type="number"
                        value={item.qty}
                        onChange={(v) => handleItemChange(index, "qty", v)}
                        placeholder="1"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-right">
                      <EditableField
                        type="number"
                        value={item.price}
                        onChange={(v) => handleItemChange(index, "price", v)}
                        placeholder="0.00"
                      />
                    </td>
                    <td className="py-3 pl-4 text-[1em] text-right">
                      {formatCurrency(item.qty * item.price)}
                    </td>
                    <td
                      className="py-3 pl-2 text-right"
                      data-html2canvas-ignore="true"
                    >
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addItem}
            className="mt-4 flex items-center gap-1 text-[0.9em] font-medium transition-colors text-blue-600 hover:text-blue-800"
            data-html2canvas-ignore="true"
          >
            <RiAddLine /> Add Item
          </button>
        </section>

        <section className="mt-8 flex flex-col-reverse sm:flex-row justify-between items-start gap-8">
          <div className="w-full sm:w-1/2">
            <h2 className="text-[0.9em] font-semibold uppercase opacity-70">
              Terms & Conditions
            </h2>
            <div className="mt-2 text-[0.9em]">
              <EditableField
                value={termsConditions}
                onChange={setTermsConditions}
                area={true}
                placeholder="This quotation is valid for..."
              />
            </div>
          </div>
          <div className="w-full sm:w-auto sm:max-w-xs ml-auto text-[0.9em] space-y-2">
            <div className="flex justify-between">
              <span className="opacity-70">Subtotal:</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Tax (%):</span>
              <EditableField
                type="number"
                value={tax}
                onChange={setTax}
                placeholder="0"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Discount (%):</span>
              <EditableField
                type="number"
                value={discount}
                onChange={setDiscount}
                placeholder="0"
              />
            </div>
            <div className="flex justify-between border-t-2 border-b-4 border-black my-2 py-2 text-[1.2em]">
              <span className="font-bold">Total:</span>
              <span className="font-bold">{formatCurrency(total)}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Template 4: Minimal ---
function TemplateQuotationMinimal({
  from,
  setFrom,
  to,
  setTo,
  quoteNumber,
  setQuoteNumber,
  date,
  setDate,
  expiryDate,
  setExpiryDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  termsConditions,
  setTermsConditions,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
}) {
  return (
    <div className="p-8 sm:p-10 md:p-12 relative" style={{ fontSize: "1em" }}>
      <div className="relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-start pb-8">
          <div className="mb-6 sm:mb-0">
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                className="max-h-16 max-w-40 object-contain"
              />
            ) : (
              <div className="font-semibold" style={{ fontSize: "1.8em" }}>
                <EditableField
                  value={from.split("\n")[0]}
                  onChange={(v) =>
                    setFrom(v + "\n" + from.split("\n").slice(1).join("\n"))
                  }
                  placeholder="Your Company"
                />
              </div>
            )}
          </div>
          <h1
            className="font-bold uppercase opacity-80"
            style={{ fontSize: "2.5em" }}
          >
            Quotation
          </h1>
        </header>

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-10 text-[0.9em]">
          <div>
            <h2 className="text-[0.9em] font-semibold uppercase opacity-60 mb-2">
              Prepared For
            </h2>
            <EditableField
              value={to}
              onChange={setTo}
              area={true}
              placeholder="Client's Info"
            />
          </div>
          <div>
            <h2 className="text-[0.9em] font-semibold uppercase opacity-60 mb-2">
              Prepared By
            </h2>
            <EditableField
              value={from}
              onChange={setFrom}
              area={true}
              placeholder="Your Company Info"
            />
          </div>
          <div>
            <h2 className="text-[0.9em] font-semibold uppercase opacity-60 mb-2">
              Details
            </h2>
            <div className="flex justify-between">
              <span>Quote #</span>
              <EditableField
                value={quoteNumber}
                onChange={setQuoteNumber}
                placeholder="001"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span>Date</span>
              <EditableField
                type="date"
                value={date}
                onChange={setDate}
                placeholder="Date"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span>Valid Until</span>
              <EditableField
                type="date"
                value={expiryDate}
                onChange={setExpiryDate}
                placeholder="Expiry"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="text-[0.9em] uppercase opacity-60 border-b border-slate-300">
                  <th className="py-3 pr-4 w-1/2 font-medium">Item</th>
                  <th className="py-3 px-4 text-center font-medium">Qty</th>
                  <th className="py-3 px-4 text-right font-medium">Price</th>
                  <th className="py-3 pl-4 text-right font-medium">Total</th>
                  <th className="py-3 pl-2" data-html2canvas-ignore="true"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-200">
                    <td className="py-3 pr-4 text-[1em]">
                      <EditableField
                        value={item.name}
                        onChange={(v) => handleItemChange(index, "name", v)}
                        placeholder="Item Name"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-center">
                      <EditableField
                        type="number"
                        value={item.qty}
                        onChange={(v) => handleItemChange(index, "qty", v)}
                        placeholder="1"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-right">
                      <EditableField
                        type="number"
                        value={item.price}
                        onChange={(v) => handleItemChange(index, "price", v)}
                        placeholder="0.00"
                      />
                    </td>
                    <td className="py-3 pl-4 text-[1em] text-right">
                      {formatCurrency(item.qty * item.price)}
                    </td>
                    <td
                      className="py-3 pl-2 text-right"
                      data-html2canvas-ignore="true"
                    >
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addItem}
            className="mt-4 flex items-center gap-1 text-[0.9em] font-medium transition-colors"
            style={{ color: "var(--accent-color)" }}
            data-html2canvas-ignore="true"
          >
            <RiAddLine /> Add Item
          </button>
        </section>

        <section className="mt-10 flex flex-col-reverse sm:flex-row justify-between items-start gap-8">
          <div className="w-full sm:w-1/2">
            <h2 className="text-[0.9em] font-semibold uppercase opacity-60 mb-2">
              Terms & Conditions
            </h2>
            <div className="mt-2 text-[0.9em]">
              <EditableField
                value={termsConditions}
                onChange={setTermsConditions}
                area={true}
                placeholder="This quotation is valid for..."
              />
            </div>
          </div>
          <div className="w-full sm:w-auto sm:max-w-xs ml-auto text-[0.9em] space-y-2">
            <div className="flex justify-between">
              <span className="opacity-70">Subtotal:</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Tax (%):</span>
              <EditableField
                type="number"
                value={tax}
                onChange={setTax}
                placeholder="0"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Discount (%):</span>
              <EditableField
                type="number"
                value={discount}
                onChange={setDiscount}
                placeholder="0"
              />
            </div>
            <div className="flex justify-between border-t border-slate-300 pt-2 mt-2 text-[1.2em]">
              <span className="font-semibold">Total:</span>
              <span
                className="font-semibold"
                style={{ color: "var(--accent-color)" }}
              >
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Template 5: Creative ---
function TemplateQuotationCreative({
  from,
  setFrom,
  to,
  setTo,
  quoteNumber,
  setQuoteNumber,
  date,
  setDate,
  expiryDate,
  setExpiryDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  termsConditions,
  setTermsConditions,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
}) {
  return (
    <div
      className="relative flex flex-col lg:flex-row h-full"
      style={{ fontSize: "1em" }}
    >
      {/* Sidebar */}
      <div
        className="w-full lg:w-1/3 p-8 sm:p-10 text-white"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        {logo ? (
          <img
            src={logo}
            alt="Logo"
            className="max-h-20 object-contain"
          />
        ) : (
          <div className="font-bold" style={{ fontSize: "2em" }}>
            <EditableField
              value={from.split("\n")[0]}
              onChange={(v) =>
                setFrom(v + "\n" + from.split("\n").slice(1).join("\n"))
              }
              placeholder="Your Company"
            />
          </div>
        )}
        <div className="mt-10">
          <h2 className="text-[0.9em] font-semibold uppercase opacity-70 mb-2">
            From
          </h2>
          <div className="text-[0.9em] whitespace-pre-wrap">
            <EditableField
              value={from}
              onChange={setFrom}
              area={true}
              placeholder="Your Company Info"
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-[0.9em] font-semibold uppercase opacity-70 mb-2">
            Prepared For
          </h2>
          <div className="text-[0.9em] whitespace-pre-wrap">
            <EditableField
              value={to}
              onChange={setTo}
              area={true}
              placeholder="Client's Info"
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-[0.9em] font-semibold uppercase opacity-70 mb-2">
            Terms
          </h2>
          <div className="text-[0.9em] whitespace-pre-wrap">
            <EditableField
              value={termsConditions}
              onChange={setTermsConditions}
              area={true}
              placeholder="This quote is valid for..."
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-2/3 p-8 sm:p-10 md:p-12 relative z-10">
        <header className="text-left sm:text-right mb-10">
          <h1 className="font-bold uppercase" style={{ fontSize: "3.5em" }}>
            Quotation
          </h1>
          <div className="mt-2 text-[1em] space-y-1 opacity-70">
            <div className="flex justify-start sm:justify-end gap-2 items-center">
              <span className="font-semibold">Quote #</span>
              <EditableField
                value={quoteNumber}
                onChange={setQuoteNumber}
                placeholder="QUOTE-001"
              />
            </div>
            <div className="flex justify-start sm:justify-end gap-2 items-center">
              <span className="font-semibold">Date:</span>
              <EditableField
                type="date"
                value={date}
                onChange={setDate}
                placeholder="Date"
              />
            </div>
            <div className="flex justify-start sm:justify-end gap-2 items-center">
              <span className="font-semibold">Valid Until:</span>
              <EditableField
                type="date"
                value={expiryDate}
                onChange={setExpiryDate}
                placeholder="Expiry Date"
              />
            </div>
          </div>
        </header>

        <section>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[0.9em] uppercase opacity-70 border-b-2 border-slate-300">
                  <th className="py-3 pr-4 w-[50%] font-semibold">Item</th>
                  <th className="py-3 px-4 w-[15%] text-center font-semibold">
                    Qty
                  </th>
                  <th className="py-3 px-4 w-[20%] text-right font-semibold">
                    Price
                  </th>
                  <th className="py-3 pl-4 w-[15%] text-right font-semibold">
                    Total
                  </th>
                  <th className="py-3 pl-2" data-html2canvas-ignore="true"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-200">
                    <td className="py-3 pr-4 text-[1em]">
                      <EditableField
                        value={item.name}
                        onChange={(v) => handleItemChange(index, "name", v)}
                        placeholder="Item Name"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-center">
                      <EditableField
                        type="number"
                        value={item.qty}
                        onChange={(v) => handleItemChange(index, "qty", v)}
                        placeholder="1"
                      />
                    </td>
                    <td className="py-3 px-4 text-[1em] text-right">
                      <EditableField
                        type="number"
                        value={item.price}
                        onChange={(v) => handleItemChange(index, "price", v)}
                        placeholder="0.00"
                      />
                    </td>
                    <td className="py-3 pl-4 text-[1em] text-right">
                      {formatCurrency(item.qty * item.price)}
                    </td>
                    <td
                      className="py-3 pl-2 text-right"
                      data-html2canvas-ignore="true"
                    >
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addItem}
            className="mt-4 flex items-center gap-1 text-[0.9em] font-medium transition-colors"
            style={{ color: "var(--accent-color)" }}
            data-html2canvas-ignore="true"
          >
            <RiAddLine /> Add Item
          </button>
        </section>

        <section className="mt-10 pt-6 border-t-2 border-slate-300">
          <div className="w-full max-w-xs ml-auto text-[0.9em] space-y-2">
            <div className="flex justify-between">
              <span className="opacity-70">Subtotal:</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Tax (%):</span>
              <EditableField
                type="number"
                value={tax}
                onChange={setTax}
                placeholder="0"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70">Discount (%):</span>
              <EditableField
                type="number"
                value={discount}
                onChange={setDiscount}
                placeholder="0"
              />
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t-2 border-black text-[1.5em]">
              <span className="font-bold">Total:</span>
              <span className="font-bold">{formatCurrency(total)}</span>
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
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-slate-900 dark:text-white"
                  >
                    Choose a Template
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <RiCloseLine className="h-5 w-5" />
                  </button>
                </div>

                <RadioGroup
                  value={selectedTemplate}
                  onChange={handleSelect}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a template
                  </RadioGroup.Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {templates.map((template) => (
                      <RadioGroup.Option
                        key={template.id}
                        value={template.id}
                        className={({ active, checked }) =>
                          `group relative flex cursor-pointer rounded-lg border-2 p-2 focus:outline-none transition-all
                          ${
                            checked
                              ? "border-blue-500 ring-2 ring-blue-500"
                              : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                          }
                          ${active ? "ring-2 ring-offset-2 ring-blue-400" : ""}`
                        }
                      >
                        {({ checked }) => (
                          <>
                            <div className="flex w-full flex-col items-center gap-2">
                              <div className="w-full h-36 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center text-slate-400 overflow-hidden relative">
                                <Image
                                  src={template.preview}
                                  alt={template.name}
                                  layout="fill"
                                  objectFit="cover"
                                  className="group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <RadioGroup.Label
                                as="span"
                                className="font-medium text-sm text-slate-800 dark:text-slate-200"
                              >
                                {template.name}
                              </RadioGroup.Label>
                              {checked && (
                                <div className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-blue-500 text-white">
                                  <RiCheckLine className="h-4 w-4" />
                                </div>
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
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
                    <RiErrorWarningLine
                      className="h-6 w-6 text-orange-600 dark:text-orange-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4 text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-slate-900 dark:text-white"
                    >
                      One-Page Limit Reached
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    This free tool is designed for single-page documents. To
                    keep your quotation clean and printable, you cannot add any
                    more items.
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={onClose}
                  >
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
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <RiInformationLine
                      className="h-6 w-6 text-blue-600 dark:text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4 text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-slate-900 dark:text-white"
                    >
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
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={onClose}
                  >
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

// --- NEW: Email Capture Modal Component ---
function EmailCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  onSkip,
  isSubscribing,
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-center">
                  <div className=" flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <RiMailSendLine
                      className="h-6 w-6 text-blue-600 dark:text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-4 text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-slate-900 dark:text-white"
                    >
                      One Last Step!
                    </Dialog.Title>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      To download your customized document, please enter your
                      email. We'll send you occasional product updates and
                      helpful tips.
                    </p>
                    <div className="mt-4">
                      <label htmlFor="modal-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="modal-email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-slate-400"
                    >
                      {isSubscribing ? (
                        <RiLoader4Line className="h-5 w-5 animate-spin" />
                      ) : (
                        "Subscribe & Download"
                      )}
                    </button>
                    {/* <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onSkip}
                      >
                        No thanks, just download
                      </button> */}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
