import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: #432275;
  padding: 2rem;

  & .title {
    font-size: 1.8rem;
    line-height: 2.7rem;
    color: #fff;
    margin-bottom: 1rem;
  }

  .edit-song-right {
    .column-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  .edit-song-main {
    display: flex;
    align-items: flex-start;

    & .edit-song-left {
      width: 130px;
      aspect-ratio: 1;
      overflow: hidden;
      cursor: pointer;
      flex-shrink: 0;
      img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
      }
      position: relative;

      .upload-image {
        position: absolute;
        z-index: 10;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);

        span {
          font-size: 1.2rem;
          line-height: 1.8rem;
        }

        svg {
          font-size: 1.2rem;
          margin-left: 0.65rem;
        }

        :hover {
          filter: brightness(0.9);
        }
      }
    }
  }

  .edit-song-right {
    flex-grow: 1;
    margin-left: 1.5rem;

    .btns {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      button {
        font-size: 14px;
        padding: 9px 24px;
        background-color: hsla(0, 0%, 100%, 0.1);
        border: 1px solid hsla(0, 0%, 100%, 0.1);
        color: #fff;
        text-transform: uppercase;
        border-radius: 999rem;
        margin-left: 1rem;
      }

      button[type='submit'] {
        background-color: #7200a1;
        border-color: #7200a1;
      }
    }
  }
`;
