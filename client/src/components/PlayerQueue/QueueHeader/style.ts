import styled from "styled-components";

export const Container = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & .queue-header-tabs {
    border-radius: 999px;
    flex-grow: 1;
    padding: 3px;
    background-color: hsla(0, 0%, 100%, 0.1);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

export const TabButton = styled.button`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 7%);
  background-color: ${(props: { active?: boolean }) =>
    props.active ? "hsla(0, 0%, 100%, 0.3)" : "transparent"};
  color: ${(props: { active?: boolean }) =>
    props.active ? "#fff" : "#dadada"};
  font-weight: ${(props: { active?: boolean }) => (props.active ? 500 : 400)};
  border-radius: 999px;
  padding: 5px 0;
  font-size: 1.2rem;
  line-height: 1.8rem;

  &:hover {
    color: #fff;
  }
`;
