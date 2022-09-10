import styled from 'styled-components';

interface Props {
  is_disabled: boolean;
}

export const Container = styled.div`
  margin-right: 1.2rem;

  .speed-btn {
    background-color: transparent;
    color: #fff;
    border: 1.5px solid #fff;
    border-radius: 4px;
    font-size: 1rem;
    padding: 0.25rem 0.35rem;
    font-weight: 600;
  }
`;

interface ItemProps {
  active: boolean;
}

export const SpeedMenu = styled.div`
  padding: 5px;
  background-color: #432275;
  border-radius: 8px;
  min-width: 120px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
  li + li {
    margin-top: 0.5rem;
  }
`;

export const SpeedItem = styled.li`
  color: #fff;
  width: 100%;
  font-size: 1.2rem;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;

  background-color: ${(props: ItemProps) =>
    props.active ? 'hsla(0, 0%, 100%, 0.1)' : 'transparent'};

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;
