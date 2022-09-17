import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import AuthProvider from './context/AuthContext';
import UploadProvider from './context/UploadContext';
import UploadPlaylistProvider from './context/UploadPlaylistContext';
import AudioContextProvider from './context/AudioContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <AudioContextProvider>
      <Router>
        <AuthProvider>
          <UploadProvider>
            <UploadPlaylistProvider>
              <SkeletonTheme
                baseColor='#231B2E'
                highlightColor='rgba(255,255,255,0.05)'
              >
                <App />
              </SkeletonTheme>
            </UploadPlaylistProvider>
          </UploadProvider>
        </AuthProvider>
      </Router>
    </AudioContextProvider>
    {/* </PersistGate> */}
  </Provider>
  // </React.StrictMode>
);
