/**
 * AI Integration Utility
 * 
 * This file handles AI API calls for generating ideas and leverages.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Replace 'YOUR_OPENAI_API_KEY_HERE' with your actual OpenAI API key
 * 2. Or use any other AI provider (Anthropic, Google, etc.) by modifying the fetch call
 * 3. For production, use environment variables instead of hardcoding keys
 * 
 * Example with environment variables:
 * const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
 */

const OPENAI_API_KEY = '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';
const USE_MOCK_DATA = false; // Set to true to use mock data for testing without API key

export type GenerateIdeasParams = {
  hackathonName: string;
  sponsors: string[];
  technicalLevel?: string;
  commitmentLevel?: string;
  teamSize?: string;
  intentions?: string[];
  additionalContext?: string;
};

export type GenerateLeveragesParams = {
  sponsors: string[];
  hackathonName: string;
  additionalContext?: string;
};

export type ExtractHackathonDataParams = {
  url: string;
};

/**
 * Generate project ideas using AI
 */
export async function generateIdeas(params: GenerateIdeasParams): Promise<any[]> {
  if (USE_MOCK_DATA) {
    // Mock response - replace with real API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'ai-mock-1',
            title: 'AI-Generated Idea 1',
            description: 'This is a mock idea. Replace USE_MOCK_DATA with false to use real AI.',
            score: 90,
            category: 'AI Generated',
            difficulty: 'intermediate',
            techRequirements: 'moderate',
            sponsors: params.sponsors,
            why: 'This is a demonstration of AI-generated content. Enable real AI to get personalized recommendations.',
            leverages: [
              'Mock leverage point 1',
              'Mock leverage point 2',
              'Mock leverage point 3',
            ],
            requiredSkills: [
              'React/TypeScript',
              'AI Integration',
              'Full-stack development',
            ],
            estimatedTime: '24-36 hours',
          },
        ]);
      }, 1000);
    });
  }

  const prompt = buildIdeasPrompt(params);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert hackathon strategist who helps participants identify winning project ideas.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    return content.ideas || [];
  } catch (error) {
    console.error('Error generating ideas:', error);
    throw error;
  }
}

/**
 * Generate strategic leverages using AI
 */
export async function generateLeverages(params: GenerateLeveragesParams): Promise<any[]> {
  if (USE_MOCK_DATA) {
    // Mock response - replace with real API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'ai-lev-mock-1',
            leverage: 'AI-Generated Leverage',
            strategicImpact: 'Use Case Creation',
            description: 'This is a mock leverage. Replace USE_MOCK_DATA with false to use real AI.',
            company: params.sponsors[0] || 'Mock Company',
            relevance: 'high',
          },
        ]);
      }, 1000);
    });
  }

  const prompt = buildLeveragesPrompt(params);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing company strategies and identifying sponsorship motivations at hackathons.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    return content.leverages || [];
  } catch (error) {
    console.error('Error generating leverages:', error);
    throw error;
  }
}

/**
 * Build the prompt for generating ideas
 */
function buildIdeasPrompt(params: GenerateIdeasParams): string {
  return `Generate 5-8 hackathon project ideas for "${params.hackathonName}" with the following context:

Sponsors: ${params.sponsors.join(', ')}
${params.technicalLevel ? `Technical Level: ${params.technicalLevel}` : ''}
${params.commitmentLevel ? `Commitment Level: ${params.commitmentLevel}` : ''}
${params.teamSize ? `Team Size: ${params.teamSize}` : ''}
${params.intentions?.length ? `Intentions: ${params.intentions.join(', ')}` : ''}
${params.additionalContext ? `Additional Context: ${params.additionalContext}` : ''}

For each idea, provide:
- title: Clear, compelling project name
- description: 2-3 sentence overview
- score: 0-100 based on winning potential
- category: Type of project (e.g., "Developer Tools", "AI & Innovation")
- difficulty: "beginner", "intermediate", or "advanced"
- techRequirements: "low-code", "moderate", or "highly-technical"
- sponsors: Array of sponsors this project leverages
- why: 2-3 sentences explaining why this would win
- leverages: Array of 3-4 specific ways the project uses sponsor technologies
- requiredSkills: Array of 3-5 skills needed
- estimatedTime: Time estimate (e.g., "24-36 hours")

Return as JSON with this structure:
{
  "ideas": [
    {
      "id": "1",
      "title": "...",
      "description": "...",
      "score": 95,
      "category": "...",
      "difficulty": "intermediate",
      "techRequirements": "moderate",
      "sponsors": ["..."],
      "why": "...",
      "leverages": ["...", "..."],
      "requiredSkills": ["...", "..."],
      "estimatedTime": "..."
    }
  ]
}`;
}

