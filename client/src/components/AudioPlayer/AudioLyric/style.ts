import styled from 'styled-components';

export const Container = styled.div`
  .karaoke-icon {
    margin-right: 12px;
    color: #fff;
    background-color: transparent;
    font-size: 2rem;
    border-radius: 999px;
    width: 32px;
    aspect-ratio: 1;
    display: grid;
    transition: all 0.25s ease-in-out;
    place-items: center;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
    }

    &:disabled {
      box-shadow: none;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
