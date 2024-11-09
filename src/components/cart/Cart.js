import { formatCurrency } from "../../utils/utils.js";
import { useContext, useState } from "react";
import { Context } from '../../components/Context.js';
import { Link } from "react-router-dom";
import { API } from "../../API/service.js";
import { toast } from 'react-toastify';


export default function Cart() {
    const generateOrderId = () => `OD${Date.now()}${Math.floor(Math.random() * 10)}`;
    const getCurrentDate = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    };
    const { isData, cart, increaseQuantity, decreaseQuantity, removeItem, setCart } = useContext(Context);
    const [status, setStatus] = useState(false);
    const totalAmount = cart.reduce((acc, item) => acc + item.giasp * item.quantity, 0);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const address = event.target.diachinhanhang.value;
        if (!address) {
            alert("Vui lòng nhập địa chỉ nhận hàng");
            return;
        }

        const orderId = generateOrderId(); // Tạo mã đơn hàng duy nhất
        const orderData = {
            madh: orderId,
            username: isData.username,
            ngaydat: getCurrentDate(),
            trangthai: "Chờ xác nhận",
            tonggia: totalAmount,
            diachinhanhang: address,
        };

        try {

            const cartResponse = await API.CreateCart(orderData);

            if (cartResponse.status === 200) {

                const orderDetails = cart.map(item => ({
                    madh: orderId,
                    masp: item.masp,
                    gia: item.giasp,
                    soluong: item.quantity
                }));


                const detailResponse = await API.CreateDetailCart(orderDetails);

                if (detailResponse.status === 200) {

                    setStatus(true);
                    setCart([]);
                    toast.success("Success Order", {
                        autoClose: 1000 
                    })
                } else {
                    console.error("Failed to submit order details");
                }
            } else {
                console.error("Failed to submit cart");
            }
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };
    return (
        <div className="px-96">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4 uppercase">Giỏ hàng</h1>
                {cart && cart.length === 0 && status === false && <div className="flex items-center flex-col"><p className="text-red-500 mb-4">Bạn chưa có món hàng nào trong giỏ hàng</p> <Link to="/product" className="rounded-sm text-white hover:bg-indigo-500 px-2.5 py-1.5 bg-indigo-600">Mua ngay</Link></div>}
                {cart && cart.length === 0 && status === true && <div className="flex items-center flex-col"><p className="text-green-500 mb-4">Bạn đã đặt hàng thành công</p> <Link to="/product" className="rounded-sm text-white hover:bg-indigo-500 px-2.5 py-1.5 bg-indigo-600">Tiếp tục mua hàng</Link></div>}

                {cart && cart.length > 0 &&
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-full flex items-center justify-between bg-gray-200 p-2">
                            <p className="w-1/4">Sản phẩm</p>
                            <p className="w-1/4">Số lượng</p>
                            <p className="w-1/4">Thành tiền</p>
                            <p className="w-1/4">Thao tác</p>
                        </div>
                        {cart.map((item) => (
                            <div key={item.masp} className="w-full flex items-center justify-between p-2 border-b">
                                <p className="w-1/4">{item.tensp}</p>
                                <p className="w-1/4">{item.quantity}</p>
                                <p className="w-1/4">{formatCurrency(item.giasp * item.quantity)}</p>
                                <div className="flex w-1/4">
                                    <button onClick={() => increaseQuantity(item.masp)} className="text-white bg-gray-400 px-3.5 py-2 rounded-md mr-2">+</button>
                                    <button onClick={() => decreaseQuantity(item.masp)} className="text-white bg-blue-500 px-4 py-2 rounded-md mr-2 ml-2">-</button>
                                    <button onClick={() => removeItem(item.masp)} className="text-white bg-red-500 px-2 py-1 rounded-md ml-2">Xóa</button>
                                </div>

                            </div>

                        ))}

                        <div className="w-full flex items-center justify-between bg-gray-200 p-2">
                            <p className="w-1/4">Tổng tiền</p>
                            <p className="w-1/4"></p>
                            <p className="w-1/2">{formatCurrency(totalAmount)}</p>
                        </div>
                        <form className="flex flex-col items-center w-1/2" onSubmit={handleSubmit}>
                            <label htmlFor="diachinhanhang" className="text-gray-700 font-semibold my-5">Địa chỉ nhận hàng</label>
                            <textarea id="diachinhanhang" name="diachinhanhang" placeholder="Địa chỉ nhận hàng" className="w-full p-2 border rounded-md" />
                            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-500">Đặt hàng</button>
                        </form>

                    </div>
                }

            </div>

        </div>
    );
}
