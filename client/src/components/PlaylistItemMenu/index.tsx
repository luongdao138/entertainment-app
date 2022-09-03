import React from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
  MdPlaylistAdd,
} from 'react-icons/md';
import { Container } from './style';

interface Props {
  playlist_id: string;
  can_edit: boolean;
  can_delete: boolean;
  onOpenEditForm?: () => void;
  onOpenDeleteConfirmModal?: (e: React.MouseEvent<HTMLElement>) => void;
}

const PlaylistItemMenu: React.FC<Props> = ({
  can_delete,
  can_edit,
  playlist_id,
  onOpenEditForm,
  onOpenDeleteConfirmModal,
}) => {
  return (
    <>
      <Container>
        <ul className='list'>
          <li>
            <MdPlaylistAdd />
            <span>Thêm vào danh sách phát</span>
          </li>
          <li>
            <FaRegComment />
            <span>Bình luận</span>
          </li>
          <li>
            <FiDownload />
            <span>Tải xuống</span>
          </li>
          <li>
            <BsLink45Deg />
            <span>Sao chép link</span>
          </li>
          {can_edit && (
            <li onClick={onOpenEditForm}>
              <MdOutlineModeEdit />
              <span>Chỉnh sửa playlist</span>
            </li>
          )}
          {can_delete && (
            <li onClick={onOpenDeleteConfirmModal}>
              <MdOutlineDeleteOutline />
              <span>Xóa playlist</span>
            </li>
          )}
        </ul>
      </Container>
    </>
  );
};

export default PlaylistItemMenu;
