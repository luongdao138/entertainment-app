import styled from 'styled-components';

export const Container = styled.div`
  & .recommend-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    & .recommend-header-left {
      .title {
        font-size: 2rem;
        line-height: 3rem;
        color: #fff;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }

      .desc {
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: rgba(255, 255, 255, 0.5);
      }
    }

    & .recommend-header-right {
      button {
        background-color: #7200a1;
        color: #fff;
        font-size: 12px;
        padding: 6px 19px;
        border-radius: 999px;
        text-transform: uppercase;
        display: flex;
        align-items: center;

        svg {
          font-size: 1.4rem;
          margin-right: 0.5rem;
        }
      }
    }
  }
`;
