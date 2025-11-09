import { useState } from 'react';
import { Button } from './ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AIGenerationButtonProps = {
  onGenerate: () => Promise<void>;
  label?: string;
  loadingLabel?: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
};

export function AIGenerationButton({
  onGenerate,
  label = 'Generate with AI',
  loadingLabel = 'Generating...',
  variant = 'default',
  size = 'default',
  className = '',
}: AIGenerationButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = async () => {
    setIsGenerating(true);
    try {
      await onGenerate();
      toast.success('Generation complete!');
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Failed to generate. Please check your API configuration.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isGenerating}
      variant={variant}
      size={size}
      className={className}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  );
}
