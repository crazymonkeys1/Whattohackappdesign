import { User, Clock, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { UserProfile } from '../App';

type RefinementPanelProps = {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
};

export function RefinementPanel({ userProfile, onUpdateProfile }: RefinementPanelProps) {
  const updateField = <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K]
  ) => {
    onUpdateProfile({ ...userProfile, [field]: value });
  };

  return (
    <Card className="p-5 sm:p-6 sticky top-24 space-y-6">
      <div>
        <h3 className="text-slate-900 mb-2">Refine Your Results</h3>
        <p className="text-sm text-slate-600">
          Optional: Help us personalize recommendations to your situation
        </p>
      </div>

      {/* Technical Level */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-600" />
          <Label>Technical Ability</Label>
        </div>
        <RadioGroup
          value={userProfile.technical || ''}
          onValueChange={(value) => updateField('technical', value as UserProfile['technical'])}
        >
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="technical" id="technical" />
            <Label htmlFor="technical" className="cursor-pointer flex-1">
              Technical
              <span className="block text-xs text-slate-500">Comfortable with code & APIs</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="non-technical" id="non-technical" />
            <Label htmlFor="non-technical" className="cursor-pointer flex-1">
              Non-Technical
              <span className="block text-xs text-slate-500">Prefer low-code solutions</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Time Commitment */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600" />
          <Label>Time Commitment</Label>
        </div>
        <RadioGroup
          value={userProfile.commitment || ''}
          onValueChange={(value) => updateField('commitment', value as UserProfile['commitment'])}
        >
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="continuous" id="continuous" />
            <Label htmlFor="continuous" className="cursor-pointer flex-1">
              Continuous Work
              <span className="block text-xs text-slate-500">All-in, minimal breaks</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="balanced" id="balanced" />
            <Label htmlFor="balanced" className="cursor-pointer flex-1">
              Balanced Schedule
              <span className="block text-xs text-slate-500">Need breaks & sleep</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Primary Goal */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600" />
          <Label>Primary Goal</Label>
        </div>
        <RadioGroup
          value={userProfile.intention || ''}
          onValueChange={(value) => updateField('intention', value as UserProfile['intention'])}
        >
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="win-prize" id="win-prize" />
            <Label htmlFor="win-prize" className="cursor-pointer">Win Prize</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="startup" id="startup" />
            <Label htmlFor="startup" className="cursor-pointer">Launch Startup</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="hired" id="hired" />
            <Label htmlFor="hired" className="cursor-pointer">Get Hired</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="impress" id="impress" />
            <Label htmlFor="impress" className="cursor-pointer">Impress Someone</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="learn" id="learn" />
            <Label htmlFor="learn" className="cursor-pointer">Learn & Have Fun</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          These preferences help us prioritize projects that match your goals and constraints.
        </p>
      </div>
    </Card>
  );
}
