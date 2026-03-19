"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "vibe",
    title: "The Aesthetic",
    subtitle: "Select your signature vibe.",
    options: [
      { id: "editorial", label: "Editorial", desc: "Vogue / Kinfolk inspired layout", icon: "📖" },
      { id: "cinematic", label: "Cinematic", desc: "Fluid motion and soundscapes", icon: "🎬" },
      { id: "traditional", label: "Traditional", desc: "Timeless elegance and heritage", icon: "🏛️" },
    ],
  },
  {
    id: "details",
    title: "The Foundation",
    subtitle: "When and where is the union?",
  },
  {
    id: "story",
    title: "The Legacy",
    subtitle: "Tell us your story.",
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
    <section id="onboarding" className="relative section-padding bg-onyx">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= currentStep ? "bg-champagne" : "bg-pearl/10"
              }`} 
            />
          ))}
        </div>

        <motion.div
           key={currentStep}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="min-h-[500px] flex flex-col pt-10"
        >
          <p className="text-champagne text-[10px] uppercase tracking-widest font-bold mb-2">Step 0{currentStep + 1}</p>
          <h2 className="heading-lg text-4xl lg:text-6xl mb-2">{steps[currentStep].title}</h2>
          <p className="text-pearl/40 text-lg mb-12">{steps[currentStep].subtitle}</p>

          <div className="flex-1">
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps[0].options?.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                        setFormData({ ...formData, vibe: opt.id });
                        setTimeout(nextStep, 400);
                    }}
                    className={`p-8 rounded-[30px] border transition-all duration-300 text-left group ${
                      formData.vibe === opt.id 
                        ? "bg-champagne border-champagne" 
                        : "bg-onyx-light border-pearl/10 hover:border-champagne/30"
                    }`}
                  >
                    <span className="text-3xl mb-6 block">{opt.icon}</span>
                    <h4 className={`heading-md text-xl mb-1 ${formData.vibe === opt.id ? "text-onyx" : "text-pearl"}`}>
                        {opt.label}
                    </h4>
                    <p className={`text-xs ${formData.vibe === opt.id ? "text-onyx/60" : "text-pearl/30"}`}>
                        {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8 max-w-xl">
                <div>
                  <label className="text-pearl/30 text-[10px] uppercase tracking-widest mb-4 block">Wedding Date</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-transparent border-b border-pearl/20 py-4 text-2xl text-pearl outline-none focus:border-champagne transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-pearl/30 text-[10px] uppercase tracking-widest mb-4 block">Venue Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rambagh Palace, Jaipur"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full bg-transparent border-b border-pearl/20 py-4 text-2xl text-pearl outline-none focus:border-champagne transition-colors placeholder:text-pearl/10"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <label className="text-pearl/30 text-[10px] uppercase tracking-widest mb-4 block">Tell us how you met</label>
                  <textarea 
                    rows={4}
                    placeholder="In a pixelated cafe... on a rainy evening in Mumbai..."
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    className="w-full bg-transparent border border-pearl/10 rounded-3xl p-8 text-xl text-pearl outline-none focus:border-champagne transition-colors placeholder:text-pearl/10 resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-20 flex justify-between items-center">
            <button 
              onClick={prevStep}
              className={`text-pearl/40 text-xs uppercase tracking-widest hover:text-pearl transition-colors ${currentStep === 0 ? "invisible" : ""}`}
            >
              &larr; Back
            </button>
            
            {currentStep < steps.length - 1 ? (
                <button 
                    disabled={!isStepValid()}
                    onClick={nextStep}
                    className={`btn-premium !px-12 ${!isStepValid() ? "opacity-30 cursor-not-allowed" : ""}`}
                    data-cursor="cta"
                >
                    Next &rarr;
                </button>
            ) : (
                <button 
                    disabled={!isStepValid()}
                    className={`btn-premium !px-12 ${!isStepValid() ? "opacity-30 cursor-not-allowed" : ""}`}
                    data-cursor="cta"
                >
                    Complete My Journey
                </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
