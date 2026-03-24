"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Camera, Smartphone, Globe, Shield, Play, Image as ImageIcon, X } from "lucide-react";

// --- Types & Themes ---

type TemplateID = 'floral' | 'minimal' | 'royal' | 'modern';
type ThemeID = 'rose' | 'marigold' | 'royal' | 'sage' | 'midnight' | 'blush' | 'slate' | 'copper';

interface StudioState {
  name1: string;
  name2: string;
  date: string;
  venue: string;
  event2Name: string;
  event2Date: string;
  template: TemplateID;
  theme: ThemeID;
  photoUrl: string | null;
  photoName: string;
  photoSize: string;
  videoUrl: string | null;
  videoName: string;
  videoSize: string;
}

const themes: Record<ThemeID, { bg: string; accent: string; heading: string; body: string; name: string }> = {
  rose:     { bg: '#FFF5F5', accent: '#C9786A', heading: '#3D1F1A', body: '#8A5550', name: 'Blush Rose' },
  marigold: { bg: '#FFFBF0', accent: '#C88B2C', heading: '#3D2A0A', body: '#8A6A30', name: 'Golden Marigold' },
  royal:    { bg: '#F5F0FF', accent: '#6B4FA8', heading: '#1E1040', body: '#5A4880', name: 'Royal Orchid' },
  sage:     { bg: '#F2F7F2', accent: '#4A7C5C', heading: '#1A3024', body: '#4A6858', name: 'Garden Sage' },
  midnight: { bg: '#1A1A2E', accent: '#E8C97B', heading: '#F5F0E8', body: '#A89870', name: 'Midnight Gold' },
  blush:    { bg: '#FFF0F5', accent: '#D4789A', heading: '#3D1A2A', body: '#8A5068', name: 'Ivory Blush' },
  slate:    { bg: '#F0F4F8', accent: '#3D5A80', heading: '#1A2840', body: '#4A6080', name: 'Coastal Slate' },
  copper:   { bg: '#FDF6EE', accent: '#A0522D', heading: '#3D1E0A', body: '#7A4828', name: 'Burnished Copper' },
};

// --- Templates (React Components) ---

const FloralTemplate = ({ state }: { state: StudioState }) => {
  const t = themes[state.theme];
  return (
    <div className="w-[360px] h-[640px] relative flex flex-col items-center p-10 text-center" style={{ background: t.bg, color: t.body, fontFamily: 'Georgia, serif' } as any}>
      <span className="absolute top-0 left-0 text-9xl opacity-20" style={{ color: t.accent }}>❧</span>
      <span className="absolute top-0 right-0 text-9xl opacity-20 rotate-90" style={{ color: t.accent }}>❧</span>
      <span className="absolute bottom-0 left-0 text-9xl opacity-20 -rotate-90" style={{ color: t.accent }}>❧</span>
      <span className="absolute bottom-0 right-0 text-9xl opacity-20 rotate-180" style={{ color: t.accent }}>❧</span>
      
      <p className="text-[10px] uppercase tracking-[0.2em] mb-6" style={{ color: t.accent }}>Together with their families</p>
      
      {state.photoUrl && (
        <img src={state.photoUrl} className="w-28 h-28 rounded-full border-2 object-cover mb-6" style={{ borderColor: t.accent }} />
      )}
      
      <h1 className="text-3xl mb-1" style={{ color: t.heading }}>{state.name1}</h1>
      <div className="text-5xl opacity-30 leading-none" style={{ color: t.accent }}>&</div>
      <h1 className="text-3xl mt-1 mb-6" style={{ color: t.heading }}>{state.name2}</h1>
      
      <div className="w-16 h-[1px] opacity-40 mb-6" style={{ background: t.accent }} />
      
      <p className="text-[10px] uppercase tracking-widest mb-4 opacity-70">Request the pleasure of your company</p>
      <p className="text-xl mb-2" style={{ color: t.heading }}>{formatDate(state.date)}</p>
      <p className="text-xs opacity-80 max-w-[240px]">{state.venue}</p>

      {state.event2Name && state.event2Date && (
        <div className="mt-8">
          <p className="text-[10px] font-bold uppercase mb-1" style={{ color: t.accent }}>{state.event2Name}</p>
          <p className="text-xs">{formatDate(state.event2Date)}</p>
        </div>
      )}
    </div>
  );
};

