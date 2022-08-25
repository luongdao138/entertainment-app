import { Outlet } from 'react-router-dom';
import Player from './components/Player';
import PlayerQueue from './components/PlayerQueue';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';

const Container = styled.div`
  & .content {
    margin-left: 240px;
    min-height: 100vh;
    background-color: #170f23;
    padding-left: 6rem;
    padding-right: 6rem;
  }
`;

const MainLayout = () => {
  return (
    <Container>
      <Sidebar />
      {/* <Player /> */}
      {/* <PlayerQueue /> */}
      <div className='content'>
        <Outlet />
      </div>
    </Container>
  );
};

export default MainLayout;
