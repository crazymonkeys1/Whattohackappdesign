import { Calendar, MapPin, Users, Award, ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { HackathonData } from '../App';

type HackathonDataViewProps = {
  data: HackathonData;
  onContinue: () => void;
  onBack: () => void;
};

export function HackathonDataView({ data, onContinue, onBack }: HackathonDataViewProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
            <h1 className="text-indigo-600">What To Hack</h1>
          </div>
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm">
              ✓ Hackathon Data Extracted
            </div>
            <h2 className="text-slate-900">{data.name}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {data.description}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Basic Info */}
            <Card className="p-6 space-y-4">
              <h3 className="text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Event Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="text-slate-900">{data.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="text-slate-900">{data.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500">Organizer</p>
                    <p className="text-slate-900">{data.organizer}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Sponsors */}
            <Card className="p-6 space-y-4">
              <h3 className="text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Sponsors & Partners
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.sponsors.map((sponsor, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  >
                    {sponsor}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-slate-600 pt-2">
                Projects leveraging these technologies will be prioritized in recommendations
              </p>
            </Card>
          </div>

          {/* Jury Section */}
          <Card className="p-6 space-y-4">
            <h3 className="text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Jury Panel
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.jury.map((judge, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <p className="text-slate-900">{judge}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-8">
            <div className="text-center sm:text-left">
              <p className="text-slate-900">Ready to see strategic project recommendations?</p>
              <p className="text-sm text-slate-600">We'll analyze this data to suggest winning ideas</p>
            </div>
            <Button
              onClick={onContinue}
              className="w-full sm:w-auto gap-2 bg-indigo-600 hover:bg-indigo-700 h-12 px-8"
            >
              View Recommendations
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
