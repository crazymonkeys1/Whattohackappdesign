import { AlertCircle, CheckCircle, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

/**
 * Banner that shows AI setup status and instructions
 * Can be dismissed by user
 */
export function AISetupBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  
  // This should match the actual config in ai.ts
  const isConfigured = false; // Set to true when API key is added
  const useMockData = false; // Current setting from ai.ts

  if (isDismissed) return null;

  // Don't show if already configured
  if (isConfigured) return null;

  return (
    <div className="border-b border-neutral-800/30 bg-neutral-950">
      <div className="px-4 sm:px-6 py-3">
        <div className="max-w-[1400px] mx-auto">
          <Alert className="border-[#ff6b35]/30 bg-[#ff6b35]/5 relative pr-12">
            <AlertCircle className="h-4 w-4 text-[#ff6b35]" />
            <AlertTitle className="text-white text-[11px] tracking-[0.5px] uppercase mb-1">
              AI Generation Ready for Testing
            </AlertTitle>
            <AlertDescription className="text-neutral-400 text-[11px] leading-[16px]">
              {useMockData ? (
                <>
                  Currently using sample data. To enable real AI generation:
                  <br />
                  1. Get API key from{' '}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff6b35] hover:underline inline-flex items-center gap-1"
                  >
                    OpenAI
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <br />
                  2. Add it to <code className="text-[#ff6b35] bg-black px-1 py-0.5 rounded text-[10px]">/utils/ai.ts</code> (line 15)
                  <br />
                  3. Click "Regenerate Ideas" to test
                  {' · '}
                  <a
                    href="/TESTING_INSTRUCTIONS.md"
                    target="_blank"
                    className="text-[#ff6b35] hover:underline"
                  >
                    Full instructions
                  </a>
                </>
              ) : (
                <>
                  <span className="text-[#ff6b35] font-medium">Ready for real AI!</span> Add your OpenAI API key to{' '}
                  <code className="text-[#ff6b35] bg-black px-1 py-0.5 rounded text-[10px]">/utils/ai.ts</code> and click "Regenerate Ideas" to test.
                  {' · '}
                  <a
                    href="/TESTING_INSTRUCTIONS.md"
                    target="_blank"
                    className="text-[#ff6b35] hover:underline"
                  >
                    Setup guide
                  </a>
                </>
              )}
            </AlertDescription>
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-3 right-3 text-neutral-500 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </Alert>
        </div>
      </div>
    </div>
  );
}