const MinimalTemplate = ({ state }: { state: StudioState }) => {
  const t = themes[state.theme];
  const year = state.date ? new Date(state.date).getFullYear() : '2025';
  return (
    <div className="w-[360px] h-[640px] relative p-10 font-sans" style={{ background: t.bg, color: t.body } as any}>
      {state.photoUrl && (
        <>
          <img src={state.photoUrl} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </>
      )}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: t.accent }} />
      <div className="absolute right-0 bottom-24 text-[130px] font-black opacity-5 rotate-90 leading-none" style={{ color: t.accent }}>{year}</div>
      
      <div className="absolute bottom-10 left-10 text-left">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4" style={{ color: t.accent }}>You are invited</p>
        <h1 className="text-4xl font-extrabold leading-tight mb-8" style={{ color: state.photoUrl ? 'white' : t.heading }}>
           {state.name1}<br />& {state.name2}
        </h1>
        <div className="flex items-center gap-3 text-sm font-bold" style={{ color: state.photoUrl ? 'white' : t.body }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.accent }} />
          <span>{formatDate(state.date)}</span>
        </div>
        <div className="flex items-center gap-3 text-xs opacity-70 mt-2" style={{ color: state.photoUrl ? 'white' : t.body }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.accent }} />
          <span>{state.venue}</span>
        </div>
        {state.event2Name && state.event2Date && (
          <div className="mt-6 text-[10px] font-bold uppercase tracking-wider" style={{ color: t.accent }}>
            {state.event2Name} • {formatDate(state.event2Date)}
          </div>
        )}
      </div>
    </div>
  );
};

const RoyalTemplate = ({ state }: { state: StudioState }) => {
  const t = themes[state.theme];
  return (
    <div className="w-[360px] h-[640px] relative flex flex-col items-center p-10 text-center" style={{ background: t.bg, color: t.body, fontFamily: 'Georgia, serif' } as any}>
      <div className="absolute inset-4 border opacity-30 pointer-events-none" style={{ borderColor: t.accent }} />
      <div className="absolute inset-5 border opacity-10 pointer-events-none" style={{ borderColor: t.accent }} />
      
      <div className="text-4xl opacity-50 mb-4" style={{ color: t.accent }}>♛</div>
      
      {state.photoUrl && (
        <img src={state.photoUrl} className="w-36 h-28 object-cover border-4 border-double mb-6" style={{ borderColor: t.accent }} />
      )}
      
      <p className="text-[10px] uppercase tracking-widest opacity-60 mb-6">Together with their families</p>
      
      <h1 className="text-2xl mb-2" style={{ color: t.heading }}>{state.name1}</h1>
      <div className="text-sm font-bold tracking-[0.2em] my-1" style={{ color: t.accent }}>— & —</div>
      <h1 className="text-2xl mt-2 mb-8" style={{ color: t.heading }}>{state.name2}</h1>
      
      <div className="text-xs opacity-40 mb-6" style={{ color: t.accent }}>✦ ✦ ✦</div>
      
      <p className="text-[10px] mb-1">Joyfully invite you to celebrate their</p>
      <p className="text-sm uppercase tracking-[0.3em] font-bold mb-6" style={{ color: t.accent }}>Wedding</p>
      
      <p className="text-lg mb-1" style={{ color: t.heading }}>{formatDate(state.date)}</p>
      <p className="text-xs opacity-70">{state.venue}</p>

      {state.event2Name && state.event2Date && (
        <div className="mt-8 text-xs">
          <p className="font-bold mb-1" style={{ color: t.accent }}>{state.event2Name}</p>
          <p className="opacity-60">{formatDate(state.event2Date)}</p>
        </div>
      )}
    </div>
  );
};

