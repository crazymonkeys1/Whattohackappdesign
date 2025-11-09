import { useState, useEffect } from 'react';
import { LandingView } from './components/LandingView';
import { HackathonDataView } from './components/HackathonDataView';
import { ResultsView } from './components/ResultsView';
import { OnboardingSteps, OnboardingData } from './components/OnboardingSteps';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { extractHackathonData, analyzeSponsorOpportunities } from './utils/ai';
// Import test utilities (available in browser console)
import './utils/aiTest';

export type UserProfile = {
  technical: 'technical' | 'non-technical' | null;
  commitment: 'continuous' | 'balanced' | null;
  intention: 'startup' | 'hired' | 'win-prize' | 'impress' | 'learn' | null;
};

export type SponsorOpportunity = {
  type: string;
  description: string;
  example: string;
};

export type SponsorAnalysis = {
  sponsor: string;
  company_snapshot?: {
    company_name: string;
    main_products: string[];
    target_audience: string;
    recent_updates: string[];
    competitors: string[];
    differentiation: string;
  };
  opportunities: SponsorOpportunity[];
};

export type HackathonData = {
  name: string;
  date: string;
  location: string;
  organizer: string;
  sponsors: string[];
  description: string;
  jury: string[];
  url?: string;
  theme?: string;
  prizes?: string;
  sponsorAnalysis?: SponsorAnalysis[];
};

export type ProjectIdea = {
  id: string;
  title: string;
  description: string;
  score: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  techRequirements: 'low-code' | 'moderate' | 'highly-technical';
  sponsors: string[];
  why: string;
  leverages: string[];
  requiredSkills: string[];
  estimatedTime: string;
};

type ViewState = 'landing' | 'onboarding' | 'data' | 'results';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [hackathonData, setHackathonData] = useState<HackathonData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    technical: null,
    commitment: null,
    intention: null,
  });
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Show AI setup instructions on load
  useEffect(() => {
    console.log('%c🚀 What To Hack - AI Integration Enabled', 'font-size: 16px; font-weight: bold; color: #ff6b35');
    console.log('%c✨ New: Ideas auto-generate after onboarding!', 'font-size: 14px; font-weight: bold; color: #ff6b35');
    console.log('%c⚡ Featured hackathons have instant pre-generated reports', 'font-size: 12px; color: #ff6b35');
    console.log('%c\n📝 To test real AI:', 'font-size: 14px; font-weight: bold; color: #ffffff');
    console.log('%c1. Get OpenAI API key: https://platform.openai.com/api-keys', 'color: #a1a1a1');
    console.log('%c2. Add key to /utils/ai.ts (line 15)', 'color: #a1a1a1');
    console.log('%c3. Enter a hackathon URL or click a featured one', 'color: #a1a1a1');
    console.log('%c\n🧪 Test commands available:', 'font-size: 14px; font-weight: bold; color: #ffffff');
    console.log('%c   testHackathonExtraction("https://hackathon-url")', 'color: #ff6b35');
    console.log('%c   testIdeasGeneration()', 'color: #ff6b35');
    console.log('%c   testLeveragesGeneration()', 'color: #ff6b35');
    console.log('%c   testFullGeneration()', 'color: #ff6b35');
    console.log('%c\n📚 Docs: /AUTO_GENERATION_GUIDE.md | /HACKATHON_EXTRACTION_GUIDE.md', 'color: #a1a1a1');
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    try {
      // Show loading toast
      toast.loading('Analyzing hackathon page...', { id: 'extract-hackathon' });
      
      // Extract data using AI
      const data = await extractHackathonData({ url: query });
      
      // Update toast for sponsor analysis
      toast.loading('Analyzing sponsor opportunities...', { id: 'extract-hackathon' });
      
      // Analyze sponsor opportunities for each sponsor
      const sponsorAnalyses: SponsorAnalysis[] = [];
      for (const sponsor of data.sponsors || []) {
        try {
          const analysis = await analyzeSponsorOpportunities(
            sponsor,
            data.name,
            data.organizer,
            data.theme
          );
          sponsorAnalyses.push({
            sponsor,
            company_snapshot: analysis.company_snapshot,
            opportunities: analysis.opportunities || [],
          });
        } catch (error) {
          console.error(`Failed to analyze ${sponsor}:`, error);
          // Continue with other sponsors
        }
      }
      
      // Add sponsor analysis to data
      const enrichedData = {
        ...data,
        sponsorAnalysis: sponsorAnalyses,
      };
      
      setHackathonData(enrichedData);
      
      // Success toast
      toast.success('Hackathon analyzed successfully!', { id: 'extract-hackathon' });
      
      // Go to onboarding
      setView('onboarding');
    } catch (error) {
      console.error('Failed to extract hackathon data:', error);
      toast.error('Failed to analyze hackathon. Please check the URL and try again.', { id: 'extract-hackathon' });
    }
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setView('results');
  };

  const handleOnboardingSkip = () => {
    setView('results');
  };

  const handleBackToSearch = () => {
    setView('landing');
    setHackathonData(null);
    setUserProfile({ technical: null, commitment: null, intention: null });
    setOnboardingData(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen">
      <Toaster />
      {view === 'landing' && <LandingView onSearch={handleSearch} />}
      {view === 'onboarding' && hackathonData && (
        <OnboardingSteps
          hackathonData={hackathonData}
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
          onBackToHome={handleBackToSearch}
        />
      )}
      {view === 'results' && hackathonData && (
        <ResultsView
          hackathonData={hackathonData}
          userProfile={userProfile}
          onboardingData={onboardingData}
          onUpdateProfile={setUserProfile}
          onBack={handleBackToSearch}
        />
      )}
      <Toaster />
    </div>
  );
}
