import { Switch } from '@mui/material';
import React from 'react';
import { Container } from './style';

interface Props {
  title: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  desc?: string;
}

const MySwitch: React.FC<Props> = ({ setValue, title, value, desc }) => {
  return (
    <Container>
      <div className='left'>
        <p className='title'>{title}</p>
        {desc && <p className='desc'>{desc}</p>}
      </div>
      <div className='right'>
        <Switch
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
          sx={{
            '& .MuiSwitch-thumb': {
              backgroundColor: '#fff',
            },
            '& .MuiSwitch-track ': {
              backgroundColor: '#a0a0a0',
            },
            '& .Mui-checked + .MuiSwitch-track ': {
              backgroundColor: '#7200a1 !important',
            },
          }}
        />
      </div>
    </Container>
  );
};

export default MySwitch;
