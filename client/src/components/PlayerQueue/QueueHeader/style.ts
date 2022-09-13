import styled from 'styled-components';

export const Container = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & .tabs-item:hover {
    color: #fff;
  }

  & .queue-header-action {
    width: 32px;
    aspect-ratio: 1;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background-color: hsla(0, 0%, 100%, 0.1);
    color: #fff;
    font-size: 1.6rem;
    margin-left: 0.5rem;

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }

    :hover {
      filter: brightness(0.9);
    }
  }
`;
