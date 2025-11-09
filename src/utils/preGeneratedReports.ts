/**
 * Pre-Generated Reports Database
 * 
 * This file contains pre-generated reports for featured hackathons.
 * Reports are generated once and cached here for instant loading.
 * 
 * In production, this would be a real database (Supabase, etc.)
 */

import { ProjectIdea } from '../App';
import { Leverage } from '../components/LeverageCard';

type PreGeneratedReport = {
  hackathonName: string;
  generatedAt: string;
  ideas: ProjectIdea[];
  leverages: Leverage[];
};

/**
 * Pre-generated reports database
 * Add new reports here as they're generated
 */
const PRE_GENERATED_REPORTS: PreGeneratedReport[] = [
  {
    hackathonName: 'Supabase Launch Week',
    generatedAt: '2025-01-10',
    ideas: [
      {
        id: 'pre-gen-1',
        title: 'AI-Powered Database Query Assistant',
        description: 'Natural language interface for Supabase queries. Users describe what data they want in plain English, and the AI generates optimized SQL queries with proper joins and filters.',
        score: 95,
        category: 'AI Tools',
        difficulty: 'intermediate',
        techRequirements: 'moderate',
        sponsors: ['Supabase', 'OpenAI'],
        why: 'Combines Supabase\'s new AI features with OpenAI\'s GPT-4. Addresses a real pain point (writing complex SQL) and showcases both sponsors\' latest technology.',
        leverages: [
          'Supabase just launched AI features and vector search',
          'Paul Copplestone has been tweeting about AI + databases',
          'OpenAI partnerships are high-value for demos',
        ],
        requiredSkills: ['TypeScript', 'React', 'SQL', 'OpenAI API'],
        estimatedTime: '12-16 hours',
      },
      {
        id: 'pre-gen-2',
        title: 'Real-time Collaborative Whiteboard',
        description: 'Multiplayer whiteboard using Supabase Realtime for live collaboration. Features include drawing tools, sticky notes, and AI-powered shape recognition.',
        score: 88,
        category: 'Collaboration',
        difficulty: 'intermediate',
        techRequirements: 'moderate',
        sponsors: ['Supabase', 'Figma'],
        why: 'Demonstrates Supabase Realtime capabilities while complementing Figma\'s design tool ecosystem. Real-time apps always impress judges.',
        leverages: [
          'Supabase Realtime is a key differentiator vs Firebase',
          'Figma could integrate this into their plugin ecosystem',
          'Multiplayer experiences are trending in dev community',
        ],
        requiredSkills: ['React', 'Canvas API', 'WebSockets', 'Supabase Realtime'],
        estimatedTime: '14-18 hours',
      },
      {
        id: 'pre-gen-3',
        title: 'Smart Search Dashboard',
        description: 'Universal search interface powered by Algolia and Supabase. Searches across multiple data sources with AI-powered ranking and personalization.',
        score: 92,
        category: 'Search & Discovery',
        difficulty: 'intermediate',
        techRequirements: 'moderate',
        sponsors: ['Supabase', 'Algolia'],
        why: 'Perfect sponsor combo - Supabase stores data, Algolia powers search. Algolia recently launched AI Search, making this timely and relevant.',
        leverages: [
          'Algolia just released AI Search features',
          'Integration opportunities create "stack stickiness"',
          'Both sponsors benefit from showcasing interoperability',
        ],
        requiredSkills: ['React', 'Algolia InstantSearch', 'Supabase', 'TypeScript'],
        estimatedTime: '10-14 hours',
      },
      {
        id: 'pre-gen-4',
        title: 'No-Code API Builder',
        description: 'Visual interface to create REST APIs from Supabase tables. Drag-and-drop endpoint creation, automatic documentation, and Figma plugin for API visualization.',
        score: 85,
        category: 'Developer Tools',
        difficulty: 'advanced',
        techRequirements: 'highly-technical',
        sponsors: ['Supabase', 'Figma'],
        why: 'Targets no-code/low-code trend while showcasing advanced Supabase features. Figma plugin angle is unique and memorable.',
        leverages: [
          'No-code tools are massive trend in developer community',
          'Figma recently launched dev mode - natural extension',
          'Supabase wants to attract non-technical users',
        ],
        requiredSkills: ['React', 'Node.js', 'Figma Plugin API', 'Supabase Admin API'],
        estimatedTime: '16-20 hours',
      },
      {
        id: 'pre-gen-5',
        title: 'AI Content Moderator',
        description: 'Real-time content moderation system using Supabase Edge Functions and OpenAI. Automatically flags inappropriate content with context-aware AI analysis.',
        score: 90,
        category: 'AI Safety',
        difficulty: 'intermediate',
        techRequirements: 'moderate',
        sponsors: ['Supabase', 'OpenAI'],
        why: 'Addresses critical need (content moderation) with cutting-edge tech. Supabase Edge Functions are new and worth showcasing.',
        leverages: [
          'Content moderation is a pain point for all platforms',
          'Supabase Edge Functions recently launched',
          'AI safety is hot topic in tech community',
        ],
        requiredSkills: ['TypeScript', 'Deno', 'OpenAI Moderation API', 'Supabase'],
        estimatedTime: '10-12 hours',
      },
      {
        id: 'pre-gen-6',
        title: 'Design System Manager',
        description: 'Central hub for managing design tokens synced between Figma and Supabase. Developers and designers share a single source of truth for colors, typography, and spacing.',
        score: 87,
        category: 'Design Tools',
        difficulty: 'intermediate',
        techRequirements: 'moderate',
        sponsors: ['Figma', 'Supabase'],
        why: 'Bridges design-dev gap, a common pain point. Uses both sponsors equally and solves a real workflow problem.',
        leverages: [
          'Design tokens are trending in enterprise design systems',
          'Figma Variables feature needs better developer integration',
          'Supabase provides perfect backend for version control',
        ],
        requiredSkills: ['React', 'Figma API', 'Supabase', 'Design Tokens'],
        estimatedTime: '12-16 hours',
      },
    ],
    leverages: [
      {
        id: 'pre-lev-1',
        sponsor: 'Supabase',
        title: 'New AI Features Launch',
        description: 'Supabase recently launched AI-powered features including vector search and embeddings storage. Projects using these show early adoption.',
        category: 'Product Launch',
        tier: 1,
        relevance: 'high',
        actionableSteps: [
          'Use pgvector for semantic search',
          'Implement AI-powered recommendations',
          'Showcase embedding storage capabilities',
        ],
        potentialImpact: 'High - Paul Copplestone is actively promoting AI features on Twitter and would love to see real implementations.',
        examples: [
          'Semantic search across documentation',
          'AI-powered content recommendations',
          'Vector similarity matching for user profiles',
        ],
      },
      {
        id: 'pre-lev-2',
        title: 'Realtime Collaboration Trend',
        description: 'Multiplayer experiences are trending. Supabase Realtime is their key differentiator vs Firebase.',
        sponsor: 'Supabase',
        category: 'Technical Showcase',
        tier: 2,
        relevance: 'high',
        actionableSteps: [
          'Build multiplayer features',
          'Use presence tracking',
          'Implement collaborative editing',
        ],
        potentialImpact: 'High - Demonstrates Supabase\'s unique technical capabilities that competitors don\'t have.',
        examples: [
          'Collaborative whiteboard',
          'Live cursor tracking',
          'Real-time voting/polling',
        ],
      },
      {
        id: 'pre-lev-3',
        sponsor: 'Algolia',
        title: 'AI Search Release',
        description: 'Algolia just launched AI-powered search. Early projects showcasing this feature would get attention.',
        category: 'Product Launch',
        tier: 1,
        relevance: 'high',
        actionableSteps: [
          'Implement semantic search',
          'Use AI ranking',
          'Showcase personalization',
        ],
        potentialImpact: 'Very High - New feature that Algolia is actively promoting. Demo projects are valuable for their marketing.',
        examples: [
          'Smart product search',
          'Context-aware documentation search',
          'Personalized content discovery',
        ],
      },
      {
        id: 'pre-lev-4',
        sponsor: 'Figma',
        title: 'Figma Make Launch',
        description: 'Figma recently launched Figma Make (competitor to Lovable). Looking for early adopters and use case generation.',
        category: 'Strategic Positioning',
        tier: 8,
        relevance: 'high',
        actionableSteps: [
          'Build projects using Figma Make',
          'Create Figma plugins that complement Make',
          'Share Make workflow in presentation',
        ],
        potentialImpact: 'Strategic - Figma wants to establish Make in the market. Early adopters who publicly use it are valuable.',
        examples: [
          'Plugin built with Make',
          'Integration between Make and other tools',
          'Tutorial content for Make',
        ],
      },
      {
        id: 'pre-lev-5',
        sponsor: 'Figma',
        title: 'Design-to-Code Integration',
        description: 'Dev Mode recently launched. Projects showing Figma-to-code workflows are relevant.',
        category: 'Integration & Ecosystem',
        tier: 5,
        relevance: 'medium',
        actionableSteps: [
          'Use Figma API for design data',
          'Auto-generate code from Figma',
          'Sync design tokens',
        ],
        potentialImpact: 'Medium - Strengthens Figma\'s position in developer workflows.',
        examples: [
          'Design token sync tool',
          'Component code generator',
          'Design system manager',
        ],
      },
    ],
  },
  {
    hackathonName: 'HackMIT 2025',
    generatedAt: '2025-01-10',
    ideas: [
      {
        id: 'hackmit-1',
        title: 'Campus Resource Optimizer',
        description: 'AI-powered platform to optimize campus resources like study rooms, equipment, and events using predictive analytics.',
        score: 88,
        category: 'Education Tech',
        difficulty: 'intermediate',
        techRequirements: 'moderate',
        sponsors: ['General'],
        why: 'Addresses real campus pain points and demonstrates practical AI application in education.',
        leverages: ['HackMIT focuses on practical solutions', 'MIT community values efficiency tools'],
        requiredSkills: ['Python', 'React', 'Machine Learning', 'Data Analytics'],
        estimatedTime: '14-18 hours',
      },
      {
        id: 'hackmit-2',
        title: 'Research Paper Summarizer',
        description: 'AI tool that summarizes academic papers and identifies key contributions, methodologies, and future work.',
        score: 92,
        category: 'AI Tools',
        difficulty: 'intermediate',
        techRequirements: 'moderate',
        sponsors: ['General'],
        why: 'Directly helps researchers and students - the primary HackMIT audience.',
        leverages: ['Academic audience values research tools', 'NLP is trending at MIT'],
        requiredSkills: ['Python', 'NLP', 'React', 'PDF Processing'],
        estimatedTime: '12-16 hours',
      },
    ],
    leverages: [
      {
        id: 'hackmit-lev-1',
        sponsor: 'General',
        title: 'Academic Focus',
        description: 'HackMIT judges favor projects that solve real academic problems.',
        category: 'Audience Alignment',
        tier: 1,
        relevance: 'high',
        actionableSteps: ['Focus on student/researcher pain points', 'Use academic datasets', 'Present research value'],
        potentialImpact: 'High - Judges are MIT faculty and students who value practical academic tools.',
        examples: ['Course planning tool', 'Lab equipment scheduler', 'Research collaboration platform'],
      },
    ],
  },
];

