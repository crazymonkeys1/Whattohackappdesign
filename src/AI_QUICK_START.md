# AI Integration - Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Get API Key
- **OpenAI**: https://platform.openai.com/api-keys (Click "Create new secret key")
- **Cost**: ~$0.01-0.03 per generation

### Step 2: Configure
Open `/utils/ai.ts` and update these two lines:

```typescript
const OPENAI_API_KEY = 'sk-proj-your-key-here'; // Paste your key
const USE_MOCK_DATA = false; // Change to false
```

### Step 3: Test
Open browser console and run:

```javascript
await testFullGeneration()
```

You should see:
```
✅ Success! Generated 5 ideas in 3.2s
✅ Success! Generated 6 leverages in 2.8s
🎉 All tests passed!
```

### Step 4: Use in App
1. Search for any hackathon
2. Complete onboarding
3. Click **"Regenerate Ideas"** button
4. Wait 3-5 seconds
5. See AI-generated ideas appear! ✨

---

## 🧪 Testing Without API Key

Keep mock mode enabled for testing:

```typescript
const USE_MOCK_DATA = true; // Keep this for testing
```

- Returns sample data after 1 second
- No cost, no API key needed
- Perfect for UI development

---

## 🔧 Troubleshooting

### "API call failed: 401"
❌ Problem: Invalid API key  
✅ Solution: Double-check your key in `/utils/ai.ts`

### "Still seeing mock data"
❌ Problem: `USE_MOCK_DATA` is still `true`  
✅ Solution: Set it to `false` in `/utils/ai.ts`

### "Generation takes forever"
❌ Problem: Network or rate limits  
✅ Solution: Wait 30 seconds and try again

---

## 💰 Cost Control

**Budget-Friendly Options:**

1. **Use GPT-3.5 Turbo** (10x cheaper):
   ```typescript
   model: 'gpt-3.5-turbo' // Instead of gpt-4-turbo-preview
   ```

2. **Reduce tokens**:
   ```typescript
   max_tokens: 1500 // Instead of 4096
   ```

3. **Expected costs**:
   - GPT-4 Turbo: $0.01-0.03 per generation
   - GPT-3.5 Turbo: $0.001-0.003 per generation
   - 100 generations ≈ $1-3 (GPT-4) or $0.10-0.30 (GPT-3.5)

---

## 📚 Console Testing Commands

These are automatically available in your browser console:

```javascript
// Test ideas generation
await testIdeasGeneration()

// Test leverages generation
await testLeveragesGeneration()

// Test both
await testFullGeneration()

// Get comparison instructions
compareMockVsReal()
```

---

## 🎯 What Gets Generated?

### Ideas
- Project title and description
- Difficulty and tech requirements
- Sponsor alignment
- Winning potential score
- Required skills and time estimate

### Leverages
- Strategic opportunities per sponsor
- What each company wants
- How to use each leverage
- Impact and relevance scores

---

## 🔒 Security

⚠️ **Important**: API keys in client-side code are visible to users

**For production:**
```typescript
// Use environment variables
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
```

**Or better:** Create a backend proxy to hide keys

---

## 🚢 Alternative: Use Other AI Providers

### Anthropic Claude
```typescript
// In /utils/ai.ts, uncomment the Claude function
const ANTHROPIC_KEY = 'sk-ant-...';
```

### Local LLM (Free!)
```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Download a model
ollama pull mistral

# Update fetch URL to:
'http://localhost:11434/v1/chat/completions'
```

---

## ✨ Next Steps

1. ✅ Test with mock data first
2. ✅ Configure API key
3. ✅ Test with real AI
4. ✅ Customize prompts in `/utils/ai.ts`
5. ✅ Try different models
6. ✅ Build something awesome!

---

## 📖 Full Documentation

- [Detailed Setup Instructions](./AI_SETUP_INSTRUCTIONS.md)
- [Usage Examples](./EXAMPLE_AI_USAGE.md)
- [Code: `/utils/ai.ts`](./utils/ai.ts)
- [Test Utils: `/utils/aiTest.ts`](./utils/aiTest.ts)

---

**Need help?** Check the browser console for detailed error messages.
