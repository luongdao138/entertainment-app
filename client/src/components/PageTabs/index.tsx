import React, { useEffect } from 'react';
import { Container } from './style';
import { Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TabOption {
  label: string;
  href?: string;
}

interface Props {
  title: string;
  value: number;

  onChange: (value: number) => void;
  options: TabOption[];
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PageTabs: React.FC<Props> = ({ title, onChange, value, options }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <h2 className='title'>{title}</h2>
      <Tabs
        sx={{
          '& .MuiTab-root': {
            color: '#dadada',
            textTransform: 'uppercase',
            margin: '0 20px',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: 'unset',
            padding: 0,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'rgb(114, 0, 161)',
          },
          '& .MuiTab-root.Mui-selected': {
            color: '#fff',
          },
        }}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        aria-label='basic tabs example'
      >
        {options.map((o, index) =>
          o.href ? (
            <Tab
              key={index}
              label={o.label}
              disableRipple
              disableTouchRipple
              component='a'
              onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
              ) => {
                event.preventDefault();
                navigate(o.href ?? '/');
              }}
              href={o.href}
              {...a11yProps(index)}
            />
          ) : (
            <Tab
              key={index}
              label={o.label}
              disableRipple
              disableTouchRipple
              {...a11yProps(index)}
            />
          )
        )}
      </Tabs>
    </Container>
  );
};

export default PageTabs;
