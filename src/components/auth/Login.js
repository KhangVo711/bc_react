import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
import { API } from "../../API/service.js";
export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',

    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
         
        if (!formData.username || !formData.password) {
          alert("Giá trị rỗng");
        } else {
          try {
            const response = await API.LoginAPI(formData);
 
            const token = response.data.token;
 
            localStorage.setItem("jwt", token);
            setMessage(response.data.message);

            const user = response.data.user;
      
            if (user.role === "admin") {
              window.location.href = 'http://localhost:5001/';
              localStorage.removeItem('jwt');
            } else {
              navigate('/');
            }
      
          } catch (error) {
            setMessage(error.response ? error.response.data.message : 'An error occurred');
          }
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
 
            <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
            {message && <p>{message}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                    <input value={formData.username} onChange={handleChange} type="text" id="username" name="username" required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input value={formData.password} onChange={handleChange} type="password" id="password" name="password" required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Login</button>
            </form>
            <Link to="/register" className="mt-5 text-indigo-600">Register</Link>
        </div>
    )
}