import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;

  .avatar {
    width: 150px;
    aspect-ratio: 1;
    margin-bottom: 2rem;
    border-radius: 100%;
    overflow: hidden;
    img.avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    cursor: pointer;
    position: relative;
    & .camera {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 10;
      right: 0;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease-in-out;
      display: grid;
      cursor: pointer;
      place-items: center;
      background-color: rgba(0, 0, 0, 0.4);

      & svg {
        font-size: 2rem;
        color: #fff;
      }
    }

    &:hover .camera {
      opacity: 1;
      visibility: visible;
    }
  }

  .form-group {
    display: flex;
    align-items: center;

    & .label {
      width: 230px;
      padding-right: 1rem;
      font-size: 1.4rem;
      color: #fff;
      font-weight: 600;
    }
    & + & {
      margin-top: 2rem;
    }

    .input-container {
      flex-grow: 1;
      max-width: 400px;
    }
    input {
      width: 100%;
      flex-grow: 1;
      max-width: 400px;
      height: 4rem;
      border-radius: 2rem;
      background-color: hsla(0, 0%, 100%, 0.1);
      border: none;
      color: #eee;
      padding: 5px 0;
      font-size: 1.4rem;
      padding: 0 2rem;

      ::placeholder {
        color: hsla(0, 0%, 100%, 0.5);
      }

      :focus {
        background-color: #432275;
      }
    }

    & .error {
      display: block;
      margin-top: 0.75rem;
      font-size: 1.2rem;
      color: #ff0a0a;
    }
  }
  .form-group + .form-group {
    margin-top: 2rem;
  }

  .btn-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top: 3rem;
  }
  button {
    background-color: rgb(114, 0, 161);
    color: #fff;
    font-size: 12px;
    padding: 9px 24px;
    text-transform: uppercase;
    border-radius: 10rem;
    :hover {
      filter: brightness(0.9);
    }
  }
`;
