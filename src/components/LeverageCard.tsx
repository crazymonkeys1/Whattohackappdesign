import { Badge } from './ui/badge';
import { Building2, TrendingUp } from 'lucide-react';

export type Leverage = {
  id: string;
  leverage: string;
  strategicImpact: string;
  description: string;
  company: string;
  relevance: 'high' | 'medium' | 'low';
};

type LeverageCardProps = {
  leverage: Leverage;
  onClick: () => void;
  isSelected: boolean;
  isLast?: boolean;
};

export function LeverageCard({ leverage, onClick, isSelected, isLast }: LeverageCardProps) {
  if (!leverage) return null;
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border-neutral-800 bg-black hover:bg-neutral-950 transition-colors ${
        isSelected ? 'bg-neutral-950' : ''
      } ${!isLast ? 'border-b' : ''}`}
    >
      <div className="px-5 py-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-normal leading-[24px] not-italic text-[18px] text-white tracking-[-0.4px]">
                {leverage.leverage}
              </h3>
              {leverage.relevance === 'high' && (
                <Badge variant="outline" className="bg-[#ff6b35]/10 border-[#ff6b35]/30 text-[#ff6b35] text-[10px]">
                  High Impact
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-neutral-600" />
                <span className="font-normal leading-[16px] not-italic text-[12px] text-neutral-400 tracking-[-0.1px]">
                  {leverage.company}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-neutral-600" />
                <span className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[-0.1px]">
                  {leverage.strategicImpact}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="font-normal leading-[20px] not-italic text-[13px] text-neutral-500 tracking-[-0.15px]">
          {leverage.description}
        </p>
      </div>
    </button>
  );
}
