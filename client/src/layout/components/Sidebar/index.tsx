import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, Divider, Logo, Menu, MenuItem } from './style'
import {MdAdd, MdOutlineLibraryMusic} from 'react-icons/md'
import {BsFillPlayFill} from 'react-icons/bs'

const Sidebar = () => {
  const location = useLocation()

  return (
    <Container>
        <div className='sidebar-top'>
        <Logo>
            <Link to="/">
          <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" alt="" />
            </Link>
        </Logo>

        <Menu>
            <MenuItem active={location.pathname.includes('/mymusic')}>
                <Link to='/mymusic'>
                      <MdOutlineLibraryMusic/>
                      <span>Cá nhân</span>

                      <span className='music'>
                         <BsFillPlayFill/>
                      </span>
                </Link>
            </MenuItem>
            <MenuItem >
                <Link to='/'>
                      <MdOutlineLibraryMusic/>
                      <span>Khám phá</span>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link to='/'>
                      <MdOutlineLibraryMusic/>
                      <span>#zingchart</span>

                      <span className='music'>
                         <BsFillPlayFill/>
                      </span>
                </Link>
            </MenuItem>
        </Menu>

        <Divider/>

        <Menu>
             <h2>Thư viện</h2>
             <MenuItem>
                <Link to='/mymusic'>
                <MdOutlineLibraryMusic/>
                      <span>Bài hát</span>
                </Link>
             </MenuItem>
             <MenuItem>
                <Link to='/'>
                <MdOutlineLibraryMusic/>
                      <span>Playlist</span>
                </Link>
             </MenuItem>
             <MenuItem>
                <Link to='/'>
                <MdOutlineLibraryMusic/>
                      <span>Gần đây</span>
                </Link>
             </MenuItem>
        </Menu>
        </div>

        <button className='sidebar-bottom'>
            <MdAdd/>
            <span>Tạo playlist mới</span>
        </button>
    </Container>
  )
}

export default Sidebar