import styled from 'styled-components';

interface Props {
  textColor?: string;
  activeBackground?: string;
  active?: boolean;
}

export const Container = styled.div`
  border-radius: 999px;
  padding: 3px;
  background-color: hsla(0, 0%, 100%, 0.1);
  display: flex;
  align-items: center;
  width: 100%;
`;

export const TabButton = styled.button`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 7%);
  background-color: ${(props: Props) =>
    props.active
      ? props.activeBackground ?? 'hsla(0, 0%, 100%, 0.3)'
      : 'transparent'};
  color: ${(props: Props) =>
    props.active ? '#fff' : props.textColor ?? '#dadada'};
  padding: 5px 0;
  font-size: 1.2rem;
  border-radius: 999px;
  line-height: 1.8rem;
  font-weight: 500;
  flex: 1;

  /* &:hover {
    color: #fff;
  } */
`;
