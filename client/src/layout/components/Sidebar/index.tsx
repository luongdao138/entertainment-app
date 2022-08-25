import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Divider, Logo, Menu, MenuItem } from './style'
import {MdAdd, MdOutlineLibraryMusic} from 'react-icons/md'

const Sidebar = () => {
  return (
    <Container>
        <div className='sidebar-top'>
        <Logo>
            <Link to="/">
          <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" alt="" />
            </Link>
        </Logo>

        <Menu>
            <MenuItem>
                <Link to='/'>
                      <MdOutlineLibraryMusic/>
                      <span>Cá nhân</span>
                </Link>
            </MenuItem>
            <MenuItem active>
                <Link to='/'>
                      <MdOutlineLibraryMusic/>
                      <span>Khám phá</span>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link to='/'>
                      <MdOutlineLibraryMusic/>
                      <span>#zingchart</span>
                </Link>
            </MenuItem>
        </Menu>

        <Divider/>

        <Menu>
             <h2>Thư viện</h2>
             <MenuItem>
                <Link to='/'>
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