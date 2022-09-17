import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import AppRouter from './routes';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        hideProgressBar
        autoClose={1000}
        theme='colored'
      />
      <AppRouter />
    </>
  );
}

export default App;
