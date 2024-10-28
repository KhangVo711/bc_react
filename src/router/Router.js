import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/auth/Login.js';
import Banner from '../components/home/Banner.js';
import Product from '../components/product/Product';
import Register from '../components/auth/Register.js';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Banner /> },  
      { path: "login", element: <Login /> },  
      { path: "register", element: <Register /> },
      { path: "product", element: <Product /> },
      { path: "*", element: <div>Không tìm thấy web theo yêu cầu</div> }
    ]
  }
]);