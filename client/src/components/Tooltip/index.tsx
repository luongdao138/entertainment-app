import React from 'react';
import { Tooltip, TooltipProps } from '@mui/material';

type Props = TooltipProps & {
  children: React.ReactElement;
  title: string;
  disabled?: boolean;
};

const MyTooltip: React.FC<Props> = ({
  children,
  title,
  disabled,
  ...props
}) => {
  if (disabled) return children;
  return (
    <Tooltip
      PopperProps={{
        sx: {
          '& .MuiTooltip-tooltip': {
            fontSize: '1.1rem !important',
            color: '#dadada',
            backgroundColor: '#333333',
            padding: '4px 10px',
          },
          '& .MuiTooltip-arrow': {
            color: '#333333',
          },
        },
      }}
      title={title}
      arrow
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default MyTooltip;
