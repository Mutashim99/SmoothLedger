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
import { useSearchParams } from "next/navigation";


const TEMPLATE_DEFAULTS = {
  // --- 1. CONSTRUCTION & TRADES ---
  "general-contractors": {
    items: [
      { name: "Project Labor (Hours)", qty: 40, price: 65 },
      { name: "Construction Materials", qty: 1, price: 2500 },
    ],
    terms: "50% deposit required to commence work. Balance due upon completion.",
    tax: 0,
  },
  roofers: {
    items: [
      { name: "Shingle Removal (Sq Ft)", qty: 1500, price: 1.5 },
      { name: "New Shingle Installation (Sq Ft)", qty: 1500, price: 4.5 },
    ],
    terms: "Includes waste removal and site cleanup.",
    tax: 0,
  },
  painters: {
    items: [
      { name: "Interior Painting (Sq Ft)", qty: 800, price: 2.25 },
      { name: "Paint Supplies (Gallons)", qty: 10, price: 45 },
    ],
    terms: "Quote includes two coats of premium paint.",
    tax: 0,
  },
  plumbers: {
    items: [
      { name: "Bathroom Rough-in", qty: 1, price: 1200 },
      { name: "Fixture Installation", qty: 3, price: 150 },
    ],
    terms: "Valid for 14 days. Parts warranty included.",
    tax: 0,
  },
  electricians: {
    items: [
      { name: "Panel Upgrade (200 Amp)", qty: 1, price: 2200 },
      { name: "Outlet Wiring", qty: 10, price: 75 },
    ],
    terms: "Permit fees included in this estimate.",
    tax: 0,
  },
  "hvac-technicians": {
    items: [
      { name: "AC Unit Installation", qty: 1, price: 3500 },
      { name: "Ductwork Modification", qty: 1, price: 450 },
    ],
    terms: "10-year manufacturer warranty on parts.",
    tax: 0,
  },
  carpenters: {
    items: [
      { name: "Custom Cabinetry Build", qty: 1, price: 2800 },
      { name: "Installation Labor", qty: 12, price: 60 },
    ],
    terms: "Wood finish samples to be approved before start.",
    tax: 0,
  },
  "flooring-installers": {
    items: [
      { name: "Hardwood Installation (Sq Ft)", qty: 500, price: 4.5 },
      { name: "Underlayment", qty: 500, price: 0.75 },
    ],
    terms: "Subfloor preparation billed separately if needed.",
    tax: 0,
  },
  "deck-builders": {
    items: [
      { name: "Composite Decking (12x12)", qty: 1, price: 6500 },
      { name: "Railing System", qty: 1, price: 1200 },
    ],
    terms: "Includes concrete footings and framing.",
    tax: 0,
  },
  "fencing-contractors": {
    items: [
      { name: "Privacy Fence (Linear Ft)", qty: 100, price: 28 },
      { name: "Gate Installation", qty: 1, price: 350 },
    ],
    terms: "Property line survey is client responsibility.",
    tax: 0,
  },
  "concrete-contractors": {
    items: [
      { name: "Concrete Driveway (Sq Ft)", qty: 600, price: 8 },
      { name: "Site Grading", qty: 1, price: 500 },
    ],
    terms: "Curing time: 7 days before vehicle use.",
    tax: 0,
  },
  drywallers: {
    items: [
      { name: "Drywall Hang & Finish (Sheets)", qty: 50, price: 55 },
      { name: "Sanding & Cleanup", qty: 1, price: 300 },
    ],
    terms: "Ready for paint level 4 finish.",
    tax: 0,
  },
  "window-installers": {
    items: [
      { name: "Vinyl Window Replacement", qty: 5, price: 450 },
      { name: "Labor per Window", qty: 5, price: 150 },
    ],
    terms: "Includes removal and disposal of old windows.",
    tax: 0,
  },
  "siding-contractors": {
    items: [
      { name: "Vinyl Siding (Squares)", qty: 20, price: 350 },
      { name: "Trim Package", qty: 1, price: 1200 },
    ],
    terms: "Tyvek wrap installation included.",
    tax: 0,
  },
  "gutter-installers": {
    items: [
      { name: "Seamless Gutters (Ft)", qty: 150, price: 9 },
      { name: "Downspouts", qty: 4, price: 45 },
    ],
    terms: "Color matching to be verified on site.",
    tax: 0,
  },
  "insulation-contractors": {
    items: [
      { name: "Spray Foam Insulation (Bd Ft)", qty: 2000, price: 1.2 },
      { name: "Prep & Masking", qty: 1, price: 250 },
    ],
    terms: "Re-entry allowed after 24 hours.",
    tax: 0,
  },
  masons: {
    items: [
      { name: "Brick Repair (Hours)", qty: 8, price: 85 },
      { name: "Mortar & Materials", qty: 1, price: 150 },
    ],
    terms: "Matching existing brick color as close as possible.",
    tax: 0,
  },
  "solar-installers": {
    items: [
      { name: "Solar Panel System (6kW)", qty: 1, price: 14000 },
      { name: "Inverter Installation", qty: 1, price: 2000 },
    ],
    terms: "Estimate valid pending roof structural inspection.",
    tax: 0,
  },
  "pool-builders": {
    items: [
      { name: "Excavation", qty: 1, price: 3500 },
      { name: "Shell Installation", qty: 1, price: 25000 },
    ],
    terms: "Permits and fencing not included.",
    tax: 0,
  },
  "asphalt-paving": {
    items: [
      { name: "Asphalt Overlay (Sq Ft)", qty: 1000, price: 2.5 },
      { name: "Sealcoating", qty: 1, price: 400 },
    ],
    terms: "Weather permitting.",
    tax: 0,
  },
  "tile-installers": {
    items: [
      { name: "Bathroom Tile Install (Sq Ft)", qty: 120, price: 12 },
      { name: "Grout & Sealant", qty: 1, price: 150 },
    ],
    terms: "Tile to be provided by client.",
    tax: 0,
  },
  "demolition-experts": {
    items: [
      { name: "Structural Demolition", qty: 1, price: 4500 },
      { name: "Debris Haul Away", qty: 3, price: 400 },
    ],
    terms: "Hazardous material testing required before start.",
    tax: 0,
  },
  "kitchen-remodelers": {
    items: [
      { name: "Cabinet Installation", qty: 1, price: 3500 },
      { name: "Countertop Install", qty: 1, price: 2200 },
    ],
    terms: "Appliances not included in quote.",
    tax: 0,
  },
  "bathroom-remodelers": {
    items: [
      { name: "Demolition", qty: 1, price: 800 },
      { name: "Tile & Fixture Install", qty: 1, price: 4500 },
    ],
    terms: "Plumbing rough-in changes billed T&M.",
    tax: 0,
  },
  excavators: {
    items: [
      { name: "Site Grading (Day Rate)", qty: 2, price: 1200 },
      { name: "Equipment Fuel Surcharge", qty: 1, price: 150 },
    ],
    terms: "Utility marking required (811).",
    tax: 0,
  },

  // --- 2. INDUSTRIAL & MANUFACTURING ---
  manufacturers: {
    items: [
      { name: "Unit Production Run", qty: 1000, price: 4.5 },
      { name: "Mold Setup Fee", qty: 1, price: 1500 },
    ],
    terms: "50% upfront, 50% prior to shipping.",
    tax: 0,
  },
  machinists: {
    items: [
      { name: "CNC Machining (Hours)", qty: 10, price: 95 },
      { name: "Material Stock (Aluminum)", qty: 1, price: 300 },
    ],
    terms: "Tolerance +/- 0.005.",
    tax: 0,
  },
  welders: {
    items: [
      { name: "Custom Fabrication", qty: 1, price: 800 },
      { name: "Mobile Welding Service", qty: 1, price: 150 },
    ],
    terms: "On-site welding services.",
    tax: 0,
  },
  "3d-printing": {
    items: [
      { name: "Prototyping (PLA)", qty: 1, price: 120 },
      { name: "Post-Processing", qty: 1, price: 45 },
    ],
    terms: "Files provided by client.",
    tax: 0,
  },
  "injection-molding": {
    items: [
      { name: "Tooling/Mold Creation", qty: 1, price: 5000 },
      { name: "First Article Inspection", qty: 1, price: 250 },
    ],
    terms: "Lead time: 6-8 weeks.",
    tax: 0,
  },
  "pcb-assembly": {
    items: [
      { name: "PCB Fabrication", qty: 50, price: 12 },
      { name: "Component Assembly", qty: 50, price: 8 },
    ],
    terms: "Gerber files required.",
    tax: 0,
  },
  "packaging-design": {
    items: [
      { name: "Custom Box Design", qty: 500, price: 2.5 },
      { name: "Print Plate Setup", qty: 1, price: 150 },
    ],
    terms: "Proof approval required before print.",
    tax: 0,
  },
  "textile-manufacturing": {
    items: [
      { name: "Garment Production", qty: 200, price: 15 },
      { name: "Fabric Sourcing", qty: 1, price: 500 },
    ],
    terms: "Sample approval required.",
    tax: 0,
  },
  "civil-engineers": {
    items: [
      { name: "Site Analysis", qty: 1, price: 1500 },
      { name: "Structural Drawings", qty: 1, price: 2500 },
    ],
    terms: "Professional Engineering Services.",
    tax: 0,
  },
  architects: {
    items: [
      { name: "Design Development Phase", qty: 1, price: 4000 },
      { name: "Construction Documents", qty: 1, price: 3500 },
    ],
    terms: "Retainer required to start.",
    tax: 0,
  },

  // --- 3. LOGISTICS & TRANSPORT ---
  "logistics-providers": {
    items: [
      { name: "Freight Shipping (Pallet)", qty: 4, price: 220 },
      { name: "Fuel Surcharge", qty: 1, price: 85 },
    ],
    terms: "Standard LTL Service.",
    tax: 0,
  },
  "trucking-companies": {
    items: [
      { name: "Line Haul (Miles)", qty: 600, price: 2.8 },
      { name: "Driver Detention", qty: 1, price: 50 },
    ],
    terms: "Net 30 payment terms.",
    tax: 0,
  },
  "moving-companies": {
    items: [
      { name: "Local Move (3 Men + Truck)", qty: 6, price: 160 },
      { name: "Packing Materials", qty: 1, price: 200 },
    ],
    terms: "Travel time included in total hours.",
    tax: 0,
  },
  "office-movers": {
    items: [
      { name: "Commercial Relocation", qty: 1, price: 4500 },
      { name: "Cubicle Disassembly/Reassembly", qty: 20, price: 50 },
    ],
    terms: "After-hours service included.",
    tax: 0,
  },
  mechanics: {
    items: [
      { name: "Diagnostic Fee", qty: 1, price: 95 },
      { name: "Estimated Repairs (Parts & Labor)", qty: 1, price: 650 },
    ],
    terms: "Estimate valid for 30 days.",
    tax: 0,
  },
  "auto-body-shops": {
    items: [
      { name: "Bumper Repair & Paint", qty: 1, price: 850 },
      { name: "Shop Materials", qty: 1, price: 75 },
    ],
    terms: "Insurance deductible may apply.",
    tax: 0,
  },
  "car-detailers": {
    items: [
      { name: "Full Interior/Exterior Detail", qty: 1, price: 250 },
      { name: "Ceramic Coating Add-on", qty: 1, price: 400 },
    ],
    terms: "Vehicle must be empty of personal items.",
    tax: 0,
  },
  "vehicle-transport": {
    items: [
      { name: "Car Shipping (Open Carrier)", qty: 1, price: 950 },
      { name: "Door-to-Door Service", qty: 1, price: 100 },
    ],
    terms: "Pickup window: 1-3 days.",
    tax: 0,
  },
  couriers: {
    items: [
      { name: "Same Day Delivery", qty: 1, price: 45 },
      { name: "Mileage Fee", qty: 15, price: 1.5 },
    ],
    terms: "Signature required upon delivery.",
    tax: 0,
  },

  // --- 4. CREATIVE, DIGITAL & MARKETING ---
  freelancers: {
    items: [
      { name: "Project Milestone 1", qty: 1, price: 500 },
      { name: "Project Milestone 2", qty: 1, price: 500 },
    ],
    terms: "Deposit required to begin work.",
    tax: 0,
  },
  "web-developers": {
    items: [
      { name: "Website Development", qty: 1, price: 2500 },
      { name: "Hosting Setup & Migration", qty: 1, price: 250 },
    ],
    terms: "Includes 2 rounds of revisions.",
    tax: 0,
  },
  "seo-specialists": {
    items: [
      { name: "Technical SEO Audit", qty: 1, price: 750 },
      { name: "Monthly Content Strategy", qty: 1, price: 500 },
    ],
    terms: "Monthly retainer, 3-month minimum.",
    tax: 0,
  },
  "graphic-designers": {
    items: [
      { name: "Logo Design Package", qty: 1, price: 800 },
      { name: "Brand Guidelines PDF", qty: 1, price: 300 },
    ],
    terms: "Source files included upon final payment.",
    tax: 0,
  },
  "social-media-managers": {
    items: [
      { name: "Social Media Management (Month)", qty: 1, price: 1200 },
      { name: "Ad Spend Management", qty: 1, price: 300 },
    ],
    terms: "Ad budget billed directly to client card.",
    tax: 0,
  },
  "video-production": {
    items: [
      { name: "Filming Day Rate", qty: 2, price: 1500 },
      { name: "Post-Production Editing", qty: 1, price: 1200 },
    ],
    terms: "50% deposit to book dates.",
    tax: 0,
  },
  copywriters: {
    items: [
      { name: "Website Copy (5 Pages)", qty: 1, price: 1500 },
      { name: "Email Sequence", qty: 1, price: 450 },
    ],
    terms: "Includes proofreading and one revision.",
    tax: 0,
  },
  "marketing-agencies": {
    items: [
      { name: "Marketing Strategy Phase", qty: 1, price: 3000 },
      { name: "Campaign Setup", qty: 1, price: 1500 },
    ],
    terms: "Retainer agreement attached.",
    tax: 0,
  },
  "software-developers": {
    items: [
      { name: "MVP Development", qty: 1, price: 15000 },
      { name: "UI/UX Design Phase", qty: 1, price: 4000 },
    ],
    terms: "Agile development methodology.",
    tax: 0,
  },
  photographers: {
    items: [
      { name: "Full Day Wedding Coverage", qty: 1, price: 3200 },
      { name: "Second Shooter", qty: 1, price: 500 },
    ],
    terms: "Non-refundable retainer to save date.",
    tax: 0,
  },
  videographers: {
    items: [
      { name: "Event Highlight Reel", qty: 1, price: 1800 },
      { name: "Raw Footage Delivery", qty: 1, price: 300 },
    ],
    terms: "Music licensing included.",
    tax: 0,
  },
  animators: {
    items: [
      { name: "60s Explainer Video", qty: 1, price: 2500 },
      { name: "Voice Over", qty: 1, price: 300 },
    ],
    terms: "Storyboard approval required.",
    tax: 0,
  },
  "pr-agencies": {
    items: [
      { name: "Monthly PR Retainer", qty: 1, price: 2500 },
      { name: "Press Release Distribution", qty: 1, price: 500 },
    ],
    terms: "30-day cancellation notice.",
    tax: 0,
  },
  illustrators: {
    items: [
      { name: "Custom Illustration", qty: 1, price: 450 },
      { name: "Commercial Usage Rights", qty: 1, price: 250 },
    ],
    terms: "Sketch approval required.",
    tax: 0,
  },

  // --- 5. EVENTS & HOSPITALITY ---
  "event-planners": {
    items: [
      { name: "Event Coordination Fee", qty: 1, price: 2000 },
      { name: "Vendor Management", qty: 1, price: 800 },
    ],
    terms: "Expenses reimbursed at cost.",
    tax: 0,
  },
  "wedding-planners": {
    items: [
      { name: "Full Service Planning", qty: 1, price: 5000 },
      { name: "Day-of Coordination", qty: 1, price: 1500 },
    ],
    terms: "Payment schedule: 30% / 30% / 40%.",
    tax: 0,
  },
  caterers: {
    items: [
      { name: "Plated Dinner (Per Person)", qty: 100, price: 65 },
      { name: "Service Staff (Hours)", qty: 20, price: 35 },
    ],
    terms: "Final guest count due 14 days prior.",
    tax: 0,
  },
  florists: {
    items: [
      { name: "Bridal Bouquet", qty: 1, price: 185 },
      { name: "Table Centerpieces", qty: 12, price: 85 },
    ],
    terms: "Vase rental included (must be returned).",
    tax: 0,
  },
  djs: {
    items: [
      { name: "Wedding DJ Package (4 Hours)", qty: 1, price: 1200 },
      { name: "Ceremony Audio Setup", qty: 1, price: 250 },
    ],
    terms: "Meal required for DJ.",
    tax: 0,
  },
  "venue-rental": {
    items: [
      { name: "Saturday Venue Rental", qty: 1, price: 4500 },
      { name: "Cleaning Fee", qty: 1, price: 350 },
    ],
    terms: "Security deposit: $1000.",
    tax: 0,
  },
  bakers: {
    items: [
      { name: "3-Tier Wedding Cake", qty: 1, price: 650 },
      { name: "Delivery & Setup", qty: 1, price: 75 },
    ],
    terms: "Tasting fee credited to final bill.",
    tax: 0,
  },
  "equipment-rental": {
    items: [
      { name: "Chiavari Chairs", qty: 100, price: 8 },
      { name: "Banquet Tables", qty: 12, price: 15 },
    ],
    terms: "Damage waiver: 10%.",
    tax: 0,
  },
  bartenders: {
    items: [
      { name: "Bartending Service (Hours)", qty: 5, price: 50 },
      { name: "Portable Bar Setup", qty: 1, price: 150 },
    ],
    terms: "Alcohol purchased by client.",
    tax: 0,
  },
  "limo-services": {
    items: [
      { name: "Stretch Limo (Hours)", qty: 4, price: 125 },
      { name: "Gratuity (20%)", qty: 1, price: 100 },
    ],
    terms: "Overtime billed in 30min increments.",
    tax: 0,
  },
  "photo-booths": {
    items: [
      { name: "Photo Booth Rental (3 Hours)", qty: 1, price: 600 },
      { name: "Custom Print Layout", qty: 1, price: 50 },
    ],
    terms: "Unlimited prints included.",
    tax: 0,
  },
  "travel-agents": {
    items: [
      { name: "All-Inclusive Resort Package", qty: 2, price: 1800 },
      { name: "Flight Booking Fee", qty: 2, price: 35 },
    ],
    terms: "Prices subject to change until booked.",
    tax: 0,
  },

  // --- 6. PROFESSIONAL SERVICES ---
  consultants: {
    items: [
      { name: "Strategic Consultation (Hours)", qty: 10, price: 250 },
      { name: "Report Generation", qty: 1, price: 500 },
    ],
    terms: "Valid for 30 days.",
    tax: 0,
  },
  accountants: {
    items: [
      { name: "Corporate Tax Return", qty: 1, price: 1200 },
      { name: "Year-End Financial Statements", qty: 1, price: 800 },
    ],
    terms: "Engagement letter to follow.",
    tax: 0,
  },
  lawyers: {
    items: [
      { name: "Legal Retainer", qty: 1, price: 2500 },
      { name: "Drafting Contracts", qty: 1, price: 500 },
    ],
    terms: "Funds held in trust.",
    tax: 0,
  },
  "interior-designers": {
    items: [
      { name: "Design Concept Fee", qty: 1, price: 1500 },
      { name: "Furnishing Budget Estimate", qty: 1, price: 10000 },
    ],
    terms: "Furniture purchases billed separately.",
    tax: 0,
  },
  translators: {
    items: [
      { name: "Document Translation (Words)", qty: 3000, price: 0.12 },
      { name: "Proofreading", qty: 1, price: 100 },
    ],
    terms: "Certified translation.",
    tax: 0,
  },
  "insurance-agents": {
    items: [
      { name: "Annual Premium Estimate", qty: 1, price: 1200 },
      { name: "Processing Fee", qty: 1, price: 50 },
    ],
    terms: "Quote valid for 15 days.",
    tax: 0,
  },
  "security-services": {
    items: [
      { name: "Security Guard (Hours)", qty: 40, price: 35 },
      { name: "Patrol Vehicle Fee", qty: 5, price: 50 },
    ],
    terms: "Weekly billing cycle.",
    tax: 0,
  },
  "cleaning-services": {
    items: [
      { name: "Office Cleaning (Monthly)", qty: 1, price: 800 },
      { name: "Carpet Deep Clean", qty: 1, price: 250 },
    ],
    terms: "Cleaning supplies included.",
    tax: 0,
  },
  "janitorial-services": {
    items: [
      { name: "Commercial Maintenance (Month)", qty: 1, price: 2500 },
      { name: "Floor Waxing", qty: 1, price: 400 },
    ],
    terms: "12-month contract proposal.",
    tax: 0,
  },
  recruiters: {
    items: [{ name: "Placement Fee (15% of Salary)", qty: 1, price: 9000 }],
    terms: "Payment due 30 days after start date.",
    tax: 0,
  },
  "hr-consultants": {
    items: [
      { name: "Employee Handbook Creation", qty: 1, price: 1500 },
      { name: "HR Audit", qty: 1, price: 800 },
    ],
    terms: "Confidentiality agreement included.",
    tax: 0,
  },
  "grant-writers": {
    items: [
      { name: "Grant Proposal Writing", qty: 1, price: 2500 },
      { name: "Prospect Research", qty: 1, price: 500 },
    ],
    terms: "No guarantee of funding.",
    tax: 0,
  },
  "market-researchers": {
    items: [
      { name: "Consumer Survey", qty: 1, price: 3000 },
      { name: "Data Analysis Report", qty: 1, price: 1500 },
    ],
    terms: "Anonymized data delivery.",
    tax: 0,
  },

  // --- 7. PROPERTY & OUTDOOR ---
  landscapers: {
    items: [
      { name: "Sod Installation (Sq Ft)", qty: 1000, price: 1.5 },
      { name: "Grading & Prep", qty: 1, price: 400 },
    ],
    terms: "Watering is client responsibility.",
    tax: 0,
  },
  "tree-service": {
    items: [
      { name: "Tree Removal (Large)", qty: 1, price: 1200 },
      { name: "Stump Grinding", qty: 1, price: 150 },
    ],
    terms: "Debris removal included.",
    tax: 0,
  },
  "pest-control": {
    items: [
      { name: "Initial Treatment", qty: 1, price: 250 },
      { name: "Quarterly Service Plan", qty: 1, price: 125 },
    ],
    terms: "Safety data sheets available.",
    tax: 0,
  },
  "land-surveyors": {
    items: [
      { name: "Boundary Survey", qty: 1, price: 800 },
      { name: "Filing Fees", qty: 1, price: 50 },
    ],
    terms: "Access to property required.",
    tax: 0,
  },
  "property-managers": {
    items: [
      { name: "Monthly Management Fee", qty: 1, price: 150 },
      { name: "Leasing Fee (1st Month Rent)", qty: 1, price: 1200 },
    ],
    terms: "Maintenance deducted from rent.",
    tax: 0,
  },
  "pressure-washers": {
    items: [
      { name: "Driveway Cleaning", qty: 1, price: 150 },
      { name: "House Soft Wash", qty: 1, price: 350 },
    ],
    terms: "Access to water spigot required.",
    tax: 0,
  },
  "snow-removal": {
    items: [
      { name: "Seasonal Plowing Contract", qty: 1, price: 1200 },
      { name: "Salting Application", qty: 10, price: 50 },
    ],
    terms: "Trigger depth: 2 inches.",
    tax: 0,
  },

  // --- 8. DOCUMENT TYPES ---
  "proforma-invoice": {
    items: [
      { name: "Export Goods (Units)", qty: 1000, price: 12 },
      { name: "Shipping Crate", qty: 1, price: 250 },
    ],
    terms: "Proforma for Customs Purposes Only.",
    tax: 0,
  },
  "quotation-template": {
    items: [{ name: "Service Description", qty: 1, price: 500 }],
    terms: "Standard quotation terms apply.",
    tax: 0,
  },
  "bid-proposal": {
    items: [
      { name: "Phase 1: Mobilization", qty: 1, price: 5000 },
      { name: "Phase 2: Execution", qty: 1, price: 25000 },
    ],
    terms: "Bid valid for 90 days.",
    tax: 0,
  },
  "service-quote": {
    items: [{ name: "Professional Services", qty: 10, price: 100 }],
    terms: "Estimate based on hourly rate.",
    tax: 0,
  },
  "sales-quote": {
    items: [
      { name: "Product Model X", qty: 50, price: 20 },
      { name: "Volume Discount", qty: 1, price: -50 },
    ],
    terms: "FOB Shipping Point.",
    tax: 0,
  },
  "estimate-maker": {
    items: [
      { name: "Labor Estimate", qty: 8, price: 60 },
      { name: "Parts Estimate", qty: 1, price: 200 },
    ],
    terms: "Final price may vary by +/- 10%.",
    tax: 0,
  },
  "rfp-response": {
    items: [
      { name: "Solution Implementation", qty: 1, price: 10000 },
      { name: "Annual Licensing", qty: 1, price: 2000 },
    ],
    terms: "Response to RFP #12345.",
    tax: 0,
  },
  "tender-document": {
    items: [
      { name: "Procurement Item A", qty: 500, price: 100 },
      { name: "Procurement Item B", qty: 200, price: 150 },
    ],
    terms: "Subject to Tender Conditions.",
    tax: 0,
  },
  "grant-budget": {
    items: [
      { name: "Personnel Costs", qty: 1, price: 50000 },
      { name: "Equipment Costs", qty: 1, price: 15000 },
    ],
    terms: "Proposed Budget.",
    tax: 0,
  },
  "bill-of-quantities": {
    items: [
      { name: "Excavation (m3)", qty: 500, price: 15 },
      { name: "Concrete (m3)", qty: 200, price: 120 },
    ],
    terms: "Measured Works.",
    tax: 0,
  },
  "scope-of-work": {
    items: [
      { name: "Deliverable 1", qty: 1, price: 1000 },
      { name: "Deliverable 2", qty: 1, price: 1000 },
    ],
    terms: "Scope strictly limited to above items.",
    tax: 0,
  },

  // --- 9. GLOBAL LOCATIONS (Currency & Tax) ---
  uk: {
    items: [{ name: "Service Fee", qty: 1, price: 1000 }],
    terms: "VAT Reg No: GB123456789. Quote valid for 30 days.",
    currencyCode: "GBP",
    tax: 20, // VAT
  },
  usa: {
    items: [{ name: "Service Fee", qty: 1, price: 1000 }],
    terms: "Quote valid for 30 days.",
    currencyCode: "USD",
    tax: 8, // Estimated Sales Tax
  },
  canada: {
    items: [{ name: "Service Fee", qty: 1, price: 1000 }],
    terms: "GST/HST Registration No: 12345RT. Quote valid for 30 days.",
    currencyCode: "CAD",
    tax: 13, // HST
  },
  australia: {
    items: [{ name: "Service Fee", qty: 1, price: 1000 }],
    terms: "ABN: 12 345 678 901. Includes GST.",
    currencyCode: "AUD",
    tax: 10, // GST
  },
  india: {
    items: [{ name: "Service Fee", qty: 1, price: 10000 }],
    terms: "GSTIN: 27ABCDE1234F1Z5. Rates exclusive of GST.",
    currencyCode: "INR",
    tax: 18, // GST
  },
  uae: {
    items: [{ name: "Service Fee", qty: 1, price: 3500 }],
    terms: "TRN: 100200300. Prices include VAT.",
    currencyCode: "AED",
    tax: 5, // VAT
  },
  "south-africa": {
    items: [{ name: "Service Fee", qty: 1, price: 15000 }],
    terms: "VAT Reg: 4012345678. Quote valid for 30 days.",
    currencyCode: "ZAR",
    tax: 15, // VAT
  },
  philippines: {
    items: [{ name: "Service Fee", qty: 1, price: 50000 }],
    terms: "TIN: 123-456-789. VAT Inclusive.",
    currencyCode: "PHP",
    tax: 12, // VAT
  },
  nigeria: {
    items: [{ name: "Service Fee", qty: 1, price: 400000 }],
    terms: "TIN: 12345678-0001. VAT Exclusive.",
    currencyCode: "NGN",
    tax: 7.5, // VAT
  },
  germany: {
    items: [{ name: "Dienstleistung", qty: 1, price: 1000 }],
    terms: "Steuernummer: 123/456/789. Angebot gültig für 14 Tage.",
    currencyCode: "EUR",
    tax: 19, // MwSt
  },
  france: {
    items: [{ name: "Prestation de service", qty: 1, price: 1000 }],
    terms: "SIRET: 123 456 789. Devis valable 1 mois.",
    currencyCode: "EUR",
    tax: 20, // TVA
  },
  "saudi-arabia": {
    items: [{ name: "Service Fee", qty: 1, price: 3500 }],
    terms: "VAT Registration: 300012345600003. Quote valid for 30 days.",
    currencyCode: "SAR",
    tax: 15, // VAT
  },
  singapore: {
    items: [{ name: "Service Fee", qty: 1, price: 1500 }],
    terms: "UEN: 200112345Z. GST Registered.",
    currencyCode: "SGD",
    tax: 9, // GST
  },
  "new-zealand": {
    items: [{ name: "Service Fee", qty: 1, price: 1500 }],
    terms: "GST Number: 123-456-789. Quote valid for 30 days.",
    currencyCode: "NZD",
    tax: 15, // GST
  },
  ireland: {
    items: [{ name: "Service Fee", qty: 1, price: 1000 }],
    terms: "VAT No: IE 1234567T. Valid for 30 days.",
    currencyCode: "EUR",
    tax: 23, // VAT
  },
  malaysia: {
    items: [{ name: "Service Fee", qty: 1, price: 4000 }],
    terms: "SST Reg No: W10-1808-32000001. Valid for 30 days.",
    currencyCode: "MYR",
    tax: 6, // SST
  },
  kenya: {
    items: [{ name: "Service Fee", qty: 1, price: 100000 }],
    terms: "PIN: P051234567Z. VAT Exclusive.",
    currencyCode: "KES",
    tax: 16, // VAT
  },
  pakistan: {
    items: [{ name: "Service Fee", qty: 1, price: 250000 }],
    terms: "NTN: 1234567-8. STRN: 12-34-5678-901-23. Valid for 14 days.",
    currencyCode: "PKR",
    tax: 13, // GST (varies)
  },
  bangladesh: {
    items: [{ name: "Service Fee", qty: 1, price: 100000 }],
    terms: "BIN: 123456789. VAT Inclusive.",
    currencyCode: "BDT",
    tax: 15, // VAT
  },
  indonesia: {
    items: [{ name: "Jasa (Service)", qty: 1, price: 15000000 }],
    terms: "NPWP: 01.234.567.8-901.000. Harga termasuk PPN.",
    currencyCode: "IDR",
    tax: 11, // PPN
  },
  brazil: {
    items: [{ name: "Serviço", qty: 1, price: 5000 }],
    terms: "CNPJ: 12.345.678/0001-90. Orçamento válido por 15 dias.",
    currencyCode: "BRL",
    tax: 10, // ISS (varies)
  },
  mexico: {
    items: [{ name: "Servicio", qty: 1, price: 20000 }],
    terms: "RFC: ABC123456T1. Cotización válida por 15 días.",
    currencyCode: "MXN",
    tax: 16, // IVA
  },
  japan: {
    items: [{ name: "Service Fee", qty: 1, price: 150000 }],
    terms: "Reg No: T1234567890123. Quote valid for 30 days.",
    currencyCode: "JPY",
    tax: 10, // Consumption Tax
  },
  china: {
    items: [{ name: "Service Fee", qty: 1, price: 10000 }],
    terms: "Quote valid for 30 days.",
    currencyCode: "CNY",
    tax: 6, // VAT (varies)
  },
};
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
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");


  useEffect(() => {
    if (templateParam && TEMPLATE_DEFAULTS[templateParam]) {
      const defaults = TEMPLATE_DEFAULTS[templateParam];

      // 1. Update Items
      if (defaults.items) {
        const newItems = defaults.items.map((item) => ({
          id: Date.now() + Math.random(),
          name: item.name,
          qty: item.qty,
          price: item.price,
        }));
        setItems(newItems);
      }

      // 2. Update Terms & Conditions
      if (defaults.terms) {
        setTermsConditions(defaults.terms);
      }

      // 3. Update Tax Rate
      if (defaults.tax !== undefined) {
        setTax(defaults.tax);
      }

      // 4. Update Currency Code
      if (defaults.currencyCode) {
        setCurrencyCode(defaults.currencyCode);
      }
    }
  }, [templateParam]);
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
          <img src={logo} alt="Logo" className="max-h-20 object-contain" />
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
