"use client";

import React, { useState, useRef, Fragment, useMemo, useEffect } from "react";
import Image from "next/image";
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
  RiMailSendLine,
  RiLoader4Line,
  RiShipLine,
} from "react-icons/ri";
import { Dialog, Transition, RadioGroup, Switch } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSearchParams } from "next/navigation";

const TEMPLATE_DEFAULTS = {
  // --- 1. FREELANCE, DIGITAL & CREATIVE ---
  freelancers: {
    items: [
      { name: "Hourly Consultation", qty: 5, price: 60 },
      { name: "Project Milestone 1", qty: 1, price: 500 },
    ],
    note: "Thank you for your business!",
  },
  "upwork-freelancers": {
    items: [{ name: "Upwork Contract: Weekly Hours", qty: 40, price: 45 }],
    note: "Service invoice for off-platform agreement.",
  },
  "fiverr-sellers": {
    items: [
      { name: "Gig: Premium Package", qty: 1, price: 150 },
      { name: "Extra Fast Delivery", qty: 1, price: 30 },
    ],
    note: "Order completed successfully.",
  },
  "virtual-assistants": {
    items: [
      { name: "Admin Support (Hours)", qty: 20, price: 25 },
      { name: "Email Management", qty: 5, price: 25 },
    ],
    note: "Weekly VA services.",
  },
  "social-media-managers": {
    items: [
      { name: "Content Calendar Creation", qty: 1, price: 300 },
      { name: "Community Management", qty: 1, price: 500 },
    ],
    note: "Monthly Social Media Retainer.",
  },
  influencers: {
    items: [
      { name: "Sponsored Instagram Reel", qty: 1, price: 750 },
      { name: "Story Mention (24h)", qty: 3, price: 150 },
    ],
    note: "Brand partnership agreement.",
  },
  "ugc-creators": {
    items: [
      { name: "UGC Video (30s)", qty: 1, price: 250 },
      { name: "Raw Footage Rights", qty: 1, price: 100 },
    ],
    note: "Content usage rights included.",
  },
  copywriters: {
    items: [
      { name: "Blog Post (1500 words)", qty: 2, price: 250 },
      { name: "Email Sequence (5 Emails)", qty: 1, price: 400 },
    ],
    note: "Includes 2 rounds of revisions.",
  },
  ghostwriters: {
    items: [
      { name: "E-book Chapter 1-3", qty: 1, price: 1200 },
      { name: "Research Fee", qty: 1, price: 300 },
    ],
    note: "Confidentiality agreement applies.",
  },
  bloggers: {
    items: [
      { name: "Sponsored Blog Feature", qty: 1, price: 400 },
      { name: "Social Media share", qty: 1, price: 100 },
    ],
    note: "Post is live at [Link].",
  },
  youtubers: {
    items: [
      { name: "Dedicated Video Sponsorship", qty: 1, price: 2500 },
      { name: "Pre-roll Ad Read", qty: 1, price: 800 },
    ],
    note: "Net 30 payment terms.",
  },
  streamers: {
    items: [
      { name: "Stream Overlay Sponsorship", qty: 1, price: 600 },
      { name: "Chatbot Integration", qty: 1, price: 200 },
    ],
    note: "Twitch/Kick partnership.",
  },
  "voice-actors": {
    items: [
      { name: "Commercial Voice Over (30s)", qty: 1, price: 350 },
      { name: "Studio Fee", qty: 1, price: 100 },
    ],
    note: "Buyout rights included.",
  },
  translators: {
    items: [
      { name: "Translation (Per Word)", qty: 2500, price: 0.12 },
      { name: "Proofreading", qty: 2, price: 50 },
    ],
    note: "Certified translation service.",
  },
  illustrators: {
    items: [
      { name: "Custom Illustration", qty: 1, price: 450 },
      { name: "Vector Source File", qty: 1, price: 100 },
    ],
    note: "Artwork usage license attached.",
  },
  "fashion-designers": {
    items: [
      { name: "Custom Pattern Design", qty: 1, price: 300 },
      { name: "Sample Creation", qty: 1, price: 150 },
    ],
    note: "50% deposit paid.",
  },

  // --- 2. TECH, IT & DEVELOPMENT ---
  "web-developers": {
    items: [
      { name: "Frontend Development (Hours)", qty: 20, price: 75 },
      { name: "Hosting Setup", qty: 1, price: 100 },
    ],
    note: "Milestone: Beta Launch.",
  },
  "software-engineers": {
    items: [
      { name: "System Architecture Design", qty: 10, price: 120 },
      { name: "Code Review", qty: 5, price: 120 },
    ],
    note: "Consulting services.",
  },
  "mobile-app-developers": {
    items: [
      { name: "iOS App UI Implementation", qty: 40, price: 85 },
      { name: "App Store Deployment", qty: 1, price: 200 },
    ],
    note: "Sprint 3 Completion.",
  },
  "game-developers": {
    items: [
      { name: "Unity Asset Integration", qty: 15, price: 65 },
      { name: "Level Design", qty: 1, price: 500 },
    ],
    note: "Game prototype development.",
  },
  "devops-engineers": {
    items: [
      { name: "AWS Infrastructure Setup", qty: 1, price: 800 },
      { name: "CI/CD Pipeline Config", qty: 10, price: 95 },
    ],
    note: "Cloud infrastructure services.",
  },
  "qa-testers": {
    items: [
      { name: "Manual Testing (Hours)", qty: 10, price: 40 },
      { name: "Bug Report Generation", qty: 1, price: 100 },
    ],
    note: "QA cycle complete.",
  },
  "cybersecurity-consultants": {
    items: [
      { name: "Penetration Testing", qty: 1, price: 1500 },
      { name: "Security Audit Report", qty: 1, price: 500 },
    ],
    note: "Confidential security assessment.",
  },
  "data-analysts": {
    items: [
      { name: "Data Cleaning & Prep", qty: 5, price: 70 },
      { name: "PowerBI Dashboard Setup", qty: 1, price: 600 },
    ],
    note: "Data services rendered.",
  },
  "it-support": {
    items: [
      { name: "On-site Hardware Repair", qty: 2, price: 90 },
      { name: "Network Configuration", qty: 1, price: 150 },
    ],
    note: "Ticket #4092 closed.",
  },
  "seo-specialists": {
    items: [
      { name: "Technical SEO Audit", qty: 1, price: 500 },
      { name: "Keyword Research", qty: 1, price: 300 },
    ],
    note: "Monthly SEO Retainer.",
  },
  "ux-ui-designers": {
    items: [
      { name: "Figma Prototyping", qty: 15, price: 80 },
      { name: "User Research Session", qty: 2, price: 150 },
    ],
    note: "Design sprint deliverables.",
  },
  "graphic-designers": {
    items: [
      { name: "Brand Identity Pack", qty: 1, price: 1200 },
      { name: "Social Media Assets", qty: 5, price: 50 },
    ],
    note: "Includes 3 revision rounds.",
  },
  "video-editors": {
    items: [
      { name: "Video Editing (Day Rate)", qty: 2, price: 400 },
      { name: "Motion Graphics", qty: 1, price: 250 },
    ],
    note: "Project files delivery via cloud.",
  },
  animators: {
    items: [
      { name: "3D Character Rigging", qty: 1, price: 600 },
      { name: "Animation Seconds", qty: 15, price: 50 },
    ],
    note: "Animation draft v1.",
  },

  // --- 3. TRADES & HOME SERVICES ---
  contractors: {
    items: [
      { name: "Labor (Hours)", qty: 40, price: 55 },
      { name: "Construction Materials", qty: 1, price: 2500 },
    ],
    note: "Payment due upon phase completion.",
  },
  handyman: {
    items: [
      { name: "General Repairs (Hours)", qty: 2, price: 65 },
      { name: "Materials/Parts", qty: 1, price: 45 },
    ],
    note: "Payment due upon receipt.",
  },
  plumbers: {
    items: [
      { name: "Service Call", qty: 1, price: 95 },
      { name: "Pipe Repair Materials", qty: 1, price: 50 },
    ],
    note: "Thank you for choosing us.",
  },
  electricians: {
    items: [
      { name: "Outlet Installation", qty: 4, price: 45 },
      { name: "Service Panel Inspection", qty: 1, price: 150 },
    ],
    note: "Licensed electrical work.",
  },
  "hvac-technicians": {
    items: [
      { name: "AC Maintenance Tune-up", qty: 1, price: 129 },
      { name: "Filter Replacement", qty: 1, price: 30 },
    ],
    note: "Seasonal maintenance check.",
  },
  roofers: {
    items: [
      { name: "Roof Inspection", qty: 1, price: 150 },
      { name: "Shingle Repair", qty: 10, price: 25 },
    ],
    note: "Weatherproofing guarantee included.",
  },
  painters: {
    items: [
      { name: "Interior Painting (Sq Ft)", qty: 500, price: 2.5 },
      { name: "Paint & Supplies", qty: 1, price: 300 },
    ],
    note: "Includes primer and two coats.",
  },
  carpenters: {
    items: [
      { name: "Custom Cabinet Build", qty: 1, price: 1500 },
      { name: "Installation Labor", qty: 8, price: 60 },
    ],
    note: "Woodwork services.",
  },
  landscapers: {
    items: [
      { name: "Lawn Mowing & Edging", qty: 1, price: 65 },
      { name: "Mulch Installation (Yards)", qty: 3, price: 85 },
    ],
    note: "Weekly lawn maintenance.",
  },
  "tree-service": {
    items: [
      { name: "Tree Trimming", qty: 1, price: 350 },
      { name: "Debris Removal", qty: 1, price: 100 },
    ],
    note: "Safety inspection included.",
  },
  cleaners: {
    items: [
      { name: "Standard Home Clean", qty: 1, price: 140 },
      { name: "Deep Clean Add-on", qty: 1, price: 60 },
    ],
    note: "Thank you for letting us clean your home!",
  },
  "carpet-cleaners": {
    items: [
      { name: "3 Room Steam Clean", qty: 1, price: 150 },
      { name: "Stain Treatment", qty: 2, price: 25 },
    ],
    note: "Carpets will be dry in 4-6 hours.",
  },
  "pool-cleaners": {
    items: [
      { name: "Weekly Pool Service", qty: 1, price: 75 },
      { name: "Chemicals", qty: 1, price: 25 },
    ],
    note: "Ph balance checked and adjusted.",
  },
  "pest-control": {
    items: [
      { name: "Quarterly Pest Treatment", qty: 1, price: 125 },
      { name: "Termite Inspection", qty: 1, price: 95 },
    ],
    note: "Safe for pets and children.",
  },
  locksmiths: {
    items: [
      { name: "Emergency Lockout Service", qty: 1, price: 120 },
      { name: "New Lock Installation", qty: 1, price: 85 },
    ],
    note: "24/7 Emergency Service.",
  },
  movers: {
    items: [
      { name: "Moving Team (3 Men/Hour)", qty: 4, price: 150 },
      { name: "Truck Fee", qty: 1, price: 100 },
    ],
    note: "Travel time included.",
  },
  "window-washers": {
    items: [
      { name: "Exterior Window Cleaning", qty: 1, price: 150 },
      { name: "Screen Cleaning", qty: 10, price: 5 },
    ],
    note: "Streak-free guarantee.",
  },
  "flooring-installers": {
    items: [
      { name: "Hardwood Install (Sq Ft)", qty: 300, price: 4 },
      { name: "Baseboard Install", qty: 50, price: 2 },
    ],
    note: "Materials not included.",
  },
  drywallers: {
    items: [
      { name: "Drywall Installation (Sheets)", qty: 20, price: 40 },
      { name: "Taping & Mudding", qty: 1, price: 500 },
    ],
    note: "Ready for paint.",
  },
  masons: {
    items: [
      { name: "Brick Repair (Hours)", qty: 5, price: 80 },
      { name: "Mortar & Materials", qty: 1, price: 100 },
    ],
    note: "Masonry services.",
  },
  "solar-installers": {
    items: [
      { name: "Solar Panel System", qty: 1, price: 12000 },
      { name: "Installation Labor", qty: 1, price: 2500 },
    ],
    note: "Warranty documentation attached.",
  },

  // --- 4. AUTOMOTIVE & TRANSPORT ---
  mechanics: {
    items: [
      { name: "Brake Pad Replacement", qty: 1, price: 200 },
      { name: "Labor (Hours)", qty: 2, price: 90 },
    ],
    note: "Vehicle mileage: 45,000",
  },
  "auto-detailers": {
    items: [
      { name: "Full Detail Package", qty: 1, price: 180 },
      { name: "Ceramic Coating", qty: 1, price: 500 },
    ],
    note: "Vehicle ready for pickup.",
  },
  "truck-drivers": {
    items: [
      { name: "Freight Hauling (Miles)", qty: 600, price: 2.25 },
      { name: "Fuel Surcharge", qty: 1, price: 150 },
    ],
    note: "BOL #998877",
  },
  "towing-services": {
    items: [
      { name: "Hook-up Fee", qty: 1, price: 85 },
      { name: "Towing Miles", qty: 10, price: 5 },
    ],
    note: "Roadside assistance.",
  },
  "taxi-drivers": {
    items: [
      { name: "Taxi Fare", qty: 1, price: 45 },
      { name: "Airport Surcharge", qty: 1, price: 5 },
    ],
    note: "Passenger receipt.",
  },
  couriers: {
    items: [
      { name: "Express Delivery", qty: 1, price: 35 },
      { name: "Distance Fee", qty: 1, price: 15 },
    ],
    note: "Package delivered signed.",
  },
  "uber-drivers": {
    items: [
      { name: "Private Ride", qty: 1, price: 50 },
      { name: "Wait Time", qty: 1, price: 10 },
    ],
    note: "Private hire receipt.",
  },
  "boat-mechanics": {
    items: [
      { name: "Engine Winterization", qty: 1, price: 300 },
      { name: "Oil Change", qty: 1, price: 150 },
    ],
    note: "Marine service.",
  },

  // --- 5. RENTAL & LEASING ---
  landlords: {
    items: [
      { name: "Monthly Rent", qty: 1, price: 1500 },
      { name: "Utility Contribution", qty: 1, price: 75 },
    ],
    note: "Rent due on the 1st.",
  },
  "airbnb-hosts": {
    items: [
      { name: "Accommodation (Nights)", qty: 3, price: 120 },
      { name: "Cleaning Fee", qty: 1, price: 85 },
    ],
    note: "Enjoy your stay!",
  },
  "equipment-rental": {
    items: [
      { name: "Excavator Rental (Day)", qty: 2, price: 400 },
      { name: "Delivery/Pickup", qty: 1, price: 150 },
    ],
    note: "Damage waiver included.",
  },
  "car-rental": {
    items: [
      { name: "Vehicle Rental (Days)", qty: 5, price: 45 },
      { name: "Insurance Daily", qty: 5, price: 15 },
    ],
    note: "Full tank return required.",
  },
  "party-rental": {
    items: [
      { name: "Chair Rental", qty: 50, price: 3 },
      { name: "Tent Setup", qty: 1, price: 300 },
    ],
    note: "Event date: [Date]",
  },
  "venue-rental": {
    items: [
      { name: "Venue Booking Fee", qty: 1, price: 2000 },
      { name: "Security Deposit", qty: 1, price: 500 },
    ],
    note: "Balance due 30 days prior.",
  },
  "storage-units": {
    items: [
      { name: "Unit 104 Rent", qty: 1, price: 120 },
      { name: "Insurance", qty: 1, price: 10 },
    ],
    note: "Monthly storage fee.",
  },

  // --- 6. PROFESSIONAL & LEGAL ---
  consultants: {
    items: [
      { name: "Consulting Retainer", qty: 1, price: 2000 },
      { name: "Strategy Session", qty: 2, price: 250 },
    ],
    note: "Services for [Month].",
  },
  lawyers: {
    items: [
      { name: "Legal Services (Hours)", qty: 5, price: 350 },
      { name: "Filing Fees", qty: 1, price: 100 },
    ],
    note: "Matter: [Case Name]",
  },
  notaries: {
    items: [
      { name: "Notarization Fee", qty: 1, price: 15 },
      { name: "Travel Fee", qty: 1, price: 30 },
    ],
    note: "Official Notary Service.",
  },
  accountants: {
    items: [
      { name: "Tax Preparation", qty: 1, price: 400 },
      { name: "Bookkeeping (Month)", qty: 1, price: 250 },
    ],
    note: "FY 2025 Services.",
  },
  bookkeepers: {
    items: [
      { name: "Monthly Reconciliation", qty: 1, price: 300 },
      { name: "Payroll Processing", qty: 1, price: 150 },
    ],
    note: "Financial services.",
  },
  architects: {
    items: [
      { name: "Design Development Phase", qty: 1, price: 3500 },
      { name: "Blueprint Printing", qty: 1, price: 150 },
    ],
    note: "Project #8291.",
  },
  "interior-designers": {
    items: [
      { name: "Design Concept Fee", qty: 1, price: 1500 },
      { name: "Furniture Sourcing", qty: 10, price: 75 },
    ],
    note: "Decor services.",
  },
  recruiters: {
    items: [{ name: "Placement Fee", qty: 1, price: 5000 }],
    note: "Candidate: [Name]. Net 15.",
  },
  "real-estate-agents": {
    items: [
      { name: "Marketing Fee", qty: 1, price: 500 },
      { name: "Staging Consultation", qty: 1, price: 200 },
    ],
    note: "Property listing services.",
  },

  // --- 7. HEALTH, PETS & PERSONAL CARE ---
  "personal-trainers": {
    items: [
      { name: "Personal Training Session", qty: 5, price: 60 },
      { name: "Nutrition Plan", qty: 1, price: 100 },
    ],
    note: "Get fit package.",
  },
  therapists: {
    items: [{ name: "Therapy Session (50m)", qty: 1, price: 120 }],
    note: "Confidential healthcare service.",
  },
  "yoga-instructors": {
    items: [
      { name: "Private Yoga Class", qty: 1, price: 80 },
      { name: "Mat Rental", qty: 1, price: 5 },
    ],
    note: "Namaste.",
  },
  nutritionists: {
    items: [
      { name: "Initial Consultation", qty: 1, price: 150 },
      { name: "Meal Plan", qty: 1, price: 75 },
    ],
    note: "Dietary services.",
  },
  "makeup-artists": {
    items: [
      { name: "Bridal Makeup", qty: 1, price: 250 },
      { name: "Trial Session", qty: 1, price: 100 },
    ],
    note: "Wedding services.",
  },
  "hair-stylists": {
    items: [
      { name: "Cut & Color", qty: 1, price: 180 },
      { name: "Styling Product", qty: 1, price: 25 },
    ],
    note: "Salon services.",
  },
  "massage-therapists": {
    items: [{ name: "Deep Tissue Massage (60m)", qty: 1, price: 90 }],
    note: "Therapeutic bodywork.",
  },
  doctors: {
    items: [
      { name: "Medical Consultation", qty: 1, price: 200 },
      { name: "Procedure Fee", qty: 1, price: 150 },
    ],
    note: "Payment due at time of service.",
  },
  dentists: {
    items: [
      { name: "Dental Cleaning", qty: 1, price: 120 },
      { name: "X-Rays", qty: 1, price: 80 },
    ],
    note: "Dental services.",
  },
  chiropractors: {
    items: [{ name: "Spinal Adjustment", qty: 1, price: 65 }],
    note: "Wellness visit.",
  },
  veterinarians: {
    items: [
      { name: "Pet Exam", qty: 1, price: 75 },
      { name: "Vaccinations", qty: 1, price: 120 },
    ],
    note: "Patient: [Pet Name]",
  },
  "dog-walkers": {
    items: [{ name: "Dog Walking (30m)", qty: 5, price: 25 }],
    note: "Weekly package.",
  },
  "pet-sitters": {
    items: [{ name: "Overnight Pet Sitting", qty: 3, price: 60 }],
    note: "House sitting services.",
  },
  "pet-groomers": {
    items: [
      { name: "Full Groom", qty: 1, price: 85 },
      { name: "Nail Trim", qty: 1, price: 15 },
    ],
    note: "Spa day for your pet.",
  },
  childcare: {
    items: [{ name: "Babysitting (Hours)", qty: 5, price: 20 }],
    note: "Childcare services.",
  },

  // --- 8. EVENTS & FOOD ---
  "event-planners": {
    items: [
      { name: "Coordination Fee", qty: 1, price: 1200 },
      { name: "Day-of Management", qty: 1, price: 800 },
    ],
    note: "Event deposit.",
  },
  photographers: {
    items: [
      { name: "Wedding Photography Pkg", qty: 1, price: 2500 },
      { name: "Engagement Shoot", qty: 1, price: 300 },
    ],
    note: "Digital delivery.",
  },
  videographers: {
    items: [
      { name: "Event Filming (Hours)", qty: 8, price: 150 },
      { name: "Highlight Reel Edit", qty: 1, price: 500 },
    ],
    note: "Video production.",
  },
  caterers: {
    items: [
      { name: "Buffet per person", qty: 50, price: 35 },
      { name: "Service Staff", qty: 4, price: 150 },
    ],
    note: "Food & Beverage.",
  },
  "private-chefs": {
    items: [
      { name: "Dinner Party Service", qty: 1, price: 400 },
      { name: "Grocery Reimbursement", qty: 1, price: 150 },
    ],
    note: "Private dining.",
  },
  bakers: {
    items: [
      { name: "Custom Wedding Cake", qty: 1, price: 450 },
      { name: "Delivery & Setup", qty: 1, price: 50 },
    ],
    note: "Bakery order.",
  },
  djs: {
    items: [
      { name: "Wedding DJ Package", qty: 1, price: 1200 },
      { name: "Lighting Add-on", qty: 1, price: 200 },
    ],
    note: "Music services.",
  },
  musicians: {
    items: [{ name: "Live Performance (Hours)", qty: 3, price: 200 }],
    note: "Live music.",
  },
  florists: {
    items: [
      { name: "Bridal Bouquet", qty: 1, price: 150 },
      { name: "Table Centerpieces", qty: 10, price: 65 },
    ],
    note: "Floral arrangements.",
  },
  "wedding-officiants": {
    items: [
      { name: "Ceremony Officiating", qty: 1, price: 300 },
      { name: "Rehearsal", qty: 1, price: 100 },
    ],
    note: "Wedding services.",
  },

  // --- 9. EDUCATION ---
  tutors: {
    items: [{ name: "Math Tutoring (Hour)", qty: 4, price: 50 }],
    note: "Academic support.",
  },
  "music-teachers": {
    items: [{ name: "Piano Lesson (45m)", qty: 4, price: 45 }],
    note: "Monthly lessons.",
  },
  "driving-instructors": {
    items: [{ name: "Driving Lesson", qty: 5, price: 60 }],
    note: "Road test prep.",
  },
  "language-teachers": {
    items: [{ name: "Spanish Conversation", qty: 4, price: 40 }],
    note: "Language learning.",
  },
  "life-coaches": {
    items: [{ name: "Coaching Session", qty: 2, price: 150 }],
    note: "Mentorship.",
  },
  "sports-coaches": {
    items: [{ name: "Private Training", qty: 4, price: 75 }],
    note: "Athletic coaching.",
  },

  // --- 10. NICHE ---
  farmers: {
    items: [
      { name: "Organic Produce (Crate)", qty: 10, price: 25 },
      { name: "Delivery", qty: 1, price: 20 },
    ],
    note: "Farm fresh.",
  },
  fishermen: {
    items: [{ name: "Fresh Catch (lbs)", qty: 50, price: 12 }],
    note: "Seafood delivery.",
  },
  welders: {
    items: [
      { name: "Custom Fabrication", qty: 1, price: 400 },
      { name: "Materials", qty: 1, price: 120 },
    ],
    note: "Metalwork.",
  },
  machinists: {
    items: [
      { name: "CNC Machining (Hours)", qty: 5, price: 95 },
      { name: "Material Stock", qty: 1, price: 200 },
    ],
    note: "Precision parts.",
  },

  // --- 11. DOC TYPES (Generic) ---
  "invoice-template": {
    items: [{ name: "Service", qty: 1, price: 100 }],
    note: "Thank you.",
  },
  "proforma-invoice": {
    items: [{ name: "Export Goods", qty: 100, price: 10 }],
    note: "Proforma Invoice for Customs.",
  },
  "commercial-invoice": {
    items: [{ name: "Product X", qty: 500, price: 5 }],
    note: "Commercial Value for Customs.",
  },
  "vat-invoice": {
    items: [{ name: "Consulting", qty: 1, price: 1000 }],
    note: "VAT Inclusive.",
  },
  "receipt-maker": {
    items: [{ name: "Payment Received", qty: 1, price: 50 }],
    note: "Receipt.",
  },
  "rent-receipt": {
    items: [{ name: "Rent Payment", qty: 1, price: 1200 }],
    note: "Received with thanks.",
  },
  "quote-generator": {
    items: [{ name: "Estimated Project Cost", qty: 1, price: 2000 }],
    note: "Quote valid for 30 days.",
  },
  "credit-note": {
    items: [{ name: "Refund for returned goods", qty: 1, price: -50 }],
    note: "Credit applied to account.",
  },
  "retainer-invoice": {
    items: [{ name: "Monthly Retainer", qty: 1, price: 1000 }],
    note: "Pre-payment for services.",
  },

  // --- 12. INTERNATIONAL (Currency Defaults) ---
  uk: { currency: "GBP", note: "VAT Reg: GB 123 456 789" },
  usa: { currency: "USD", note: "Thank you for your business." },
  canada: { currency: "CAD", note: "GST/HST Registration: 12345 RT0001" },
  australia: { currency: "AUD", note: "Tax Invoice (ABN: 12 345 678 901)" },
  india: { currency: "INR", note: "GSTIN: 27ABCDE1234F1Z5" },
  uae: { currency: "AED", note: "Tax Invoice (TRN: 100200300)" },
  pakistan: { currency: "PKR", note: "NTN: 1234567-8" },
  germany: { currency: "EUR", note: "Steuernummer: 123/456/7890" },
  france: { currency: "EUR", note: "TVA: FR 12 3456 7890" },
  "south-africa": { currency: "ZAR", note: "Tax Invoice (VAT: 4012345678)" },
  nigeria: { currency: "NGN", note: "TIN: 12345678-0001" },
  brazil: { currency: "BRL", note: "Nota Fiscal de Serviços" },
  mexico: { currency: "MXN", note: "Factura Electrónica" },
  japan: { currency: "JPY", note: "Registration No. T1234567890123" },
  china: { currency: "CNY", note: "Fapiao / Invoice" },
  singapore: { currency: "SGD", note: "UEN: 200112345Z" },
  // --- MISSING DOC TYPES ---
  "blank-invoice": {
    items: [{ name: "Description", qty: 1, price: 0 }],
    note: "Add your details here.",
  },
  "gst-invoice": {
    items: [{ name: "Service (GST Applicable)", qty: 1, price: 1000 }],
    note: "GST Registration No: ________________",
  },
  "estimate-maker": {
    items: [
      { name: "Labor Estimate", qty: 10, price: 50 },
      { name: "Material Estimate", qty: 1, price: 200 },
    ],
    note: "This is an estimate, not a final invoice.",
  },
  "timesheet-invoice": {
    items: [
      { name: "Monday Hours", qty: 8, price: 40 },
      { name: "Tuesday Hours", qty: 8, price: 40 },
    ],
    note: "Weekly timesheet submission.",
  },
  "service-invoice": {
    items: [{ name: "Professional Service Fee", qty: 1, price: 150 }],
    note: "Payment due upon receipt of services.",
  },
  "sales-invoice": {
    items: [{ name: "Item SKU #12345", qty: 1, price: 99.99 }],
    note: "Thank you for your purchase.",
  },
  "simple-invoice": {
    items: [{ name: "Service Rendered", qty: 1, price: 100 }],
    note: "Thank you.",
  },
  "printable-invoice": {
    items: [{ name: "Service", qty: 1, price: 0 }],
    note: "Print-ready format.",
  },

  // --- FIX SAUDI ARABIA KEY ---
  // Change "saudiarabia" to:
  "saudi-arabia": {
    currency: "SAR",
    note: "VAT Registration: 300012345600003",
  },
  // --- 13. ECOMMERCE & RETAIL PRODUCTS ---
  "perfume-sellers": {
    items: [
      { name: "Eau de Parfum (50ml) - Midnight Rose", qty: 10, price: 45 },
      { name: "Sample Vial Set", qty: 5, price: 12 },
    ],
    note: "Fragile: Handle with care.",
  },
  "jewelry-sellers": {
    items: [
      { name: "14k Gold Necklace", qty: 1, price: 350 },
      { name: "Custom Engraving", qty: 1, price: 25 },
    ],
    note: "Authenticity certificate included.",
  },
  "electronics-sellers": {
    items: [
      { name: "Smartphone Model X (128GB)", qty: 1, price: 899 },
      { name: "Screen Protector Installation", qty: 1, price: 15 },
    ],
    note: "1-Year Warranty applied.",
  },
  "clothing-boutiques": {
    items: [
      { name: "Summer Dress (Size M)", qty: 2, price: 65 },
      { name: "Silk Scarf", qty: 1, price: 30 },
    ],
    note: "No returns on sale items.",
  },
  "furniture-stores": {
    items: [
      { name: "Modern Sofa (Grey)", qty: 1, price: 1200 },
      { name: "White Glove Delivery", qty: 1, price: 150 },
    ],
    note: "Delivery scheduled for [Date].",
  },
  "skincare-brands": {
    items: [
      { name: "Hydrating Serum (30ml)", qty: 1, price: 45 },
      { name: "Daily Moisturizer", qty: 1, price: 32 },
    ],
    note: "Cruelty-free products.",
  },
  "sneaker-resellers": {
    items: [
      { name: "Retro High OG (Size 10)", qty: 1, price: 450 },
      { name: "Sourcing Fee", qty: 1, price: 50 },
    ],
    note: "verified authentic.",
  },
  "auto-parts-sellers": {
    items: [
      { name: "Brake Caliper Kit (Front)", qty: 1, price: 120 },
      { name: "Synthetic Oil (5Q Jug)", qty: 2, price: 35 },
    ],
    note: "Part number: #99887766.",
  },
  "toy-stores": {
    items: [
      { name: "Building Block Set (500pc)", qty: 1, price: 60 },
      { name: "Action Figure Series 1", qty: 3, price: 15 },
    ],
    note: "Ages 3+ only.",
  },
  "handmade-sellers": {
    items: [
      { name: "Hand-knit Wool Blanket", qty: 1, price: 180 },
      { name: "Gift Wrapping", qty: 1, price: 10 },
    ],
    note: "Made with love.",
  },
  dropshippers: {
    items: [
      { name: "Product SKU #DS-101", qty: 1, price: 29.99 },
      { name: "International Shipping", qty: 1, price: 12.0 },
    ],
    note: "Order processing time: 2-3 days.",
  },
  wholesalers: {
    items: [
      { name: "Bulk Order: Unit A (Case of 24)", qty: 50, price: 120 },
      { name: "Pallet Shipping Fee", qty: 1, price: 350 },
    ],
    note: "Net 30 terms apply.",
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

// --- Invoice Generator Page ---
export default function InvoiceGeneratorClient() {
  // --- STATE MANAGEMENT ---

  // 1. Invoice Data
  const initialItem = { id: 1, name: "Item Name", qty: 1, price: 0 };
  const [from, setFrom] = useState(
    "Your Company\n123 Main St\nCity, State 12345"
  );
  const [to, setTo] = useState(
    "Client's Company\n456 Client Ave\nCity, State 67890"
  );
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([initialItem]);
  const [notes, setNotes] = useState(
    "Thank you for your business. Payment is due within 30 days."
  );
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [logo, setLogo] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [paidWatermarkOpacity, setPaidWatermarkOpacity] = useState(0.05); // NEW
  const [showShipping, setShowShipping] = useState(false); // NEW
  const [shipping, setShipping] = useState(0); // NEW

  // 2. Styling & Template State
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [textColor, setTextColor] = useState("#111827");
  const [fontFamily, setFontFamily] = useState("Inter, sans-serif");
  const [fontSize, setFontSize] = useState(14);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [watermark, setWatermark] = useState("");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.1); // NEW: Added state
  const [watermarkSize, setWatermarkSize] = useState(6); // NEW: Added state
  const [bgWatermark, setBgWatermark] = useState(null);
  const [bgWatermarkOpacity, setBgWatermarkOpacity] = useState(0.1);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [bgWatermarkSize, setBgWatermarkSize] = useState(100); // NEW

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
  const [savedInvoices, setSavedInvoices] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");

  // --- REFS ---
  const invoicePrintRef = useRef(null);
  const logoUploadRef = useRef(null);
  const bgWatermarkUploadRef = useRef(null);

  // --- 3. NEW: TEMPLATE INJECTION EFFECT ---
  // This runs when the URL changes (e.g. user arrives from /invoice-generator/uk)
  useEffect(() => {
    if (templateParam && TEMPLATE_DEFAULTS[templateParam]) {
      const defaults = TEMPLATE_DEFAULTS[templateParam];

      // Update Items (with unique IDs to avoid key errors)
      if (defaults.items) {
        const newItems = defaults.items.map((item) => ({
          ...item,
          id: Date.now() + Math.random(), // Unique ID
        }));
        setItems(newItems);
      }

      // Update Notes
      if (defaults.note) {
        setNotes(defaults.note);
      }

      // Update Currency (NEW)
      if (defaults.currency) {
        setCurrencyCode(defaults.currency);
      }
    }
  }, [templateParam]);
  // Load data from Local Storage on mount
  useEffect(() => {
    setIsTemplateModalOpen(true);

    try {
      const savedFrom = localStorage.getItem("smoothledger-mydetails");
      if (savedFrom) {
        setFrom(savedFrom);
        setSaveMyDetails(true);
      }
      const clients = localStorage.getItem("smoothledger-clients");
      if (clients) {
        setSavedClients(JSON.parse(clients));
      }
      const invoices = localStorage.getItem("smoothledger-invoices");
      if (invoices) {
        setSavedInvoices(JSON.parse(invoices));
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }, []);

  useEffect(() => {
    if (saveMyDetails) {
      try {
        localStorage.setItem("smoothledger-mydetails", from);
      } catch (error) {
        console.error("Error saving to local storage:", error);
      }
    }
  }, [from, saveMyDetails]);

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
  // UPDATED: Added shipping to total calculation
  const total = useMemo(
    () => subtotal + taxAmount - discountAmount + Number(shipping),
    [subtotal, taxAmount, discountAmount, shipping] // UPDATED: Added shipping dependency
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
  const setInvoiceNumberWrapper = (value) => {
    setInvoiceNumber(value);
    setIsDirty(true);
  };
  const setDateWrapper = (value) => {
    setDate(value);
    setIsDirty(true);
  };
  const setDueDateWrapper = (value) => {
    setDueDate(value);
    setIsDirty(true);
  };
  const setItemsWrapper = (value) => {
    setItems(value);
    setIsDirty(true);
  };
  const setNotesWrapper = (value) => {
    setNotes(value);
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
  const setIsPaidWrapper = (value) => {
    setIsPaid(value);
    setIsDirty(true);
  };
  const setPaidWatermarkOpacityWrapper = (value) => {
    setPaidWatermarkOpacity(value);
    setIsDirty(true);
  }; // NEW
  const setShowShippingWrapper = (value) => {
    setShowShipping(value);
    setIsDirty(true);
  }; // NEW
  const setShippingWrapper = (value) => {
    setShipping(value);
    setIsDirty(true);
  }; // NEW
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
  // NEW: Added wrappers
  const setWatermarkOpacityWrapper = (value) => {
    setWatermarkOpacity(value);
    setIsDirty(true);
  };
  const setWatermarkSizeWrapper = (value) => {
    setWatermarkSize(value);
    setIsDirty(true);
  };
  const setBgWatermarkWrapper = (value) => {
    setBgWatermark(value);
    setIsDirty(true);
  };
  const setBgWatermarkSizeWrapper = (value) => {
    setBgWatermarkSize(value);
    setIsDirty(true);
  }; // NEW

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

  const handleSaveMyDetailsToggle = (isOn) => {
    setSaveMyDetails(isOn);
    if (!isOn) {
      localStorage.removeItem("smoothledger-mydetails");
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

  const handleSaveInvoice = () => {
    if (!invoiceNumber || !invoiceNumber.trim()) {
      setNotification({
        show: true,
        message: "Please enter an Invoice Number to save.",
      });
      return;
    }

    const clientName = to.split("\n")[0] || "No Client";
    const invoiceData = {
      id: invoiceNumber,
      clientName: clientName,
      from,
      to,
      invoiceNumber,
      date,
      dueDate,
      items,
      notes,
      tax,
      discount,
      isPaid,
      accentColor,
      textColor,
      fontFamily,
      fontSize,
      currencyCode,
      // NEW: Save new fields
      shipping,
      showShipping,
      paidWatermarkOpacity,
      bgWatermarkSize,
    };

    const newSavedInvoices = [...savedInvoices];
    const existingIndex = newSavedInvoices.findIndex(
      (inv) => inv.id === invoiceNumber
    );

    let message = "";
    if (existingIndex !== -1) {
      newSavedInvoices[existingIndex] = invoiceData;
      message = `Invoice ${invoiceData.id} updated!`;
    } else {
      newSavedInvoices.push(invoiceData);
      message = `Invoice ${invoiceData.id} saved!`;
    }

    try {
      setSavedInvoices(newSavedInvoices);
      localStorage.setItem(
        "smoothledger-invoices",
        JSON.stringify(newSavedInvoices)
      );
      setSelectedInvoiceId(invoiceData.id);
      setNotification({ show: true, message });
    } catch (error) {
      console.error("Error saving invoice:", error);
      setNotification({
        show: true,
        message: "Error saving. Storage might be full.",
      });
    }
  };

  const handleLoadInvoice = (e) => {
    const invoiceId = e.target.value;
    setSelectedInvoiceId(invoiceId);
    if (!invoiceId) return;
    const invoiceToLoad = savedInvoices.find((inv) => inv.id === invoiceId);
    if (invoiceToLoad) {
      setFrom(invoiceToLoad.from);
      setTo(invoiceToLoad.to);
      setInvoiceNumber(invoiceToLoad.invoiceNumber);
      setDate(invoiceToLoad.date);
      setDueDate(invoiceToLoad.dueDate);
      setItems(invoiceToLoad.items);
      setNotes(invoiceToLoad.notes);
      setTax(invoiceToLoad.tax);
      setDiscount(invoiceToLoad.discount);
      setIsPaid(invoiceToLoad.isPaid);
      setAccentColor(invoiceToLoad.accentColor);
      setTextColor(invoiceToLoad.textColor);
      setFontFamily(invoiceToLoad.fontFamily);
      setFontSize(invoiceToLoad.fontSize);
      setCurrencyCode(invoiceToLoad.currencyCode);
      // NEW: Load new fields, with fallbacks for older saves
      setShipping(invoiceToLoad.shipping || 0);
      setShowShipping(invoiceToLoad.showShipping || false);
      setPaidWatermarkOpacity(invoiceToLoad.paidWatermarkOpacity || 0.05);
      setBgWatermarkSize(invoiceToLoad.bgWatermarkSize || 100);
    }
  };

  const handleDeleteInvoice = () => {
    if (!selectedInvoiceId) {
      setNotification({
        show: true,
        message: "Please select an invoice to delete.",
      });
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete invoice ${selectedInvoiceId}? This cannot be undone.`
      )
    ) {
      return;
    }

    const newSavedInvoices = savedInvoices.filter(
      (inv) => inv.id !== selectedInvoiceId
    );

    try {
      setSavedInvoices(newSavedInvoices);
      localStorage.setItem(
        "smoothledger-invoices",
        JSON.stringify(newSavedInvoices)
      );
      setSelectedInvoiceId("");
      setNotification({
        show: true,
        message: `Invoice ${selectedInvoiceId} deleted.`,
      });
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  // --- PDF Download Logic (UPDATED FOR MOBILE PRINT FIX) ---
  const startDownload = async () => {
    setIsDownloading(true);
    const element = invoicePrintRef.current;
    if (!element) {
      setIsDownloading(false);
      return;
    }

    // 1. Store Original styles
    const originalWidth = element.style.width;
    const originalAspectRatio = element.style.aspectRatio;

    // 2. Force Desktop Width (A4 Size approx in px)
    // This ensures html2canvas sees a "Desktop" layout even on mobile
    element.style.width = "794px";
    element.style.aspectRatio = "210/297"; // Force A4 ratio

    const scale = 2;
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: 1200, // Force 'lg' breakpoints to trigger
    });

    // 3. Restore Original styles
    element.style.width = originalWidth;
    element.style.aspectRatio = originalAspectRatio;

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
    pdf.save(`SmoothLedger-Invoice-${invoiceNumber}.pdf`);
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

  const renderInvoiceTemplate = () => {
    const commonProps = {
      from,
      setFrom: setFromWrapper,
      to,
      setTo: setToWrapper,
      invoiceNumber,
      setInvoiceNumber: setInvoiceNumberWrapper,
      date,
      setDate: setDateWrapper,
      dueDate,
      setDueDate: setDueDateWrapper,
      items,
      handleItemChange,
      removeItem,
      addItem,
      notes,
      setNotes: setNotesWrapper,
      tax,
      setTax: setTaxWrapper,
      discount,
      setDiscount: setDiscountWrapper,
      subtotal,
      total,
      logo,
      formatCurrency,
      shipping, // NEW
      showShipping, // NEW
      paidWatermarkOpacity, // NEW
    };

    switch (selectedTemplate) {
      case "classic":
        return <TemplateInvoiceClassic {...commonProps} />;
      case "bold":
        return <TemplateInvoiceBold {...commonProps} />;
      case "minimal":
        return <TemplateInvoiceMinimal {...commonProps} />;
      case "creative":
        return <TemplateInvoiceCreative {...commonProps} />;
      case "modern":
      default:
        return <TemplateInvoiceModern {...commonProps} />;
    }
  };

  // --- RENDER ---
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-900">
        {/* --- 1. Controls Panel (Sidebar) --- */}
        <aside className="w-full lg:w-80 xl:w-96 bg-white dark:bg-slate-950 p-6 border-r border-slate-200 dark:border-slate-800 space-y-8 overflow-y-auto lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Invoice Studio
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

          {/* UPDATED: Re-ordered sections */}
          <div className="space-y-6">
            {/* NEW: Document Details */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiDraftLine className="inline mr-2" />
                Document Details
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
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Mark as Paid
                  </span>
                  <Switch
                    checked={isPaid}
                    onChange={setIsPaidWrapper}
                    className={`${
                      isPaid ? "bg-green-500" : "bg-slate-300 dark:bg-slate-700"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span className="sr-only">Mark as Paid</span>
                    <span
                      className={`${
                        isPaid ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
                {isPaid && (
                  <div className="space-y-2">
                    <label
                      htmlFor="paidOpacity"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Paid Stamp Opacity:{" "}
                      {Math.round(paidWatermarkOpacity * 100)}%
                    </label>
                    <input
                      type="range"
                      id="paidOpacity"
                      min="0.05"
                      max="0.5"
                      step="0.01"
                      value={paidWatermarkOpacity}
                      onChange={(e) =>
                        setPaidWatermarkOpacityWrapper(
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Add Shipping
                  </span>
                  <Switch
                    checked={showShipping}
                    onChange={setShowShippingWrapper}
                    className={`${
                      showShipping
                        ? "bg-blue-600"
                        : "bg-slate-300 dark:bg-slate-700"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span className="sr-only">Add Shipping</span>
                    <span
                      className={`${
                        showShipping ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
                {showShipping && (
                  <div className="space-y-2">
                    <label
                      htmlFor="shipping"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Shipping Cost
                    </label>
                    <input
                      type="number"
                      id="shipping"
                      value={shipping}
                      onChange={(e) =>
                        setShippingWrapper(parseFloat(e.target.value) || 0)
                      }
                      className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
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
                {/* --- ADDED THIS BLOCK --- */}
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
                {/* --- END OF ADDED BLOCK --- */}
              </div>
            </div>

            {/* NEW: Branding Section */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <RiImageAddLine className="inline mr-2" />
                Branding
              </h3>
              <div className="mt-4 space-y-4">
                {/* Logo Uploader */}
                <div className="space-y-2">
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
                {/* BG Watermark Uploader */}
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
                        Opacity: {Math.round(bgWatermarkOpacity * 100)}%
                      </label>
                      <input
                        type="range"
                        id="bgOpacity"
                        min="0.05"
                        max="0.5"
                        step="0.01"
                        value={bgWatermarkOpacity}
                        onChange={(e) => {
                          setBgWatermarkOpacity(parseFloat(e.target.value));
                          setIsDirty(true);
                        }}
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

            {/* Save & Load */}
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
                  onClick={handleSaveInvoice}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
                >
                  <RiSave3Line className="h-5 w-5" /> Save Current Invoice
                </button>
                <div className="space-y-2">
                  <label
                    htmlFor="load-invoice"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Load Invoice
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="load-invoice"
                      value={selectedInvoiceId}
                      onChange={handleLoadInvoice}
                      className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Load a saved invoice...</option>
                      {savedInvoices.map((inv) => (
                        <option key={inv.id} value={inv.id}>
                          {inv.id} - {inv.clientName}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleDeleteInvoice}
                      title="Delete Selected Invoice"
                      className="p-2 bg-red-100 dark:bg-red-900/50 rounded-md hover:bg-red-200 dark:hover:bg-red-900"
                      disabled={!selectedInvoiceId}
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
          <div className="w-full max-w-4xl mx-auto">
            {/* UPDATED: This div now controls the responsive aspect ratio */}
            <div
              ref={invoicePrintRef}
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
              {isPaid && (
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <span
                    className="text-[8vw] sm:text-[120px] font-bold rotate-[-30deg]"
                    style={{
                      color: `rgba(0, 128, 0, ${paidWatermarkOpacity})`,
                    }} // UPDATED
                  >
                    PAID
                  </span>
                </div>
              )}
              {/* --- UPDATED THIS BLOCK --- */}
              {watermark && !isPaid && (
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
              {/* --- END OF UPDATE --- */}

              {renderInvoiceTemplate()}
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
        onSkip={startDownload}
      />
    </>
  );
}

// --- TEMPLATE COMPONENTS (Responsiveness Added) ---

// --- Template 1: Modern ---
function TemplateInvoiceModern({
  from,
  setFrom,
  to,
  setTo,
  invoiceNumber,
  setInvoiceNumber,
  date,
  setDate,
  dueDate,
  setDueDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  notes,
  setNotes,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
  shipping,
  showShipping, // NEW
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
              Invoice
            </h1>
            <div className="mt-4 text-[1em] space-y-1">
              <div className="flex justify-start sm:justify-end gap-2 items-center">
                <span className="font-semibold">Invoice #</span>
                <EditableField
                  value={invoiceNumber}
                  onChange={setInvoiceNumber}
                  placeholder="INV-001"
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
                <span className="font-semibold">Due Date:</span>
                <EditableField
                  type="date"
                  value={dueDate}
                  onChange={setDueDate}
                  placeholder="Due Date"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-[0.9em] font-semibold uppercase opacity-70">
            Bill To
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
            {/* UPDATED: removed min-w-[600px] */}
            <table className="w-full text-left">
              <thead>
                <tr
                  className="text-[0.9em] uppercase opacity-70"
                  style={{ borderBottom: "2px solid var(--accent-color)" }}
                >
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
            {/* NEW: Added Shipping row */}
            {showShipping && (
              <div className="flex justify-between">
                <span className="opacity-70">Shipping:</span>
                <span className="font-medium">{formatCurrency(shipping)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-2 text-[1.2em]">
              <span className="opacity-70">Total:</span>
              <span className="font-bold">{formatCurrency(total)}</span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-[0.9em] font-semibold uppercase opacity-70">
            Notes
          </h2>
          <div className="mt-2 text-[0.9em]">
            <EditableField
              value={notes}
              onChange={setNotes}
              area={true}
              placeholder="Thank you for your business."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function TemplateInvoiceBold({
  from,
  setFrom,
  to,
  setTo,
  invoiceNumber,
  setInvoiceNumber,
  date,
  setDate,
  dueDate,
  setDueDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  notes,
  setNotes,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
  shipping,
  showShipping, // NEW
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
                  className="max-h-20 max-w-40 object-contain"
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
              Invoice
            </h1>
            <div className="mt-4 text-[1em]">
              <div className="flex justify-start sm:justify-end gap-2 items-center">
                <span className="font-semibold">Invoice #</span>
                <EditableField
                  value={invoiceNumber}
                  onChange={setInvoiceNumber}
                  placeholder="INV-001"
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
              <span className="font-semibold">Due:</span>
              <EditableField
                type="date"
                value={dueDate}
                onChange={setDueDate}
                placeholder="Due Date"
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
              Notes
            </h2>
            <div className="mt-2 text-[0.9em]">
              <EditableField
                value={notes}
                onChange={setNotes}
                area={true}
                placeholder="Thank you for your business."
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
            {/* NEW: Added Shipping row */}
            {showShipping && (
              <div className="flex justify-between p-4 items-center">
                <span className="opacity-70">Shipping:</span>
                <span className="font-medium">{formatCurrency(shipping)}</span>
              </div>
            )}
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

function TemplateInvoiceClassic({
  from,
  setFrom,
  to,
  setTo,
  invoiceNumber,
  setInvoiceNumber,
  date,
  setDate,
  dueDate,
  setDueDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  notes,
  setNotes,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
  shipping,
  showShipping, // NEW
}) {
  return (
    <div className="relative p-2 h-full" style={{ fontSize: "1em" }}>
      <div className="border-2 border-black">
        <div className="p-8 sm:p-10 md:p-12 relative z-10">
          <header className="flex flex-col sm:flex-row justify-between items-start pb-8">
            <div className="text-left w-full sm:w-auto mb-6 sm:mb-0">
              <h1 className="font-bold uppercase" style={{ fontSize: "2.8em" }}>
                INVOICE
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
                BILL TO
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
                <span className="font-semibold">Invoice #:</span>
                <EditableField
                  value={invoiceNumber}
                  onChange={setInvoiceNumber}
                  placeholder="INV-001"
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
                <span className="font-semibold">Due Date:</span>
                <EditableField
                  type="date"
                  value={dueDate}
                  onChange={setDueDate}
                  placeholder="Due Date"
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
                    <th
                      className="py-3 pl-2"
                      data-html2canvas-ignore="true"
                    ></th>
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
              {/* NEW: Added Shipping row */}
              {showShipping && (
                <div className="flex justify-between">
                  <span className="opacity-70">Shipping:</span>
                  <span className="font-medium">
                    {formatCurrency(shipping)}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t-2 border-b-4 border-black my-2 py-2 text-[1.2em]">
                <span className="font-bold">Total:</span>
                <span className="font-bold">{formatCurrency(total)}</span>
              </div>
            </div>
          </section>
          <section className="mt-10">
            <h2 className="text-[0.9em] font-semibold uppercase opacity-70">
              Notes
            </h2>
            <div className="mt-2 text-[0.9em]">
              <EditableField
                value={notes}
                onChange={setNotes}
                area={true}
                placeholder="Thank you for your business."
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function TemplateInvoiceMinimal({
  from,
  setFrom,
  to,
  setTo,
  invoiceNumber,
  setInvoiceNumber,
  date,
  setDate,
  dueDate,
  setDueDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  notes,
  setNotes,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
  shipping,
  showShipping, // NEW
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
            Invoice
          </h1>
        </header>
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-10 text-[0.9em]">
          <div>
            <h2 className="text-[0.9em] font-semibold uppercase opacity-60 mb-2">
              Billed To
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
              From
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
              <span>Invoice #</span>
              <EditableField
                value={invoiceNumber}
                onChange={setInvoiceNumber}
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
              <span>Due Date</span>
              <EditableField
                type="date"
                value={dueDate}
                onChange={setDueDate}
                placeholder="Due"
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
              Notes
            </h2>
            <div className="mt-2 text-[0.9em]">
              <EditableField
                value={notes}
                onChange={setNotes}
                area={true}
                placeholder="Thank you for your business."
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
            {/* NEW: Added Shipping row */}
            {showShipping && (
              <div className="flex justify-between">
                <span className="opacity-70">Shipping:</span>
                <span className="font-medium">{formatCurrency(shipping)}</span>
              </div>
            )}
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

function TemplateInvoiceCreative({
  from,
  setFrom,
  to,
  setTo,
  invoiceNumber,
  setInvoiceNumber,
  date,
  setDate,
  dueDate,
  setDueDate,
  items,
  handleItemChange,
  removeItem,
  addItem,
  notes,
  setNotes,
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  total,
  logo,
  formatCurrency,
  shipping,
  showShipping, // NEW
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
          <img src={logo} alt="Logo" className="max-h-20 object-contain " />
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
            Bill To
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
            Notes
          </h2>
          <div className="text-[0.9em] whitespace-pre-wrap">
            <EditableField
              value={notes}
              onChange={setNotes}
              area={true}
              placeholder="Thank you..."
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-2/3 p-8 sm:p-10 md:p-12 relative z-10">
        <header className="text-left sm:text-right mb-10">
          <h1 className="font-bold uppercase" style={{ fontSize: "3.5em" }}>
            Invoice
          </h1>
          <div className="mt-2 text-[1em] space-y-1 opacity-70">
            <div className="flex justify-start sm:justify-end gap-2 items-center">
              <span className="font-semibold">Invoice #</span>
              <EditableField
                value={invoiceNumber}
                onChange={setInvoiceNumber}
                placeholder="INV-001"
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
              <span className="font-semibold">Due Date:</span>
              <EditableField
                type="date"
                value={dueDate}
                onChange={setDueDate}
                placeholder="Due Date"
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
            {/* NEW: Added Shipping row */}
            {showShipping && (
              <div className="flex justify-between">
                <span className="opacity-70">Shipping:</span>
                <span className="font-medium">{formatCurrency(shipping)}</span>
              </div>
            )}
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
                    keep your invoice clean and printable, you cannot add any
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
                  {" "}
                  {/* Centered layout */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
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