/**
 * Get pre-generated report for a hackathon
 */
export function getPreGeneratedReport(hackathonName: string): PreGeneratedReport | null {
  // Normalize name for matching
  const normalizedName = hackathonName.toLowerCase().trim();
  
  const report = PRE_GENERATED_REPORTS.find(
    (r) => r.hackathonName.toLowerCase().trim() === normalizedName
  );

  if (report) {
    console.log(`✅ Found pre-generated report for: ${hackathonName}`);
    return report;
  }

  console.log(`ℹ️ No pre-generated report for: ${hackathonName}`);
  return null;
}

/**
 * Check if a hackathon has a pre-generated report
 */
export function hasPreGeneratedReport(hackathonName: string): boolean {
  return getPreGeneratedReport(hackathonName) !== null;
}

/**
 * Get all hackathons with pre-generated reports
 */
export function getAllPreGeneratedHackathons(): string[] {
  return PRE_GENERATED_REPORTS.map((r) => r.hackathonName);
}

/**
 * Add a new pre-generated report
 * (This would be an API call in production)
 */
export function addPreGeneratedReport(report: PreGeneratedReport): void {
  // Check if already exists
  const existingIndex = PRE_GENERATED_REPORTS.findIndex(
    (r) => r.hackathonName.toLowerCase() === report.hackathonName.toLowerCase()
  );

  if (existingIndex >= 0) {
    // Update existing
    PRE_GENERATED_REPORTS[existingIndex] = report;
    console.log(`♻️ Updated pre-generated report for: ${report.hackathonName}`);
  } else {
    // Add new
    PRE_GENERATED_REPORTS.push(report);
    console.log(`✨ Added new pre-generated report for: ${report.hackathonName}`);
  }
}

/**
 * Helper: Generate and store report for a hackathon
 * This would be run as a background job in production
 */
export async function generateAndStoreReport(
  hackathonName: string,
  generateIdeasFn: () => Promise<any[]>,
  generateLeveragesFn: () => Promise<any[]>
): Promise<void> {
  console.log(`🔄 Generating report for: ${hackathonName}...`);

  try {
    const [ideas, leverages] = await Promise.all([
      generateIdeasFn(),
      generateLeveragesFn(),
    ]);

    const report: PreGeneratedReport = {
      hackathonName,
      generatedAt: new Date().toISOString().split('T')[0],
      ideas,
      leverages,
    };

    addPreGeneratedReport(report);
    console.log(`✅ Successfully generated and stored report for: ${hackathonName}`);
  } catch (error) {
    console.error(`❌ Failed to generate report for ${hackathonName}:`, error);
    throw error;
  }
}
