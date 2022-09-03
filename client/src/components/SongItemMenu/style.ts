import styled from 'styled-components';

export const Container = styled.div`
  background-color: #432275;
  width: 280px;

  & .menu-info {
    img {
      width: 4rem;
      height: 4rem;
      object-fit: cover;
      border-radius: 4px;
      margin-right: 1rem;
    }

    display: flex;
    align-items: center;
    padding: 15px;

    & .menu-name h4 {
      font-size: 1.4rem;
      line-height: 1.8rem;
      font-weight: 500;
      color: #fff;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    & .menu-name p {
      color: hsla(0, 0%, 100%, 0.5);
      font-size: 1.2rem;
    }
  }

  & .menu-btns {
    margin: 0 15px 15px;
    border-radius: 0.8rem;
    background-color: #563983;
    display: flex;

    & button {
      flex: 1 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0.8rem 0;
      border-radius: 8px;
      transition: all 0.1s;
      font-size: 1rem;
      color: #fff;
      background-color: transparent;

      &:hover {
        background-color: hsla(0, 0%, 100%, 0.1);
        color: #fff;
      }

      & + & {
        margin-left: 0.5rem;
      }

      & svg {
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
      }
    }
  }

  & .menu-list {
    padding-bottom: 1rem;
    & li {
      padding: 10px 20px 10px 14px;
      display: flex;
      color: rgb(218, 218, 218);
      font-size: 14px;
      cursor: pointer;
      align-items: center;

      &:hover {
        background-color: hsla(0, 0%, 100%, 0.1);
        color: #fff;
      }

      & svg {
        margin-right: 1.5rem;
        font-size: 2rem;
      }
    }
  }
`;
