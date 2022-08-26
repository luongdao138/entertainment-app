import styled from 'styled-components';

export const Container = styled.div`
   & .thumbnail-container {
    border-radius: .8rem;
    overflow: hidden;
    display: block;
    position: relative;
    margin-bottom: .8rem;
     & img {
         transition: transform .35s ease-in-out;
         width: 100%;
     }

     &:hover img {
         transform: scale(1.1);
     }
     & .thumbnail-backdrop {
        z-index: 10;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 0.1s;
        background-color: rgba(0,0,0,0.5);
        position: absolute;
        opacity: 0;
        visibility: hidden;
     }

     &:hover .thumbnail-backdrop {
         opacity: 1;
         visibility: visible;
     }

     & .thumbnail-actions {
         position: absolute;
         z-index: 11;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         display: flex;
         align-items: center;
         justify-content: space-evenly;
         width: 100%;
         transition: all 0.1s;
         opacity: 0;
         visibility: hidden;

         & .action {
             width: 3rem;
             aspect-ratio: 1;
             border-radius: 100%;
             display: grid;
             place-items: center;
             color: #fff;
             font-size: 2.5rem;
             background-color: transparent;

             &:hover {
                 background-color: hsla(0,0%,100%,0.3);
             }
         }

         & .play-state {
             width: 4.5rem;
             aspect-ratio: 1;
             border-radius: 100%;
             display: grid;
             place-items: center;
             color: #fff;
             font-size: 2.5rem;
             background-color: transparent;
             border: 1px solid #fff;

             &:hover {
                filter: brightness(.9);
             }
         }
     }

     &:hover .thumbnail-actions {
         opacity: 1;
         visibility: visible;
     }
   }

   & .name {  
     font-size: 1.4rem;
     font-weight: 500;
     line-height: 1.9rem;
     color: #fff;
     display: inline-block;

     &:hover {
         color: #c662ef;
     }
     margin-bottom: .3rem;
   }

   & .author {
     font-size: 1.2rem;
     color: rgba(255,255,255,0.5);
   }

`;
