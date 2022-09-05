import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AuthProvider from './context/AuthContext';
import UploadProvider from './context/UploadContext';
import UploadPlaylistProvider from './context/UploadPlaylistContext';
import AudioContextProvider from './context/AudioContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <AudioContextProvider>
          <UploadProvider>
            <UploadPlaylistProvider>
              <App />
            </UploadPlaylistProvider>
          </UploadProvider>
        </AudioContextProvider>
      </AuthProvider>
    </Router>
  </Provider>
  // </React.StrictMode>
);
