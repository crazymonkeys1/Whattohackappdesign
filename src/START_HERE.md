# 🚀 Start Here - AI Testing Guide

## What's Ready

Your app is now configured to use **real OpenAI AI** when you click the "Regenerate Ideas" button!

All you need to do is add your API key and test it.

---

## ⚡ Quick Start (2 Minutes)

### Step 1: Get OpenAI API Key
👉 **https://platform.openai.com/api-keys**

1. Click "Create new secret key"
2. Copy the key (starts with `sk-proj-...`)

### Step 2: Add Your Key
📝 **Open `/utils/ai.ts`**

```typescript
// Find line 15 and replace with your key:
const OPENAI_API_KEY = 'sk-proj-your-actual-key-here';
```

### Step 3: Test It!
🎮 **In the app:**

1. Search for a hackathon
2. Complete onboarding  
3. Click **"Regenerate Ideas"** (orange button with sparkles ✨)
4. Wait 3-5 seconds
5. See AI-generated ideas!

---

## 🎯 How to Know It's Working

### ✅ Success Signs:
- Button shows loading spinner
- Toast notification: "Generation complete!"
- New ideas appear in the list
- Ideas have unique, relevant titles
- Content references your hackathon
- No console errors

### ❌ If You See Errors:
- **401 Unauthorized** → Check your API key
- **429 Rate Limit** → Wait 30 seconds and try again
- **Mock data still showing** → Make sure you saved the file

---

## 🧪 Test in Console

Open browser console (F12) and run:

```javascript
// Quick test
await testIdeasGeneration()

// Expected output:
// ✅ Success! Generated 5 ideas in 3.2s
// ✅ All required fields present
```

---

## 📍 Where to See AI in Action

### 1. **Orange Banner** (top of Results View)
Shows setup status and instructions

### 2. **Orange Alert** (in Context Cards section)
Indicates AI is ready for testing

### 3. **"Regenerate Ideas" Button**
- Located at bottom of Context Cards
- Orange with Sparkles icon (✨)
- Shows loading state when generating

### 4. **Console Output** (F12)
- Welcome message on app load
- Test commands available
- Error messages (if any)

---

## 💰 Cost Info

- **Per click:** ~$0.01-0.03
- **10 tests:** ~$0.10-0.30
- **100 tests:** ~$1-3

Very affordable for testing!

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **[README_AI_TESTING.md](./README_AI_TESTING.md)** | Quick reference card |
| **[TESTING_INSTRUCTIONS.md](./TESTING_INSTRUCTIONS.md)** | Detailed walkthrough |
| **[AI_QUICK_START.md](./AI_QUICK_START.md)** | 5-minute setup |
| **[AI_SETUP_INSTRUCTIONS.md](./AI_SETUP_INSTRUCTIONS.md)** | Full configuration guide |
| **[EXAMPLE_AI_USAGE.md](./EXAMPLE_AI_USAGE.md)** | Code examples |
| **[BUGFIX_SUMMARY.md](./BUGFIX_SUMMARY.md)** | Bug fixes applied |
| **[AI_INTEGRATION_SUMMARY.md](./AI_INTEGRATION_SUMMARY.md)** | Complete overview |

---

## 🎮 Current Configuration

```
✅ Mock Mode: DISABLED
✅ Real AI Mode: ENABLED
✅ UI Indicators: ACTIVE
✅ Test Commands: AVAILABLE
✅ Error Handling: IMPLEMENTED
✅ Safety Checks: IN PLACE

⏳ Waiting for: YOUR_API_KEY
```

---

## 🔄 Need Mock Mode Back?

To switch back to free testing:

```typescript
// In /utils/ai.ts, change line 16:
const USE_MOCK_DATA = true;
```

---

## 🎯 Next Steps

1. ✅ **Read this file** (you're here!)
2. 🔑 **Get API key** (30 seconds)
3. 📝 **Add key to `/utils/ai.ts`** (30 seconds)
4. 🧪 **Test it** (1 minute)
5. 🎉 **See AI magic!**

---

## 💡 Pro Tips

1. **Start with console testing** to verify setup
2. **Use GPT-3.5** for cheaper/faster testing (change model in ai.ts)
3. **Check Network tab** to see actual API calls
4. **Read error messages** in console for troubleshooting
5. **Dismiss banners** with X button once you're set up

---

## 🚨 Troubleshooting

### Can't find the button?
1. Search for hackathon
2. Complete onboarding
3. Scroll to "Context Cards" section
4. Look for orange button at bottom

### Button doesn't respond?
- Check browser console for errors
- Make sure you saved `/utils/ai.ts`
- Verify API key has no spaces or quotes

### Still seeing mock data?
- Check line 16 in `/utils/ai.ts`
- Should say: `const USE_MOCK_DATA = false;`

---

## 🎉 You're All Set!

Everything is configured and ready. Just add your API key and click the button!

**Questions?** Check the documentation files listed above.

**Ready to test?** Open [README_AI_TESTING.md](./README_AI_TESTING.md) for the quick reference card.

---

## 🔥 What You'll Get

When you click "Regenerate Ideas", the AI will generate:

### Project Ideas (5-8 ideas)
Each with:
- Title and description
- Winning potential score
- Difficulty level
- Tech requirements
- Why it would win
- Specific leverages
- Required skills
- Time estimate

### Strategic Leverages (5-10 leverages)
Each with:
- Leverage type
- Strategic impact
- What the company wants
- Company name
- Relevance score

All **personalized** to your:
- Hackathon context
- Technical level
- Team size
- Time commitment
- Goals and intentions
- Additional context

---

**Ready? Let's go! 🚀**

Add your API key to `/utils/ai.ts` and start testing!