/**
 * Build the prompt for generating leverages
 */
function buildLeveragesPrompt(params: GenerateLeveragesParams): string {
  return `Analyze the strategic motivations for companies sponsoring "${params.hackathonName}".

Sponsors: ${params.sponsors.join(', ')}
${params.additionalContext ? `Additional Context: ${params.additionalContext}` : ''}

For each sponsor, identify 1-2 strategic leverages they might be seeking. Consider:
- Recent product launches or announcements
- Market positioning goals
- Developer community objectives
- Technology evangelization needs

For each leverage, provide:
- leverage: The type of leverage (e.g., "Product Launch", "Market Positioning")
- strategicImpact: The goal (e.g., "Use Case Creation", "Community Engagement", "Integration Play")
- description: 2-3 sentences explaining what the company wants and why
- company: The sponsor company name
- relevance: "high", "medium", or "low"

Return as JSON with this structure:
{
  "leverages": [
    {
      "id": "1",
      "leverage": "Product Launch",
      "strategicImpact": "Use Case Creation",
      "description": "...",
      "company": "...",
      "relevance": "high"
    }
  ]
}`;
}

/**
 * Extract hackathon data from URL using AI
 * This function analyzes the hackathon page and extracts key information
 */
export async function extractHackathonData(params: ExtractHackathonDataParams): Promise<any> {
  if (USE_MOCK_DATA) {
    // Mock response for testing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Supabase Launch Week Hackathon',
          date: 'December 15-22, 2025',
          location: 'Virtual',
          organizer: 'Supabase',
          sponsors: ['Supabase', 'Algolia', 'Figma'],
          description: 'Build innovative projects using Supabase, Algolia, and Figma APIs. Showcase your creativity and technical skills to win amazing prizes.',
          jury: ['Paul Copplestone (Supabase CEO)', 'Nicolas Dessaigne (Algolia CEO)', 'Dylan Field (Figma CEO)'],
          url: params.url,
        });
      }, 1500);
    });
  }

  try {
    console.log('🔍 Extracting hackathon data from:', params.url);

    const prompt = buildHackathonExtractionPrompt(params.url);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing hackathon information and extracting structured data. Always return valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    console.log('✅ Hackathon data extracted successfully');

    return {
      name: content.name || 'Unknown Hackathon',
      date: content.date || 'TBD',
      location: content.location || 'Virtual',
      organizer: content.organizer || 'Unknown',
      sponsors: content.sponsors || [],
      description: content.description || '',
      jury: content.jury || [],
      url: params.url,
      theme: content.theme || null,
      prizes: content.prizes || null,
    };
  } catch (error) {
    console.error('❌ Failed to extract hackathon data:', error);
    throw error;
  }
}

/**
 * Build prompt for hackathon data extraction
 */
function buildHackathonExtractionPrompt(url: string): string {
  return `Analyze this hackathon URL and extract structured information: ${url}

Please fetch the page content and extract the following information:

1. Hackathon name
2. Date/timeline (start and end dates)
3. Location (virtual, hybrid, or physical location)
4. Organizer/host company
5. Sponsors (list all mentioned sponsors/partners)
6. Description (2-3 sentence summary of what the hackathon is about)
7. Jury members/judges (if mentioned)
8. Theme or focus area (e.g., AI, Web3, Sustainability)
9. Prize information (if mentioned)

Return the data in this exact JSON format:
{
  "name": "Hackathon Name",
  "date": "December 15-22, 2025",
  "location": "Virtual" or "San Francisco, CA" or "Hybrid",
  "organizer": "Company Name",
  "sponsors": ["Sponsor1", "Sponsor2", "Sponsor3"],
  "description": "Brief description of the hackathon (2-3 sentences)",
  "jury": ["Judge 1", "Judge 2"],
  "theme": "AI/ML" or null,
  "prizes": "Brief prize description" or null
}

If you cannot access the URL directly, use your knowledge to provide the best possible information based on the URL structure and any known hackathon events. Make reasonable inferences but mark uncertain data.

Be thorough in identifying sponsors - check for:
- Main sponsors
- Technology partners
- API partners
- Platform partners
- Prize sponsors

Return only valid JSON, no additional text.`;
}

/**
 * Analyze sponsor opportunities using the strategic framework
 */
export async function analyzeSponsorOpportunities(
  sponsorName: string,
  hackathonName: string,
  organizerName?: string,
  theme?: string
): Promise<any> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          company: sponsorName,
          opportunities: [
            {
              type: '1. Evangelization/Awareness',
              description: 'Increase product awareness among developers',
              example: 'Run live workshops showcasing key features',
            },
          ],
        });
      }, 1000);
    });
  }

  try {
    console.log(`🔍 Analyzing opportunities for ${sponsorName} at ${hackathonName}`);

    const prompt = buildSponsorAnalysisPrompt(sponsorName, hackathonName, organizerName, theme);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a strategic advisor for developer marketing and hackathon sponsorship. Provide actionable, concrete recommendations.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    console.log(`✅ Opportunities analyzed for ${sponsorName}`);

    return content;
  } catch (error) {
    console.error(`❌ Failed to analyze opportunities for ${sponsorName}:`, error);
    throw error;
  }
}

