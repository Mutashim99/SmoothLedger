/* File: app/components/FaqAccordion.jsx */

"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { motion } from "framer-motion";

// This is a Client Component. It's imported by the Server Component page.
export function FaqAccordion({ faqs }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Disclosure
            as="div"
            className="p-6 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg"
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full text-left gap-4">
                  <span className="text-lg font-medium text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  {open ? (
                    <RiSubtractLine className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  ) : (
                    <RiAddLine className="h-5 w-5 text-slate-500 flex-shrink-0" />
                  )}
                </Disclosure.Button>

                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel
                    as="dd"
                    className="mt-4 text-base text-slate-600 dark:text-slate-300"
                  >
                    {faq.answer}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </motion.div>
      ))}
    </div>
  );
}