import React from 'react';
import { X } from 'lucide-react';
import { Button, Dialog } from '../ui';
import { NavList } from './NavList';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    label="Main navigation"
    variant="drawer"
    className="dialog-drawer-left left-0 right-auto max-w-sm border-l-0 border-r lg:hidden"
  >
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Workflow</p>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close navigation">
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      <NavList onNavigate={onClose} />
    </div>
  </Dialog>
);
