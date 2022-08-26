import React from 'react'
import { Container } from './style'
import {FiMusic} from 'react-icons/fi'
import {BsFillPlayFill} from 'react-icons/bs'
import { MdMoreHoriz, MdOutlineSkipNext } from 'react-icons/md'
import { AiOutlineHeart} from 'react-icons/ai'
import {FiDownload} from 'react-icons/fi'
import useBoolean from '../../hooks/useBoolean'

const SongItem = () => {
  const { value: openMenu, toggle } = useBoolean(false)

  return (
    <Container openMenu={openMenu}>
          <div className='song-left'>
            <div className='music-icon'>
             <FiMusic/>
            </div>
             <div className='song-thumbnail'>
                 <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/covers/4/b/4b1c59c7728e2b1cb65f6cb20aaf5cf9_1499881926.jpg" alt="" />
                 <div className='opacity'></div>
                 <BsFillPlayFill className='play-state' />
             </div> 
             <div className='song-info'>
                 <h4 className="name">Tam Sinh Duyên</h4>
                 <p className='singer'>Lưu Tích Quân</p>
             </div>
          </div>
          <div className='song-right'>
              <button className='favorite'>
              <AiOutlineHeart/>
              </button>
              <span className='duration'>03:27</span>
              <div className='song-menu-wrapper'>
                <button className='more-action' onClick={toggle} aria-controls='' >
                    <MdMoreHoriz/>
                </button>
              </div>
          </div>

          <div className='song-menu'>
                     <div className="menu-info">
                     <img
                        src='https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/covers/4/b/4b1c59c7728e2b1cb65f6cb20aaf5cf9_1499881926.jpg'
                        alt=''
                     />
                      <div className='menu-name'>
                         <h4>Đào Hoa Nặc (Thượng Cổ Tình Ca)</h4>
                         <p>Đặng Tử Kỳ</p>
                      </div>
                     </div>

                     <div className="menu-btns">
                          <button>
                              <FiDownload/>
                              <span>Tải xuống</span>
                          </button>
                     </div>

                     <ul className='menu-list'>
                           <li>
                               <MdOutlineSkipNext/>
                               <span>Phát tiếp theo</span>
                            </li> 
                           <li>
                               <MdOutlineSkipNext/>
                               <span>Phát tiếp theo</span>
                            </li> 
                           <li>
                               <MdOutlineSkipNext/>
                               <span>Phát tiếp theo</span>
                            </li> 
                           <li>
                               <MdOutlineSkipNext/>
                               <span>Phát tiếp theo</span>
                            </li> 
                     </ul>

                </div>
    </Container>
  )
}

export default SongItem