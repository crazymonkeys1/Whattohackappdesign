import { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, Palette } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HackathonData } from '../App';

type HackathonInfoHeaderProps = {
  data: HackathonData;
  onBackToHome: () => void;
};

// Color palette presets for testing
const COLOR_PRESETS = [
  { name: 'Default', bg: 'bg-neutral-950', border: 'border-neutral-800/50', text: 'text-neutral-400', label: 'text-neutral-600' },
  { name: 'Slate', bg: 'bg-slate-950', border: 'border-slate-800/50', text: 'text-slate-400', label: 'text-slate-600' },
  { name: 'Blue', bg: 'bg-blue-950', border: 'border-blue-900/50', text: 'text-blue-400', label: 'text-blue-600' },
  { name: 'Emerald', bg: 'bg-emerald-950', border: 'border-emerald-900/50', text: 'text-emerald-400', label: 'text-emerald-600' },
  { name: 'Orange', bg: 'bg-orange-950', border: 'border-orange-900/50', text: 'text-orange-400', label: 'text-orange-600' },
];

export function HackathonInfoHeader({ data, onBackToHome }: HackathonInfoHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [colorPresetIndex, setColorPresetIndex] = useState(0);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const currentColors = COLOR_PRESETS[colorPresetIndex];

  // Use a default hackathon image
  const hackathonImage = 'https://images.unsplash.com/photo-1662657138446-4c58d87881c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBldmVudCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYyNjQ0NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080';

  const cycleColorPreset = () => {
    setColorPresetIndex((prev) => (prev + 1) % COLOR_PRESETS.length);
  };

  return (
    <header className={`${currentColors.bg} border-b ${currentColors.border}`}>
      <div className="px-4 sm:px-6">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 py-2.5 sm:py-3">
          {/* Left: What To Hack Logo - Clickable */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff6b35] group-hover:text-[#ff8555] transition-colors" />
            <span className="font-normal leading-[20px] not-italic text-[13px] sm:text-[14px] text-white tracking-[-0.2px] group-hover:text-neutral-300 transition-colors">
              What To Hack
            </span>
          </button>

          {/* Center: Hackathon Info with Image */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3">
            {/* Hackathon Image */}
            <div className="hidden sm:block w-8 h-8 rounded overflow-hidden border border-neutral-800 flex-shrink-0">
              <ImageWithFallback
                src={hackathonImage}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex items-baseline gap-2">
              <h1 className="font-normal leading-[18px] not-italic text-[13px] sm:text-[15px] text-white tracking-[-0.2px] whitespace-nowrap">
                {data.name}
              </h1>
              <span className="hidden sm:inline font-normal leading-[16px] not-italic text-[10px] sm:text-[11px] text-neutral-500 tracking-[-0.1px] whitespace-nowrap">
                {data.date}
              </span>
            </div>
          </div>

          {/* Right: Color Picker & Expand Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Color Palette Switcher - Testing Only */}
            <button
              onClick={cycleColorPreset}
              className="text-neutral-600 hover:text-[#ff6b35] transition-colors p-1"
              title={`Theme: ${currentColors.name}`}
            >
              <Palette className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-neutral-500 hover:text-[#ff6b35] transition-colors p-1"
              aria-label={isExpanded ? 'Hide details' : 'Show details'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className={`pb-3 sm:pb-4 border-t ${currentColors.border}`}>
            <div className="pt-3">
              {/* Mobile Layout */}
              <div className="sm:hidden flex flex-col gap-3">
                {/* Image + Location + Organizer */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden border border-neutral-800 flex-shrink-0">
                    <ImageWithFallback
                      src={hackathonImage}
                      alt={data.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 grid grid-cols-2 gap-2">
                    <div>
                      <p className={`font-normal leading-[14px] not-italic text-[10px] ${currentColors.label} tracking-[0.6px] uppercase mb-0.5`}>
                        Location
                      </p>
                      <p className={`font-normal leading-[16px] not-italic text-[11px] ${currentColors.text} tracking-[-0.1px]`}>
                        {data.location}
                      </p>
                    </div>
                    <div>
                      <p className={`font-normal leading-[14px] not-italic text-[10px] ${currentColors.label} tracking-[0.6px] uppercase mb-0.5`}>
                        Organizer
                      </p>
                      <p className={`font-normal leading-[16px] not-italic text-[11px] ${currentColors.text} tracking-[-0.1px]`}>
                        {data.organizer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className={`font-normal leading-[14px] not-italic text-[10px] ${currentColors.label} tracking-[0.6px] uppercase mb-1`}>
                    Description
                  </p>
                  <p className={`font-normal leading-[18px] not-italic text-[12px] ${currentColors.text} tracking-[-0.1px]`}>
                    {data.description}
                  </p>
                </div>

                {/* Sponsors */}
                <div>
                  <p className={`font-normal leading-[14px] not-italic text-[10px] ${currentColors.label} tracking-[0.6px] uppercase mb-1`}>
                    Sponsors
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.sponsors.map((sponsor, index) => (
                      <span
                        key={index}
                        className={`inline-block px-2 py-0.5 bg-neutral-900 border border-neutral-800 font-normal leading-[16px] not-italic text-[11px] ${currentColors.text} tracking-[-0.1px] rounded-sm`}
                      >
                        {sponsor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Layout - Aligned Grid */}
              <div className="hidden sm:grid sm:grid-cols-12 sm:gap-4 sm:items-start">
                {/* Location */}
                <div className="col-span-2">
                  <p className={`font-normal leading-[14px] not-italic text-[10px] ${currentColors.label} tracking-[0.6px] uppercase mb-1.5`}>
                    Location
                  </p>
                  <p className={`font-normal leading-[18px] not-italic text-[12px] ${currentColors.text} tracking-[-0.1px]`}>
                    {data.location}
                  </p>
                </div>

                {/* Organizer */}
                <div className="col-span-2">
                  <p className={`font-normal leading-[14px] not-italic text-[10px] ${currentColors.label} tracking-[0.6px] uppercase mb-1.5`}>
                    Organizer
                  </p>
                  <p className={`font-normal leading-[18px] not-italic text-[12px] ${currentColors.text} tracking-[-0.1px]`}>
                    {data.organizer}
                  </p>
                </div>

                {/* Description */}
                <div className="col-span-5">
                  <p className={`font-normal leading-[14px] not-italic text-[10px] ${currentColors.label} tracking-[0.6px] uppercase mb-1.5`}>
                    Description
                  </p>
                  <p className={`font-normal leading-[18px] not-italic text-[12px] sm:text-[13px] ${currentColors.text} tracking-[-0.1px] line-clamp-2`}>
                    {data.description}
                  </p>
                </div>

                {/* Sponsors */}
                <div className="col-span-3">
                  <p className={`font-normal leading-[14px] not-italic text-[10px] ${currentColors.label} tracking-[0.6px] uppercase mb-1.5`}>
                    Sponsors
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.sponsors.map((sponsor, index) => (
                      <span
                        key={index}
                        className={`inline-block px-2 py-0.5 bg-neutral-900 border border-neutral-800 font-normal leading-[16px] not-italic text-[11px] ${currentColors.text} tracking-[-0.1px] rounded-sm`}
                      >
                        {sponsor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
