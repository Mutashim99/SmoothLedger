"use client";

import React, { useState } from "react";
import { RiSendPlaneFill, RiLoader4Line } from "react-icons/ri";
import { motion } from "framer-motion";

export default function BroadcastPage() {
  const [subject, setSubject] = useState("");
  const [heading, setHeading] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const response = await fetch("/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          heading,
          bodyText,
          buttonText,
          buttonUrl,
          secretKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage({ type: "success", content: `Success! ${data.message}` });
      // Clear form on success
      setSubject("");
      setHeading("");
      setBodyText("");
      setButtonText("");
      setButtonUrl("");

    } catch (error) {
      setMessage({ type: "error", content: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Email Broadcast
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Send a one-time email to all subscribers in your Supabase database.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 p-8 bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-6"
          >
            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Our Biggest Update Yet!"
              />
            </div>
            
            {/* Heading */}
            <div>
              <label
                htmlFor="heading"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email Heading
              </label>
              <input
                type="text"
                id="heading"
                required
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="The New Dashboard is Here"
              />
            </div>
            
            {/* Body Text */}
            <div>
              <label
                htmlFor="bodyText"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Body Content
              </label>
              <textarea
                id="bodyText"
                rows={8}
                required
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your main email content here. You can add line breaks, and they will be preserved."
              />
            </div>
            
            {/* Button Text */}
            <div>
              <label
                htmlFor="buttonText"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Button Text (Optional)
              </label>
              <input
                type="text"
                id="buttonText"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Read More"
              />
            </div>

            {/* Button URL */}
            <div>
              <label
                htmlFor="buttonUrl"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Button URL (Optional)
              </label>
              <input
                type="url"
                id="buttonUrl"
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
                className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://smoothledger.com/blogs/..."
              />
            </div>
            
            {/* Secret Key */}
            <div>
              <label
                htmlFor="secretKey"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Secret Key
              </label>
              <input
                type="password"
                id="secretKey"
                required
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your secret broadcast password"
              />
            </div>
            
            {/* Submit Button */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400"
              >
                {isLoading ? (
                  <>
                    <RiLoader4Line className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RiSendPlaneFill className="h-5 w-5" />
                    Send Broadcast
                  </>
                )}
              </button>
            </div>
            
            {/* Message Area */}
            {message.content && (
              <div
                className={`p-4 rounded-md text-sm ${
                  message.type === "error"
                    ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
                    : "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                }`}
              >
                {message.content}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}