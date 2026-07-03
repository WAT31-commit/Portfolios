"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  accent?: string;
  labelledBy?: string;
  maxWidthClassName?: string;
  children: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  accent = "#f5c168",
  labelledBy,
  maxWidthClassName = "max-w-xl",
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className={`relative max-h-[85vh] w-full ${maxWidthClassName} overflow-y-auto rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 via-white/[0.06] to-white/[0.03] p-6 shadow-2xl backdrop-blur-2xl sm:p-8`}
            style={{
              boxShadow: `0 20px 70px -20px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.18)`,
            }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-2xl leading-none text-white/60 transition hover:text-white"
            >
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
