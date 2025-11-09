# Testing Real AI Integration

## ⚡ Quick Setup (2 minutes)

### Step 1: Get Your OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Copy the key (starts with `sk-proj-...`)

### Step 2: Add Your API Key
Open `/utils/ai.ts` and replace line 15:

```typescript
// Change this line:
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';

// To this (with your actual key):
const OPENAI_API_KEY = 'sk-proj-abc123...'; // Your actual key
```

### Step 3: Test It!
1. Run the app
2. Search for a hackathon (e.g., "AI Builders Hackathon")
3. Complete onboarding
4. Click **"Regenerate Ideas"** button
5. Wait 3-5 seconds
6. See real AI-generated ideas! ✨

---

## Current Configuration

✅ **Mock Mode:** DISABLED  
✅ **Real AI:** ENABLED (when you add your API key)  

The app is now configured to use real OpenAI API when you click "Regenerate Ideas".

---

## What Will Happen

### Without API Key (Current State)
```
Click "Regenerate Ideas"
  ↓
❌ Error: "API call failed: 401 Unauthorized"
  ↓
Toast notification: "Failed to generate"
```

### With API Key Added
```
Click "Regenerate Ideas"
  ↓
⏳ Loading... (3-5 seconds)
  ↓
✅ AI generates 5-8 custom project ideas
  ↓
✅ AI generates strategic leverages
  ↓
🎉 Toast: "Generation complete!"
  ↓
See personalized ideas in the UI
```

---

## Expected AI Response Example

### Ideas Generated
You'll see ideas like:

**1. Real-time Figma-to-Code Sync** (Score: 94)
- Uses Figma API, Supabase, and AI
- Difficulty: Advanced
- Time: 36-48 hours
- Personalized to your profile

**2. AI-Powered Component Library** (Score: 91)
- Perfect for your technical level
- Matches your "win prize" intention
- Uses all sponsor technologies

### Leverages Generated
You'll see strategic insights like:

**Figma: Product Launch Leverage**
- Company just released new AI features
- Looking for innovative use cases
- High impact opportunity

---

## Testing Checklist

- [ ] Get OpenAI API key
- [ ] Add key to `/utils/ai.ts`
- [ ] Run the app
- [ ] Navigate to Results View
- [ ] Click "Regenerate Ideas"
- [ ] Check browser console for API call
- [ ] Verify ideas appear (3-5 seconds)
- [ ] Switch to Leverages tab
- [ ] Click on ideas to see details
- [ ] Check for toast notifications

---

## Console Testing

Once you've added your API key, test in browser console:

```javascript
// Test ideas generation
await testIdeasGeneration()

// Expected output:
// ⏳ Generating ideas (this may take 3-5 seconds)...
// ✅ Success! Generated 5 ideas in 3.2s
// ✅ All required fields present

// Test leverages generation
await testLeveragesGeneration()

// Test both at once
await testFullGeneration()
```

---

## Cost Information

### OpenAI Pricing
- **Model Used:** `gpt-4-turbo-preview`
- **Cost per generation:** ~$0.01-0.03
- **10 tests:** ~$0.10-0.30
- **100 tests:** ~$1-3

### How to Reduce Costs
1. **Use GPT-3.5 (10x cheaper):**
   ```typescript
   model: 'gpt-3.5-turbo' // In /utils/ai.ts
   ```

2. **Reduce tokens:**
   ```typescript
   max_tokens: 2000 // Instead of 4096
   ```

3. **Use local LLM (FREE):**
   - Install Ollama: https://ollama.ai
   - Change endpoint to `http://localhost:11434`

---

## Troubleshooting

### "401 Unauthorized"
**Problem:** API key is missing or invalid  
**Solution:** 
- Check you copied the full key including `sk-proj-` prefix
- Make sure you saved `/utils/ai.ts` after editing
- Refresh the page

### "429 Too Many Requests"
**Problem:** Hit rate limits  
**Solution:**
- Wait 30 seconds
- Reduce frequency of testing
- Check your OpenAI usage limits

### "Takes too long"
**Problem:** Slow API response  
**Solution:**
- Normal for first request (3-5 seconds)
- Try GPT-3.5 for faster responses
- Check your internet connection

### "Still seeing mock data alert"
**Problem:** AIConfigStatus shows wrong state  
**Solution:**
- Update `USE_MOCK_DATA` in `/components/AIConfigStatus.tsx` to `false`
- This is just a visual indicator, doesn't affect functionality

---

## Verification Steps

### 1. Check API Call in Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Click "Regenerate Ideas"
4. Look for request to `api.openai.com`
5. Check Status: Should be `200 OK`

### 2. Check Console Logs
```javascript
// You should see:
"Regenerating ideas with context: ..."
// Not errors like "API call failed"
```

### 3. Check Response
- Ideas should have unique, relevant titles
- Descriptions should reference your hackathon
- Leverages should mention sponsor companies
- Content should feel personalized

---

## What's Different from Mock Mode?

| Feature | Mock Mode | Real AI Mode |
|---------|-----------|--------------|
| Speed | 1 second | 3-5 seconds |
| Content | Generic | Personalized |
| Cost | Free | ~$0.01-0.03 |
| Quality | Fixed sample | Contextual |
| Variety | Same every time | Different each time |

---

## Next Steps After Testing

1. **If it works:** 
   - Use environment variables for API key
   - Add error boundaries
   - Implement caching
   - Consider rate limiting

2. **If you want mock mode back:**
   ```typescript
   // In /utils/ai.ts
   const USE_MOCK_DATA = true;
   ```

3. **If you want to try other AI providers:**
   - See `/AI_SETUP_INSTRUCTIONS.md`
   - Anthropic Claude, Google Gemini, or local LLMs

---

## Support

- **Setup Issues:** Check `/AI_QUICK_START.md`
- **Detailed Docs:** Check `/AI_SETUP_INSTRUCTIONS.md`
- **Code Examples:** Check `/EXAMPLE_AI_USAGE.md`
- **Bug Fixes:** Check `/BUGFIX_SUMMARY.md`

---

## Ready to Test! 🚀

Just add your OpenAI API key to `/utils/ai.ts` and you're good to go!

The button will call real AI to generate personalized hackathon project ideas and strategic leverages based on your specific context.
