# AI Integration Example Usage

## How It Works

### User Flow

1. User lands on homepage and searches for a hackathon
2. User goes through onboarding (constraints + intentions)
3. **Results View loads with mock data**
4. User sees "Context Cards" section with AI status indicator
5. User clicks **"Regenerate Ideas"** button
6. AI generates custom ideas and leverages based on:
   - Hackathon name and sponsors
   - User's technical level
   - Commitment level
   - Team size
   - Intentions (get hired, win prize, etc.)
   - Additional context (optional)

### Behind the Scenes

```typescript
// When user clicks "Regenerate Ideas"
const handleRegenerate = async () => {
  // 1. Generate Ideas
  const ideas = await generateIdeas({
    hackathonName: "AI Builders Hackathon",
    sponsors: ["Figma", "Supabase", "Algolia"],
    technicalLevel: "professional",
    commitmentLevel: "hardcore",
    teamSize: "2",
    intentions: ["win-prize", "get-hired"],
    additionalContext: "Focus on enterprise solutions"
  });

  // 2. Generate Leverages
  const leverages = await generateLeverages({
    sponsors: ["Figma", "Supabase", "Algolia"],
    hackathonName: "AI Builders Hackathon",
    additionalContext: "Focus on enterprise solutions"
  });

  // 3. Update UI with results
  setGeneratedProjects(ideas);
  setGeneratedLeverages(leverages);
};
```

## Example AI Responses

### Generated Ideas (JSON)

```json
{
  "ideas": [
    {
      "id": "ai-1",
      "title": "Enterprise Design System Sync",
      "description": "Real-time design system that syncs Figma components to production code, with Supabase for version control and Algolia for component search.",
      "score": 94,
      "category": "Developer Tools",
      "difficulty": "advanced",
      "techRequirements": "highly-technical",
      "sponsors": ["Figma", "Supabase", "Algolia"],
      "why": "Targets all three sponsors with deep integration. Solves real enterprise pain point. Shows technical sophistication and practical value.",
      "leverages": [
        "Figma API for extracting component specs",
        "Supabase for real-time sync and version history",
        "Algolia for instant component discovery",
        "Enterprise-focused = higher chance of sponsor interest"
      ],
      "requiredSkills": [
        "Figma Plugin development",
        "React/TypeScript",
        "Supabase realtime",
        "Search implementation",
        "Design systems knowledge"
      ],
      "estimatedTime": "40-48 hours"
    }
  ]
}
```

### Generated Leverages (JSON)

```json
{
  "leverages": [
    {
      "id": "lev-1",
      "leverage": "Product Launch",
      "strategicImpact": "Use Case Creation",
      "description": "Figma recently launched their AI features and is looking for innovative applications that showcase AI + design workflows. Projects demonstrating this integration are likely to catch judges' attention.",
      "company": "Figma",
      "relevance": "high"
    },
    {
      "id": "lev-2",
      "leverage": "Enterprise Focus",
      "strategicImpact": "Market Positioning",
      "description": "Supabase is expanding into enterprise markets and seeking proof points. Enterprise-grade projects with proper auth, row-level security, and scalability could become case studies.",
      "company": "Supabase",
      "relevance": "high"
    }
  ]
}
```

## Customizing the AI Behavior

### Make Ideas More Ambitious

```typescript
// In /utils/ai.ts - buildIdeasPrompt()
function buildIdeasPrompt(params: GenerateIdeasParams): string {
  const ambitionLevel = params.commitmentLevel === 'hardcore' 
    ? 'highly ambitious, technically complex projects that push boundaries'
    : 'balanced, achievable projects with clear scope';

  return `Generate hackathon ideas that are ${ambitionLevel}...`;
}
```

### Focus on Specific Intentions

```typescript
// Prioritize based on top intention
const primaryGoal = params.intentions?.[0];
const focus = {
  'win-prize': 'maximum winning potential',
  'get-hired': 'showcasing technical skills',
  'learn-tech': 'educational value and skill development'
}[primaryGoal];

return `Generate ideas optimized for ${focus}...`;
```

### Adjust Number of Ideas

```typescript
// Generate more ideas for hardcore users
const ideaCount = params.commitmentLevel === 'hardcore' ? 10 : 5;
return `Generate ${ideaCount} hackathon ideas...`;
```

## Advanced Usage

### Caching Results

