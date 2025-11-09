import { X } from 'lucide-react';
import { Button } from './ui/button';
import { ProjectIdea } from '../App';

type ProjectDetailSidebarProps = {
  project: ProjectIdea;
  onClose: () => void;
};

const difficultyLabel = {
  beginner: 'Easy',
  intermediate: 'Medium',
  advanced: 'Hard',
};

export function ProjectDetailSidebar({ project, onClose }: ProjectDetailSidebarProps) {
  return (
    <div className="fixed right-0 top-0 w-[75vw] h-screen bg-neutral-950 border-l border-neutral-800 z-50 animate-in slide-in-from-right duration-300 overflow-hidden flex flex-col">
      {/* Header - Fixed */}
      <div className="border-b border-neutral-800 px-8 py-6 flex-shrink-0 bg-black">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-500 hover:text-[#ff6b35] hover:bg-transparent"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="pr-12">
          <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[2.4px] uppercase mb-6">
            Project Details
          </p>
          
          {/* Title & Score - Compact */}
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-neutral-950 border border-neutral-800 px-3 py-2 flex-shrink-0">
                <p className="font-normal leading-[16px] not-italic text-[10px] text-neutral-500 tracking-[0.6px] uppercase mb-1">
                  Score
                </p>
                <p className="font-normal leading-[32px] not-italic text-[32px] text-[#ff6b35]">
                  {project.score}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-normal leading-[28px] not-italic text-[24px] text-white tracking-[-0.6px] mb-2">
                  {project.title}
                </h2>
                <p className="font-normal leading-[20px] not-italic text-[#a1a1a1] text-[14px] tracking-[-0.35px]">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          {/* Meta - Compact Grid */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-neutral-950 border border-neutral-800 p-2">
              <p className="font-normal leading-[14px] not-italic text-[9px] text-neutral-500 tracking-[0.6px] uppercase mb-1">
                Difficulty
              </p>
              <p className="font-normal leading-[16px] not-italic text-[12px] text-white tracking-[-0.1504px]">
                {difficultyLabel[project.difficulty]}
              </p>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 p-2">
              <p className="font-normal leading-[14px] not-italic text-[9px] text-neutral-500 tracking-[0.6px] uppercase mb-1">
                Time
              </p>
              <p className="font-normal leading-[16px] not-italic text-[12px] text-white tracking-[-0.1504px]">
                {project.estimatedTime}
              </p>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 p-2">
              <p className="font-normal leading-[14px] not-italic text-[9px] text-neutral-500 tracking-[0.6px] uppercase mb-1">
                Tech Level
              </p>
              <p className="font-normal leading-[16px] not-italic text-[12px] text-white tracking-[-0.1504px]">
                {project.techRequirements.split('-')[0]}
              </p>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 p-2">
              <p className="font-normal leading-[14px] not-italic text-[9px] text-neutral-500 tracking-[0.6px] uppercase mb-1">
                Tech
              </p>
              <p className="font-normal leading-[16px] not-italic text-[12px] text-white tracking-[-0.1504px] truncate">
                {project.sponsors[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 pb-12">
          {/* Why Strategic */}
          <div className="py-6 border-b border-neutral-800">
            <div className="bg-black border border-neutral-900 p-5">
              <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[2.4px] uppercase mb-3">
                Why This Will Win
              </p>
              <p className="font-normal leading-[24px] not-italic text-white text-[16px] tracking-[-0.4px]">
                {project.why}
              </p>
            </div>
          </div>

          {/* Strategic Advantages */}
          <div className="py-6 border-b border-neutral-800">
            <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[2.4px] uppercase mb-4">
              Strategic Advantages
            </p>
            <div className="space-y-2">
              {project.leverages.map((item, index) => (
                <div key={index} className="bg-black border border-neutral-900 p-3 flex gap-3 hover:border-[#ff6b35] transition-colors group">
                  <p className="font-normal leading-[20px] not-italic text-[16px] text-neutral-700 group-hover:text-[#ff6b35] tracking-[0.0703px] w-6 flex-shrink-0 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="font-normal leading-[20px] not-italic text-white text-[14px] tracking-[-0.35px] flex-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Skills */}
          <div className="py-6">
            <p className="font-normal leading-[16px] not-italic text-[12px] text-neutral-500 tracking-[2.4px] uppercase mb-4">
              Required Skills
            </p>
            <div className="space-y-2">
              {project.requiredSkills.map((skill, index) => (
                <div key={index} className="bg-black border border-neutral-900 p-3 flex gap-3 hover:border-[#ff6b35] transition-colors group">
                  <p className="font-normal leading-[20px] not-italic text-[16px] text-neutral-700 group-hover:text-[#ff6b35] tracking-[0.0703px] w-6 flex-shrink-0 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="font-normal leading-[20px] not-italic text-white text-[14px] tracking-[-0.35px] flex-1">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