const ModernTemplate = ({ state }: { state: StudioState }) => {
  const t = themes[state.theme];
  return (
    <div className="w-[360px] h-[640px] relative flex flex-col bg-white overflow-hidden font-sans">
      <div 
        className="w-full h-[55%] relative flex flex-col items-center justify-center text-white overflow-hidden" 
        style={{ background: t.accent, clipPath: 'ellipse(65% 100% at 50% 0%)' }}
      >
        {state.videoUrl ? (
          <>
            <video src={state.videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 opacity-40" style={{ background: t.accent }} />
            <div className="absolute top-4 right-4 text-[8px] font-black bg-black/60 px-2 py-1 rounded tracking-widest">VIDEO INVITE</div>
          </>
        ) : state.photoUrl ? (
          <>
            <img src={state.photoUrl} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : null}
        
        <div className="relative z-10 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] font-black mb-4 opacity-80">Wedding Invitation</p>
          <h1 className="text-4xl font-light mb-1">{state.name1}</h1>
          <div className="text-sm opacity-50 my-1">— & —</div>
          <h1 className="text-4xl font-light">{state.name2}</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pt-20">
        <p className="text-[10px] uppercase tracking-widest font-black mb-4" style={{ color: t.accent }}>Join us on</p>
        <p className="text-2xl font-black mb-4" style={{ color: t.heading }}>{formatDate(state.date)}</p>
        <div className="w-10 h-[1px] opacity-20 mb-4" style={{ background: t.accent }} />
        <p className="text-xs opacity-70 mb-8 max-w-[200px]" style={{ color: t.body }}>{state.venue}</p>

        {state.event2Name && state.event2Date && (
          <div className="mb-8 px-4 py-2 rounded-lg text-[10px]" style={{ background: t.bg }}>
            <span className="font-bold" style={{ color: t.accent }}>{state.event2Name}</span> • {formatDate(state.event2Date)}
          </div>
        )}

        <div className="mt-auto px-8 py-3 rounded-full border text-[10px] font-black tracking-widest uppercase transition-all" style={{ color: t.accent, borderColor: t.accent }}>
           RSVP ONLINE
        </div>
      </div>
    </div>
  );
};

// --- Utility: format file size ---
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// --- Upload Zone Component ---
function UploadZone({ 
  label, 
  accept, 
  value, 
  fileName, 
  fileSize, 
  onFile, 
  onClear, 
  icon: Icon, 
  previewType 
}: {
  label: string;
  accept: string;
  value: string | null;
  fileName: string;
  fileSize: string;
  onFile: (file: File) => void;
  onClear: () => void;
  icon: any;
  previewType: 'image' | 'video';
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div className="space-y-3">
      <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest block">{label}</label>
      <div 
        className={`upload-zone h-36 flex flex-col items-center justify-center ${dragOver ? 'drag-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
        
        {value ? (
          <div className="flex items-center gap-4 relative z-10">
            {previewType === 'image' ? (
              <img src={value} className="w-14 h-14 rounded-xl object-cover border border-antique-gold/30" alt="Upload preview" />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-antique-gold/10 flex items-center justify-center border border-antique-gold/30">
                <Play className="w-5 h-5 text-antique-gold" />
              </div>
            )}
            <div className="flex flex-col gap-1 text-left">
              <span className="text-xs text-off-white font-medium truncate max-w-[140px]">{fileName}</span>
              <span className="text-[9px] text-off-white/30 uppercase tracking-wider">{fileSize}</span>
            </div>
          </div>
        ) : (
          <div className="text-center relative z-10">
            <Icon className="w-6 h-6 text-antique-gold/30 mx-auto mb-3" />
            <span className="text-[10px] text-off-white/30 uppercase tracking-widest block">Click or Drop to Upload</span>
            <span className="text-[8px] text-off-white/15 uppercase tracking-wider mt-1 block">
              {previewType === 'image' ? 'JPG, PNG, WebP' : 'MP4, WebM'}
            </span>
          </div>
        )}
      </div>

      {value && (
        <button 
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          className="flex items-center gap-2 text-[9px] text-red-400/70 uppercase tracking-widest font-bold hover:text-red-400 transition-colors"
        >
          <X className="w-3 h-3" /> Remove
        </button>
      )}
    </div>
  );
}

// --- Main Studio Component ---

export function InvitePreview() {
  const [state, setState] = useState<StudioState>({
    name1: 'Priya',
    name2: 'Arjun',
    date: '2025-12-28',
    venue: 'The Grand Palace, Jaipur',
    event2Name: '',
    event2Date: '',
    template: 'floral',
    theme: 'rose',
    photoUrl: null,
    photoName: '',
    photoSize: '',
    videoUrl: null,
    videoName: '',
    videoSize: '',
  });

  const viewportRef = useRef<HTMLDivElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);

  const scalePreview = useCallback(() => {
    if (!viewportRef.current || !scalerRef.current) return;
    const viewportWidth = viewportRef.current.clientWidth;
    const scale = viewportWidth / 360;
    scalerRef.current.style.transform = `scale(${scale})`;
    scalerRef.current.style.transformOrigin = 'top left';
    viewportRef.current.style.height = `${640 * scale}px`;
  }, []);

  useEffect(() => {
    scalePreview();
    window.addEventListener('resize', scalePreview);
    return () => window.removeEventListener('resize', scalePreview);
  }, [scalePreview]);

  // Handle Photo Upload
  const handlePhoto = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => setState(prev => ({ 
      ...prev, 
      photoUrl: ev.target?.result as string,
      photoName: file.name,
      photoSize: formatFileSize(file.size),
    }));
    reader.readAsDataURL(file);
  };

  // Handle Video Upload
  const handleVideo = (file: File) => {
    const url = URL.createObjectURL(file);
    setState(prev => ({ 
      ...prev, 
      videoUrl: url,
      videoName: file.name,
      videoSize: formatFileSize(file.size),
    }));
  };

  const templatesMap = {
    floral: FloralTemplate,
    minimal: MinimalTemplate,
    royal: RoyalTemplate,
    modern: ModernTemplate,
  };

  const TemplateComponent = templatesMap[state.template];

  return (
    <section id="studio" className="relative py-40 px-6 bg-imperial-maroon border-t border-antique-gold/10 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-radial-gold opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        {/* Left: Controls */}
        <div className="flex-1 space-y-12">
          <div>
            <p className="body-serif text-antique-gold/60 text-[10px] uppercase tracking-[0.5em] mb-4">The Atelier</p>
            <h2 className="heading-invite text-[clamp(2.5rem,6vw,5rem)] text-off-white">Live <span className="heading-serif italic text-antique-gold font-light">Designer.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Core Details */}
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest">Bride&apos;s Name</label>
                 <input 
                   type="text" 
                   value={state.name1} 
                   onChange={(e) => setState(p => ({ ...p, name1: e.target.value }))}
                   className="w-full bg-maroon/20 border-b border-antique-gold/20 py-2 text-xl text-off-white outline-none focus:border-antique-gold transition-colors"
                 />
               </div>
               <div className="space-y-2">
                 <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest">Groom&apos;s Name</label>
                 <input 
                   type="text" 
                   value={state.name2} 
                   onChange={(e) => setState(p => ({ ...p, name2: e.target.value }))}
                   className="w-full bg-maroon/20 border-b border-antique-gold/20 py-2 text-xl text-off-white outline-none focus:border-antique-gold transition-colors"
                 />
               </div>
               <div className="space-y-2">
                 <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest">Wedding Date</label>
                 <input 
                   type="date" 
                   value={state.date} 
                   onChange={(e) => setState(p => ({ ...p, date: e.target.value }))}
                   className="w-full bg-transparent border-b border-antique-gold/20 py-2 text-xl text-off-white outline-none focus:border-antique-gold transition-colors [color-scheme:dark]"
                 />
               </div>
               <div className="space-y-2">
                 <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest">The Venue</label>
                 <input 
                   type="text" 
                   value={state.venue} 
                   onChange={(e) => setState(p => ({ ...p, venue: e.target.value }))}
                   className="w-full bg-maroon/20 border-b border-antique-gold/20 py-2 text-xl text-off-white outline-none focus:border-antique-gold transition-colors"
                 />
               </div>
            </div>

            {/* Column 2: Template & Theme */}
            <div className="space-y-10">
               <div>
                  <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest mb-6 block">Select Aesthetic</label>
                  <div className="grid grid-cols-2 gap-4">
                    {(['floral', 'minimal', 'royal', 'modern'] as TemplateID[]).map(id => (
                      <button 
                        key={id} 
                        onClick={() => setState(p => ({ ...p, template: id }))}
                        className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-500 ${state.template === id ? 'bg-maroon border-antique-gold text-antique-gold' : 'bg-maroon/20 border-antique-gold/10 text-off-white/40'}`}
                      >
                         {id === 'floral' && <Globe className="w-5 h-5 mb-2" />}
                         {id === 'minimal' && <Smartphone className="w-5 h-5 mb-2" />}
                         {id === 'royal' && <Shield className="w-5 h-5 mb-2" />}
                         {id === 'modern' && <Camera className="w-5 h-5 mb-2" />}
                         <span className="text-[10px] uppercase font-bold tracking-widest">{id}</span>
                      </button>
                    ))}
                  </div>
               </div>

               {/* Color Palette — Named Swatches */}
               <div>
                  <label className="body-serif text-antique-gold/40 text-[9px] uppercase tracking-widest mb-6 block">Color Palette</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(themes) as ThemeID[]).map((id) => {
                      const t = themes[id];
                      const isSelected = state.theme === id;
                      return (
                        <button 
                          key={id}
                          onClick={() => setState(p => ({ ...p, theme: id }))}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                            isSelected 
                              ? 'border-antique-gold/50 bg-maroon/40 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                              : 'border-antique-gold/10 bg-maroon/10 hover:border-antique-gold/25'
                          }`}
                        >
                          <div 
                            className={`w-7 h-7 rounded-full shrink-0 border-2 transition-transform ${isSelected ? 'border-white scale-110' : 'border-transparent'}`}
                            style={{ background: `linear-gradient(135deg, ${t.bg} 50%, ${t.accent} 50%)` }}
                          />
                          <span className={`text-[9px] uppercase tracking-wider font-bold ${isSelected ? 'text-antique-gold' : 'text-off-white/30'}`}>
                            {t.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
               </div>
            </div>
          </div>

          {/* Media Controls — Drag & Drop Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-antique-gold/5">
             <UploadZone
               label="Couple's Portrait"
               accept="image/*"
               value={state.photoUrl}
               fileName={state.photoName}
               fileSize={state.photoSize}
               onFile={handlePhoto}
               onClear={() => setState(p => ({ ...p, photoUrl: null, photoName: '', photoSize: '' }))}
               icon={ImageIcon}
               previewType="image"
             />
             <UploadZone
               label="Cinematic Background"
               accept="video/mp4,video/webm"
               value={state.videoUrl}
               fileName={state.videoName}
               fileSize={state.videoSize}
               onFile={handleVideo}
               onClear={() => setState(p => ({ ...p, videoUrl: null, videoName: '', videoSize: '' }))}
               icon={Camera}
               previewType="video"
             />
          </div>
        </div>

        {/* Right: Preview Port */}
        <div className="w-full lg:w-[450px] flex flex-col items-center">
           <div ref={viewportRef} className="w-full max-w-[360px] bg-black/40 rounded-[3rem] p-4 shadow-2xl relative overflow-hidden backdrop-blur-xl border border-white/5">
              <div ref={scalerRef} className="absolute top-4 left-4 right-4 bottom-4 rounded-[2rem] overflow-hidden">
                 <TemplateComponent state={state} />
              </div>
           </div>
           <p className="mt-8 body-serif text-antique-gold/40 text-[10px] uppercase tracking-[0.4em]">Live Resolution Preview</p>
        </div>

      </div>
    </section>
  );
}

// --- Helper Functions ---

function formatDate(dateStr: string) {
  if (!dateStr) return 'TBA';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
