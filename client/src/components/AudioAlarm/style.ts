import styled from "styled-components";

interface Props {
  open_lyric?: boolean;
}

export const Container = styled.div`
  position: absolute;
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
  color: #fff;
  bottom: 100%;
  background-color: #7200a1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 9px 16px;
  max-width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;

  opacity: ${(props: Props) => (props.open_lyric ? 0 : 1)};
  visibility: ${(props: Props) => (props.open_lyric ? "hidden" : "visible")};

  span {
    font-size: 12px;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  svg {
    cursor: pointer;
    font-size: 2rem;
  }
`;
