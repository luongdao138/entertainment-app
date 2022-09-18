import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  .song-background {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    /* filter: blur(24px); */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .song-blur {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(180deg, rgba(61, 8, 74, 0), #0b0215);
    background-repeat: repeat-x;
  }

  .song-container {
    /* background-color: teal; */
    padding: 16px 12px;
    position: relative;
    backdrop-filter: blur(20px);

    .song-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.8rem;

      img {
        width: 60px;
      }

      .playlist-name {
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;
      }
    }

    .song-content {
      display: flex;
      align-items: center;

      .song-thumbnail {
        width: 120px;
        height: 120px;
        flex-shrink: 0;
        border-radius: 8px;
        overflow: hidden;
        margin-right: 16px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .song-info {
        width: 100%;
        height: 120px;
        overflow-y: auto;

        & .song-item {
          padding: 6px;
          border-radius: 4px;
          display: flex;
          cursor: pointer;
          align-items: center;
          color: #fff;

          &:hover {
            background-color: hsla(0, 0%, 100%, 0.16);
          }
          .index {
            font-size: 14px;
            line-height: 14px;
          }
          .song-name,
          .singer-name {
            margin-left: 2px;
            font-size: 12px;
            line-height: 16px;
          }
          .singer-name {
            color: #9d9d9d;
          }
        }
      }
    }

    .song-btn {
      margin-top: 1rem;
      display: flex;
      justify-content: center;

      button {
        border: 1px solid rgba(254, 255, 255, 0.4);
        padding: 7px 16px;
        text-align: center;
        background-color: transparent;
        color: #feffff;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        border-radius: 100px;
        cursor: pointer;
        white-space: nowrap;
      }
    }
  }
`;
