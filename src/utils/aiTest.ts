/**
 * Test utilities for AI integration
 * 
 * Use these functions to test your AI setup without going through the full app flow
 */

import { generateIdeas, generateLeverages, extractHackathonData } from './ai';

/**
 * Quick test function for AI idea generation
 * Run this in browser console: testIdeasGeneration()
 */
export async function testIdeasGeneration() {
  console.log('🧪 Testing AI Ideas Generation...\n');
  
  try {
    const testParams = {
      hackathonName: 'Test Hackathon 2024',
      sponsors: ['OpenAI', 'Vercel', 'Supabase'],
      technicalLevel: 'professional' as const,
      commitmentLevel: 'hardcore' as const,
      teamSize: '2' as const,
      intentions: ['win-prize', 'get-hired'] as const,
      additionalContext: 'Focus on AI and developer tools',
    };

    console.log('📝 Input Parameters:', testParams);
    console.log('\n⏳ Generating ideas (this may take 3-5 seconds)...\n');

    const startTime = Date.now();
    const ideas = await generateIdeas(testParams);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`✅ Success! Generated ${ideas.length} ideas in ${duration}s\n`);
    console.log('💡 Generated Ideas:', ideas);
    
    // Validate structure
    const firstIdea = ideas[0];
    if (firstIdea) {
      const requiredFields = ['id', 'title', 'description', 'score', 'difficulty', 'estimatedTime'];
      const missingFields = requiredFields.filter(field => !(field in firstIdea));
      
      if (missingFields.length > 0) {
        console.warn(`⚠️ Warning: Some ideas missing fields: ${missingFields.join(', ')}`);
      } else {
        console.log('✅ All required fields present');
      }
    }

    return ideas;
  } catch (error) {
    console.error('❌ Test Failed:', error);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check that USE_MOCK_DATA is set correctly in /utils/ai.ts');
    console.log('2. Verify your API key is set (if USE_MOCK_DATA = false)');
    console.log('3. Check browser console for network errors');
    throw error;
  }
}

/**
 * Quick test function for AI leverage generation
 * Run this in browser console: testLeveragesGeneration()
 */
export async function testLeveragesGeneration() {
  console.log('🧪 Testing AI Leverages Generation...\n');
  
  try {
    const testParams = {
      sponsors: ['OpenAI', 'Vercel', 'Supabase'],
      hackathonName: 'Test Hackathon 2024',
      additionalContext: 'Recent product launches and market trends',
    };

    console.log('📝 Input Parameters:', testParams);
    console.log('\n⏳ Generating leverages (this may take 3-5 seconds)...\n');

    const startTime = Date.now();
    const leverages = await generateLeverages(testParams);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`✅ Success! Generated ${leverages.length} leverages in ${duration}s\n`);
    console.log('🎯 Generated Leverages:', leverages);

    return leverages;
  } catch (error) {
    console.error('❌ Test Failed:', error);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check that USE_MOCK_DATA is set correctly in /utils/ai.ts');
    console.log('2. Verify your API key is set (if USE_MOCK_DATA = false)');
    console.log('3. Check browser console for network errors');
    throw error;
  }
}

/**
 * Test both ideas and leverages generation
 * Run this in browser console: testFullGeneration()
 */
export async function testFullGeneration() {
  console.log('🧪 Testing Full AI Generation (Ideas + Leverages)...\n');
  
  try {
    console.log('1️⃣ Testing Ideas Generation...');
    const ideas = await testIdeasGeneration();
    
    console.log('\n2️⃣ Testing Leverages Generation...');
    const leverages = await testLeveragesGeneration();

    console.log('\n🎉 All tests passed!');
    console.log(`Generated ${ideas.length} ideas and ${leverages.length} leverages`);

    return { ideas, leverages };
  } catch (error) {
    console.error('❌ Full test failed:', error);
    throw error;
  }
}

/**
 * Compare mock vs real AI responses
 */
export async function compareMockVsReal() {
  console.log('🧪 Comparing Mock Data vs Real AI...\n');
  
  // This would require toggling USE_MOCK_DATA
  console.log('⚠️ Manual test:');
  console.log('1. Set USE_MOCK_DATA = true in /utils/ai.ts');
  console.log('2. Run testIdeasGeneration() and note the results');
  console.log('3. Set USE_MOCK_DATA = false and add your API key');
  console.log('4. Run testIdeasGeneration() again and compare');
  console.log('5. Mock data should return in ~1s, real AI in ~3-5s');
}

/**
 * Test hackathon data extraction
 * Run this in browser console: testHackathonExtraction('https://hackathon-url.com')
 */
export async function testHackathonExtraction(url: string = 'https://supabase.com/launch-week') {
  console.log('🧪 Testing Hackathon Data Extraction...\n');
  console.log(`📍 URL: ${url}\n`);
  
  try {
    const startTime = Date.now();
    console.log('⏳ Extracting hackathon data (this may take 5-10 seconds)...');
    
    const data = await extractHackathonData({ url });
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(`\n✅ Success! Extracted data in ${duration}s\n`);
    console.log('🎯 Extracted Data:');
    console.log('Name:', data.name);
    console.log('Organizer:', data.organizer);
    console.log('Date:', data.date);
    console.log('Location:', data.location);
    console.log('Sponsors:', data.sponsors);
    console.log('Description:', data.description);
    console.log('Jury:', data.jury);
    console.log('Theme:', data.theme);
    console.log('\nFull data:', data);

    return data;
  } catch (error) {
    console.error('❌ Test Failed:', error);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check that USE_MOCK_DATA is set correctly in /utils/ai.ts');
    console.log('2. Verify your API key is set (if USE_MOCK_DATA = false)');
    console.log('3. Check browser console for network errors');
    console.log('4. Make sure the URL is accessible');
    throw error;
  }
}

// Make functions available globally for easy console testing
if (typeof window !== 'undefined') {
  (window as any).testIdeasGeneration = testIdeasGeneration;
  (window as any).testLeveragesGeneration = testLeveragesGeneration;
  (window as any).testFullGeneration = testFullGeneration;
  (window as any).testHackathonExtraction = testHackathonExtraction;
  (window as any).compareMockVsReal = compareMockVsReal;
}

/**
 * Example console usage:
 * 
 * // Test hackathon extraction
 * await testHackathonExtraction('https://hackathon-url.com')
 * 
 * // Test ideas generation
 * await testIdeasGeneration()
 * 
 * // Test leverages generation  
 * await testLeveragesGeneration()
 * 
 * // Test everything
 * await testFullGeneration()
 * 
 * // Compare mock vs real
 * compareMockVsReal()
 */
