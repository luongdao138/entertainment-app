import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled(Link)`
  display: flex;
  align-items: center;
  height: 32px;
  font-size: 1.3rem;
  padding: 0 2.5rem;

  span {
    color: #fff;
    font-size: 1.3rem;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .more-btn {
    margin-left: 1.5rem;
    width: 2.5rem;
    aspect-ratio: 1;
    border-radius: 100%;
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 1.6rem;
    background-color: transparent;
    opacity: 0;
    visibility: hidden;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.3);
    }
  }

  &:hover {
    .more-btn {
      opacity: 1;
      visibility: visible;
    }
  }
`;
