import { X } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { ProjectIdea } from '../App';

type ProjectDetailDialogProps = {
  project: ProjectIdea;
  open: boolean;
  onClose: () => void;
};

const difficultyLabel = {
  beginner: 'Easy',
  intermediate: 'Medium',
  advanced: 'Hard',
};

export function ProjectDetailDialog({ project, open, onClose }: ProjectDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[1200px] max-h-[90vh] p-0 bg-black border-neutral-800 text-white rounded-none">
        {/* Header */}
        <div className="border-b border-neutral-800 px-12 py-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-8 right-8 text-neutral-500 hover:text-white hover:bg-transparent"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="grid grid-cols-12 gap-8 pr-12">
            {/* Score */}
            <div className="col-span-2">
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[2.4px] uppercase mb-4">
                Score
              </p>
              <p className="font-normal leading-[96px] not-italic text-[96px] text-white">
                {project.score}
              </p>
              <p className="font-normal leading-[28px] not-italic text-[20px] text-neutral-600 tracking-[-0.4492px]">
                / 100
              </p>
            </div>

            {/* Title & Description */}
            <div className="col-span-10">
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[2.4px] uppercase mb-4">
                Project
              </p>
              <h2 className="font-normal leading-[48px] not-italic text-[48px] text-white tracking-[-1.2px] mb-6">
                {project.title}
              </h2>
              <p className="font-normal leading-[28px] not-italic text-[#a1a1a1] text-[18px] tracking-[-0.4395px]">
                {project.description}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-4 gap-8 mt-12 pt-8 border-t border-neutral-800">
            <div>
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                Difficulty
              </p>
              <p className="font-normal leading-[20px] not-italic text-[14px] text-white tracking-[-0.1504px]">
                {difficultyLabel[project.difficulty]}
              </p>
            </div>
            <div>
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                Time Estimate
              </p>
              <p className="font-normal leading-[20px] not-italic text-[14px] text-white tracking-[-0.1504px]">
                {project.estimatedTime}
              </p>
            </div>
            <div>
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                Tech Requirements
              </p>
              <p className="font-normal leading-[20px] not-italic text-[14px] text-white tracking-[-0.1504px]">
                {project.techRequirements.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </p>
            </div>
            <div>
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[0.6px] uppercase mb-2">
                Technologies
              </p>
              <p className="font-normal leading-[20px] not-italic text-[14px] text-white tracking-[-0.1504px]">
                {project.sponsors.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="max-h-[calc(90vh-400px)]">
          <div className="px-12 pb-12">
            {/* Why Strategic */}
            <div className="py-12 border-b border-neutral-800">
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[2.4px] uppercase mb-6">
                Why This Will Win
              </p>
              <p className="font-normal leading-[32.5px] not-italic text-white text-[20px] tracking-[-0.4492px]">
                {project.why}
              </p>
            </div>

            {/* Strategic Advantages */}
            <div className="py-12 border-b border-neutral-800">
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[2.4px] uppercase mb-8">
                Strategic Advantages
              </p>
              <div className="space-y-6">
                {project.leverages.map((item, index) => (
                  <div key={index} className="flex gap-8">
                    <p className="font-normal leading-[32px] not-italic text-[24px] text-neutral-700 tracking-[0.0703px] w-12 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="font-normal leading-[28px] not-italic text-white text-[18px] tracking-[-0.4395px] flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div className="py-12">
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[2.4px] uppercase mb-8">
                Required Skills
              </p>
              <div className="space-y-6">
                {project.requiredSkills.map((skill, index) => (
                  <div key={index} className="flex gap-8">
                    <p className="font-normal leading-[32px] not-italic text-[24px] text-neutral-700 tracking-[0.0703px] w-12 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="font-normal leading-[28px] not-italic text-white text-[18px] tracking-[-0.4395px] flex-1">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
