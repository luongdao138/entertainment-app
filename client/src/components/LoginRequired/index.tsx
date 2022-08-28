import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const LoginRequired: React.FC<Props> = ({ children }) => {
  const { authUser, openAuthModal, changeRedirectUrl } = useAuthContext();
  const navigate = useNavigate();

  const handleClickAuthenticate = (onClick: () => void, from?: string) => {
    if (authUser) {
      onClick?.();
    } else {
      if (from) {
        changeRedirectUrl(from);
      }
      openAuthModal();
    }
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.props.to) {
            // it is a link
            return React.cloneElement(child, {
              onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.stopPropagation();
                e.preventDefault();

                handleClickAuthenticate(
                  () => navigate(child.props.to),
                  child.props.to
                );
              },
            });
          }

          return React.cloneElement(child, {
            onClick: (e: React.MouseEvent) =>
              handleClickAuthenticate(() => child.props.onClick(e)),
          });
        }

        return child;
      })}
    </>
  );
};

export default LoginRequired;
