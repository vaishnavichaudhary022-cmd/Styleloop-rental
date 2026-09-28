import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Palette, Sparkles, ZoomIn, ZoomOut, RotateCcw, Wifi, BatteryCharging, Signal } from 'lucide-react';

interface PhoneMockupFrameProps {
  children: React.ReactNode;
}

export type FrameColor = 'graphite' | 'desert' | 'rosegold' | 'silver';

export const PhoneMockupFrame: React.FC<PhoneMockupFrameProps> = ({ children }) => {
  const [useFrame, setUseFrame] = useState(true);
  const [frameColor, setFrameColor] = useState<FrameColor>('graphite');
  const [zoom, setZoom] = useState<number>(100);
  const [time, setTime] = useState('9:41');

  // Update clock every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formatted = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const colorConfig: Record<FrameColor, { border: string; label: string; accent: string; ring: string }> = {
    graphite: {
      border: 'bg-[#1e1e24] border-[#2d2d38]',
      label: 'Black Titanium',
      accent: '#26262b',
      ring: 'ring-neutral-800',
    },
    desert: {
      border: 'bg-[#b8a08a] border-[#d4c3b3]',
      label: 'Desert Titanium',
      accent: '#a89078',
      ring: 'ring-amber-200',
    },
    rosegold: {
      border: 'bg-[#cca49c] border-[#e8c8c1]',
      label: 'Rose Gold',
      accent: '#c99187',
      ring: 'ring-rose-300',
    },
    silver: {
      border: 'bg-[#d8d8de] border-[#ececf2]',
      label: 'Natural Titanium',
      accent: '#cacacc',
      ring: 'ring-slate-300',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Presentation Mockup Toolbar */}
      <header className="sticky top-0 z-50 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800/80 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Mockup Title & Branding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-bold tracking-tight text-white text-sm font-brand">
                REVOGUE · Mobile App UI/UX Mockup
              </span>
            </div>
            <span className="hidden sm:inline text-neutral-400 text-[11px] bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700/60">
              Myntra & Savana Style
            </span>
          </div>

          {/* Presentation Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-neutral-800/80 rounded-lg p-0.5 border border-neutral-700/70">
              <button
                onClick={() => setUseFrame(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition ${
                  useFrame
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Framed Phone Mockup View"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Phone Frame</span>
              </button>
              <button
                onClick={() => setUseFrame(false)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition ${
                  !useFrame
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Responsive View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Full Width</span>
              </button>
            </div>

            {/* Frame Color Selector (When in mockup frame mode) */}
            {useFrame && (
              <div className="hidden sm:flex items-center gap-1 bg-neutral-800/80 px-2 py-1 rounded-lg border border-neutral-700/70">
                <Palette className="w-3 h-3 text-neutral-400 mr-1" />
                {(Object.keys(colorConfig) as FrameColor[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setFrameColor(c)}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      frameColor === c
                        ? 'ring-2 ring-rose-500 scale-110 border-white'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: colorConfig[c].accent }}
                    title={colorConfig[c].label}
                  />
                ))}
              </div>
            )}

            {/* Zoom Controls */}
            {useFrame && (
              <div className="hidden md:flex items-center gap-1 bg-neutral-800/80 rounded-lg p-0.5 border border-neutral-700/70 text-neutral-300">
                <button
                  onClick={() => setZoom((z) => Math.max(75, z - 10))}
                  className="p-1 hover:text-white disabled:opacity-30"
                  disabled={zoom <= 75}
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1 font-mono text-[11px] tabular-nums min-w-[34px] text-center">
                  {zoom}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(120, z + 10))}
                  className="p-1 hover:text-white disabled:opacity-30"
                  disabled={zoom >= 120}
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className="p-1 text-neutral-400 hover:text-white"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8 overflow-x-hidden">
        {useFrame ? (
          /* Phone Screenshot Framing Container */
          <div
            className="transition-transform duration-300 ease-out flex flex-col items-center"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            {/* Phone Outer Shell */}
            <div
              className={`relative rounded-[54px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_80px_rgba(244,63,94,0.12)] border-[4px] transition-colors duration-300 ${
                colorConfig[frameColor].border
              }`}
            >
              {/* Outer button indentations for realism */}
              <div className="absolute -left-[7px] top-28 w-[3px] h-11 bg-neutral-700 rounded-l-md" /> {/* Action Button */}
              <div className="absolute -left-[7px] top-44 w-[3px] h-14 bg-neutral-700 rounded-l-md" /> {/* Vol Up */}
              <div className="absolute -left-[7px] top-62 w-[3px] h-14 bg-neutral-700 rounded-l-md" /> {/* Vol Down */}
              <div className="absolute -right-[7px] top-36 w-[3px] h-20 bg-neutral-700 rounded-r-md" /> {/* Power */}

              {/* Inner Phone Screen */}
              <div className="relative w-[min(380px,calc(100vw-36px))] sm:w-[412px] h-[min(852px,calc(100vh-140px))] min-h-[640px] bg-neutral-50 rounded-[44px] overflow-hidden flex flex-col shadow-inner select-none text-neutral-900 border border-neutral-900/10">
                {/* iOS Dynamic Island & Status Bar */}
                <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md pt-3 pb-1 px-7 flex items-center justify-between text-xs font-semibold text-neutral-900 select-none">
                  {/* Left: Clock */}
                  <span className="font-semibold tracking-tight text-[13px]">{time}</span>

                  {/* Center: Dynamic Island */}
                  <div className="w-24 h-6 bg-black rounded-full flex items-center justify-end px-2.5 gap-2 shadow-xs cursor-pointer group">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#131317] border border-neutral-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#181822] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                    </div>
                  </div>

                  {/* Right: Cellular, Wifi, Battery */}
                  <div className="flex items-center gap-1.5 text-neutral-800 text-[11px]">
                    <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
                    <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                    <div className="flex items-center gap-0.5">
                      <span className="text-[10px] font-bold">98%</span>
                      <div className="w-5 h-2.5 border border-neutral-800 rounded-xs p-[1px] flex items-center">
                        <div className="w-3.5 h-full bg-neutral-900 rounded-2xs" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* App Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative no-scrollbar bg-neutral-50">
                  {children}
                </div>

                {/* iOS Home Indicator Bar at Bottom */}
                <div className="absolute bottom-1 inset-x-0 z-50 flex justify-center pointer-events-none py-1">
                  <div className="w-32 h-1 bg-neutral-900/80 rounded-full" />
                </div>
              </div>
            </div>

            {/* Subtle Mockup Reflection Floor */}
            <div className="mt-4 flex items-center gap-2 text-neutral-500 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Interactive mobile app homepage mockup · Tap dresses to inspect rental details</span>
            </div>
          </div>
        ) : (
          /* Full Width Responsive Preview Mode */
          <div className="w-full max-w-md mx-auto bg-neutral-50 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/40 text-neutral-900 relative">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
