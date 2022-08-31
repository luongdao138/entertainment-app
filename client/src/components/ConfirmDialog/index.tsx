import { DialogProps } from '@mui/material';
import React from 'react';
import { Meta } from '../../redux/metadata/actions/types';
import Modal from '../Modal';
import { Container } from './style';

type Props = DialogProps & {
  open: boolean;
  title: string;
  desc: string;
  onCancel: () => void;
  onOk: () => void;
  cancelText?: string;
  okText?: string;
  meta: Meta;
};

const ConfirmDialog: React.FC<Props> = ({
  open,
  desc,
  onCancel,
  onOk,
  title,
  cancelText = 'Không',
  okText = 'Có',
  meta,
  ...rest
}) => {
  return (
    <Modal open={open} onClose={onCancel} maxWidth='sm' {...rest}>
      <Container>
        <h2 className='confirm-title'>{title}</h2>
        <p className='confirm-desc'>{desc}</p>

        <div className='btn-container'>
          <button className='cancel-btn' onClick={onCancel}>
            {cancelText}
          </button>
          <button className='ok-btn' disabled={meta.pending} onClick={onOk}>
            {okText}
          </button>
        </div>
      </Container>
    </Modal>
  );
};

export default ConfirmDialog;
