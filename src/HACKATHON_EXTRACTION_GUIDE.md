# 🔍 Hackathon Data Extraction Guide

## Overview

The app now **automatically analyzes hackathon pages** using AI when you paste a URL. It extracts key information about the hackathon and analyzes strategic opportunities for each sponsor.

---

## 🎯 What Gets Extracted

### Basic Information
- **Hackathon name**
- **Date/timeline**
- **Location** (virtual/hybrid/physical)
- **Organizer** company
- **Description** (2-3 sentence summary)
- **Theme** (AI, Web3, etc.)
- **Prizes** (if mentioned)

### Sponsor Data
- **List of all sponsors** (main, tech partners, API partners)
- **Jury members/judges**

### Strategic Analysis (Per Sponsor)
For each sponsor, AI analyzes:

1. **Company Snapshot**
   - Main products
   - Target audience
   - Recent updates
   - Competitors
   - Key differentiation

2. **Strategic Opportunities** (8 types)
   - Evangelization/Awareness
   - Community Engagement
   - Product Feedback Loop
   - Use Case Creation
   - Integration & Ecosystem Play
   - Influencer/Maker Adoption
   - Recruitment & Talent Discovery
   - Long-term Strategic Positioning

---

## 🚀 How to Use

### In the App

1. **Paste hackathon URL** in the landing page input
2. **Click "Analyze"**
3. **Wait 10-20 seconds** (AI is working!)
4. **See extracted data** in onboarding
5. **View sponsor opportunities** in Context Cards

### Progress Indicators

```
"Analyzing hackathon page..."
  ↓
"Analyzing sponsor opportunities..."
  ↓
"Hackathon analyzed successfully!"
```

---

## 🧪 Testing in Console

### Quick Test
```javascript
// Test with any hackathon URL
await testHackathonExtraction('https://devpost.com/hackathons')
```

### Expected Output
```
🧪 Testing Hackathon Data Extraction...
📍 URL: https://devpost.com/hackathons

⏳ Extracting hackathon data (this may take 5-10 seconds)...

✅ Success! Extracted data in 7.2s

🎯 Extracted Data:
Name: Example Hackathon 2025
Organizer: Devpost
Date: March 15-17, 2025
Location: Virtual
Sponsors: ['OpenAI', 'Vercel', 'Supabase']
Description: Build AI-powered apps...
Jury: ['John Doe (CEO)', 'Jane Smith (CTO)']
Theme: AI/ML
```

---

## 📊 Example Analysis Output

### For Sponsor: Supabase

**Company Snapshot:**
- **Products:** Postgres database, auth, storage, edge functions
- **Target:** Developers building full-stack apps
- **Recent:** Launched AI features, vector search
- **Competitors:** Firebase, AWS Amplify
- **Differentiation:** Open source, SQL-first

**Opportunities:**

| Type | Description | Example |
|------|-------------|---------|
| **1. Evangelization** | Increase awareness among devs | Run live workshop on AI + Supabase |
| **2. Community** | Activate early adopters | Recruit 10 ambassadors from participants |
| **3. Product Feedback** | Validate new features | Test AI search with real projects |
| **4. Use Case Creation** | Real-world showcases | Highlight 5 best projects in launch week |
| **5. Integration** | Promote partner tools | Partner with Vercel for deploy demos |
| **6. Influencer Adoption** | Attract makers | Sponsor indie maker prize category |
| **7. Recruitment** | Find talent | Identify top 3 backend engineers |
| **8. Strategic Position** | Rebrand narrative | Position as "AI-native database" |

---

## 🎨 UI Integration

### Context Cards Section

The extracted sponsor opportunities automatically populate the **"Key Leverages"** card:

```
Key Leverages (AI Badge)
  ↓
Selected (2)
  ↓
- Supabase: Evangelization/Awareness
  "Run live workshop showcasing AI + Supabase integration"
  [High Impact]
  
- Figma: Product Launch
  "Figma just launched Make - looking for use cases"
  [High Impact]
  ↓
Available
  ↓
- Vercel: Integration & Ecosystem Play
  "Promote Supabase + Vercel stack"
  [Medium Impact]
```

### Auto-Selection

High-relevance opportunities (types 1-2) are **automatically selected** and used for idea generation.

---

## 🔧 Configuration

### AI Model
```typescript
// In /utils/ai.ts
model: 'gpt-4-turbo-preview'  // Best quality
// or
model: 'gpt-3.5-turbo'        // Faster, cheaper
```

### Timeout Settings
```typescript
// Extraction timeout
max_tokens: 3000  // ~10-15 seconds

// Analysis timeout (per sponsor)
max_tokens: 3000  // ~10-15 seconds
```

### Mock Mode
```typescript
// In /utils/ai.ts
const USE_MOCK_DATA = true;  // Use sample data
```

---

## 🎯 Strategic Framework

The analysis uses an **8-tier opportunity framework** from foundational to advanced:

### Tier 1-2: Foundation
- **Evangelization:** Awareness & adoption
- **Community:** Early adopters & ambassadors

