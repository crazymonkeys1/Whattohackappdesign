# ⚡ AI Testing - Quick Reference

## Current Status: Ready for Real AI Testing! 

**Configuration:**
- ✅ Mock Mode: **DISABLED**
- ✅ Real AI: **ENABLED** (needs API key)
- ✅ Test Commands: **AVAILABLE**
- ✅ UI Indicators: **ACTIVE**

---

## 🚀 Start Testing in 2 Minutes

### 1. Get API Key (30 seconds)
```
https://platform.openai.com/api-keys
→ Click "Create new secret key"
→ Copy the key (sk-proj-...)
```

### 2. Add Key (30 seconds)
```typescript
// Open: /utils/ai.ts
// Line 15: Replace this:
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';

// With your actual key:
const OPENAI_API_KEY = 'sk-proj-abc123...';
```

### 3. Test (1 minute)
```
1. Run the app
2. Search for any hackathon
3. Complete onboarding
4. Click "Regenerate Ideas"
5. Wait 3-5 seconds
6. See AI magic! ✨
```

---

## 🧪 Console Testing

Open browser console (F12) and run:

```javascript
// Quick test
await testIdeasGeneration()

// Full test
await testFullGeneration()
```

**Expected Output:**
```
⏳ Generating ideas (this may take 3-5 seconds)...
✅ Success! Generated 5 ideas in 3.2s
✅ All required fields present
```

---

## 🎯 What Happens

### Before Adding API Key
```
Click Button → ❌ 401 Error → Toast: "Failed to generate"
```

### After Adding API Key
```
Click Button 
  ↓
⏳ Loading (3-5s)
  ↓
✅ AI generates personalized ideas
  ↓
✅ Ideas appear in UI
  ↓
🎉 Toast: "Generation complete!"
```

---

## 📍 Where to Look

### In the UI:
1. **Orange Banner** at top of Results View
   - Click to see setup instructions
   - Dismissable with X button

2. **Orange Alert** in Context Cards section
   - Shows AI configuration status
   - Links to documentation

3. **"Regenerate Ideas" Button**
   - Orange button at bottom of Context Cards
   - Has Sparkles icon (✨)
   - Shows loading spinner when generating

### In the Console:
1. **Welcome message** on app load
   - Setup instructions
   - Test commands
   - Documentation links

2. **Test utilities**
   - `testIdeasGeneration()`
   - `testLeveragesGeneration()`
   - `testFullGeneration()`

3. **Error messages** (if any)
   - 401 = API key issue
   - 429 = Rate limit
   - Network errors

---

## 💰 Cost Estimate

- **Per generation:** $0.01-0.03
- **10 tests:** ~$0.10-0.30
- **100 tests:** ~$1-3

**Tip:** Use GPT-3.5 for 10x cheaper testing:
```typescript
// In /utils/ai.ts, change line 67:
model: 'gpt-3.5-turbo'  // Instead of gpt-4-turbo-preview
```

---

## ✅ Verification Checklist

After adding API key:

- [ ] No console errors on page load
- [ ] Banner shows "Ready for real AI"
- [ ] Click "Regenerate Ideas"
- [ ] See loading spinner
- [ ] Wait 3-5 seconds
- [ ] See "Generation complete!" toast
- [ ] Ideas appear in list
- [ ] Ideas have unique titles
- [ ] Leverages tab shows data
- [ ] Console shows no errors
- [ ] Test commands work

---

## 🔧 Files to Edit

Only 1 file needs editing:

```
/utils/ai.ts
  ↓
Line 15: Add your API key
  ↓
Save file
  ↓
Done! ✅
```

Everything else is already configured!

---

## 📚 Full Documentation

- **Quick Start:** `/TESTING_INSTRUCTIONS.md` ← Read this!
- **Setup Guide:** `/AI_QUICK_START.md`
- **Detailed Docs:** `/AI_SETUP_INSTRUCTIONS.md`
- **Code Examples:** `/EXAMPLE_AI_USAGE.md`
- **Bug Fixes:** `/BUGFIX_SUMMARY.md`
- **Integration:** `/AI_INTEGRATION_SUMMARY.md`

---

## 🎮 Test Commands

Available in browser console:

| Command | What It Does | Time |
|---------|--------------|------|
| `testIdeasGeneration()` | Test idea generation | ~3-5s |
| `testLeveragesGeneration()` | Test leverage generation | ~3-5s |
| `testFullGeneration()` | Test both at once | ~6-10s |
| `compareMockVsReal()` | Show comparison instructions | Instant |

---

## 🚨 Common Issues

### Issue: Still see "401 Unauthorized"
**Fix:** Double-check API key in `/utils/ai.ts`

### Issue: "Still using mock data"
**Fix:** Change line 16: `USE_MOCK_DATA = false`

### Issue: Button doesn't work
**Fix:** Check browser console for errors

### Issue: Too slow
**Fix:** Use `gpt-3.5-turbo` model instead

---

## 🎯 Success Criteria

You'll know it's working when:

1. ✅ No errors in console
2. ✅ Button shows loading spinner
3. ✅ Toast shows "Generation complete!"
4. ✅ New ideas appear in list
5. ✅ Ideas have relevant titles
6. ✅ Ideas reference your hackathon
7. ✅ Leverages mention sponsor companies
8. ✅ Content feels personalized

---

## 🔄 Switch Back to Mock Mode

To go back to free testing:

```typescript
// In /utils/ai.ts, line 16:
const USE_MOCK_DATA = true;  // Enable mock mode
```

---

## 🎉 You're Ready!

Everything is configured. Just add your API key and start testing!

**Next:** Open `/TESTING_INSTRUCTIONS.md` for detailed walkthrough.
