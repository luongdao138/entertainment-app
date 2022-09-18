import styled from 'styled-components';

export const Container = styled.div`
  background-color: #432275;
  width: 100%;

  .share-main {
    padding: 10px 20px 10px 14px;
    display: flex;
    color: rgb(218, 218, 218);
    font-size: 14px;
    cursor: pointer;
    align-items: center;

    span {
      flex-grow: 1;
    }

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
      color: #fff;
    }

    & svg.icon {
      margin-right: 1.5rem;
      font-size: 2rem;
    }

    .arrow {
      font-size: 1.6rem;
    }
  }
`;

export const ShareMenuContainer = styled.div`
  width: 230px;
  background-color: #432275;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
  padding: 10px 0;
  color: #fff;

  .share-item {
    width: 100%;
    padding: 10px 20px 10px 14px;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      margin-right: 1.5rem;
      font-size: 1.8rem;
    }

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
      color: #fff;
    }
  }
`;
