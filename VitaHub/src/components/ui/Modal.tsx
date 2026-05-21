import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 z-40" 
        onClick={onClose} 
        aria-hidden="true" 
      />
      <div
        className={`relative z-50 bg-[var(--surface)] text-[var(--foreground)] w-full rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 ${maxWidthClasses[maxWidth]}`}
        role="dialog"
        aria-modal="true"
      >
        {(title || description) && (
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border)] shrink-0">
            <div>
              {title && <h2 className="text-lg font-bold">{title}</h2>}
              {description && (
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 ml-4 rounded-full text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors shrink-0"
              aria-label="Encerrar"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {!title && !description && (
           <button
           onClick={onClose}
           className="absolute top-4 right-4 z-10 p-2 rounded-full text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors shrink-0"
           aria-label="Encerrar"
         >
           <X size={20} />
         </button>
        )}

        <div className="p-4 sm:p-6 p-safe-bottom overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="p-4 sm:p-6 border-t border-[var(--border)] bg-[var(--muted)]/20 shrink-0 flex items-center justify-end gap-3 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
