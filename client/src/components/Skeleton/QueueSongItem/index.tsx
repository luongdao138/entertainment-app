import React from "react";
import { Container } from "./style";
import Skeleton from "react-loading-skeleton";

const QueueSongItemSkeleton = () => {
  return (
    <Container>
      <Skeleton className="thumbnail" />
      <div className="info">
        <Skeleton />
        <Skeleton className="singer" />
      </div>
    </Container>
  );
};

export default QueueSongItemSkeleton;
