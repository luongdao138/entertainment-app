import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Spinner } from '../../assets/loading-spinner.svg';
import { Backdrop } from '@mui/material';
import useLockScreen from '../../hooks/useLockScreen';

interface Props {
  open: boolean;
}

const FullscreenLoading: React.FC<Props> = ({ open }) => {
  const [locked, setLocked] = useLockScreen();

  useEffect(() => {
    setLocked(open);
  }, [open]);

  return (
    <Backdrop sx={{ zIndex: 1000 }} open={open}>
      <Spinner />
    </Backdrop>
  );
};

export default FullscreenLoading;