/**
 * Build prompt for sponsor opportunity analysis
 */
function buildSponsorAnalysisPrompt(
  company: string,
  hackathonName: string,
  organizer?: string,
  theme?: string
): string {
  return `**Situation**

You are analyzing a company's participation in a hackathon ecosystem. The company is either sponsoring or organizing a hackathon and needs to understand the strategic opportunities available beyond basic brand awareness. The analysis occurs within the context of developer communities, maker culture, and competitive positioning in tech ecosystems where hackathons serve as critical touchpoints for product adoption, talent discovery, and market positioning.

**Task**

Analyze the strategic opportunities available to ${company} within the ${hackathonName} hackathon context by:

1. Researching and synthesizing ${company}'s current product portfolio, target audience, recent strategic moves, and competitive landscape
2. Understanding the hackathon organizer${organizer ? ` (${organizer})` : ''}, theme${theme ? ` (${theme})` : ''}, and sponsor ecosystem
3. Generating a prioritized opportunity map that ranks potential hackathon strategies from foundational (awareness/evangelization) to advanced (strategic repositioning and ecosystem plays)
4. Providing concrete, actionable recommendations that a partnership or marketing team could implement immediately
5. Including specific examples, integration opportunities, or maker/influencer strategies where relevant

**Objective**

Enable ${company} to maximize ROI from hackathon participation by identifying high-leverage opportunities that align with their product strategy, competitive positioning, and growth objectives. The analysis should move beyond generic sponsorship benefits to uncover strategic plays in recruitment, product validation, ecosystem building, and market repositioning.

**Knowledge**

Structure analysis using this eight-tier opportunity framework, ordered from most foundational to most strategic:

1. **Evangelization/Awareness**: Increase product awareness and adoption among developers and hackers
2. **Community Engagement**: Activate early adopters, ambassadors, and ecosystem contributors
3. **Product Feedback Loop**: Collect live user feedback or validate early-stage features
4. **Use Case Creation**: Generate real-world showcases demonstrating product value
5. **Integration & Ecosystem Play**: Promote integrations or complementary tools to create stack stickiness
6. **Influencer/Maker Adoption**: Attract prominent indie makers or developers to publicly use and advocate for the tool
7. **Recruitment & Talent Discovery**: Identify high-skill participants aligned with company needs
8. **Long-term Strategic Positioning**: Use the hackathon to reposition the brand in new markets or narratives

Consider these competitive and contextual factors:
- Recent product launches or updates that create hackathon relevance
- Competitor positioning and how the hackathon can create differentiation
- The organizer's audience and theme alignment with the company's target users
- Integration opportunities with other sponsors or popular developer tools
- The maturity level of the product (early beta vs. established platform)

**Output Format**

Return a JSON object with this structure:

{
  "company_snapshot": {
    "company_name": "${company}",
    "main_products": ["Product 1", "Product 2"],
    "target_audience": "Description of target users",
    "recent_updates": ["Update 1", "Update 2"],
    "competitors": ["Competitor 1", "Competitor 2"],
    "differentiation": "Key differentiation points"
  },
  "opportunities": [
    {
      "type": "1. Evangelization/Awareness",
      "description": "Clear explanation of the strategic opportunity",
      "example": "Concrete, context-specific example of how to execute"
    },
    {
      "type": "2. Community Engagement",
      "description": "...",
      "example": "..."
    }
  ]
}

Write with these characteristics:
- Zero fluff or PR language — every sentence should be actionable
- Concrete over abstract — name specific tools, integrations, or maker profiles when relevant
- Operator mindset — recommendations should feel like internal strategy briefs
- Grounded in developer culture and maker ecosystems
- Prioritization-focused — help sponsors understand where to allocate resources

Return only valid JSON, no additional text.`;
}

/**
 * Alternative: Use Anthropic Claude API
 * Uncomment and modify if you prefer Claude
 */
/*
export async function generateIdeasWithClaude(params: GenerateIdeasParams): Promise<any[]> {
  const ANTHROPIC_API_KEY = 'YOUR_ANTHROPIC_API_KEY_HERE';
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: buildIdeasPrompt(params),
        },
      ],
    }),
  });

  const data = await response.json();
  const content = JSON.parse(data.content[0].text);
  return content.ideas || [];
}
*/
