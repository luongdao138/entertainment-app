import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;

  & .action-item {
    margin: 0 5px;
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
  }

  & .slider {
    width: 7rem;
    display: flex;
    align-content: center;
  }
`;
