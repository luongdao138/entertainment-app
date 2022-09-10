import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & .action-item {
    margin: 0 8px;
    padding: 3px;
    color: #fff;
    background-color: transparent;
    font-size: 18px;
    border-radius: 999px;
    width: 32px;
    aspect-ratio: 1;
    display: grid;
    transition: all 0.25s ease-in-out;
    place-items: center;

    & .big-icon {
      font-size: 2.4rem;
    }

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
    }

    &:disabled {
      box-shadow: none;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  & .play-state {
    width: 3.5rem;
    margin: 0 13px;
    padding: 3px;
    aspect-ratio: 1;
    border-radius: 100%;
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 2.2rem;
    background-color: transparent;
    border: 1px solid #fff;

    svg.icon {
      transform: translateX(1px);
    }

    &:hover {
      border-color: #c662ef;
      color: #c662ef;
    }
  }
`;
