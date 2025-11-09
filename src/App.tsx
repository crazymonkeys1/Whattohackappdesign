import { useState, useEffect } from 'react';
import { LandingView } from './components/LandingView';
import { HackathonDataView } from './components/HackathonDataView';
import { ResultsView } from './components/ResultsView';
import { OnboardingSteps, OnboardingData } from './components/OnboardingSteps';
import { AnalyzingOverlay } from './components/AnalyzingOverlay';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { extractHackathonData, analyzeSponsorOpportunities } from './utils/ai';
import { getMockHackathonData, hasPreGeneratedReport } from './utils/preGeneratedReports';
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
  const [analyzingStage, setAnalyzingStage] = useState<'extracting' | 'analyzing-sponsors' | null>(null);
  const [sponsorProgress, setSponsorProgress] = useState({ current: 0, total: 0 });

  // Show AI setup instructions on load
  useEffect(() => {
    console.log('%c🚀 What To Hack - Demo Mode Active', 'font-size: 16px; font-weight: bold; color: #ff6b35');
    console.log('%c✨ Try featured hackathons for instant results!', 'font-size: 14px; font-weight: bold; color: #ff6b35');
    console.log('%c⚡ Supabase Launch Week & HackMIT 2025 have pre-generated reports', 'font-size: 12px; color: #ff6b35');
    console.log('%c\n⚠️  OpenAI API not configured - using demo data', 'font-size: 14px; font-weight: bold; color: #ffaa00');
    console.log('%c\n📝 To enable real AI analysis:', 'font-size: 14px; font-weight: bold; color: #ffffff');
    console.log('%c1. Get OpenAI API key: https://platform.openai.com/api-keys', 'color: #a1a1a1');
    console.log('%c2. Replace key in /utils/ai.ts (line 15)', 'color: #a1a1a1');
    console.log('%c3. Enter any hackathon URL for live extraction', 'color: #a1a1a1');
    console.log('%c\n🧪 Test commands available:', 'font-size: 14px; font-weight: bold; color: #ffffff');
    console.log('%c   testHackathonExtraction("https://hackathon-url")', 'color: #ff6b35');
    console.log('%c   testIdeasGeneration()', 'color: #ff6b35');
    console.log('%c   testLeveragesGeneration()', 'color: #ff6b35');
    console.log('%c   testFullGeneration()', 'color: #ff6b35');
    console.log('%c\n📚 Docs: /AUTO_GENERATION_GUIDE.md | /HACKATHON_EXTRACTION_GUIDE.md', 'color: #a1a1a1');
    console.log('%c\n💡 Tip: Featured hackathons work perfectly without API key!', 'font-size: 12px; color: #00ff88');
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    try {
      // Check if this is a featured hackathon with pre-generated data
      const mockData = getMockHackathonData(query);
      
      if (mockData && hasPreGeneratedReport(query)) {
        // Featured hackathon with instant report - skip API calls
        console.log(`⚡ Using pre-generated data for: ${query}`);
        setAnalyzingStage('extracting');
        toast.loading('Loading hackathon data...', { id: 'extract-hackathon' });
        
        // Simulate a brief loading for UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setHackathonData(mockData);
        setAnalyzingStage(null);
        toast.success('Hackathon loaded instantly! ⚡', { id: 'extract-hackathon' });
        setView('onboarding');
        return;
      }
      
      // Try AI extraction
      try {
        // Stage 1: Extract hackathon data
        setAnalyzingStage('extracting');
        toast.loading('Analyzing hackathon page...', { id: 'extract-hackathon' });
        
        const data = await extractHackathonData({ url: query });
        
        // Stage 2: Analyze sponsors
        const sponsorCount = data.sponsors?.length || 0;
        setAnalyzingStage('analyzing-sponsors');
        setSponsorProgress({ current: 0, total: sponsorCount });
        toast.loading(`Analyzing ${sponsorCount} sponsor opportunities...`, { id: 'extract-hackathon' });
        
        const sponsorAnalyses: SponsorAnalysis[] = [];
        for (let i = 0; i < (data.sponsors || []).length; i++) {
          const sponsor = data.sponsors![i];
          
          // Update progress
          setSponsorProgress({ current: i + 1, total: sponsorCount });
          
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
        
        // Clear analyzing state
        setAnalyzingStage(null);
        setSponsorProgress({ current: 0, total: 0 });
        
        // Success toast
        toast.success('Hackathon analyzed successfully!', { id: 'extract-hackathon' });
        
        // Go to onboarding
        setView('onboarding');
      } catch (apiError: any) {
        console.error('API extraction failed:', apiError);
        
        // Check if we have mock data as fallback
        if (mockData) {
          console.log(`⚠️ API failed, using mock data for: ${query}`);
          setHackathonData(mockData);
          setAnalyzingStage(null);
          setSponsorProgress({ current: 0, total: 0 });
          toast.success('Loaded hackathon data (demo mode)', { id: 'extract-hackathon' });
          setView('onboarding');
          return;
        }
        
        // No fallback available
        throw apiError;
      }
    } catch (error: any) {
      console.error('Failed to extract hackathon data:', error);
      
      // Clear analyzing state
      setAnalyzingStage(null);
      setSponsorProgress({ current: 0, total: 0 });
      
      // Show appropriate error message
      const isAuthError = error?.message?.includes('401') || error?.message?.includes('API call failed');
      
      if (isAuthError) {
        toast.error(
          'AI analysis unavailable - OpenAI API key not configured. Try a featured hackathon for instant results!',
          { id: 'extract-hackathon', duration: 5000 }
        );
      } else {
        toast.error('Failed to analyze hackathon. Please check the URL and try again.', { id: 'extract-hackathon' });
      }
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
      
      {/* Full-screen analyzing overlay */}
      <AnalyzingOverlay 
        stage={analyzingStage}
        sponsorCount={sponsorProgress.total}
        currentSponsor={sponsorProgress.current}
      />
      
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
