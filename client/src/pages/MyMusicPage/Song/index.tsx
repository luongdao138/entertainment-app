import React from 'react'
import { Link, Outlet, useLocation  } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  & .tabs {
    margin-bottom: 3rem;
  }
`

const TagItem = styled(Link)`
   padding: .4rem 1rem;
   border-radius: 10rem;
   color: #fff;
   font-size: 1.2rem;
   border: ${(props: {active?: boolean}) => props.active ? '1px solid transparent' : '1px solid #fff'};
   background-color: ${(props: {active?: boolean}) => props.active ? '#7200a1' : 'transparent'};
   text-transform: uppercase;

   &:hover {
      border-color: #7200a1;
      color:  ${(props: {active?: boolean}) => !props.active ? '#7200a1' : '#fff'};
   }

   & + & {
     margin-left: 1.5rem;
   }
`

const Song = () => {
  const location = useLocation()
  const isFavouriteTab = location.pathname === '/mymusic' || location.pathname === '/mymusic/song' || location.pathname === '/mymusic/song/favourite'

  return (
    <Container>
         <div className='tabs'>
         <TagItem active={isFavouriteTab} to='/mymusic/song/favourite'>Yêu thích</TagItem>
         <TagItem active={!isFavouriteTab} to='/mymusic/song/upload'>Đã tải lên</TagItem>
         </div>

         <div>
           <Outlet/>
         </div>
    </Container>
  )
}

export default Song