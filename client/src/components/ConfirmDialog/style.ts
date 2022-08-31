import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  background-color: #432275;
  border-radius: 0.8rem;
  color: #dadada;

  & .confirm-title {
    color: #fff;
    line-height: 2.7rem;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  & .confirm-desc {
    font-size: 1.4rem;
    line-height: 2.1rem;
  }

  & .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;

    button {
      font-size: 12px;
      padding: 6px 19px;
      border-radius: 100rem;
      color: #fff;

      &:hover {
        filter: brightness(0.9);
      }

      &.cancel-btn {
        margin-right: 1.5rem;
        background-color: hsla(0, 0%, 100%, 0.1);
        border: 1px solid hsla(0, 0%, 100%, 0.1);
      }

      &.ok-btn {
        background-color: #7200a1;
      }
    }
  }
`;
