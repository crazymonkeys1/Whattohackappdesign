import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { HackathonInfoHeader } from './HackathonInfoHeader';
import { HackathonData } from '../App';

type TechnicalLevel = 'hobbyist' | 'professional' | 'beginner';
type CommitmentLevel = 'hardcore' | 'balanced' | 'casual';
type TeamSize = '1' | '2' | '3' | '4+';
type Intention = 'get-hired' | 'win-prize' | 'launch-startup' | 'build-portfolio' | 'learn-tech' | 'network';

export type OnboardingData = {
  technicalLevel: TechnicalLevel | null;
  commitmentLevel: CommitmentLevel | null;
  teamSize: TeamSize | null;
  intentions: Intention[];
};

type OnboardingStepsProps = {
  hackathonData: HackathonData;
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
  onBackToHome: () => void;
};

const TECHNICAL_OPTIONS = [
  { value: 'beginner' as TechnicalLevel, label: 'Can barely center a div', short: 'Beginner', emoji: '🤷' },
  { value: 'hobbyist' as TechnicalLevel, label: 'I code for fun', short: 'Hobbyist', emoji: '🎨' },
  { value: 'professional' as TechnicalLevel, label: "I'm a pro", short: 'Pro', emoji: '⚡' },
];

const COMMITMENT_OPTIONS = [
  { value: 'casual' as CommitmentLevel, label: 'Chill vibes only', short: 'Chill', emoji: '😎' },
  { value: 'balanced' as CommitmentLevel, label: 'Work hard, sleep harder', short: 'Balanced', emoji: '⚖️' },
  { value: 'hardcore' as CommitmentLevel, label: 'All in — no sleep', short: 'All in', emoji: '🔥' },
];

const TEAM_SIZE_OPTIONS = [
  { value: '1' as TeamSize, label: 'Solo', emoji: '1' },
  { value: '2' as TeamSize, label: 'Duo', emoji: '2' },
  { value: '3' as TeamSize, label: 'Squad', emoji: '3' },
  { value: '4+' as TeamSize, label: 'Team', emoji: '4+' },
];

const INTENTION_OPTIONS = [
  { value: 'get-hired' as Intention, label: 'Get hired by a sponsor', short: 'Get hired', emoji: '💼' },
  { value: 'win-prize' as Intention, label: 'Win prize money', short: 'Win prizes', emoji: '🏆' },
  { value: 'launch-startup' as Intention, label: 'Launch a real startup', short: 'Launch startup', emoji: '🚀' },
  { value: 'build-portfolio' as Intention, label: 'Build my portfolio', short: 'Build portfolio', emoji: '📂' },
  { value: 'learn-tech' as Intention, label: 'Learn new tech', short: 'Learn tech', emoji: '📚' },
  { value: 'network' as Intention, label: 'Network & have fun', short: 'Network', emoji: '🎉' },
];

