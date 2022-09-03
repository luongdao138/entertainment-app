import styled from 'styled-components';
import { FormControl } from '@mui/material';

export const Container = styled(FormControl)`
  & .selectPaper {
    color: #fff;
  }
  margin-bottom: 1.5rem !important;

  & .select {
    /* background-color: #312d4b; */
    border: none;
  }
  & .MuiOutlinedInput-notchedOutline {
    width: 100%;
    background-color: transparent;
    /* background-color: hsla(0, 0%, 100%, 0.1); */
    border: none;
    color: #fff !important;
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid hsla(0, 0%, 100%, 0.1);
  }
  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid hsla(0, 0%, 100%, 0.1) !important;
    /* border: 2px solid rgb(145, 85, 253) !important; */
  }
  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid hsla(0, 0%, 100%, 0.1) !important;
    /* border: 2px solid rgb(145, 85, 253) !important; */
  }
  & .Mui-focused {
    color: #fff !important;
  }
  & .MuiSelect-icon {
    color: rgba(231, 227, 252, 0.54);
  }
  & .MuiInputLabel-root {
    color: rgba(231, 227, 252, 0.68);
  }
  & legend {
    max-width: 100%;
  }
`;
