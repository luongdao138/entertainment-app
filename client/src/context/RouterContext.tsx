import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';

interface StackItem {
  pathname: string;
  is_current: boolean;
}

interface ContextState {
  is_first_route: boolean;
  is_last_route: boolean;
  moveToNextRoute: () => void;
  moveToPrevRoute: () => void;
  history_stack: StackItem[];
}

const RouterContext = React.createContext<ContextState>({} as ContextState);

const RouterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [is_last_route, setIsLastRoute] = useState<boolean>(true);
  const [is_first_route, setIsFirstRoute] = useState<boolean>(true);
  const isFirstRenderRef = useRef<boolean>(true);
  const navigate = useNavigate();

  const action_type = useNavigationType();

  const [history_stack, setHistoryStack] = useState<StackItem[]>([
    {
      is_current: true,
      pathname: location.pathname,
    },
  ]);

  const moveToPrevRoute = () => {
    const current_active_route = history_stack.findIndex((s) => s.is_current);
    if (current_active_route !== -1) {
      const prev_route = history_stack[current_active_route - 1].pathname;
      setHistoryStack(
        history_stack.map((hs, index) =>
          index === current_active_route - 1
            ? { ...hs, is_current: true }
            : { ...hs, is_current: false }
        )
      );

      navigate(prev_route, { state: { navigate_in_app: true } });
    }
  };

  const moveToNextRoute = () => {
    const current_active_route = history_stack.findIndex((s) => s.is_current);
    if (current_active_route !== -1) {
      const prev_route = history_stack[current_active_route + 1].pathname;
      setHistoryStack(
        history_stack.map((hs, index) =>
          index === current_active_route + 1
            ? { ...hs, is_current: true }
            : { ...hs, is_current: false }
        )
      );

      navigate(prev_route, { state: { navigate_in_app: true } });
    }
  };

  useEffect(() => {
    // logic trong này sẽ chạy mỗi lần location của react router thay đổi

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if ((location.state as any)?.navigate_in_app) {
      console.log('Navigate in app');
    } else {
      if (
        location.pathname !==
        history_stack.find((hs) => hs.is_current)?.pathname
      ) {
        console.log({ locationActionType: action_type });
        if (action_type === 'PUSH') {
          const current_active_route = history_stack.findIndex(
            (s) => s.is_current
          );
          let new_history_stack = [...history_stack];
          if (current_active_route !== -1) {
            new_history_stack = new_history_stack
              .slice(0, current_active_route + 1)
              .map((hs) => ({ ...hs, is_current: false }));
          }

          new_history_stack.push({
            is_current: true,
            pathname: location.pathname,
          });

          setHistoryStack(new_history_stack);
        }
      }
    }
  }, [location]);

  useEffect(() => {
    const current_active_route = history_stack.findIndex((s) => s.is_current);
    if (current_active_route !== -1) {
      setIsFirstRoute(current_active_route === 0);
      setIsLastRoute(current_active_route === history_stack.length - 1);
    }
  }, [history_stack]);

  return (
    <RouterContext.Provider
      value={{
        is_first_route,
        is_last_route,
        moveToNextRoute,
        moveToPrevRoute,
        history_stack,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export default RouterContextProvider;
export const useRouterContext = () => useContext(RouterContext);
