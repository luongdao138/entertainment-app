import styled from 'styled-components';

export const NoSongsContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 4rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  h3 {
    margin-top: 1.6rem;
    font-size: 1.6rem;
    line-height: 2.4rem;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.5);
  }

  a {
    border-radius: 999px;
    text-transform: uppercase;
    color: #fff;
    padding: 9px 24px;
    background-color: #7200a1;
    font-size: 1.4rem;
    :hover {
      filter: brightness(0.9);
    }
  }
`;
