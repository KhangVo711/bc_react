import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Logout() {
    const navigate = useNavigate();
  axios.get('http://localhost:5001/APIlogout', { withCredentials: true })
    .then((response) => {
      console.log(response.data.message);
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

  return(
    <div>
      <h1 className='text-center'>Bạn đã đăng xuất</h1>
    </div>
  );
}
