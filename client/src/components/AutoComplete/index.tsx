import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useField } from 'formik';
import { Container } from './style';

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  options: Option[];
}

const MyAutoComplete: React.FC<Props> = ({ name, options }) => {
  const [values, setValues] = React.useState<any[]>([]);
  const [field, meta, helpers] = useField(name);

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    v: Option[]
  ) => {
    setValues(v);
    helpers.setValue(v.map((v) => v.value).join(','));
  };

  React.useEffect(() => {
    console.log({ value: field.value, items: field.value.split(',') });
    if (field.value) {
      const items = field.value.split(',');
      let new_values: Option[] = [];
      items.forEach((item: string) => {
        const o = options.find((o) => o.value === item);
        if (o) new_values.push(o);
      });
      setValues(new_values);
    }
  }, [field.value, options]);

  return (
    <Container>
      <Autocomplete
        multiple
        id='country-select-demo'
        // sx={{ width: 300 }}
        options={options}
        autoHighlight
        fullWidth
        value={values}
        onChange={handleChange}
        sx={{
          backgroundColor: 'transparent',
        }}
        ListboxProps={{
          style: {
            backgroundColor: '#432275',
            color: '#fff ',
            fontSize: '1.2rem',
            lineHeight: '1.8rem',
            fontFamily: "'Inter', sans-serif",
          },
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option: Option) => option?.label}
        renderOption={(props, option) => (
          <Box
            key={option.value}
            component='li'
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            onBlur={field.onBlur}
            placeholder='Thể loại'
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid hsla(0, 0%, 100%, 0.1)',
              },
              '& .MuiOutlinedInput-root': {
                border: 'none',
                color: ' #fff !important',
                fontSize: '1.2rem',
                lineHeight: '1.8rem',
                padding: '9px 39px 9px 15px !important',
                fontFamily: "'Inter', sans-serif",

                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid hsla(0, 0%, 100%, 0.1) !important',
                  },
                },
                '& input': {
                  padding: '0 !important',
                },
                '& .MuiAutocomplete-popupIndicator': {
                  '& svg': {
                    color: 'rgba(231,227,252,0.54) !important',
                  },
                },
                '& .MuiChip-root ': {
                  margin: '3px',
                  backgroundColor: 'hsla(0,0%,100%,0.1)',
                },
                '& .MuiChip-label ': {
                  fontSize: '1.2rem',
                  color: '#fff',
                },
                '& .MuiChip-deleteIcon': {
                  color: '#fff',
                },
                '& .MuiAutocomplete-endAdornment  svg': {
                  color: '#fff',
                },
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #7200a1 !important',
              },
              '& .Mui-focused.MuiInputLabel-root': {
                color: 'rgb(145, 85, 253) !important',
              },
              '& legend': {
                width: '0',
              },
              '& .MuiFormHelperText-root.Mui-error': {
                marginLeft: '0px',
              },
            }}
          />
        )}
      />
    </Container>
  );
};

export default MyAutoComplete;
