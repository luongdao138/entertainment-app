import styled from 'styled-components';

interface Props {
  is_focus: boolean;
}

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props: Props) =>
    props.is_focus ? ' 2px solid #7200a1' : '2px solid #ccc'};
  cursor: default;
  position: relative;

  & input {
    width: 50px;
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 3.4rem;
    line-height: 51px;
    color: #fff;
    letter-spacing: 3px;
    &::placeholder {
      color: #fff;
    }
  }

  & .label {
    font-size: 14px;
    line-height: 2.1rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
  }

  & .time-menu {
    position: absolute;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background-color: #432275;
    height: 125px;
    overflow-y: auto;
    left: 0;
    z-index: 100;
    right: 0;
    top: calc(100% + 10px);
  }
`;

export const TimeItem = styled.li`
  font-size: 14px;
  font-weight: 21px;
  padding: 8px 0;
  text-align: center;

  background-color: ${(props: { selected: boolean }) =>
    props.selected ? 'hsla(0,0%,100%,0.1)' : 'transparent'};

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;
