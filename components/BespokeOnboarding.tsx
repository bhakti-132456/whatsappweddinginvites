"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "vibe",
    title: "Select Your Aesthetic",
    subtitle: "Choosing the soul of your digital heirloom.",
    options: [
      { id: "editorial", label: "Editorial", icon: "💎", desc: "Minimal layout" },
      { id: "cinematic", label: "Cinematic", icon: "🎬", desc: "Fluid motion" },
      { id: "traditional", label: "Heritage", icon: "🏰", desc: "Gold accents" },
    ],
  },
  {
    id: "details",
    title: "The Union Details",
    subtitle: "When and where shall the celebration commence?",
  },
  {
    id: "story",
    title: "The Love Story",
    subtitle: "Briefly share the magic behind your union.",
  },
];

export function BespokeOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    vibe: "",
    date: "",
    venue: "",
    story: "",
  });

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const isStepValid = () => {
    if (currentStep === 0) return !!formData.vibe;
    if (currentStep === 1) return !!formData.date && !!formData.venue;
    if (currentStep === 2) return !!formData.story;
    return false;
  };

  return (
    <section id="onboarding" className="relative py-20 md:py-40 bg-black/20 overflow-hidden border-y border-antique-gold/5">
      <div className="max-w-4xl mx-auto relative z-10 px-6">
        {/* Progress Bar */}
        <div className="flex gap-3 mb-12">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-[1px] md:h-[2px] flex-1 transition-all duration-1000 ${
                i <= currentStep ? "bg-antique-gold" : "bg-antique-gold/10"
              }`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
             key={currentStep}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="min-h-[500px] flex flex-col pt-4 md:pt-10"
          >
            <p className="body-serif text-antique-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 md:mb-6">Step 0{currentStep + 1}</p>
            <h2 className="heading-invite text-5xl md:text-7xl lg:text-8xl mb-4 text-off-white">{steps[currentStep].title}</h2>
            <p className="body-serif text-off-white/40 text-lg md:text-xl mb-12 md:mb-16 italic font-light">{steps[currentStep].subtitle}</p>

            <div className="flex-1">
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {steps[0].options?.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                          setFormData({ ...formData, vibe: opt.id });
                          setTimeout(nextStep, 500);
                      }}
                      className={`p-6 md:p-10 rounded-[30px] md:rounded-[40px] border transition-all duration-500 text-left group ${
                        formData.vibe === opt.id 
                          ? "bg-maroon border-antique-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]" 
                          : "bg-maroon/20 border-antique-gold/10 hover:border-antique-gold/40"
                      }`}
                    >
                      <span className="text-3xl md:text-4xl mb-6 md:mb-8 block transition-transform group-hover:scale-110 duration-500">{opt.icon}</span>
                      <h4 className={`heading-invite text-2xl md:text-3xl mb-2 ${formData.vibe === opt.id ? "text-antique-gold" : "text-off-white"}`}>
                          {opt.label}
                      </h4>
                      <p className={`body-serif text-[10px] md:text-xs leading-relaxed ${formData.vibe === opt.id ? "text-off-white/80" : "text-off-white/30"}`}>
                          {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-10 md:space-y-12 max-w-xl">
                  <div>
                    <label className="body-serif text-antique-gold/40 text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-4 md:mb-6 block font-bold">The Auspicious Date</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-transparent border-b border-antique-gold/20 py-4 md:py-5 text-2xl md:text-3xl text-off-white outline-none focus:border-antique-gold transition-all duration-500 [color-scheme:dark] body-serif"
                    />
                  </div>
                  <div>
                    <label className="body-serif text-antique-gold/40 text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-4 md:mb-6 block font-bold">The Grand Venue</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Umaid Bhawan Palace"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full bg-transparent border-b border-antique-gold/20 py-4 md:py-5 text-2xl md:text-3xl text-off-white outline-none focus:border-antique-gold transition-all duration-500 placeholder:text-off-white/5 body-serif"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-10">
                  <div>
                    <label className="body-serif text-antique-gold/40 text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-4 md:mb-6 block font-bold">The Eternal Narrative</label>
                    <textarea 
                      rows={4}
                      placeholder="Share a glimpse of your story..."
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      className="w-full bg-maroon/20 border border-antique-gold/10 rounded-[30px] md:rounded-[40px] p-6 md:p-10 text-xl md:text-2xl text-off-white outline-none focus:border-antique-gold transition-all duration-700 placeholder:text-off-white/5 resize-none body-serif"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-20 md:mt-24 flex justify-between items-center">
              <button 
                onClick={prevStep}
                className={`body-serif text-antique-gold/40 text-[10px] uppercase tracking-[0.4em] hover:text-antique-gold transition-colors ${currentStep === 0 ? "invisible" : ""}`}
              >
                &larr; Return
              </button>
              
              <button 
                  disabled={!isStepValid()}
                  onClick={currentStep < steps.length - 1 ? nextStep : undefined}
                  className={`btn-gold !px-12 md:!px-16 ${!isStepValid() ? "opacity-20 cursor-not-allowed" : ""}`}
                  data-cursor="cta"
              >
                  {currentStep < steps.length - 1 ? "Next Step" : "Complete Inquiry"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
