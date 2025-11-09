# AI Integration Setup Instructions

This application includes AI-powered project idea and leverage generation. Follow these steps to enable it:

## Quick Start

1. **Open `/utils/ai.ts`**
2. **Set your API key:**
   ```typescript
   const OPENAI_API_KEY = 'sk-your-actual-api-key-here';
   ```
3. **Disable mock mode:**
   ```typescript
   const USE_MOCK_DATA = false;
   ```

## Detailed Setup

### Option 1: OpenAI (Default)

The app is configured to use OpenAI by default.

1. Get an API key from https://platform.openai.com/api-keys
2. Update `/utils/ai.ts`:
   ```typescript
   const OPENAI_API_KEY = 'sk-proj-...'; // Your key here
   const USE_MOCK_DATA = false;
   ```

**Model Used:** `gpt-4-turbo-preview`  
**Cost:** ~$0.01-0.03 per generation

### Option 2: Anthropic Claude

If you prefer Claude, uncomment the Claude function in `/utils/ai.ts`:

1. Get an API key from https://console.anthropic.com/
2. Find the commented `generateIdeasWithClaude` function
3. Uncomment it and update:
   ```typescript
   const ANTHROPIC_API_KEY = 'sk-ant-...'; // Your key here
   ```
4. Replace the `generateIdeas` calls in `/components/ResultsView.tsx` with `generateIdeasWithClaude`

**Model Used:** `claude-3-sonnet-20240229`  
**Cost:** ~$0.003-0.015 per generation

### Option 3: Other Providers

You can use any AI provider that supports chat completions:

- **Google Gemini:** Update the fetch URL and headers
- **Local LLMs (Ollama):** Point to `http://localhost:11434/v1/chat/completions`
- **Azure OpenAI:** Update the endpoint and add deployment name

## Environment Variables (Recommended)

For production, use environment variables instead of hardcoding keys:

1. Create a `.env` file:
   ```
   VITE_OPENAI_API_KEY=sk-proj-...
   ```

2. Update `/utils/ai.ts`:
   ```typescript
   const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
   ```

## Features Using AI

### 1. Idea Generation
- **Trigger:** Click "Regenerate Ideas" in the Context Cards section
- **Input:** Hackathon data, user profile, intentions, additional context
- **Output:** 5-8 project ideas with scores, difficulty, sponsors, etc.

### 2. Leverage Generation
- **Trigger:** Same "Regenerate Ideas" button generates both
- **Input:** Sponsor companies, hackathon context
- **Output:** Strategic leverages for each sponsor

## Testing

### With Mock Data (No API Key Needed)
```typescript
const USE_MOCK_DATA = true;
```
- Returns sample data after 1 second delay
- Good for UI testing and development

### With Real AI
```typescript
const USE_MOCK_DATA = false;
const OPENAI_API_KEY = 'sk-...'; // Your real key
```
- Calls actual AI API
- Takes 2-5 seconds per generation
- Costs real money (but minimal)

## Customizing Prompts

Edit the prompt templates in `/utils/ai.ts`:

- **`buildIdeasPrompt()`** - Controls how ideas are generated
- **`buildLeveragesPrompt()`** - Controls leverage analysis

Example customization:
```typescript
function buildIdeasPrompt(params: GenerateIdeasParams): string {
  return `Generate 10 hackathon ideas instead of 5-8...
  
  Focus on ${params.intentions?.[0]} as the primary goal...
  
  Make ideas more ${params.commitmentLevel === 'hardcore' ? 'ambitious' : 'realistic'}...`;
}
```

## Troubleshooting

### "API call failed: 401 Unauthorized"
- Your API key is invalid or missing
- Check that you copied the full key including `sk-` prefix

### "API call failed: 429 Too Many Requests"
- You've hit rate limits
- Wait a minute and try again
- Consider upgrading your API plan

### "Generation takes too long"
- Normal for first request (model loading)
- Subsequent requests should be 2-5 seconds
- Consider using a faster model like `gpt-3.5-turbo`

### "Mock data still appears"
- Ensure `USE_MOCK_DATA = false`
- Check browser console for errors
- Verify API key is set correctly

## Security Notes

⚠️ **Never commit API keys to Git**

- Use environment variables
- Add `.env` to `.gitignore`
- For client-side apps, consider a backend proxy
- OpenAI/Anthropic keys in client code are visible to users

## Cost Management

To control costs:

1. **Reduce max_tokens:**
   ```typescript
   max_tokens: 2000  // Instead of 4096
   ```

2. **Use cheaper models:**
   ```typescript
   model: 'gpt-3.5-turbo'  // Instead of gpt-4-turbo-preview
   ```

3. **Cache results:**
   ```typescript
   // Store generated ideas in localStorage
   localStorage.setItem('cached_ideas', JSON.stringify(ideas));
   ```

## Need Help?

- Check the browser console for detailed error messages
- Review the network tab to see actual API requests
- Test with `USE_MOCK_DATA = true` first to verify UI works
