import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import { Outlet, useLocation } from 'react-router-dom';
import { ContextProvider } from './components/Context.js';
import { ToastContainer} from 'react-toastify';

export default function App() {
  const location = useLocation();
  return (
    <div className="relatite">
    <ContextProvider>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Header />
      )}
      <Outlet />
      <ToastContainer />
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        // <div className="relative ">
          <Footer />
        // </div>
        
      )}
      </ContextProvider>
    </div>
  );
}

