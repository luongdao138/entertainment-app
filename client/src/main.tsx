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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <UploadProvider>
            <UploadPlaylistProvider>
              <App />
            </UploadPlaylistProvider>
          </UploadProvider>
        </AuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
