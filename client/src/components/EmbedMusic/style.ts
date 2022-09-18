import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  background-color: #432275;
  border-radius: 8px;
  color: #fff;

  & .embed-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .title {
      font-size: 18px;
      font-weight: 700;
      line-height: 27px;
    }

    svg {
      font-size: 2.2rem;
      cursor: pointer;
    }
  }

  & .embed-main {
    border-radius: 8px;
    overflow: hidden;
    background-color: hsla(0, 0%, 100%, 0.1);

    .embed-url {
      padding: 10px;
      height: 93px;
      border-radius: 4px;
      font-size: 13px;
      line-height: 21px;
    }

    .embed-config {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      font-size: 12px;
      background-color: #674d90;

      .embed-size {
        display: flex;
        align-items: center;
        button {
          margin-left: 0.4rem;
          display: flex;
          align-items: center;
          background-color: transparent;
          color: #fff;
          font-size: 12px;

          svg {
            font-size: 2.1rem;
          }
        }
      }

      .embed-autoplay {
        display: flex;
        align-items: center;

        span {
          font-size: 12px;
        }

        input {
          appearance: none;
          border-radius: 999px;
          border: 1px solid #a0a0a0;
          padding: 8px;
          margin-right: 6px;
          cursor: pointer;
          position: relative;
        }

        input:checked {
          background-color: #7200a1;
          border-color: #7200a1;
          &::after {
            content: ' ';
            border-left-color: #fff;
            border-bottom: 2px solid #fff;
            border-right: 2px solid #fff;
            border-top-color: #fff;
            height: 49%;
            width: 32%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -63%) rotate(45deg);
          }
        }
      }
    }
  }
  .embed-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    button {
      background-color: #7200a1;
      border-radius: 999px;
      color: #fff;
      font-size: 14px;
      padding: 9px 24px;
      text-transform: uppercase;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;

export const EmbedSizeMenu = styled.div`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #432275;
  border-radius: 4px;

  & li {
    width: 100px;
    padding: 5px 10px;
    font-size: 1.2rem;
    line-height: 1.8rem;
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      span {
        color: #c662ef;
      }
    }

    svg {
      font-size: 2rem;
      margin-left: 0.25rem;
    }
  }

  li + li {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  }
`;
