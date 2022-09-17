import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageTabs from '../../../components/PageTabs';
import appRoutes from '../../../constants/appRoutes';
import { getHistorySongActions } from '../../../redux/history/historyActions';
import { getHistorySongsPaginationSelector } from '../../../redux/history/historySelectors';
import { resetHistoryData } from '../../../redux/history/historySlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Container } from './style';

const HistoryPage = () => {
  const [tab, setTab] = useState<number>(1);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const historySongPagination = useAppSelector(
    getHistorySongsPaginationSelector
  );

  useEffect(() => {
    if (location.pathname === appRoutes.HISTORY_SONG) setTab(0);
    if (
      location.pathname === appRoutes.HISTORY_PLAYLIST ||
      location.pathname === appRoutes.HISTORY
    )
      setTab(1);
  }, [location.pathname]);

  useEffect(() => {
    switch (tab) {
      case 0:
        dispatch(
          getHistorySongActions({
            page: historySongPagination.page,
            limit: historySongPagination.limit,
          })
        );
        break;
      case 1:
        break;
      default:
        break;
    }

    return () => {
      dispatch(resetHistoryData());
    };
  }, [tab]);

  return (
    <Container>
      <PageTabs
        title='Phát gần đây'
        value={tab}
        onChange={(newValue) => setTab(newValue)}
        options={[
          { label: 'Bài hát', href: appRoutes.HISTORY_SONG },
          { label: 'Playlist', href: appRoutes.HISTORY_PLAYLIST },
        ]}
      />
      <Outlet />
    </Container>
  );
};

export default HistoryPage;
