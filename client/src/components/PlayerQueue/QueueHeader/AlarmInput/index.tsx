import React, { useRef, useState } from 'react';
import { AlarmTimeOption } from '../../../../constants/options';
import useBoolean from '../../../../hooks/useBoolean';
import { Container, TimeItem } from './style';
import { ClickAwayListener } from '@mui/material';
import {
  convertTimeToNumber,
  formatTimeNumber,
} from '../../../../utils/formatTime';
import _ from 'lodash';

interface Props {
  label: string;
  options: AlarmTimeOption[];
  value: string;
  maxValue?: number;
  onChange: (value: string) => void;
}

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const AlarmInput: React.FC<Props> = ({
  label,
  options,
  onChange,
  value,
  maxValue,
}) => {
  const {
    value: is_focus,
    setTrue: handleFocus,
    setFalse: handleBlur,
  } = useBoolean();

  const inputRef = useRef<HTMLInputElement>(null);
  const onClickAway = (e: MouseEvent | TouchEvent) => {
    if (!inputRef.current?.contains(e.target as Node)) {
      handleBlur();
    }
  };

  const handleSelectTime = (value: string) => {
    onChange(value);
    handleBlur();
  };

  const handleInputBlur = () => {
    if (value === '' || Number(value) === 0) onChange('00');
    else if (Number(value) < 10 && value.length === 1) onChange(`0${value}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let new_value = e.target.value;
    if (new_value.split('').some((c) => !numbers.includes(Number(c)))) {
      console.log('not a number');
      return;
    }

    if (new_value.length > 2) {
      new_value = new_value.slice(2);
    }

    if (!_.isNil(maxValue) && Number(new_value) > maxValue) {
      onChange(formatTimeNumber(maxValue));
    } else {
      onChange(new_value);
    }
  };

  return (
    <Container is_focus={is_focus}>
      <input
        type='text'
        onFocus={handleFocus}
        placeholder=''
        value={value}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <span className='label'>{label}</span>

      {is_focus && (
        <ClickAwayListener onClickAway={onClickAway}>
          <ul className='time-menu'>
            {options.map((o, index) => (
              <TimeItem
                onClick={() => handleSelectTime(formatTimeNumber(o.value))}
                selected={convertTimeToNumber(value) === o.value}
                key={index}
              >
                {o.label}
              </TimeItem>
            ))}
          </ul>
        </ClickAwayListener>
      )}
    </Container>
  );
};

export default AlarmInput;
