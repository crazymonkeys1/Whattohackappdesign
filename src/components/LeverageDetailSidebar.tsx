import { X, Building2, TrendingUp, Lightbulb, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Leverage } from './LeverageCard';

type LeverageDetailSidebarProps = {
  leverage: Leverage;
  onClose: () => void;
};

export function LeverageDetailSidebar({ leverage, onClose }: LeverageDetailSidebarProps) {
  return (
    <div className="w-[75vw] bg-neutral-950 border-l border-neutral-800 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <h2 className="font-normal leading-[28px] not-italic text-[20px] text-white tracking-[-0.5px]">
          Leverage Details
        </h2>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h1 className="font-normal leading-[32px] not-italic text-[28px] text-white tracking-[-0.8px]">
              {leverage.leverage}
            </h1>
            {leverage.relevance === 'high' && (
              <Badge variant="outline" className="bg-[#ff6b35]/10 border-[#ff6b35]/30 text-[#ff6b35] text-[11px]">
                High Impact
              </Badge>
            )}
          </div>
          <p className="font-normal leading-[22px] not-italic text-[14px] text-neutral-400 tracking-[-0.2px]">
            {leverage.description}
          </p>
        </div>

        {/* Company & Strategic Impact */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-neutral-800 bg-black p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-[#ff6b35]" />
              <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase">
                Company
              </p>
            </div>
            <p className="font-normal leading-[20px] not-italic text-[14px] text-white tracking-[-0.2px]">
              {leverage.company}
            </p>
          </div>

          <div className="border border-neutral-800 bg-black p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#ff6b35]" />
              <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase">
                Strategic Impact
              </p>
            </div>
            <p className="font-normal leading-[20px] not-italic text-[14px] text-white tracking-[-0.2px]">
              {leverage.strategicImpact}
            </p>
          </div>
        </div>

        {/* What They Want */}
        <div className="border border-neutral-800 bg-black p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-[#ff6b35]" />
            <h3 className="font-normal leading-[18px] not-italic text-[13px] text-white tracking-[0.3px] uppercase">
              What They're Looking For
            </h3>
          </div>
          <p className="font-normal leading-[22px] not-italic text-[14px] text-neutral-400 tracking-[-0.2px]">
            {leverage.description}
          </p>
        </div>

        {/* How to Leverage */}
        <div className="border border-neutral-800 bg-black p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-[#ff6b35]" />
            <h3 className="font-normal leading-[18px] not-italic text-[13px] text-white tracking-[0.3px] uppercase">
              How to Use This Leverage
            </h3>
          </div>
          <ul className="space-y-2">
            <li className="font-normal leading-[22px] not-italic text-[14px] text-neutral-400 tracking-[-0.2px]">
              • Align your project pitch with their {leverage.strategicImpact.toLowerCase()} goals
            </li>
            <li className="font-normal leading-[22px] not-italic text-[14px] text-neutral-400 tracking-[-0.2px]">
              • Highlight how your solution addresses their specific needs
            </li>
            <li className="font-normal leading-[22px] not-italic text-[14px] text-neutral-400 tracking-[-0.2px]">
              • Reference this leverage point in your demo and presentation
            </li>
          </ul>
        </div>

        {/* Example Applications */}
        <div className="border border-neutral-800 bg-black p-5">
          <h3 className="font-normal leading-[18px] not-italic text-[13px] text-white tracking-[0.3px] uppercase mb-3">
            Example Project Angles
          </h3>
          <div className="space-y-3">
            <div className="border-l-2 border-[#ff6b35] pl-3">
              <p className="font-normal leading-[20px] not-italic text-[13px] text-neutral-300 tracking-[-0.15px]">
                Build a showcase integration that demonstrates the {leverage.company} platform's capabilities
              </p>
            </div>
            <div className="border-l-2 border-neutral-700 pl-3">
              <p className="font-normal leading-[20px] not-italic text-[13px] text-neutral-400 tracking-[-0.15px]">
                Create content or tools that support their {leverage.strategicImpact.toLowerCase()} initiatives
              </p>
            </div>
            <div className="border-l-2 border-neutral-700 pl-3">
              <p className="font-normal leading-[20px] not-italic text-[13px] text-neutral-400 tracking-[-0.15px]">
                Design a solution that could become a case study or marketing asset
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
