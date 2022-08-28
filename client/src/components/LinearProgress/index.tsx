import { LinearProgress, LinearProgressProps } from '@mui/material';
import React from 'react';
import { Container } from './style';

const Progress: React.FC<LinearProgressProps & { value: number }> = (props) => {
  return (
    <Container>
      <div className='progress'>
        <LinearProgress
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10rem',
            height: '6px',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'rgb(114, 0, 161)',
              height: '6px',
              borderRadius: '10rem',
            },
          }}
          variant='determinate'
          {...props}
        />
      </div>

      <span className='percent'>{props.value}%</span>
    </Container>
  );
};

export default Progress;
