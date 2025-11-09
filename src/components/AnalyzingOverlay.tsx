import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

type AnalyzingOverlayProps = {
  stage: 'extracting' | 'analyzing-sponsors' | null;
  sponsorCount?: number;
  currentSponsor?: number;
};

export function AnalyzingOverlay({ stage, sponsorCount = 0, currentSponsor = 0 }: AnalyzingOverlayProps) {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Simulate progress for extracting stage
  useEffect(() => {
    if (stage === 'extracting') {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 300);
      return () => clearInterval(interval);
    } else if (stage === 'analyzing-sponsors') {
      // Set progress based on sponsor analysis
      const sponsorProgress = sponsorCount > 0 ? (currentSponsor / sponsorCount) * 100 : 0;
      setProgress(sponsorProgress);
    }
  }, [stage, sponsorCount, currentSponsor]);

  if (!stage) return null;

  const getStageInfo = () => {
    if (stage === 'extracting') {
      return {
        title: 'Analyzing Hackathon',
        subtitle: 'Extracting event details, sponsors, and requirements',
        icon: '🔍',
        detail: 'Scanning event page for critical data...',
        tip: 'We analyze the hackathon page to understand what judges are looking for',
      };
    }
    return {
      title: 'Strategic Analysis',
      subtitle: `Analyzing sponsor ${currentSponsor} of ${sponsorCount}`,
      icon: '🎯',
      detail: 'Identifying strategic opportunities and leverage points...',
      tip: 'Projects using sponsor APIs have a 3x higher win rate',
    };
  };

  const info = getStageInfo();

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #ff6b35 2px,
            #ff6b35 3px
          )`,
          backgroundSize: '100% 50px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[600px] w-full px-8 text-center">
        {/* Icon with Pulse Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="text-[64px] animate-pulse">{info.icon}</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-[#ff6b35] border-t-transparent rounded-full animate-spin" 
                   style={{ animationDuration: '1.5s' }} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-normal leading-[56px] not-italic text-[48px] text-white tracking-[-2px] mb-4">
          {info.title}
        </h2>

        {/* Animated Dots */}
        <div className="h-8 mb-6">
          <p className="font-normal leading-[24px] not-italic text-[18px] text-[#ff6b35] tracking-[-0.4px]">
            {info.subtitle}{dots}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full h-1 bg-neutral-900 overflow-hidden">
            <div 
              className="h-full bg-[#ff6b35] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-normal leading-[16px] not-italic text-[11px] text-neutral-500 tracking-[2.2px] uppercase mt-3">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Status Messages */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-neutral-600">
            <div className="w-1.5 h-1.5 bg-[#ff6b35] rounded-full animate-pulse" />
            <p className="font-normal leading-[18px] not-italic text-[13px] tracking-[0.3px]">
              {info.detail}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-neutral-700">
            <Loader2 className="w-3 h-3 animate-spin" />
            <p className="font-normal leading-[18px] not-italic text-[13px] tracking-[0.3px]">
              This may take 10-15 seconds
            </p>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="mt-12 pt-8 border-t border-neutral-900">
          <p className="font-normal leading-[16px] not-italic text-[11px] text-neutral-600 tracking-[1.1px] uppercase mb-2">
            Pro Tip
          </p>
          <p className="font-normal leading-[20px] not-italic text-[14px] text-neutral-500 tracking-[-0.2px] italic">
            {info.tip}
          </p>
        </div>
      </div>
    </div>
  );
}
