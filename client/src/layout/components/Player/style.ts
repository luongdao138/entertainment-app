import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background-color: #170f23;

  & .player-content {
    padding: 0 2rem;
    height: 9rem;
    border-top: 1px solid hsla(0, 0%, 100%, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .player-left {
      width: 30%;
    }
    .player-middle {
      max-width: 40vw;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .player-right {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      & .divider {
        margin: 0 2rem;
        height: 33px;
        width: 1px;
        background-color: hsla(0, 0%, 100%, 0.1);
      }
      & .queue {
        button {
          background-color: hsla(0, 0%, 100%, 0.1);
          border-radius: 4px;
          padding: 0 5px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3rem;
          svg {
            font-size: 2rem;
          }
        }
      }
    }
  }
`;