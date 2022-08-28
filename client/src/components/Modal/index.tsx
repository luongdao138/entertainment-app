import React from 'react';
import { Dialog, DialogProps } from '@mui/material';

type Props = DialogProps & {
  open: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ open, children, ...props }) => {
  return (
    <Dialog open={open} fullWidth {...props}>
      {children}
    </Dialog>
  );
};

export default Modal;
