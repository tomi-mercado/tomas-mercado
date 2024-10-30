import { useContent } from 'contexts/content';

import React from 'react';
import { FaGoogle as GoogleIcon } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';

const ModalLoginRequired: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const {
    content: {
      common: { close },
      tombot: { almostReady, needLogin, loginWithGoogle },
    },
  } = useContent('Home');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{almostReady} 🤖</DialogTitle>
        <DialogDescription>{needLogin}</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {close}
          </Button>
          <Button asChild>
            <Link href="/api/auth/login">
              <GoogleIcon />
              {loginWithGoogle}
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLoginRequired;
