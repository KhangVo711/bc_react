import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/auth/Login.js';
import Logout from '../components/auth/Logout.js';
import Banner from '../components/home/Banner.js';
import Product from '../components/product/Product';
import Register from '../components/auth/Register.js';
import PrivateRoute from '../components/PrivateRoute.js';
import Profile from '../components/auth/Profile.js';
import Cart from '../components/cart/Cart.js';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Banner /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "logout",
        element:
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
      },
      {
        path: "profile",
        element:
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
      },
      {
        path: "product",
        element: (
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        )
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        )
      },
      { path: "*", element: <div>Không tìm thấy web theo yêu cầu</div> }
    ]
  }
]);