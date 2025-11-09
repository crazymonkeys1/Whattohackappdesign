import { AlertCircle, Zap } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function DemoModeBanner() {
  return (
    <Alert className="bg-neutral-950 border-[#ff6b35]/30 mb-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-[#ff6b35] mt-0.5" />
        <div className="flex-1">
          <AlertDescription className="text-neutral-300 text-[13px] leading-[18px]">
            <span className="text-[#ff6b35] font-medium">Demo Mode Active</span> – OpenAI API not configured.{' '}
            <span className="inline-flex items-center gap-1 text-white">
              <Zap className="w-3 h-3 inline" />
              Try featured hackathons
            </span>{' '}
            for instant results, or configure your API key in <code className="text-[#ff6b35] text-[11px] px-1 py-0.5 bg-black rounded">/utils/ai.ts</code> for full functionality.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
