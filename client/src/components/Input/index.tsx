import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Container } from './style';

type Props = React.HTMLProps<HTMLInputElement> & {
  name: string;
  label?: string;
};

const Input: React.FC<Props> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <Container>
      {props.label && <label htmlFor={props.id || name}>{props.label}</label>}
      <div className='input-container'>
        <input
          {...props}
          {...field}
          type={!isShowPassword ? props.type : 'text'}
        />
        {props.type === 'password' && (
          <span className='icon' onClick={toggleShowPassword}>
            {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </span>
        )}
      </div>
      {meta.error && meta.touched && (
        <ErrorMessage name={name} component='span' className='error' />
      )}
    </Container>
  );
};

export default Input;
