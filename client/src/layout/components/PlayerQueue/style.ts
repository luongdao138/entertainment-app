import styled from 'styled-components';

interface Props {
  openQueue: boolean;
}

export const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 90px;
  z-index: 150;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3), 0 1px 6px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(25, 255, 255, 0.05);
  background-color: #120822;
  width: 330px;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 15px 8px;
  transition: transform 0.5s ease-in;
  transform: ${(props: Props) =>
    !props.openQueue ? 'translateX(100%)' : 'translateX(0)'};

  & .queue-content {
    flex-grow: 1;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;
