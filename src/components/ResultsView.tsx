import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailSidebar } from './ProjectDetailSidebar';
import { LeverageCard, Leverage } from './LeverageCard';
import { LeverageDetailSidebar } from './LeverageDetailSidebar';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { HackathonInfoHeader } from './HackathonInfoHeader';
import { ContextCards } from './ContextCards';
import { AISetupBanner } from './AISetupBanner';
import { HackathonData, UserProfile, ProjectIdea } from '../App';
import { OnboardingData } from './OnboardingSteps';
import { getMockProjects, getMockLeverages } from '../utils/mockData';
import { generateIdeas, generateLeverages } from '../utils/ai';
import { getPreGeneratedReport } from '../utils/preGeneratedReports';
import { toast } from 'sonner@2.0.3';

type ResultsViewProps = {
  hackathonData: HackathonData;
  userProfile: UserProfile;
  onboardingData: OnboardingData | null;
  onUpdateProfile: (profile: UserProfile) => void;
  onBack: () => void;
};

type Filters = {
  sponsors: string[];
  difficulty: string[];
  techRequirements: string[];
};

export function ResultsView({ hackathonData, userProfile, onboardingData, onUpdateProfile, onBack }: ResultsViewProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectIdea | null>(null);
  const [selectedLeverage, setSelectedLeverage] = useState<Leverage | null>(null);
  const [activeTab, setActiveTab] = useState<'ideas' | 'leverages'>('ideas');
  const [showFilters, setShowFilters] = useState(false);
  const [showUserInputs, setShowUserInputs] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    sponsors: [],
    difficulty: [],
    techRequirements: [],
  });
  const [sortBy, setSortBy] = useState<'score' | 'difficulty'>('score');
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedProjects, setGeneratedProjects] = useState<ProjectIdea[]>([]);
  const [generatedLeverages, setGeneratedLeverages] = useState<Leverage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasInitiallyGenerated, setHasInitiallyGenerated] = useState(false);
  const initialGenerationRef = useRef(false);

  const updateField = <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K]
  ) => {
    onUpdateProfile({ ...userProfile, [field]: value });
  };

  // Combine mock data with AI-generated data
  const mockProjects = getMockProjects(hackathonData.sponsors);
  const mockLeverages = getMockLeverages();
  const allProjects = [...mockProjects, ...generatedProjects];
  const allLeverages = [...mockLeverages, ...generatedLeverages];
  
  // Filter projects
  let filteredProjects = allProjects.filter((project) => {
    if (filters.sponsors.length > 0) {
      const hasMatchingSponsor = project.sponsors.some(s => filters.sponsors.includes(s));
      if (!hasMatchingSponsor) return false;
    }
    if (filters.difficulty.length > 0 && !filters.difficulty.includes(project.difficulty)) {
      return false;
    }
    if (filters.techRequirements.length > 0 && !filters.techRequirements.includes(project.techRequirements)) {
      return false;
    }
    return true;
  });

  // Sort projects
  if (sortBy === 'score') {
    filteredProjects = [...filteredProjects].sort((a, b) => b.score - a.score);
  } else {
    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
    filteredProjects = [...filteredProjects].sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  }

  const toggleFilter = (category: keyof Filters, value: string) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [category]: newValues });
  };

  const handleUpdateContext = (context: string) => {
    setAdditionalContext(context);
  };

  const handleRegenerate = async () => {
    try {
      setIsGenerating(true);
      
      // Generate new ideas with AI
      const ideas = await generateIdeas({
        hackathonName: hackathonData.name,
        sponsors: hackathonData.sponsors,
        technicalLevel: onboardingData?.technicalLevel || undefined,
        commitmentLevel: onboardingData?.commitmentLevel || undefined,
        teamSize: onboardingData?.teamSize || undefined,
        intentions: onboardingData?.intentions || undefined,
        additionalContext: additionalContext || undefined,
      });
      
      // Generate new leverages with AI
      const leverages = await generateLeverages({
        sponsors: hackathonData.sponsors,
        hackathonName: hackathonData.name,
        additionalContext: additionalContext || undefined,
      });

      // Ensure all ideas have unique IDs
      const ideasWithIds = ideas.map((idea, index) => ({
        ...idea,
        id: idea.id || `ai-gen-${Date.now()}-${index}`,
      }));

      // Ensure all leverages have unique IDs
      const leveragesWithIds = leverages.map((leverage, index) => ({
        ...leverage,
        id: leverage.id || `ai-lev-${Date.now()}-${index}`,
      }));

      setGeneratedProjects(ideasWithIds);
      setGeneratedLeverages(leveragesWithIds);
      setHasInitiallyGenerated(true);
    } catch (error) {
      console.error('Failed to generate with AI:', error);
      // The AIGenerationButton component will show the error toast
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-generate ideas on first load
  useEffect(() => {
    // Only run once
    if (initialGenerationRef.current) return;
    initialGenerationRef.current = true;

    const generateInitialReport = async () => {
      try {
        // Check if there's a pre-generated report
        const preGenerated = getPreGeneratedReport(hackathonData.name);
        
        if (preGenerated) {
          console.log('📦 Loading pre-generated report for:', hackathonData.name);
          toast.success('Loading pre-generated report...', { id: 'initial-gen' });
          
          setGeneratedProjects(preGenerated.ideas);
          setGeneratedLeverages(preGenerated.leverages);
          setHasInitiallyGenerated(true);
          
          toast.success('Report loaded!', { id: 'initial-gen' });
          return;
        }

        // Generate fresh report
        console.log('🎯 Generating initial report...');
        toast.loading('Generating your personalized report...', { id: 'initial-gen' });
        
        setIsGenerating(true);
        
        const ideas = await generateIdeas({
          hackathonName: hackathonData.name,
          sponsors: hackathonData.sponsors,
          technicalLevel: onboardingData?.technicalLevel || undefined,
          commitmentLevel: onboardingData?.commitmentLevel || undefined,
          teamSize: onboardingData?.teamSize || undefined,
          intentions: onboardingData?.intentions || undefined,
          additionalContext: additionalContext || undefined,
        });
        
        const leverages = await generateLeverages({
          sponsors: hackathonData.sponsors,
          hackathonName: hackathonData.name,
          additionalContext: additionalContext || undefined,
        });

        const ideasWithIds = ideas.map((idea, index) => ({
          ...idea,
          id: idea.id || `ai-gen-${Date.now()}-${index}`,
        }));

        const leveragesWithIds = leverages.map((leverage, index) => ({
          ...leverage,
          id: leverage.id || `ai-lev-${Date.now()}-${index}`,
        }));

        setGeneratedProjects(ideasWithIds);
        setGeneratedLeverages(leveragesWithIds);
        setHasInitiallyGenerated(true);
        
        toast.success('Report generated successfully!', { id: 'initial-gen' });
      } catch (error) {
        console.error('Failed to generate initial report:', error);
        toast.error('Failed to generate report. You can try regenerating manually.', { id: 'initial-gen' });
      } finally {
        setIsGenerating(false);
      }
    };

    generateInitialReport();
  }, []); // Empty deps - only run once on mount

  return (
    <div className="min-h-screen bg-black">
      {/* Hackathon Info Header */}
      <HackathonInfoHeader data={hackathonData} onBackToHome={onBack} />

      {/* AI Setup Banner */}
      <AISetupBanner />

      {/* Context Cards */}
      <ContextCards
        hackathonData={hackathonData}
        onboardingData={onboardingData}
        onUpdateContext={handleUpdateContext}
        onRegenerate={handleRegenerate}
      />

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Content List - Scrollable */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${(selectedProject || selectedLeverage) ? 'w-[25vw]' : 'w-full'}`}>
          <div className="px-6 py-6">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'ideas' | 'leverages')} className="mb-6">
              <TabsList className="bg-neutral-950 border border-neutral-800 p-0 h-auto">
                <TabsTrigger 
                  value="ideas" 
                  className="data-[state=active]:bg-black data-[state=active]:text-[#ff6b35] text-neutral-500 px-8 py-3 font-normal leading-[14px] not-italic text-[11px] tracking-[2px] uppercase"
                >
                  Ideas
                </TabsTrigger>
                <TabsTrigger 
                  value="leverages" 
                  className="data-[state=active]:bg-black data-[state=active]:text-[#ff6b35] text-neutral-500 px-8 py-3 font-normal leading-[14px] not-italic text-[11px] tracking-[2px] uppercase"
                >
                  Leverages
                </TabsTrigger>
              </TabsList>

              {/* Ideas Tab Content */}
              <TabsContent value="ideas" className="mt-6">
                {/* Title */}
                <div className="mb-6">
                  <h2 className="font-normal leading-[64px] not-italic text-[56px] text-white tracking-[-2.4px] mb-2">
                    Ideas
                  </h2>
                  <p className="font-normal leading-[24px] not-italic text-[#a1a1a1] text-[16px] tracking-[-0.35px]">
                    {filteredProjects.length} concepts ranked by winning potential
                  </p>
                </div>

            {/* Foldable Filter Bar */}
            <div className="border border-neutral-800 bg-neutral-950 mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full py-4 px-5 group"
              >
                <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-500 tracking-[2px] uppercase group-hover:text-[#ff6b35] transition-colors">
                  Filters & Sort
                </p>
                <div className="flex items-center gap-3">
                  {(filters.sponsors.length > 0 || filters.difficulty.length > 0 || filters.techRequirements.length > 0) && (
                    <span className="font-normal leading-[14px] not-italic text-[10px] text-[#ff6b35] tracking-[0.6px]">
                      {filters.sponsors.length + filters.difficulty.length + filters.techRequirements.length} active
                    </span>
                  )}
                  {showFilters ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                </div>
              </button>

              {showFilters && (
                <div className="px-5 pb-5 space-y-4 border-t border-neutral-800">
                  {/* Sort Options */}
                  <div className="pt-4 bg-black p-3 border border-neutral-900">
                    <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                      Sort By
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSortBy('score')}
                        className={`font-normal leading-[18px] not-italic text-[12px] tracking-[-0.15px] transition-colors ${
                          sortBy === 'score' ? 'text-[#ff6b35]' : 'text-neutral-600 hover:text-white'
                        }`}
                      >
                        {sortBy === 'score' ? '● ' : '○ '}
                        Score
                      </button>
                      <button
                        onClick={() => setSortBy('difficulty')}
                        className={`font-normal leading-[18px] not-italic text-[12px] tracking-[-0.15px] transition-colors ${
                          sortBy === 'difficulty' ? 'text-[#ff6b35]' : 'text-neutral-600 hover:text-white'
                        }`}
                      >
                        {sortBy === 'difficulty' ? '● ' : '○ '}
                        Difficulty
                      </button>
                    </div>
                  </div>

                  {/* Filters Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-black p-3 border border-neutral-900">
                      <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                        Sponsors
                      </p>
                      <div className="space-y-1">
                        {hackathonData.sponsors.map((sponsor) => (
                          <button
                            key={sponsor}
                            onClick={() => toggleFilter('sponsors', sponsor)}
                            className={`block font-normal leading-[18px] not-italic text-[12px] tracking-[-0.15px] text-left hover:text-[#ff6b35] transition-colors ${
                              filters.sponsors.includes(sponsor) ? 'text-[#ff6b35]' : 'text-neutral-600'
                            }`}
                          >
                            {filters.sponsors.includes(sponsor) ? '● ' : '○ '}
                            {sponsor}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black p-3 border border-neutral-900">
                      <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                        Difficulty
                      </p>
                      <div className="space-y-1">
                        {[
                          { value: 'beginner', label: 'Easy' },
                          { value: 'intermediate', label: 'Medium' },
                          { value: 'advanced', label: 'Hard' },
                        ].map((level) => (
                          <button
                            key={level.value}
                            onClick={() => toggleFilter('difficulty', level.value)}
                            className={`block font-normal leading-[18px] not-italic text-[12px] tracking-[-0.15px] text-left hover:text-[#ff6b35] transition-colors ${
                              filters.difficulty.includes(level.value) ? 'text-[#ff6b35]' : 'text-neutral-600'
                            }`}
                          >
                            {filters.difficulty.includes(level.value) ? '● ' : '○ '}
                            {level.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black p-3 border border-neutral-900">
                      <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                        Tech Level
                      </p>
                      <div className="space-y-1">
                        {[
                          { value: 'low-code', label: 'Low-Code' },
                          { value: 'moderate', label: 'Moderate' },
                          { value: 'highly-technical', label: 'High-Tech' },
                        ].map((level) => (
                          <button
                            key={level.value}
                            onClick={() => toggleFilter('techRequirements', level.value)}
                            className={`block font-normal leading-[18px] not-italic text-[12px] tracking-[-0.15px] text-left hover:text-[#ff6b35] transition-colors ${
                              filters.techRequirements.includes(level.value) ? 'text-[#ff6b35]' : 'text-neutral-600'
                            }`}
                          >
                            {filters.techRequirements.includes(level.value) ? '● ' : '○ '}
                            {level.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Personalization */}
                  <div className="bg-black border border-neutral-900">
                    <button
                      onClick={() => setShowUserInputs(!showUserInputs)}
                      className="flex items-center justify-between w-full p-3 group"
                    >
                      <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-500 tracking-[0.6px] uppercase group-hover:text-[#ff6b35] transition-colors">
                        Personalize
                      </p>
                      {showUserInputs ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                    </button>

                    {showUserInputs && (
                      <div className="grid grid-cols-3 gap-3 p-3 border-t border-neutral-900">
                        <div>
                          <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                            Technical
                          </p>
                          <RadioGroup
                            value={userProfile.technical || ''}
                            onValueChange={(value) => updateField('technical', value as UserProfile['technical'])}
                            className="space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="technical" id="technical" className="border-neutral-600 data-[state=checked]:border-[#ff6b35] data-[state=checked]:bg-[#ff6b35] w-3 h-3" />
                              <Label htmlFor="technical" className="cursor-pointer font-normal leading-[18px] not-italic text-[12px] text-white tracking-[-0.15px]">
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="non-technical" id="non-technical" className="border-neutral-600 data-[state=checked]:border-[#ff6b35] data-[state=checked]:bg-[#ff6b35] w-3 h-3" />
                              <Label htmlFor="non-technical" className="cursor-pointer font-normal leading-[18px] not-italic text-[12px] text-white tracking-[-0.15px]">
                                No
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                            Sleep
                          </p>
                          <RadioGroup
                            value={userProfile.commitment || ''}
                            onValueChange={(value) => updateField('commitment', value as UserProfile['commitment'])}
                            className="space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="continuous" id="continuous" className="border-neutral-600 data-[state=checked]:border-[#ff6b35] data-[state=checked]:bg-[#ff6b35] w-3 h-3" />
                              <Label htmlFor="continuous" className="cursor-pointer font-normal leading-[18px] not-italic text-[12px] text-white tracking-[-0.15px]">
                                No Sleep
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="balanced" id="balanced" className="border-neutral-600 data-[state=checked]:border-[#ff6b35] data-[state=checked]:bg-[#ff6b35] w-3 h-3" />
                              <Label htmlFor="balanced" className="cursor-pointer font-normal leading-[18px] not-italic text-[12px] text-white tracking-[-0.15px]">
                                Need Sleep
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                            Goal
                          </p>
                          <RadioGroup
                            value={userProfile.intention || ''}
                            onValueChange={(value) => updateField('intention', value as UserProfile['intention'])}
                            className="space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="win-prize" id="win-prize" className="border-neutral-600 data-[state=checked]:border-[#ff6b35] data-[state=checked]:bg-[#ff6b35] w-3 h-3" />
                              <Label htmlFor="win-prize" className="cursor-pointer font-normal leading-[18px] not-italic text-[12px] text-white tracking-[-0.15px]">Win</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="startup" id="startup" className="border-neutral-600 data-[state=checked]:border-[#ff6b35] data-[state=checked]:bg-[#ff6b35] w-3 h-3" />
                              <Label htmlFor="startup" className="cursor-pointer font-normal leading-[18px] not-italic text-[12px] text-white tracking-[-0.15px]">Startup</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="learn" id="learn" className="border-neutral-600 data-[state=checked]:border-[#ff6b35] data-[state=checked]:bg-[#ff6b35] w-3 h-3" />
                              <Label htmlFor="learn" className="cursor-pointer font-normal leading-[18px] not-italic text-[12px] text-white tracking-[-0.15px]">Learn</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

                {/* Projects List */}
                <div className="border border-neutral-800">
                  {isGenerating && !hasInitiallyGenerated ? (
                    <div className="py-20 text-center">
                      <div className="animate-pulse mb-6">
                        <div className="h-3 w-3 bg-[#ff6b35] rounded-full mx-auto mb-4"></div>
                      </div>
                      <p className="font-normal leading-[28px] not-italic text-[#ff6b35] text-[18px] tracking-[-0.4px] mb-2">
                        Generating personalized ideas...
                      </p>
                      <p className="font-normal leading-[20px] not-italic text-[#a1a1a1] text-[14px] tracking-[-0.2px]">
                        This may take 5-10 seconds
                      </p>
                    </div>
                  ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => {
                          setSelectedProject(project);
                          setSelectedLeverage(null);
                        }}
                        isSelected={selectedProject?.id === project.id}
                        isLast={index === filteredProjects.length - 1}
                      />
                    ))
                  ) : (
                    <div className="py-20 text-center">
                      <p className="font-normal leading-[28px] not-italic text-[#a1a1a1] text-[18px] tracking-[-0.4px] mb-6">
                        {hasInitiallyGenerated ? 'No projects match your filters' : 'No ideas generated yet'}
                      </p>
                      {hasInitiallyGenerated && (
                        <Button
                          variant="outline"
                          onClick={() => setFilters({ sponsors: [], difficulty: [], techRequirements: [] })}
                          className="border-neutral-800 text-white hover:bg-[#ff6b35] hover:text-black hover:border-[#ff6b35] rounded-none h-10 px-6 font-normal leading-[14px] not-italic text-[10px] tracking-[2px] uppercase"
                        >
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Leverages Tab Content */}
              <TabsContent value="leverages" className="mt-6">
                {/* Title */}
                <div className="mb-6">
                  <h2 className="font-normal leading-[64px] not-italic text-[56px] text-white tracking-[-2.4px] mb-2">
                    Strategic Leverages
                  </h2>
                  <p className="font-normal leading-[24px] not-italic text-[#a1a1a1] text-[16px] tracking-[-0.35px]">
                    {allLeverages.length} opportunities identified from sponsor activities
                  </p>
                </div>

                {/* Leverages List */}
                <div className="border border-neutral-800">
                  {isGenerating && !hasInitiallyGenerated ? (
                    <div className="py-20 text-center">
                      <div className="animate-pulse mb-6">
                        <div className="h-3 w-3 bg-[#ff6b35] rounded-full mx-auto mb-4"></div>
                      </div>
                      <p className="font-normal leading-[28px] not-italic text-[#ff6b35] text-[18px] tracking-[-0.4px] mb-2">
                        Analyzing sponsor opportunities...
                      </p>
                      <p className="font-normal leading-[20px] not-italic text-[#a1a1a1] text-[14px] tracking-[-0.2px]">
                        This may take 5-10 seconds
                      </p>
                    </div>
                  ) : allLeverages.length > 0 ? (
                    allLeverages.map((leverage, index) => (
                      <LeverageCard
                        key={leverage.id}
                        leverage={leverage}
                        onClick={() => {
                          setSelectedLeverage(leverage);
                          setSelectedProject(null);
                        }}
                        isSelected={selectedLeverage?.id === leverage.id}
                        isLast={index === allLeverages.length - 1}
                      />
                    ))
                  ) : (
                    <div className="py-20 text-center">
                      <p className="font-normal leading-[28px] not-italic text-[#a1a1a1] text-[18px] tracking-[-0.4px]">
                        No leverages generated yet
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sliding Sidebar - 3/4 of screen */}
        {selectedProject && (
          <ProjectDetailSidebar
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        
        {selectedLeverage && (
          <LeverageDetailSidebar
            leverage={selectedLeverage}
            onClose={() => setSelectedLeverage(null)}
          />
        )}
      </div>
    </div>
  );
}
