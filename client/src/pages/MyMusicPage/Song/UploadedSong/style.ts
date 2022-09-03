import styled from 'styled-components';

export const NoSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-top: 3rem; */
  align-items: center;

  & img {
    width: 120px;
  }

  & h3 {
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: rgba(255, 255, 255, 0.5);
  }

  & button {
    background-color: rgb(114, 0, 161);
    color: #fff;
    font-size: 12px;
    padding: 9px 24px;
    text-transform: uppercase;
    border-radius: 10rem;
  }
`;

export const Container = styled.div`
  & .total-upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 15px;
    margin-bottom: 1rem;
    border-radius: 4px;

    & .left {
      flex-grow: 1;
      margin-right: 2rem;
      max-width: 36rem;

      span {
        color: #fff;
        font-size: 1.4rem;
        display: block;
        margin-bottom: 0.25rem;
      }

      .premium {
        background-color: #ffdb00;
        padding: 9px 24px;
        border-radius: 10rem;
        width: fit-content;
        color: #333;
        font-weight: 600;
        user-select: none;
      }
    }

    & .right {
      background-color: rgb(114, 0, 161);
      color: #fff;
      font-size: 12px;
      padding: 9px 24px;
      text-transform: uppercase;
      border-radius: 10rem;
    }
  }
`;
