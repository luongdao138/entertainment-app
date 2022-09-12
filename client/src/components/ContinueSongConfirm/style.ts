import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  background-color: #432275;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;

  & .btn {
    width: 100%;
    border-radius: 999px;
    text-transform: uppercase;
    padding: 8px 0;
    color: #fff;
    font-size: 1.4rem;
    background-color: transparent;
    &:hover {
      filter: brightness(0.9);
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  & .save-btn {
    background-color: #7200a1;
    padding: 9px 2.4rem;
  }

  & .cancel-btn {
    margin-top: 0.8rem;
  }

  .song-info {
    padding: 0 50px;
    text-align: center;
    img {
      width: 100%;
    }

    .name {
      font-size: 1.4rem;
      line-height: 2.1rem;
      margin-top: 0.25rem;
    }
    margin-bottom: 1.5rem;
  }

  .title {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    line-height: 2.1rem;
    font-weight: 400;
  }

  .singer-name {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.33;
    color: rgba(255, 255, 255, 0.5);
  }
`;
