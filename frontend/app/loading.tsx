import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading Portfolio Content...</p>
    </div>
  );
}
