import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  .thumbnail {
    width: 4rem;
    aspect-ratio: 1;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    margin-left: 1rem;
    padding-top: 0.3rem;
  }

  .info > * {
    height: 1rem;
    width: 100%;
    border-radius: 999px !important;
  }

  .singer {
    margin-top: 0.6rem;
    width: 50%;
  }
`;
