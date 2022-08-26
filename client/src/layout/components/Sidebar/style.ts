import styled from "styled-components";

export const Container = styled.div`
     position: fixed;
     top: 0;
     left: 0;
     bottom: 0;
     background-color: #231B2E;
     width: 24rem;
     display: flex;
     flex-direction: column;

     & .sidebar-top {
         flex-grow: 1;
         overflow-y: auto;
     }

     & .sidebar-bottom {
         padding: 1.4rem 2.5rem;
         border-top: 1px solid rgba(255,255,255,0.1);
         font-weight: 700;
         color: #fff;
         display: flex;
         align-items: center;
         background-color: transparent;

         & svg {
             margin-right: .8rem;
             font-size: 2.4rem;
         }

         & span {
             font-size: 1.4rem;
         }
     }
`;

export const Logo = styled.div`
  & img {
     width: 12rem;
  }

  height: 7rem;
  padding-left: 2.8rem;
  padding-right: 2.5rem;
  display: flex;
  align-items: center;
`;

export const Divider = styled.div`
  height: 1px;
  position: relative;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  &::after {
     content: "";
     border-top: 1px solid rgba(255,255,255,0.1);
     left: 25px;
     right: 25px;
     position: absolute;
     top: 0;
  }
`;

export const Menu = styled.ul`
   h2 {
     font-size: 1.2rem;
     text-transform: uppercase;
     line-height: 1.8rem;
     color: #fff;
     font-weight: 700;
     padding: 0 2.5rem;
     margin-bottom: .8rem;
   }
`;

interface MenuItemProps {
  active?: boolean;
}

export const MenuItem = styled.ul`
  &  a {
     display: flex;
     color: #dadada;
     align-items: center;
    font-weight: 700;
    font-size: 1.3rem;
    padding: .7rem 2.5rem;
    border-left: ${(props: MenuItemProps) => props.active ? '3px solid #7200a1' : '3px solid transparent'};
    background-color: ${(props: MenuItemProps) => props.active ? 'hsla(0,0%,100%,0.1)' : 'transparent'};
    transition: color 0.1s;
    position: relative;

    & > svg {
         font-size: 2.4rem;
         margin-right: 1rem;
    }

    &:hover { 
        color: #fff;
    }

    & .music { 
       position: absolute;
       top: 50%;
       transform: translateY(-50%);
       right: 2rem;
       display: grid;
       place-items: center;
       width: 1.8rem;
       aspect-ratio: 1;
       border: 1px solid #fff;
       border-radius: 100%;
       opacity: 0;
       visibility: hidden;
       transition: all .1s ease-in-out;

       & svg {
         font-size: 1.2rem;
       }
    }

    &:hover .music {
       opacity: 1;
       visibility: visible;
    }
  }
`;