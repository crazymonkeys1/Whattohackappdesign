import { AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

/**
 * Simple component to show AI configuration status
 * Shows instructions when AI is in mock mode
 */
export function AIConfigStatus() {
  // Current configuration from /utils/ai.ts
  const USE_MOCK_DATA = false; // Matches ai.ts setting
  const hasApiKey = false; // Will be true once user adds their key

  return (
    <Alert className={`mb-4 ${!hasApiKey ? 'border-[#ff6b35]/30 bg-[#ff6b35]/5' : 'border-green-500/30 bg-green-500/5'}`}>
      {!hasApiKey ? (
        <AlertCircle className="h-4 w-4 text-[#ff6b35]" />
      ) : (
        <Sparkles className="h-4 w-4 text-green-500" />
      )}
      
      <AlertTitle className="text-white text-[12px] tracking-[0.3px]">
        {!hasApiKey ? 'AI Ready - Add API Key to Test' : 'AI Generation Active'}
      </AlertTitle>
      
      <AlertDescription className="text-neutral-400 text-[11px] mt-1">
        {!hasApiKey ? (
          <>
            Real AI mode enabled. Add your OpenAI API key to{' '}
            <code className="text-[#ff6b35] bg-black px-1 py-0.5 rounded text-[10px]">/utils/ai.ts</code>{' '}
            (line 15) to generate personalized ideas.{' '}
            <a
              href="/README_AI_TESTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6b35] hover:underline inline-flex items-center gap-1"
            >
              2-minute setup
              <ExternalLink className="w-3 h-3" />
            </a>
          </>
        ) : (
          <>
            Real-time AI generation enabled. Ideas and leverages will be personalized based on your context.{' '}
            <span className="text-green-400">Ready to generate!</span>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
