import styled from 'styled-components';

export const Container = styled.div`
  height: 70px;
  position: fixed;
  top: 0;
  left: 240px;
  right: 0;
  z-index: 100;
  background-color: #170f23;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);

  & .header-content {
    height: 100%;
    width: 100%;
    padding-left: var(--padding-section);
    padding-right: var(--padding-section);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .header-left {
    flex-grow: 1;
    max-width: 540px;
    width: 100%;
    display: flex;
    align-items: center;

    .header-nav {
      display: flex;
      align-items: center;
      margin-right: 2rem;
      button {
        display: flex;
        align-items: center;
        background-color: transparent;
        color: #fff;
        font-size: 2rem;

        &:disabled {
          cursor: default;
          opacity: 0.3;
        }
      }

      button + button {
        margin-left: 2rem;
      }
    }
    .header-search {
      position: relative;
      flex-grow: 1;
    }
    input {
      width: 100%;
      height: 4rem;
      border-radius: 2rem;
      background-color: hsla(0, 0%, 100%, 0.1);
      border: none;
      color: #eee;
      padding: 5px 0;
      font-size: 1.4rem;
      padding: 0 3.5rem;

      ::placeholder {
        color: #dadada;
      }

      :focus {
        background-color: #432275;
      }
    }

    svg.search-icon,
    svg.delete-icon {
      position: absolute;
      top: 50%;
      font-size: 2rem;
      color: #eee;
      transform: translateY(-50%);
    }

    svg.delete-icon {
      right: 1rem;
    }
    svg.search-icon {
      left: 1rem;
    }
  }

  & .header-right {
    display: flex;
    align-items: center;

    & .header-avatar img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 100%;
    }

    & .header-right-item {
      width: 4rem;
      aspect-ratio: 1;
      border-radius: 100%;
      display: grid;
      place-items: center;
      background-color: hsla(0, 0%, 100%, 0.1);
      cursor: pointer;

      &:hover {
        filter: brightness(0.9);
      }

      & svg {
        color: #d8d8d8;
        font-size: 2rem;
      }
    }
    .header-right-item + .header-right-item {
      margin-left: 1rem;
    }

    & .header-avatar-menu {
      background-color: #432275;
      width: 24rem;
      box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
      border-radius: 0.8rem;
      padding-top: 1rem;
      padding-bottom: 1rem;

      & .greeting {
        padding: 6px 20px;
        color: #fff;
        font-size: 1.4rem;
      }
      & .header-avatar-menu-item {
        display: flex;
        align-items: center;
        padding: 12px 20px 12px 17px;
        font-size: 1.4rem;
        color: #fff;
        background-color: transparent;
        width: 100%;

        svg {
          font-size: 2rem;
          margin-right: 1rem;
        }

        &:hover {
          background-color: #563983;
        }
      }
    }
  }
`;