export function OnboardingSteps({ hackathonData, onComplete, onSkip, onBackToHome }: OnboardingStepsProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<OnboardingData>({
    technicalLevel: null,
    commitmentLevel: null,
    teamSize: null,
    intentions: [],
  });

  const handleIntentionToggle = (intention: Intention) => {
    setData(prev => ({
      ...prev,
      intentions: prev.intentions.includes(intention)
        ? prev.intentions.filter(i => i !== intention)
        : [...prev.intentions, intention],
    }));
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete(data);
    }
  };

  const isStep1Complete = data.technicalLevel && data.commitmentLevel && data.teamSize;
  const isStep2Complete = data.intentions.length > 0;

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Simple Header with Home Icon */}
      <div className="relative z-10 px-5 sm:px-8 py-2.5 sm:py-3 border-b border-neutral-800/30">
        <div className="max-w-[1200px] mx-auto w-full">
          <button
            onClick={onBackToHome}
            className="text-neutral-500 hover:text-[#ff6b35] transition-colors"
            aria-label="Back to home"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center py-4 sm:py-6 overflow-y-auto">
        <div className="w-full max-w-[700px] mx-auto px-5 sm:px-8">
          
          {/* Step Indicator with Skip Button */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <div className={`h-[2px] w-12 sm:w-16 transition-colors ${step >= 1 ? 'bg-[#ff6b35]' : 'bg-neutral-800'}`} />
              <div className={`h-[2px] w-12 sm:w-16 transition-colors ${step >= 2 ? 'bg-[#ff6b35]' : 'bg-neutral-800'}`} />
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={onSkip}
                className="text-neutral-500 hover:text-[#ff6b35] transition-colors font-normal leading-[16px] not-italic text-[11px] sm:text-[12px] tracking-[2px] sm:tracking-[2.2px] uppercase"
              >
                Skip
              </button>
            </div>
          </div>

          {/* Step 1: Constraints */}
          {step === 1 && (
            <div className="space-y-4 sm:space-y-5">
              <div className="text-center">
                <p className="font-normal leading-[16px] not-italic text-[11px] sm:text-[12px] text-neutral-500 tracking-[2.2px] sm:tracking-[2.4px] uppercase mb-1.5 sm:mb-2">
                  Step 1 of 2
                </p>
                <h1 className="font-normal leading-[0.95] not-italic text-[32px] sm:text-[48px] text-white tracking-[-1.4px] sm:tracking-[-1.8px] mb-1.5 sm:mb-2">
                  Your Constraints
                </h1>
                <p className="text-neutral-400 font-normal leading-[20px] not-italic text-[13px] sm:text-[15px]">
                  Help us tailor ideas to your situation
                </p>
              </div>

              {/* Technical Level */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-white font-normal leading-[20px] not-italic text-[13px] sm:text-[14px] tracking-[0.3px]">
                  Are you technical?
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {TECHNICAL_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setData(prev => ({ ...prev, technicalLevel: option.value }))}
                      className={`py-3 px-2 sm:py-4 sm:px-3 border-2 transition-all text-center flex flex-col items-center justify-center min-h-[75px] sm:min-h-[90px] ${
                        data.technicalLevel === option.value
                          ? 'border-[#ff6b35] bg-[#ff6b35]/5'
                          : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-[22px] sm:text-[26px] mb-0.5 sm:mb-1">{option.emoji}</div>
                      <p className={`font-normal leading-[16px] sm:leading-[18px] not-italic text-[12px] sm:text-[13px] ${
                        data.technicalLevel === option.value ? 'text-white' : 'text-neutral-300'
                      }`}>
                        {option.short}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Commitment Level */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-white font-normal leading-[20px] not-italic text-[13px] sm:text-[14px] tracking-[0.3px]">
                  How serious are you about this?
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {COMMITMENT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setData(prev => ({ ...prev, commitmentLevel: option.value }))}
                      className={`py-3 px-2 sm:py-4 sm:px-3 border-2 transition-all text-center flex flex-col items-center justify-center min-h-[75px] sm:min-h-[90px] ${
                        data.commitmentLevel === option.value
                          ? 'border-[#ff6b35] bg-[#ff6b35]/5'
                          : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-[22px] sm:text-[26px] mb-0.5 sm:mb-1">{option.emoji}</div>
                      <p className={`font-normal leading-[16px] sm:leading-[18px] not-italic text-[12px] sm:text-[13px] ${
                        data.commitmentLevel === option.value ? 'text-white' : 'text-neutral-300'
                      }`}>
                        {option.short}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Size */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-white font-normal leading-[20px] not-italic text-[13px] sm:text-[14px] tracking-[0.3px]">
                  Are you alone or with a team?
                </label>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {TEAM_SIZE_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setData(prev => ({ ...prev, teamSize: option.value }))}
                      className={`py-3 px-2 sm:py-4 sm:px-3 border-2 transition-all text-center flex flex-col items-center justify-center min-h-[75px] sm:min-h-[90px] ${
                        data.teamSize === option.value
                          ? 'border-[#ff6b35] bg-[#ff6b35]/5'
                          : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-normal leading-[28px] sm:leading-[32px] not-italic text-[22px] sm:text-[26px] mb-0.5 sm:mb-1">{option.emoji}</div>
                      <p className={`font-normal leading-[16px] sm:leading-[18px] not-italic text-[12px] sm:text-[13px] ${
                        data.teamSize === option.value ? 'text-white' : 'text-neutral-300'
                      }`}>
                        {option.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Intentions */}
          {step === 2 && (
            <div className="space-y-4 sm:space-y-5">
              <div className="text-center">
                <p className="font-normal leading-[16px] not-italic text-[11px] sm:text-[12px] text-neutral-500 tracking-[2.2px] sm:tracking-[2.4px] uppercase mb-1.5 sm:mb-2">
                  Step 2 of 2
                </p>
                <h1 className="font-normal leading-[0.95] not-italic text-[32px] sm:text-[48px] text-white tracking-[-1.4px] sm:tracking-[-1.8px] mb-1.5 sm:mb-2">
                  Your Intentions
                </h1>
                <p className="text-neutral-400 font-normal leading-[20px] not-italic text-[13px] sm:text-[15px]">
                  Pick all that apply — order matters
                </p>
              </div>

              {/* Intentions Grid */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {INTENTION_OPTIONS.map((option, index) => {
                    const isSelected = data.intentions.includes(option.value);
                    const selectedIndex = data.intentions.indexOf(option.value);
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleIntentionToggle(option.value)}
                        className={`py-3 px-2 sm:py-4 sm:px-3 border-2 transition-all text-center relative flex flex-col items-center justify-center min-h-[80px] sm:min-h-[95px] ${
                          isSelected
                            ? 'border-[#ff6b35] bg-[#ff6b35]/5'
                            : 'border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-[22px] sm:text-[26px] mb-0.5 sm:mb-1">{option.emoji}</div>
                        <p className={`font-normal leading-[16px] sm:leading-[18px] not-italic text-[12px] sm:text-[13px] ${
                          isSelected ? 'text-white' : 'text-neutral-300'
                        }`}>
                          {option.short}
                        </p>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ff6b35] flex items-center justify-center">
                            <span className="text-black font-normal leading-[16px] not-italic text-[10px] sm:text-[11px]">{selectedIndex + 1}</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-neutral-500 font-normal leading-[16px] not-italic text-[11px] sm:text-[12px] text-center pt-0.5 sm:pt-1">
                  First selected = highest priority
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
            {step === 2 && (
              <Button
                onClick={() => setStep(1)}
                className="h-10 sm:h-12 px-5 sm:px-7 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 rounded-none font-normal leading-[16px] not-italic text-[11px] sm:text-[12px] tracking-[2.2px] sm:tracking-[2.4px] uppercase transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              disabled={step === 1 ? !isStep1Complete : !isStep2Complete}
              className="h-10 sm:h-12 px-6 sm:px-9 flex-1 bg-[#ff6b35] hover:bg-[#ff8555] text-black disabled:bg-neutral-800 disabled:text-neutral-600 rounded-none font-normal leading-[16px] not-italic text-[11px] sm:text-[12px] tracking-[2.2px] sm:tracking-[2.4px] uppercase transition-colors flex items-center justify-center gap-2"
            >
              {step === 1 ? 'Continue' : 'Generate Ideas'}
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-5 sm:px-8 py-2 sm:py-3 border-t border-neutral-900">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-normal leading-[14px] not-italic text-[10px] sm:text-[11px] text-neutral-500 tracking-[0.55px] sm:tracking-[0.6px] text-center">
            {step === 1 ? 'Helps us recommend better ideas' : 'Your data stays local — no tracking'}
          </p>
        </div>
      </footer>
    </div>
  );
}
