import { useNavigate } from 'react-router-dom';
import { API } from "../../API/service.js";


export default function Logout() {
  const navigate = useNavigate();
  API.GetLogoutAPI()
    .then((response) => {
    
      localStorage.removeItem('jwt');
      navigate('/login');
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        console.log('Không có quyền đăng xuất. Token không hợp lệ hoặc đã hết hạn.');
      } else {
        console.log(error);
      }
    });

  return (
    <div>
      <h1 className='text-center'>Bạn đã đăng xuất</h1>
    </div>
  );
}