### Tier 3-5: Value Creation
- **Product Feedback:** Live validation
- **Use Cases:** Real-world showcases
- **Integration:** Ecosystem plays

### Tier 6-8: Strategic
- **Influencer:** Maker adoption
- **Recruitment:** Talent discovery
- **Positioning:** Brand narratives

---

## 💡 Smart Features

### Multi-Sponsor Analysis
- Analyzes **all sponsors** in parallel
- Handles errors gracefully (continues if one fails)
- Shows progress for each sponsor

### Intelligent Categorization
```javascript
// Auto-categorizes by opportunity type
Type 1-2 → High relevance
Type 3-5 → Medium relevance
Type 6-8 → Low relevance (but strategic!)
```

### Contextual Examples
Each opportunity includes a **concrete, actionable example**:
- Not: "Increase awareness"
- But: "Run live workshop on AI search + Supabase at 2pm EST"

---

## 🚨 Error Handling

### URL Not Found
```
❌ Failed to analyze hackathon
💡 Check the URL and try again
```

### API Key Missing
```
❌ 401 Unauthorized
💡 Add your OpenAI API key to /utils/ai.ts
```

### Sponsor Analysis Failed
```
⚠️ Failed to analyze [Sponsor Name]
✅ Continuing with other sponsors...
```

### Timeout
```
⏳ Taking longer than expected...
💡 Try a simpler URL or check connection
```

---

## 📈 Performance

### Timing Breakdown
```
Hackathon extraction:  5-10 seconds
Per sponsor analysis:  3-5 seconds
3 sponsors total:      ~15-20 seconds
10 sponsors total:     ~40-60 seconds
```

### Cost (OpenAI GPT-4)
```
Hackathon extraction:  $0.01-0.02
Per sponsor analysis:  $0.01-0.02
3 sponsors total:      ~$0.04-0.08
10 sponsors:           ~$0.12-0.22
```

### Optimization Tips
1. Use **GPT-3.5** for 10x cheaper
2. **Cache results** for same URL
3. **Limit sponsors** to top 5
4. Use **mock mode** for testing

---

## 🎮 Workflow

### Complete Flow
```
User pastes URL
  ↓
AI fetches page
  ↓
Extract basic info (name, dates, etc.)
  ↓
Identify sponsors (parse all partner types)
  ↓
For each sponsor:
  ↓
  Research company
  ↓
  Analyze opportunities
  ↓
  Generate examples
  ↓
Combine all data
  ↓
Store in app state
  ↓
Display in UI
  ↓
Auto-select high-impact leverages
  ↓
User proceeds to idea generation
```

---

## 🧰 Developer Notes

### Data Structure
```typescript
type HackathonData = {
  name: string;
  date: string;
  location: string;
  organizer: string;
  sponsors: string[];
  description: string;
  jury: string[];
  url?: string;
  theme?: string;
  prizes?: string;
  sponsorAnalysis?: SponsorAnalysis[];
};

type SponsorAnalysis = {
  sponsor: string;
  company_snapshot?: {
    company_name: string;
    main_products: string[];
    target_audience: string;
    recent_updates: string[];
    competitors: string[];
    differentiation: string;
  };
  opportunities: SponsorOpportunity[];
};

type SponsorOpportunity = {
  type: string;          // "1. Evangelization/Awareness"
  description: string;   // Strategic explanation
  example: string;       // Concrete action
};
```

### API Functions
```typescript
// Extract hackathon data
extractHackathonData({ url: string })

// Analyze specific sponsor
analyzeSponsorOpportunities(
  sponsorName: string,
  hackathonName: string,
  organizerName?: string,
  theme?: string
)
```

---

## 📚 Related Docs

- **[TESTING_INSTRUCTIONS.md](./TESTING_INSTRUCTIONS.md)** - Full AI testing guide
- **[README_AI_TESTING.md](./README_AI_TESTING.md)** - Quick reference
- **[AI_INTEGRATION_SUMMARY.md](./AI_INTEGRATION_SUMMARY.md)** - Complete overview

---

## ✅ Checklist

Before testing:
- [ ] Add OpenAI API key to `/utils/ai.ts`
- [ ] Set `USE_MOCK_DATA = false`
- [ ] Find a hackathon URL to test
- [ ] Open browser console
- [ ] Run `testHackathonExtraction('url')`

In the app:
- [ ] Paste hackathon URL
- [ ] Click "Analyze"
- [ ] Wait for success toast
- [ ] Check extracted data
- [ ] View sponsor opportunities
- [ ] Verify auto-selected leverages

---

## 🎉 Benefits

1. **No manual data entry** - AI does it all
2. **Strategic insights** - Not just basic info
3. **Personalized leverages** - Per sponsor analysis
4. **Actionable examples** - Concrete next steps
5. **Auto-prioritization** - High-impact first
6. **Real-time analysis** - Always current

---

**Ready to try?** Paste a hackathon URL and watch the magic happen! ✨
