import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Users, Code, Lightbulb, Target, TrendingUp, Plus, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { AIGenerationButton } from './AIGenerationButton';
import { AIConfigStatus } from './AIConfigStatus';
import { HackathonData } from '../App';
import { OnboardingData } from './OnboardingSteps';

type ContextCardsProps = {
  hackathonData: HackathonData;
  onboardingData: OnboardingData | null;
  onUpdateContext: (context: string) => void;
  onRegenerate: () => void;
};

type Leverage = {
  id: string;
  category: string;
  opportunity: string;
  relevance: 'high' | 'medium' | 'low';
};

export function ContextCards({ hackathonData, onboardingData, onUpdateContext, onRegenerate }: ContextCardsProps) {
  const [expandedCard, setExpandedCard] = useState<'context' | 'intentions' | 'leverages' | null>(null);
  const [isEditingContext, setIsEditingContext] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [isEditingIntentions, setIsEditingIntentions] = useState(false);
  const [additionalContext, setAdditionalContext] = useState('');
  const [intentionsDetails, setIntentionsDetails] = useState('');
  const [leverageInstructions, setLeverageInstructions] = useState('');
  const [teamSize, setTeamSize] = useState(onboardingData?.teamSize || '1');
  const [technicalLevel, setTechnicalLevel] = useState(onboardingData?.technicalLevel || 'hobbyist');

  // Generate leverages from sponsor analysis if available
  const generateLeveragesFromAnalysis = (): Leverage[] => {
    if (!hackathonData.sponsorAnalysis || hackathonData.sponsorAnalysis.length === 0) {
      // Fallback to mock data if no analysis available
      return [
        {
          id: '1',
          category: 'Product Launch',
          opportunity: 'Figma just launched Figma Make, a competition to Lovable. They may be looking for early adopter user adoption and use cases.',
          relevance: 'high',
        },
        {
          id: '2',
          category: 'Jury Interest',
          opportunity: 'Paul Copplestone has been tweeting about AI-powered database tools. Projects showing AI + Supabase integration could catch attention.',
          relevance: 'high',
        },
        {
          id: '3',
          category: 'Sponsor Tech',
          opportunity: 'Algolia recently released AI Search - combining this with Supabase could create a unique technical showcase.',
          relevance: 'medium',
        },
      ];
    }

    // Convert sponsor opportunities to leverages
    const leverages: Leverage[] = [];
    let id = 1;

    hackathonData.sponsorAnalysis.forEach((analysis) => {
      // Take top 3 opportunities from each sponsor
      const topOpportunities = analysis.opportunities.slice(0, 3);
      
      topOpportunities.forEach((opp) => {
        // Determine relevance based on opportunity type
        let relevance: 'high' | 'medium' | 'low' = 'medium';
        if (opp.type.includes('1.') || opp.type.includes('2.')) {
          relevance = 'high';
        } else if (opp.type.includes('3.') || opp.type.includes('4.') || opp.type.includes('5.')) {
          relevance = 'medium';
        } else {
          relevance = 'low';
        }

        leverages.push({
          id: String(id++),
          category: `${analysis.sponsor}: ${opp.type.split('.')[1]?.trim() || opp.type}`,
          opportunity: opp.example || opp.description,
          relevance,
        });
      });
    });

    return leverages;
  };

  const allLeverages: Leverage[] = generateLeveragesFromAnalysis();

  const [selectedLeverages, setSelectedLeverages] = useState<string[]>(() => {
    // Auto-select high-relevance leverages
    return allLeverages
      .filter(l => l.relevance === 'high')
      .slice(0, 3)
      .map(l => l.id);
  });

  const toggleCard = (card: 'context' | 'intentions' | 'leverages') => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  const toggleLeverage = (id: string) => {
    setSelectedLeverages(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const selectedLeveragesList = allLeverages.filter(l => selectedLeverages.includes(l.id));

  const handleSaveContext = () => {
    onUpdateContext(additionalContext);
    setIsEditingContext(false);
  };

  const handleSaveTeam = () => {
    setIsEditingTeam(false);
  };

  const handleSaveIntentions = () => {
    setIsEditingIntentions(false);
  };

  return (
    <div className="border-b border-neutral-800/30 bg-black">
      <div className="px-4 sm:px-6 py-4 sm:py-5">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-4 sm:mb-5">
            <h2 className="font-normal leading-[18px] not-italic text-[12px] text-neutral-600 tracking-[2.4px] uppercase mb-1">
              Refine Your Results
            </h2>
            <p className="font-normal leading-[20px] not-italic text-[13px] text-neutral-500 tracking-[-0.15px]">
              Review and adjust the context to generate better project ideas
            </p>
          </div>

          {/* AI Config Status */}
          <AIConfigStatus />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Card 1: The Context */}
            <div className="border border-neutral-800 bg-neutral-950/50 rounded-sm overflow-hidden">
              <button
                onClick={() => toggleCard('context')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-900/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#ff6b35]" />
                  <h3 className="font-normal leading-[18px] not-italic text-[13px] text-white tracking-[-0.2px]">
                    The Context
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase">
                    {expandedCard === 'context' ? 'Collapse' : 'View'}
                  </span>
                  {expandedCard === 'context' ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </div>
              </button>

              {expandedCard === 'context' && (
                <div className="px-4 pb-4 pt-2 border-t border-neutral-800/50 bg-neutral-950">
                  {/* Hackathon Intention */}
                  <div className="mb-4">
                    <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase mb-2">
                      Hackathon Goal
                    </p>
                    <p className="font-normal leading-[18px] not-italic text-[12px] text-neutral-400 tracking-[-0.1px]">
                      {hackathonData.description}
                    </p>
                  </div>

                  {/* Sponsors Info */}
                  <div className="mb-4">
                    <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase mb-2">
                      Key Sponsors & Tech
                    </p>
                    <div className="space-y-2">
                      {hackathonData.sponsors.map((sponsor, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Badge variant="outline" className="bg-neutral-900 border-neutral-800 text-neutral-400 text-[10px]">
                            {sponsor}
                          </Badge>
                          <p className="font-normal leading-[16px] not-italic text-[11px] text-neutral-500 tracking-[-0.1px]">
                            {sponsor === 'Supabase' && 'Open-source Firebase alternative - Auth, Database, Storage'}
                            {sponsor === 'Algolia' && 'AI-powered search and discovery platform'}
                            {sponsor === 'Figma' && 'Collaborative design and prototyping tool'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase">
                        Your Team
                      </p>
                      {!isEditingTeam && (
                        <button
                          onClick={() => setIsEditingTeam(true)}
                          className="text-neutral-500 hover:text-[#ff6b35] transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {isEditingTeam ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={teamSize}
                            onChange={(e) => setTeamSize(e.target.value)}
                            placeholder="Team size"
                            className="bg-black border-neutral-800 text-neutral-300 text-[12px] h-8"
                          />
                          <select
                            value={technicalLevel}
                            onChange={(e) => setTechnicalLevel(e.target.value)}
                            className="flex h-8 w-full rounded-md border border-neutral-800 bg-black px-3 py-1 text-[12px] text-neutral-300"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="hobbyist">Hobbyist</option>
                            <option value="professional">Professional</option>
                            <option value="expert">Expert</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveTeam}
                            size="sm"
                            className="bg-[#ff6b35] hover:bg-[#ff8555] text-white text-[11px] h-7"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setIsEditingTeam(false)}
                            size="sm"
                            variant="ghost"
                            className="text-neutral-500 hover:text-white text-[11px] h-7"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-neutral-600" />
                          <span className="font-normal leading-[16px] not-italic text-[12px] text-neutral-400 tracking-[-0.1px]">
                            {teamSize} {teamSize === '1' ? 'person' : 'people'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Code className="w-3.5 h-3.5 text-neutral-600" />
                          <span className="font-normal leading-[16px] not-italic text-[12px] text-neutral-400 tracking-[-0.1px] capitalize">
                            {technicalLevel}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Context */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase">
                        Additional Context
                      </p>
                      {!isEditingContext && (
                        <button
                          onClick={() => setIsEditingContext(true)}
                          className="text-neutral-500 hover:text-[#ff6b35] transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {isEditingContext ? (
                      <div className="space-y-2">
                        <Textarea
                          value={additionalContext}
                          onChange={(e) => setAdditionalContext(e.target.value)}
                          placeholder="Add any specific requirements, constraints, or ideas..."
                          className="min-h-[80px] bg-black border-neutral-800 text-neutral-300 text-[12px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveContext}
                            size="sm"
                            className="bg-[#ff6b35] hover:bg-[#ff8555] text-white text-[11px] h-7"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setIsEditingContext(false)}
                            size="sm"
                            variant="ghost"
                            className="text-neutral-500 hover:text-white text-[11px] h-7"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="font-normal leading-[18px] not-italic text-[12px] text-neutral-500 tracking-[-0.1px]">
                        {additionalContext || 'Click edit to add specific requirements or context'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: Intentions & Restrictions */}
            <div className="border border-neutral-800 bg-neutral-950/50 rounded-sm overflow-hidden">
              <button
                onClick={() => toggleCard('intentions')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-900/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#ff6b35]" />
                  <h3 className="font-normal leading-[18px] not-italic text-[13px] text-white tracking-[-0.2px]">
                    Intentions & Restrictions
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase">
                    {expandedCard === 'intentions' ? 'Collapse' : 'View'}
                  </span>
                  {expandedCard === 'intentions' ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </div>
              </button>

              {expandedCard === 'intentions' && (
                <div className="px-4 pb-4 pt-2 border-t border-neutral-800/50 bg-neutral-950">
                  {/* Your Goals */}
                  <div className="mb-4">
                    <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase mb-2">
                      Your Goals
                    </p>
                    {onboardingData?.intentions && onboardingData.intentions.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {onboardingData.intentions.map((intention, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-neutral-900 border-neutral-700 text-neutral-300 text-[11px]"
                          >
                            {intention === 'get-hired' && '💼 Get hired'}
                            {intention === 'win-prize' && '🏆 Win prizes'}
                            {intention === 'launch-startup' && '🚀 Launch startup'}
                            {intention === 'build-portfolio' && '📂 Build portfolio'}
                            {intention === 'learn-tech' && '📚 Learn tech'}
                            {intention === 'network' && '🎉 Network'}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="font-normal leading-[18px] not-italic text-[12px] text-neutral-500 tracking-[-0.1px]">
                        No specific goals set
                      </p>
                    )}
                  </div>

                  {/* Time Commitment */}
                  <div className="mb-4">
                    <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase mb-2">
                      Commitment Level
                    </p>
                    <p className="font-normal leading-[18px] not-italic text-[12px] text-neutral-400 tracking-[-0.1px] capitalize">
                      {onboardingData?.commitmentLevel === 'hardcore' && '🔥 All in — no sleep'}
                      {onboardingData?.commitmentLevel === 'balanced' && '⚖️ Work hard, sleep harder'}
                      {onboardingData?.commitmentLevel === 'casual' && '😎 Chill vibes only'}
                      {!onboardingData?.commitmentLevel && 'Not specified'}
                    </p>
                  </div>

                  {/* Additional Details */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase">
                        Additional Details
                      </p>
                      {!isEditingIntentions && (
                        <button
                          onClick={() => setIsEditingIntentions(true)}
                          className="text-neutral-500 hover:text-[#ff6b35] transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {isEditingIntentions ? (
                      <div className="space-y-2">
                        <Textarea
                          value={intentionsDetails}
                          onChange={(e) => setIntentionsDetails(e.target.value)}
                          placeholder="Add specific constraints, preferences, or goals..."
                          className="min-h-[80px] bg-black border-neutral-800 text-neutral-300 text-[12px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveIntentions}
                            size="sm"
                            className="bg-[#ff6b35] hover:bg-[#ff8555] text-white text-[11px] h-7"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setIsEditingIntentions(false)}
                            size="sm"
                            variant="ghost"
                            className="text-neutral-500 hover:text-white text-[11px] h-7"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="font-normal leading-[18px] not-italic text-[12px] text-neutral-500 tracking-[-0.1px]">
                        {intentionsDetails || 'Click edit to add more specific details about your intentions'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Card 3: Key Leverages */}
            <div className="border border-neutral-800 bg-neutral-950/50 rounded-sm overflow-hidden">
              <button
                onClick={() => toggleCard('leverages')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-900/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#ff6b35]" />
                  <h3 className="font-normal leading-[18px] not-italic text-[13px] text-white tracking-[-0.2px]">
                    Key Leverages
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-[#ff6b35]/10 border-[#ff6b35]/30 text-[#ff6b35] text-[10px]">
                    AI
                  </Badge>
                  <span className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase">
                    {expandedCard === 'leverages' ? 'Collapse' : 'View'}
                  </span>
                  {expandedCard === 'leverages' ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </div>
              </button>

              {expandedCard === 'leverages' && (
                <div className="px-4 pb-4 pt-2 border-t border-neutral-800/50 bg-neutral-950">
                  <p className="font-normal leading-[16px] not-italic text-[11px] text-neutral-500 tracking-[-0.1px] mb-3">
                    Select opportunities to prioritize in your project ideas
                  </p>

                  {/* Selected Leverages */}
                  <div className="mb-3">
                    <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase mb-2">
                      Selected ({selectedLeveragesList.length})
                    </p>
                    <div className="space-y-2">
                      {selectedLeveragesList.map((leverage) => (
                        <div key={leverage.id} className="border border-neutral-800/80 bg-neutral-900/50 p-3 rounded-sm">
                          <div className="flex items-start justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${
                                  leverage.relevance === 'high'
                                    ? 'bg-[#ff6b35]/10 border-[#ff6b35]/30 text-[#ff6b35]'
                                    : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                                }`}
                              >
                                {leverage.category}
                              </Badge>
                              {leverage.relevance === 'high' && (
                                <span className="font-normal leading-[14px] not-italic text-[9px] text-[#ff6b35] tracking-[0.6px] uppercase">
                                  High Impact
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => toggleLeverage(leverage.id)}
                              className="text-[#ff6b35] hover:text-[#ff8555] transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="font-normal leading-[18px] not-italic text-[12px] text-neutral-400 tracking-[-0.1px]">
                            {leverage.opportunity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Unselected Leverages */}
                  {allLeverages.filter(l => !selectedLeverages.includes(l.id)).length > 0 && (
                    <div className="mb-3">
                      <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase mb-2">
                        Available
                      </p>
                      <div className="space-y-2">
                        {allLeverages
                          .filter(l => !selectedLeverages.includes(l.id))
                          .map((leverage) => (
                            <div key={leverage.id} className="border border-neutral-800/50 bg-transparent p-3 rounded-sm">
                              <div className="flex items-start justify-between mb-1.5">
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-neutral-900 border-neutral-800 text-neutral-500"
                                >
                                  {leverage.category}
                                </Badge>
                                <button
                                  onClick={() => toggleLeverage(leverage.id)}
                                  className="text-neutral-600 hover:text-[#ff6b35] transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="font-normal leading-[18px] not-italic text-[12px] text-neutral-500 tracking-[-0.1px]">
                                {leverage.opportunity}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Explore More CTA */}
                  <button className="w-full py-2 mb-3 border border-neutral-800 bg-transparent hover:bg-neutral-900/30 transition-colors rounded-sm">
                    <span className="font-normal leading-[14px] not-italic text-[11px] text-neutral-500 hover:text-[#ff6b35] tracking-[0.6px] uppercase">
                      Explore More Opportunities
                    </span>
                  </button>

                  {/* Leverage Instructions */}
                  <div>
                    <p className="font-normal leading-[14px] not-italic text-[10px] text-neutral-600 tracking-[0.6px] uppercase mb-2">
                      Leverage Instructions
                    </p>
                    <Textarea
                      value={leverageInstructions}
                      onChange={(e) => setLeverageInstructions(e.target.value)}
                      placeholder="Add specific instructions on how to use these leverages..."
                      className="min-h-[60px] bg-black border-neutral-800 text-neutral-300 text-[12px]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Regenerate Button */}
          <div className="mt-4 flex justify-end">
            <AIGenerationButton
              onGenerate={async () => {
                await onRegenerate();
              }}
              label="Regenerate Ideas"
              loadingLabel="Generating..."
              variant="default"
              className="bg-[#ff6b35] hover:bg-[#ff8555] text-black rounded-none font-normal leading-[16px] not-italic text-[11px] tracking-[2px] uppercase h-9 px-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
