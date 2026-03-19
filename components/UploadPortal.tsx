"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QueuedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export function UploadPortal() {
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [coupleName, setCoupleName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles: QueuedFile[] = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <section id="upload" className="relative section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Get Started
          </p>
          <h2 className="heading-lg mb-4">
            Upload Your{" "}
            <span className="text-gold-gradient italic">Assets</span>
          </h2>
          <p className="text-offwhite/50 max-w-2xl mx-auto">
            Drop your photos, videos, and details below. Our designers will take it from here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-intense p-6 md:p-10"
        >
          {/* Couple info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-offwhite/50 text-xs uppercase tracking-wider mb-2">
                Couple&apos;s Names
              </label>
              <input
                type="text"
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                placeholder="e.g. Priya & Arjun"
                className="w-full neu px-4 py-3 bg-charcoal-light text-offwhite placeholder:text-offwhite/20 text-sm outline-none focus:shadow-[inset_0_0_0_1px_var(--gold)] transition-shadow"
              />
            </div>
            <div>
              <label className="block text-offwhite/50 text-xs uppercase tracking-wider mb-2">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full neu px-4 py-3 bg-charcoal-light text-offwhite text-sm outline-none focus:shadow-[inset_0_0_0_1px_var(--gold)] transition-shadow [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`drop-zone rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              dragOver ? "drag-over" : ""
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />

            <motion.div
              animate={dragOver ? { scale: 1.05 } : { scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-gold mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <p className="text-offwhite/70 text-sm mb-1">
                <span className="text-gold font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-offwhite/30 text-xs">
                Images, Videos, PDFs up to 50MB each
              </p>
            </motion.div>
          </div>

          {/* File Queue */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 space-y-2"
              >
                <p className="text-offwhite/40 text-xs uppercase tracking-wider mb-3">
                  Queued Files ({files.length})
                </p>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="glass flex items-center gap-4 p-3 rounded-xl"
                  >
                    {/* Thumbnail */}
                    <div className="w-10 h-10 rounded-lg bg-charcoal-light flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {file.preview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-5 h-5 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      )}
                    </div>

                    {/* File info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-offwhite/80 text-sm truncate">{file.name}</p>
                      <p className="text-offwhite/30 text-xs">{formatSize(file.size)}</p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="text-offwhite/30 hover:text-jewel-ruby transition-colors p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.div>
                ))}

                {/* Submit */}
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(
                    `Hi! I'd like to order a wedding invite.\nCouple: ${coupleName || "N/A"}\nDate: ${eventDate || "N/A"}\nFiles: ${files.length} uploaded`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay block w-full text-center py-3.5 text-charcoal font-semibold text-sm tracking-wide mt-4"
                  data-cursor="cta"
                >
                  Send via WhatsApp →
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
