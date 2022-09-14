import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .MuiTooltip-tooltip {
    font-size: 1.1rem !important;
    color: #dadada;
    background-color: #333333;
    padding: 4px 10px;
  }
  & .MuiTooltip-arrow {
    color: #333333;
  }

  & .tabs-container {
    display: grid;
    width: max-content;
    flex-shrink: 0;
    grid-template-columns: repeat(3, 1fr);

    & .tabs-item {
      padding: 7px 45px;
      font-weight: 700;
      font-size: 1.6rem;
      box-shadow: none;

      @media (max-width: 1200px) {
        font-size: 14px;
        line-height: 1.4rem;
        padding: 7px 30px;
      }
    }
  }

  & .lyric-header-actions {
    display: flex;
    align-items: center;

    button {
      width: 4.5rem;
      aspect-ratio: 1;
      border-radius: 100%;
      background-color: hsla(0, 0%, 100%, 0.1);
      color: #fff;
      display: grid;
      place-items: center;
      svg {
        transform: translateY(1px);
        font-size: 2rem;
      }

      &:hover {
        filter: brightness(0.9);
      }
    }

    .action-btn + .action-btn {
      margin-left: 1.5rem;
    }
  }
`;
