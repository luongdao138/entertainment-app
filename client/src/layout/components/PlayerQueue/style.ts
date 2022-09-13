import styled from "styled-components";

interface Props {
  openQueue: boolean;
  openPlayer?: boolean;
}

export const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: ${(props: Props) => (props.openPlayer ? "90px" : "0")};
  z-index: 1000;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3), 0 1px 6px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(25, 255, 255, 0.05);
  background-color: #120822;
  width: 330px;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 15px 8px;
  transition: right 0.5s ease-in;

  // hiện tại đang hack cứng chiều rộng của player queue, có thể phải đặt biến global chỗ này
  right: ${(props: Props) => (props.openQueue ? "0" : "-330px")};

  & .queue-content {
    flex-grow: 1;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  @media (min-width: 1590px) {
    right: 0;
  }
`;

export const NoPlayerContainer = styled.div`
  & .skeleton-container {
    margin-top: 2rem;
    padding: 0 2rem;
    display: grid;
    gap: 1rem;
  }

  & .bottom {
    padding: 2rem 3.3rem;
    margin-top: 3rem;

    p {
      line-height: 2.2rem;
      font-size: 1.4rem;
      text-align: center;
    }

    button {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
      margin-top: 2rem;
      color: #fff;
      font-size: 14px;
      padding: 7px 26px;
      background-color: #7200a1;
      border-radius: 999px;

      &:hover {
        filter: brightness(0.9);
      }

      svg {
        font-size: 2rem;
        margin-right: 0.6rem;
      }
    }
  }
`;
