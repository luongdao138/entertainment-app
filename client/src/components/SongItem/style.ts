import styled from "styled-components";

interface Props {
     openMenu: boolean
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid hsla(0,0%,100%,0.05);
  position: relative;
  user-select: none;

  & .song-left {
     display: flex;
     align-items: center;

     & .music-icon {
         margin-right: 1rem;
         font-size: 1.5rem;
         color: hsla(0,0%,100%,0.5);
     }
  }

  & .song-thumbnail {
     width: 4rem;
     height: 4rem;
     flex-shrink: 0;
     margin-right: 1rem;
     border-radius: 4px;
     overflow: hidden;
     position: relative;

     & img { 
        width: 100%;
        height: 100%;
        object-fit: cover;
     }

     & .play-state {
         opacity: 0;
         visibility: hidden;
         position: absolute;
         z-index: 20;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         font-size: 2.5rem;
         color: #fff;
     }
  }

  & .song-info {
     & .name {
         font-weight: 500;
         font-size: 1.4rem;
         line-height: 1.8rem;
         color: #fff;
         margin-bottom: .3rem;
     }

     & .singer {  
        color: rgba(255, 255, 255, 0.5);
        font-size: 1.2rem;
        line-height: 1.6rem;

     }
  }

  & .song-right {
     display: flex;
     align-items: center;

     & .favorite {
           display: grid;
           place-items: center;
           width: 3.8rem;
           height: 3.8rem;
           border-radius: 50%;
           margin-right: .75rem;
           background-color: transparent;
           opacity: 0;
           visibility: hidden;

           & svg {
               color: #fff;
               font-size: 2rem;
           }
          &:hover {
             background-color: #ffffff1a;
          }
     }

     & .duration {
         font-size: 1.2rem;
         color: hsla(0,0%,100%,0.5);
     }

     & .more-action {
           display: none;
           place-items: center;
           width: 3.8rem;
           height: 3.8rem;
           border-radius: 50%;
           background-color: transparent;

         svg {
             color: #fff;
             font-size: 2rem;
         }
     }
  }

  &:hover {
      background-color: #2F283A;

      & .song-thumbnail {
         cursor: pointer;

         & .opacity {
             position: absolute;
             top: 0;
             left: 0;
             bottom: 0;
             right: 0;
             z-index: 10;
             background-color: rgba(0,0,0,0.5);
         }

         & .play-state {
         opacity: 1;
         visibility: visible;
         }
      }

      & .song-right {
       & .favorite {
           opacity : 1;
           visibility: visible;
       }

       & .duration {
         display: none;
       }

       & .more-action {
         display: grid;

         &:hover {
             background-color: #ffffff1a;
          }
       }
    }
  }

    & .song-menu {
         background-color: #432275;
         position: absolute;
         right: 0;
         z-index: 30;
         width: 280px;
         top: 100%;
         opacity: ${(props: Props) => props.openMenu ? 1 : 0};
         visibility: ${(props: Props) => props.openMenu ? 'visible' : 'hidden'};

         & .menu-info {
             img {
                 width: 4rem;
                 height: 4rem;
                 object-fit: cover;
                 border-radius: 4px;
             }
         }
    }

`