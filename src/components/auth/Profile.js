import { Context } from '../../components/Context.js';
import { useContext, useState, useEffect } from 'react';
import { API } from "../../API/service.js";

export default function Profile() {
    const { isData } = useContext(Context);

    const [formData, setFormData] = useState({
        username: `${isData?.username}`,
        fullname: '',
        address: '',
    });

    const [isProfile, setIsProfile] = useState({
        username: '',
        fullname: '',
        address: '',
    });

    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        if (isData) {
            setFormData({
                username: `${isData.username}`,
                fullname: '',
                address: '',
            });
        }
    }, [isData]);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.CreateProfileAPI(formData);
            setMessage('Cập nhật thành công');
            setShowProfile(true);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'An error occurred');;
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await API.UpdateProfileAPI(isData.username, formData);
            setMessage('Sửa thành công');
            
            API.GetProfileAPI(isData.username)
                .then((profile) => {
                        setIsProfile(profile);
                        setShowProfile(true);
                        setFormData(profile)
                    })
                    .catch(() => setMessage('Chưa cập nhật thông tin'));
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'An error occurred');;
        }
    };
    useEffect(() => {
        if (isData.username) {
            if (showProfile === false) {
                API.GetProfileAPI(isData.username)
                    .then((profile) => {
                        setIsProfile(profile);
                        setShowProfile(true);
                        setFormData(profile)
                    })
                    .catch(() => setMessage('Chưa cập nhật thông tin'));
            } else {
                API.GetProfileAPI(isData.username)
                    .then((profile) => {
                        setIsProfile(profile);
                        setShowProfile(true);

                    })
                    .catch((error) => {
                        setMessage('Lỗi cập nhật');

                        console.log(error);
                    });
            }
        }
    }, [showProfile, isData.username]);

    return (
        <>
            <div className="relative p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
                <div>
                    <h1 className="text-center text-xl font-semibold text-gray-800">Thông tin của {isData.username}</h1>
                    {message && <p className={`text-center ${showProfile === false ? 'text-red-500' : 'text-green-400'}`}>{message}</p>}
                    {showProfile === true &&
                        <div>
                            <p className=" text-gray-500"><b>Họ và tên:</b> {isProfile.fullname}</p>
                            <p className=" text-gray-500"><b>Địa chỉ:</b> {isProfile.address}</p>
                            <button type="button" popovertarget="update" className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Sửa thông tin</button>
                        </div>
                    }
                </div>
                {showProfile === false && (
                    <div>
                        <p className=" w-full text-gray-500"><span>Họ và tên:</span> ...........................................................................................</p>
                        <p className="w-full text-gray-500"><span className='mr-5'>Địa chỉ:</span> ...........................................................................................</p>
                        <button type="button" popovertarget="insert" className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Cập nhật thông tin</button>
                    </div>
                )}
            </div>
            {showProfile === false &&
                <div className="rounded-lg shadow-md w-1/4 h-1/3 pt-6 px-6" id="insert" popover="true">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <h2 className='text-center'>Cập nhật thông tin</h2>
                        <div className="form-group">
                            <label htmlFor="fullname" className="block text-gray-700 font-medium">Họ và tên</label>
                            <input value={formData.fullname} onChange={handleChange} type="text" id="fullname" name="fullname" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address" className="block text-gray-700 font-medium">Địa chỉ</label>
                            <input value={formData.address} onChange={handleChange} type="text" id="address" name="address" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Cập nhật</button>
                    </form>
                </div>
            }
        
                <div className="rounded-lg shadow-md w-1/4 h-1/3 pt-6 px-6" id="update" popover="true">
                    <form className="space-y-4" onSubmit={handleUpdate}>
                        <h2 className='text-center'>Sửa thông tin</h2>
                        <div className="form-group">
                            <label htmlFor="fullname" className="block text-gray-700 font-medium">Họ và tên</label>
                            <input value={formData.fullname} onChange={handleChange} type="text" id="fullname" name="fullname" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address" className="block text-gray-700 font-medium">Địa chỉ</label>
                            <input value={formData.address} onChange={handleChange} type="text" id="address" name="address" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Cập nhật</button>
                    </form>
                </div>

        </>
    )
}