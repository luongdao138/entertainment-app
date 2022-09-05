import styled from 'styled-components';

export const Container = styled.div`
  .next-list-header {
    padding: 8px;
    font-size: 12px;
    line-height: 21px;

    h3 {
      font-weight: 700;
    }

    p {
      color: #a0a0a0;
      font-size: 14px;
      a {
        color: #c662ef;
      }
    }
  }

  .recommend-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding: 0 8px;
    line-height: 21px;

    h3 {
      font-weight: 700;
    }

    .right {
      display: flex;
      align-items: center;

      span {
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        font-size: 1rem;
      }

      .reload-btn {
        background-color: transparent;
        color: #fff;
        font-size: 1.8rem;
        transition: all 0.2s;
        margin-left: 1rem;
        transform: translateY(0.2rem);

        :hover {
          color: #7200a1;
        }
      }
    }
  }
`;
