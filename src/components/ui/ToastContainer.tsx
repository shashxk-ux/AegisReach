import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { Button } from './button';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-cyan-500 shrink-0" />;
        let borderClass = 'border-cyan-500/30';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
          borderClass = 'border-emerald-500/30';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
          borderClass = 'border-amber-500/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border bg-card/95 text-card-foreground backdrop-blur-xl shadow-xl flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-bottom-3 ${borderClass}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground">{toast.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{toast.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeToast(toast.id)}
              className="h-6 w-6 text-muted-foreground hover:text-foreground -mr-1 -mt-1"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
