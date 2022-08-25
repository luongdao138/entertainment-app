import { Outlet } from "react-router-dom"
import Player from "./components/Player"
import PlayerQueue from "./components/PlayerQueue"
import Sidebar from "./components/Sidebar"
import styled from 'styled-components'

const Container = styled.div``

const MainLayout = () => {
  return (
    <Container>
       <Sidebar/>
       <Player/>
       <PlayerQueue/> 
       <Outlet/>
    </Container>
  )
}

export default MainLayout