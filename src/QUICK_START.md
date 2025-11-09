# 🚀 Quick Start Guide

## Welcome to What To Hack!

This app helps you identify high-potential hackathon project ideas by analyzing sponsor opportunities and matching them to your constraints.

---

## ⚡ Instant Start (No Setup Required!)

### Try Featured Hackathons

The app works **immediately** with these pre-loaded hackathons:

1. **Supabase Launch Week** ⚡
   - Full pre-generated report
   - 6 curated project ideas
   - 5 strategic sponsor opportunities
   - Instant results!

2. **HackMIT 2025** ⚡
   - Full pre-generated report
   - 6 curated project ideas
   - 4 strategic sponsor opportunities
   - Instant results!

### How to Use

```
1. Open the app
2. Click "Supabase Launch Week" or "HackMIT 2025"
3. Get instant results ⚡
4. Complete quick onboarding (2 questions)
5. Explore AI-generated ideas + strategic leverages!
```

**That's it! No API key needed for featured hackathons.**

---

## 🔧 Full Setup (For Any Hackathon)

Want to analyze **any hackathon URL**? Enable AI analysis:

### Step 1: Get OpenAI API Key

1. Visit: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key (starts with `sk-`)

### Step 2: Configure the App

1. Open `/utils/ai.ts`
2. Find line 15:
   ```typescript
   const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';
   ```
3. Replace with your key:
   ```typescript
   const OPENAI_API_KEY = 'sk-your-actual-key-here';
   ```
4. Save the file

### Step 3: Use Any Hackathon!

```
1. Go to landing page
2. Enter ANY hackathon URL
3. Click "Analyze"
4. Wait 10-15 seconds
5. Get full AI analysis!
```

---

## 🎯 What You Get

### 1. Hackathon Analysis
- **Event details** - Name, date, location, organizer
- **Sponsor list** - All companies sponsoring
- **Jury info** - Who's judging
- **Theme & prizes** - What they're looking for

### 2. Strategic Leverages
- **Sponsor motivations** - Why they're there
- **Opportunity tiers** - 8-level framework
- **Action steps** - What to build
- **Examples** - Real project ideas

### 3. AI-Generated Ideas
- **Personalized** - Based on your profile
- **Scored** - 0-100 winning potential
- **Detailed** - Description, sponsors, timeline
- **Actionable** - Skills needed, difficulty level

### 4. Smart Filtering
- By sponsor
- By difficulty
- By technical requirements
- By time commitment

---

## 📖 User Flow

### Complete Experience

```
Landing Page
    ↓
Enter Hackathon URL or Click Featured
    ↓
AI Analyzes Page (10-15 seconds)
    ↓
Onboarding - 2 Questions
    ↓
Results Page
    ↓
AI Generates Ideas (15-20 seconds)
    ↓
Explore Ideas + Leverages
    ↓
Filter & Refine
    ↓
Pick Your Project!
```

### Quick Demo (Featured Hackathon)

```
Landing Page
    ↓
Click "Supabase Launch Week" ⚡
    ↓
Instant Load (< 1 second)
    ↓
Onboarding - 2 Questions
    ↓
Results Page with Pre-Generated Ideas
    ↓
Explore Everything!
```

---

## 🎨 App Features

### Landing Page
- **Search bar** - Enter any hackathon URL
- **Featured cards** - Click for instant results
- **⚡ Instant badges** - Shows which have pre-generated data
- **Demo mode banner** - Status indicator

### Onboarding (2 Steps)
1. **Profile Setup**
   - Technical level
   - Time commitment
   - Your goals

2. **Team Context**
   - Team size
   - Skills available
   - Additional notes

### Results Page

**Left Panel: Strategic Leverages**
- Context cards for each sponsor
- Opportunity tiers (1-8)
- Action steps
- Examples

**Right Panel: Project Ideas**
- AI-generated ideas
- Winning score (0-100)
- Sponsor tags
- Difficulty level
- Time estimate

**Top Bar: Filters**
- Sponsor filter
- Difficulty filter
- Tech requirements
- Search

**Action Buttons:**
- Generate more ideas
- Regenerate leverages
- Refine results

---

## 💡 Pro Tips

### For Best Results

1. **Use Featured Hackathons First**
   - See what the app can do
   - No setup required
   - Full functionality

2. **Complete Onboarding Honestly**
   - Better personalization
   - More relevant ideas
   - Higher winning chances

3. **Explore Leverages First**
   - Understand sponsor motivations
   - See strategic opportunities
   - Then look at ideas

4. **Read the "Why"**
   - Each idea explains why it would win
   - Learn what judges look for
   - Apply to your own ideas

5. **Use Filters Effectively**
   - Filter by your target sponsor
   - Match your skill level
   - Find doable projects

### For Hackathon Success

