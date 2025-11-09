import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { DemoModeBanner } from './DemoModeBanner';
import { hasPreGeneratedReport } from '../utils/preGeneratedReports';
import { Zap, Loader2 } from 'lucide-react';

type LandingViewProps = {
  onSearch: (query: string) => void;
};

const FEATURED_HACKATHONS = [
  { name: 'Supabase Launch Week', date: 'Dec 15-22, 2025', category: 'Backend & AI' },
  { name: 'HackMIT 2025', date: 'Sep 20-22, 2025', category: 'General' },
  { name: 'ETHGlobal Paris', date: 'Jul 12-14, 2025', category: 'Web3' },
  { name: 'Junction 2025', date: 'Nov 8-10, 2025', category: 'Hardware' },
];

export function LandingView({ onSearch }: LandingViewProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      onSearch(query);
    }
  };

  const handleFeaturedClick = (hackathonName: string) => {
    setIsSearching(true);
    onSearch(hackathonName);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    const mainContainer = document.getElementById('landing-main-container');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div id="landing-main-container" className="h-screen bg-black flex flex-col overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <header className="relative z-10 px-5 sm:px-8 py-5 sm:py-4">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-normal leading-[16px] not-italic text-[11px] sm:text-[12px] text-neutral-500 tracking-[2.2px] sm:tracking-[2.4px] uppercase">
            What To Hack
          </p>
        </div>
      </header>

      {/* Main Content - Mobile First Design */}
      <main className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 py-8 sm:py-12 min-h-[calc(100vh-120px)] flex flex-col justify-center">
          
          {/* Hero Title - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-neutral-500 text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] mb-3 sm:mb-4">
              Don't know what to build? We do.
            </p>
            <h1 className="font-normal leading-[0.95] not-italic text-[54px] sm:text-[72px] lg:text-[96px] text-white tracking-[-2.2px] sm:tracking-[-2.4px] mb-4 sm:mb-5">
              Win Hackathons
            </h1>
            <div className="max-w-[500px] sm:max-w-[600px] mx-auto space-y-0.5">
              <p className="text-white text-[15px] sm:text-[17px] leading-[22px] sm:leading-[26px]">
                Build projects the sponsors love<br className="sm:hidden" /> and the jury can't ignore.
              </p>
              <p className="text-[#ff6b35] text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] pt-1 italic">
                Spoilers: 'built with their API' always wins.
              </p>
            </div>
          </div>

          {/* Search Form - Mobile First, Touch Optimized */}
          <div className="mb-8 sm:mb-12 w-full max-w-[900px] mx-auto">
            <div className="bg-neutral-950 p-5 sm:p-6 border border-neutral-900">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Paste hackathon URL or name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 !h-16 !min-h-[64px] !py-0 flex items-center bg-black border-2 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:border-[#ff6b35] rounded-none !px-5 transition-colors !text-[18px] sm:!text-[17px]"
                  disabled={isSearching}
                  style={{ height: '64px', fontSize: '18px', lineHeight: '64px' }}
                />
                <Button
                  type="submit"
                  disabled={!query.trim() || isSearching}
                  className="h-16 min-h-[64px] px-10 sm:px-10 bg-[#ff6b35] hover:bg-[#ff8555] text-black rounded-none font-normal leading-[16px] not-italic text-[13px] tracking-[2.6px] uppercase transition-colors flex items-center justify-center gap-2"
                >
                  {isSearching && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSearching ? 'Analyzing...' : 'Analyze'}
                </Button>
              </form>
              <p className="text-neutral-600 text-[10px] leading-[14px] mt-3 text-center">
                {isSearching 
                  ? '🔍 Analyzing hackathon page and identifying strategic opportunities...'
                  : 'AI will analyze the page and extract hackathon details & sponsors'
                }
              </p>
            </div>
          </div>

          {/* Demo Mode Banner */}
          <div className="w-full max-w-[900px] mx-auto mb-8">
            <DemoModeBanner />
          </div>

          {/* Featured Hackathons - Mobile First Approach */}
          <div className="w-full -mx-5 sm:mx-0 sm:max-w-[1100px] sm:mx-auto">
            <p className="font-normal leading-[16px] not-italic text-[11px] sm:text-[12px] text-neutral-500 tracking-[2.2px] sm:tracking-[2.4px] uppercase mb-5 text-center px-5 sm:px-0">
              Featured Hackathons
            </p>
            
            {/* Mobile: Horizontal scroll with larger cards */}
            <div className="sm:hidden overflow-x-auto px-5 pb-2 scrollbar-hide">
              <div className="flex gap-4 w-max">
                {FEATURED_HACKATHONS.map((hackathon, index) => (
                  <button
                    key={index}
                    onClick={() => handleFeaturedClick(hackathon.name)}
                    className="text-left p-6 bg-neutral-950 border border-neutral-900 active:border-[#ff6b35] transition-all group w-[280px] flex-shrink-0 relative disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={isSearching}
                  >
                    {hasPreGeneratedReport(hackathon.name) && (
                      <div className="absolute top-3 right-3">
                        <Badge 
                          variant="outline" 
                          className="bg-[#ff6b35]/10 border-[#ff6b35]/30 text-[#ff6b35] text-[9px] gap-1"
                        >
                          <Zap className="w-2.5 h-2.5" />
                          Instant
                        </Badge>
                      </div>
                    )}
                    <p className="font-normal leading-[16px] not-italic text-[11px] text-neutral-600 tracking-[1.1px] uppercase mb-3">
                      {hackathon.category}
                    </p>
                    <p className="font-normal leading-[22px] not-italic text-[16px] text-white tracking-[-0.2px] mb-2 group-active:text-[#ff6b35] transition-colors">
                      {hackathon.name}
                    </p>
                    <p className="font-normal leading-[18px] not-italic text-[13px] text-neutral-600 tracking-[0.3px]">
                      {hackathon.date}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 px-0">
              {FEATURED_HACKATHONS.map((hackathon, index) => (
                <button
                  key={index}
                  onClick={() => handleFeaturedClick(hackathon.name)}
                  className="text-left p-4 sm:p-5 bg-neutral-950 border border-neutral-900 hover:border-[#ff6b35] transition-all group relative disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={isSearching}
                >
                  {hasPreGeneratedReport(hackathon.name) && (
                    <div className="absolute top-3 right-3">
                      <Badge 
                        variant="outline" 
                        className="bg-[#ff6b35]/10 border-[#ff6b35]/30 text-[#ff6b35] text-[9px] gap-1"
                      >
                        <Zap className="w-2.5 h-2.5" />
                        Instant
                      </Badge>
                    </div>
                  )}
                  <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-600 tracking-[0.6px] uppercase mb-2">
                    {hackathon.category}
                  </p>
                  <p className="font-normal leading-[18px] sm:leading-[20px] not-italic text-[13px] sm:text-[14px] text-white tracking-[-0.1504px] mb-1.5 group-hover:text-[#ff6b35] transition-colors">
                    {hackathon.name}
                  </p>
                  <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-600 tracking-[0.6px]">
                    {hackathon.date}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* What the Hell is this? - Link */}
      <div className="relative z-10 px-5 sm:px-8 py-6 text-center">
        <button
          onClick={scrollToAbout}
          className="text-neutral-500 hover:text-[#ff6b35] transition-colors text-[13px] sm:text-[14px] leading-[20px] tracking-[-0.2px] underline underline-offset-4"
        >
          What the Hell is this?
        </button>
      </div>

      {/* About Section */}
      <section id="about-section" className="relative z-10 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <h2 className="text-white text-[32px] sm:text-[48px] leading-[1.1] tracking-[-1.2px] sm:tracking-[-1.8px] mb-6 sm:mb-8">
            Hackathons are won<br />before they start.
          </h2>
          
          <div className="space-y-6 text-[#a1a1a1] text-[15px] sm:text-[17px] leading-[26px] sm:leading-[30px]">
            <p>
              Most teams waste hours brainstorming ideas, only to realize too late that their project doesn't align with sponsor prizes or judge preferences. <span className="text-white">What To Hack solves this.</span>
            </p>
            
            <p>
              Just paste a hackathon URL or name, and we'll analyze the sponsors, prizes, judging criteria, and past winners to give you strategic project ideas that are engineered to win.
            </p>
            
            <p>
              <span className="text-white">No guesswork. No wasted time.</span> Just data-driven project ideas that sponsors love and judges can't ignore.
            </p>
          </div>

          <div className="mt-12 sm:mt-16">
            <Button
              onClick={scrollToTop}
              className="w-full sm:w-auto px-10 py-4 bg-[#ff6b35] hover:bg-[#ff8555] text-black rounded-none font-normal text-[13px] tracking-[2.6px] uppercase transition-colors"
            >
              Back to Top
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-5 sm:px-8 py-4 sm:py-4 border-t border-neutral-900">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-normal leading-[16px] not-italic text-[11px] sm:text-[12px] text-neutral-500 tracking-[0.55px] sm:tracking-[0.6px] text-center">
            Free to use • No login required
          </p>
        </div>
      </footer>
    </div>
  );
}
