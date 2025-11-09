import { ProjectIdea } from '../App';

type ProjectCardProps = {
  project: ProjectIdea;
  onClick: () => void;
  isSelected?: boolean;
  isLast?: boolean;
};

const difficultyLabel = {
  beginner: 'Easy',
  intermediate: 'Medium',
  advanced: 'Hard',
};

export function ProjectCard({ project, onClick, isSelected = false, isLast = false }: ProjectCardProps) {
  if (!project) return null;
  
  return (
    <button 
      className={`w-full ${!isLast ? 'border-b border-neutral-800' : ''} py-5 px-5 cursor-pointer group hover:bg-neutral-950 transition-colors text-left ${
        isSelected ? 'bg-neutral-950 border-l-2 border-l-[#ff6b35]' : 'border-l-2 border-l-transparent'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Score - Fixed Width */}
        <div className="flex-shrink-0 w-12">
          <p className={`font-normal leading-[32px] not-italic text-[32px] transition-colors ${
            isSelected ? 'text-[#ff6b35]' : 'text-white group-hover:text-[#ff6b35]'
          }`}>
            {project.score || 0}
          </p>
        </div>

        {/* Content - Flexible */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-normal leading-[24px] not-italic text-[20px] tracking-[0.0703px] mb-1 transition-colors ${
            isSelected ? 'text-[#ff6b35]' : 'text-white group-hover:text-[#ff6b35]'
          }`}>
            {project.title}
          </h3>
          <p className="font-normal leading-[18px] not-italic text-[#a1a1a1] text-[13px] tracking-[-0.15px] line-clamp-2 mb-3">
            {project.description}
          </p>
          
          {/* Meta Info - Inline */}
          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1">
              <span className="text-neutral-600">Difficulty:</span>
              <span className="text-white">{difficultyLabel[project.difficulty]}</span>
            </div>
            <span className="text-neutral-800">•</span>
            <div className="flex items-center gap-1">
              <span className="text-neutral-600">Time:</span>
              <span className="text-white">{project.estimatedTime?.split('-')[0] || 'TBD'}</span>
            </div>
            <span className="text-neutral-800">•</span>
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <span className="text-neutral-600">Tech:</span>
              <span className="text-neutral-400 truncate">{project.sponsors?.join(', ') || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