```typescript
// Save generated ideas to avoid re-generating
const handleRegenerate = async () => {
  const cacheKey = `ideas_${hackathonData.name}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    setGeneratedProjects(JSON.parse(cached));
    return;
  }

  const ideas = await generateIdeas({...});
  localStorage.setItem(cacheKey, JSON.stringify(ideas));
  setGeneratedProjects(ideas);
};
```

### Progressive Enhancement

```typescript
// Start with mock data, then enhance with AI
const [projects, setProjects] = useState(getMockProjects());

useEffect(() => {
  // Generate AI ideas in background
  generateIdeas({...}).then(aiIdeas => {
    setProjects(prev => [...prev, ...aiIdeas]);
  });
}, []);
```

### Streaming Responses

```typescript
// For longer generations, show ideas as they come in
async function generateIdeasStreaming(params) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {...},
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [...],
      stream: true, // Enable streaming
    }),
  });

  const reader = response.body.getReader();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += new TextDecoder().decode(value);
    // Parse and update UI as data comes in
  }
}
```

## Error Handling

### Graceful Degradation

```typescript
const handleRegenerate = async () => {
  try {
    const ideas = await generateIdeas({...});
    setGeneratedProjects(ideas);
  } catch (error) {
    console.error('AI generation failed:', error);
    
    // Fall back to mock data
    toast.error('AI generation unavailable. Showing example ideas.');
    setGeneratedProjects(getMockProjects());
  }
};
```

### Rate Limit Handling

```typescript
async function generateWithRetry(params, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generateIdeas(params);
    } catch (error) {
      if (error.status === 429) {
        // Rate limited - wait and retry
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}
```

## Testing

### Mock Mode Testing

```typescript
// In /utils/ai.ts
const USE_MOCK_DATA = true;

// Returns hardcoded response after 1 second
// Perfect for:
// - UI development
// - Demo videos
// - Testing without API costs
```

### Real API Testing

```typescript
// Test with actual OpenAI
const USE_MOCK_DATA = false;
const OPENAI_API_KEY = 'sk-test-...';

// Tips:
// - Start with gpt-3.5-turbo (cheaper)
// - Use low max_tokens for testing
// - Monitor costs in OpenAI dashboard
```

## Performance Tips

1. **Use faster models for development:**
   ```typescript
   model: 'gpt-3.5-turbo' // ~10x cheaper, 2x faster
   ```

2. **Reduce token usage:**
   ```typescript
   max_tokens: 2000, // Instead of 4096
   temperature: 0.7, // Lower = more consistent
   ```

3. **Parallel generation:**
   ```typescript
   const [ideas, leverages] = await Promise.all([
     generateIdeas(params),
     generateLeverages(params)
   ]);
   ```

4. **Debounce user inputs:**
   ```typescript
   const debouncedRegenerate = debounce(handleRegenerate, 1000);
   ```

## Integration with Other AI Providers

### Anthropic Claude

```typescript
// Better for longer context, analysis
const response = await fetch('https://api.anthropic.com/v1/messages', {
  headers: {
    'x-api-key': ANTHROPIC_KEY,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  }),
});
```

### Local LLM (Ollama)

```typescript
// Free, private, no API limits
const response = await fetch('http://localhost:11434/v1/chat/completions', {
  method: 'POST',
  body: JSON.stringify({
    model: 'llama2', // or mistral, codellama, etc.
    messages: [...],
  }),
});
```

### Google Gemini

```typescript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_KEY}`,
  {
    method: 'POST',
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  }
);
```

## Real-World Example

Here's how a user might interact with the AI:

1. **User:** Searches "YC Startup School Hackathon"
2. **User:** Sets profile: Pro developer, All-in commitment, Solo
3. **User:** Selects intentions: Win prize, Launch startup
4. **System:** Shows 8 mock ideas initially
5. **User:** Adds context: "I'm experienced with AI/ML and want to build something that could become a real product"
6. **User:** Clicks "Regenerate Ideas"
7. **AI:** Generates 6 custom ideas focused on:
   - AI/ML integration
   - Startup viability
   - Winning potential
   - Solopreneur-friendly scope
8. **System:** Shows 14 total ideas (8 mock + 6 AI)
9. **User:** Filters to see only AI-generated, high-scoring ideas
10. **Result:** 3 perfect project matches

The AI understands the context and generates hyper-personalized recommendations!
