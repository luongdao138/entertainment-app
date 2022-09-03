import styled from 'styled-components';

export const Container = styled.div`
  padding: 5px;
  background-color: #432275;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);

  li + li {
    margin-top: 0.5rem;
  }
`;

interface ItemProps {
  active: boolean;
}

export const Item = styled.li`
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
