import { ErrorMessage, useField } from 'formik';
import React, { useState, useEffect } from 'react';
import { Container } from './style';
import { InputLabel, Select, MenuItem, FormControlProps } from '@mui/material';

type Option = {
  label: string;
  value: string;
};

type Props = FormControlProps & {
  name: string;
  label?: string;
  options: Option[];
};

const MySelect: React.FC<Props> = ({ name, options, ...props }) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    if (!field.value) {
      helpers.setValue(options?.[0]?.value);
    }
  }, []);

  return (
    <Container
      {...props}
      sx={{
        '& .MuiSelect-select.MuiSelect-outlined': {
          color: ' #fff !important',
          fontSize: '1.2rem',
          lineHeight: '1.8rem',
          fontFamily: "'Inter', sans-serif",
          padding: '9px 15px',
          '&:hover': {
            border: 'none',
          },
        },
      }}
    >
      {props.label && (
        <InputLabel id={props.id || name} shrink>
          {props.label}
        </InputLabel>
      )}
      <Select
        labelId={props.id || name}
        label={props.label}
        className='select'
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: '#432275',
              color: '#fff',
              '& .MuiMenuItem-root': {
                fontSize: '1.2rem',
                lineHeight: '1.8rem',
                fontFamily: "'Inter', sans-serif",
              },
              '& .MuiMenuItem-root:hover': {
                backgroundColor: 'hsla(0,0%,100%,0.1)',
              },
              '& .MuiMenuItem-root.Mui-selected': {
                backgroundColor: 'hsla(0,0%,100%,0.1) !important',
              },
            },
          },
        }}
        {...field}
      >
        {options.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
      {meta.error && meta.touched && (
        <ErrorMessage name={name} component='span' className='error' />
      )}
    </Container>
  );
};

export default MySelect;