1. **Pick High-Tier Opportunities**
   - Tier 1-3 = Highest impact
   - Look for product launches
   - Use new features

2. **Use Multiple Sponsors**
   - Integration projects stand out
   - Shows technical breadth
   - More prize eligibility

3. **Match Your Skills**
   - Pick achievable difficulty
   - Consider time limits
   - Play to your strengths

4. **Focus on "Why"**
   - Understand strategic value
   - Explain it in your pitch
   - Judges love this!

---

## 🧪 Testing the App

### Test 1: Featured Hackathon
```bash
1. Open app
2. Click "Supabase Launch Week"
3. Should load instantly (< 1 second)
4. Complete onboarding
5. See 6 pre-generated ideas
6. See 5 strategic leverages
```

### Test 2: Custom URL (With API Key)
```bash
1. Configure API key in /utils/ai.ts
2. Enter hackathon URL
3. Wait for analysis (10-15 seconds)
4. Complete onboarding
5. Wait for generation (15-20 seconds)
6. See personalized ideas
```

### Test 3: Filters
```bash
1. Get to results page
2. Click sponsor filter → See filtered ideas
3. Click difficulty filter → See filtered ideas
4. Use search → Find specific ideas
5. Clear filters → See all ideas
```

### Test 4: Regeneration
```bash
1. Get to results page
2. Click "Generate More Ideas"
3. Wait 15-20 seconds
4. See new ideas appear
5. Old ideas remain
```

---

## 🐛 Troubleshooting

### "AI analysis unavailable" Error

**Cause:** OpenAI API key not configured

**Solution:**
1. Try a featured hackathon instead (works without API)
2. Or configure your API key in `/utils/ai.ts`

### "401 - Invalid API key" Error

**Cause:** API key is wrong or expired

**Solutions:**
1. Check the key in `/utils/ai.ts`
2. Get a new key from OpenAI
3. Make sure you copied the entire key
4. Check for extra spaces

### No Ideas Generated

**Cause:** Various (API limits, network, etc.)

**Solutions:**
1. Try a featured hackathon
2. Check browser console for errors
3. Wait 30 seconds and try again
4. Check OpenAI account has credits

### Slow Loading

**Normal:** 
- Extraction: 10-15 seconds
- Idea generation: 15-20 seconds
- Sponsor analysis: 2-3 seconds per sponsor

**If Slower:**
- OpenAI API might be busy
- Try featured hackathon (instant)
- Check internet connection

---

## 📚 Documentation

### For Users
- **START_HERE.md** - Overview and main features
- **QUICK_START.md** - This file
- **ERROR_FIX_SUMMARY.md** - Common issues

### For Developers
- **AI_INTEGRATION_SUMMARY.md** - How AI works
- **AUTO_GENERATION_GUIDE.md** - Idea generation
- **HACKATHON_EXTRACTION_GUIDE.md** - Data extraction
- **ANALYZING_OVERLAY_GUIDE.md** - Loading states

### Feature Docs
- **FEATURE_SUMMARY.md** - All features
- **ENHANCED_LOADING_SUMMARY.md** - Loading UX
- **LATEST_UPDATES.md** - Recent changes

---

## 🎯 Next Steps

### New Users
```
1. Try "Supabase Launch Week" ⚡
2. Complete onboarding
3. Explore the results page
4. Learn how the app works
5. Try your own hackathon!
```

### Developers
```
1. Read AI_INTEGRATION_SUMMARY.md
2. Configure OpenAI API key
3. Test with custom URLs
4. Read source code
5. Customize for your needs
```

### Hackathon Participants
```
1. Enter your hackathon URL
2. Complete onboarding
3. Read ALL strategic leverages
4. Pick a high-scoring idea
5. Focus on tier 1-3 opportunities
6. WIN! 🏆
```

---

## ✅ Checklist

### First Time Setup
- [ ] Open the app
- [ ] See demo mode banner
- [ ] Click "Supabase Launch Week"
- [ ] Complete onboarding
- [ ] Explore results page
- [ ] Understand the features

### With API Key
- [ ] Get OpenAI API key
- [ ] Edit /utils/ai.ts
- [ ] Save the file
- [ ] Test with custom URL
- [ ] Verify extraction works
- [ ] Verify generation works

### For Hackathon
- [ ] Analyze your hackathon
- [ ] Study strategic leverages
- [ ] Review all ideas
- [ ] Filter by your target sponsor
- [ ] Pick a project
- [ ] Build it!
- [ ] Win prizes! 🏆

---

## 🎉 You're Ready!

The app is fully functional in **demo mode** with featured hackathons.

**Try it now:**
1. Click "Supabase Launch Week"
2. Get instant results
3. Explore strategic opportunities
4. Find your winning project!

**Questions?**
- Check the documentation
- Read the guides
- Explore the code
- Have fun! 🚀

---

**Good luck at your hackathon! 🏆**
