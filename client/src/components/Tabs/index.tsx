import React from 'react';
import { Container, TabButton } from './style';

interface TabOption {
  label: string;
  value: string;
}

// interface TabProps {
//     onChange:
// }

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: TabOption[];
  textColor?: string;
  activeBackground?: string;
}

const Tabs: React.FC<Props> = ({
  options,
  onChange,
  value,
  textColor,
  activeBackground,
}) => {
  return (
    <Container className='tabs-container'>
      {options.map((o) => (
        <TabButton
          className='tabs-item'
          active={o.value === value}
          onClick={() => onChange(o.value)}
          textColor={textColor}
          key={o.value}
          activeBackground={activeBackground}
        >
          {o.label}
        </TabButton>
      ))}
    </Container>
  );
};

export default Tabs;
