import React, { useEffect, useRef, useCallback, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({ open, onClose, title, description, children, footer, size = "md" }) {
  const dialogRef = useRef(null);
  const lastActiveElRef = useRef(null);

  useEffect(() => {
    if (open) {
      lastActiveElRef.current = document.activeElement;
    }
  }, [open]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lastActiveElRef.current?.focus?.();
    };
  }, [open, onKeyDown]);

  const labelledBy = title ? "modal-title" : undefined;
  const describedBy = description ? "modal-description" : undefined;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
            onClick={onClose}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy}
              aria-describedby={describedBy}
              ref={dialogRef}
              tabIndex={-1}
              className={`w-full ${sizeClasses[size]} outline-none`}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <div className="relative rounded-2xl bg-white shadow-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                {(title || description) && (
                  <div className="px-5 pt-5">
                    {title && (
                      <h2 id="modal-title" className="text-lg font-semibold tracking-tight">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p id="modal-description" className="mt-1 text-sm text-zinc-600 ">
                        {description}
                      </p>
                    )}
                  </div>
                )}

                <button
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <X className="size-5" />
                </button>

                <div className="px-5 py-4">{children}</div>

                {footer && <div className="px-5 pb-5 pt-2 flex flex-wrap gap-2 justify-end">{footer}</div>}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}