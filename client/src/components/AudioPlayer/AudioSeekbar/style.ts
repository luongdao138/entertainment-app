import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  .slider {
    margin: 0 1rem;
    flex-grow: 1;
  }

  .time {
    font-size: 12px;
    color: #fff;
  }

  .start-time {
    color: rgba(255, 255, 255, 0.5);
  }
`;
