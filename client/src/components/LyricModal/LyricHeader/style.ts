import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .lyric-header-tabs {
    border-radius: 999px;
    padding: 3px;
    background-color: hsla(0, 0%, 100%, 0.1);
    display: grid;
    width: max-content;
    flex-shrink: 0;
    grid-template-columns: repeat(3, 1fr);
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

export const TabButton = styled.button`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 7%);
  background-color: ${(props: { active?: boolean }) =>
    props.active ? "hsla(0, 0%, 100%, 0.3)" : "transparent"};
  color: ${(props: { active?: boolean }) =>
    props.active ? "#fff" : "hsla(0,0%,100%,.5)"};
  font-weight: ${(props: { active?: boolean }) => (props.active ? 500 : 400)};
  border-radius: 999px;
  padding: 6px 45px;
  font-weight: 700;
  font-size: 1.6rem;
`;
