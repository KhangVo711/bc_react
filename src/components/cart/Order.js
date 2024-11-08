import { formatCurrency } from "../../utils/utils.js";
import { formatDateTime } from "../../utils/dateTime.js";
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../components/Context.js';
import { API } from "../../API/service.js";


export default function Order() {
    const { isData } = useContext(Context);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (isData) {
            setUsername(isData.username);
        }
    }, [isData]);

    const [cartOrders, setCartOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    // Fetch cart orders data
    useEffect(() => {
        if (!username) return;
        async function fetchCartOrders() {
            try {
                const response = await API.GetOrderCart(username);
                setCartOrders(response.data.cartAPI);
            } catch (error) {
                console.error("Error fetching cart orders:", error);
            }
        }
        fetchCartOrders();
    }, [username]);

    // Fetch order details when selectedOrderId changes
    useEffect(() => {
        if (!selectedOrderId) return;

        async function fetchOrderDetails() {
            try {
                const response = await API.GetOrderId(selectedOrderId);
                setOrders(response.data.order);
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        }
        fetchOrderDetails();

    }, [selectedOrderId]);

    return (
        <div className="flex flex-col items-center justify-center p-4 relative">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Đơn hàng đã đặt</h2>
            <div className="grid grid-cols-8 gap-6 w-full max-w-4xl p-4 bg-white shadow-md rounded-lg ">
                <p className="font-semibold text-gray-600 text-center">STT</p>
                <p className="font-semibold text-gray-600 col-span-2">Mã đơn hàng</p>
                <p className="font-semibold text-gray-600 w-64 col-span-2">Ngày đặt</p>
                <p className="font-semibold text-gray-600">Trạng thái</p>
                <p className="font-semibold text-gray-600">Tổng giá</p>
                <p className="font-semibold text-gray-600 text-center">Chi tiết</p>
            </div>
            {cartOrders.length > 0 ? (
                cartOrders.map((c_order, index) => (
                    <div key={index} className="grid grid-cols-8 gap-6 w-full max-w-4xl p-4 bg-white border-b border-gray-200">
                        <p className="text-center">{index + 1}</p>
                        <p className='col-span-2'>{c_order.madh}</p>
                        <p className='w-64 col-span-2'>{formatDateTime(c_order.ngaydat)}</p>
                        <p className='w-24'>{c_order.trangthai}</p>
                        <p>{formatCurrency(c_order.tonggia)}</p>
                        <button
                            type='button'
                            onClick={() => {setSelectedOrderId(c_order.madh); setTotalAmount(c_order.tonggia)}}
                            className='text-indigo-600 font-bold'
                        >
                            Xem
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 mt-4">Chưa có đơn đặt hàng nào</p>
            )}

            {selectedOrderId && (
                <div className='absolute translate-x-1/2 translate-y-1/2 right-1/2 shadow-xl bg-gray-100 rounded-lg p-6'>
                    <h2 className="text-lg font-bold mb-2 text-center mt-4">Chi tiết đơn hàng</h2>
                    <h3 className="text-md font-bold mb-4 text-center">{selectedOrderId}</h3>
                    <div className="flex w-96 justify-between p-4 bg-gray-200 border-b border-gray-300 mt-5">
                        <p className="font-semibold text-gray-600  w-1/3">STT</p>
                        <p className="font-semibold text-gray-600 w-1/3">Tên sản phẩm</p>
                        <p className="font-semibold text-gray-600 w-1/3 text-center">Giá</p>
                    </div>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (


                            <div key={index} className="flex w-96 justify-between p-4 border-b border-gray-300">
                                <p className=" w-1/3">{index + 1}</p>
                                <p className='w-1/3'>{order.tensp}</p>
                                <p className='w-1/3 text-center'>{formatCurrency(order.gia)}</p>
                            </div>



                        ))
                    ) : (
                        <p className="text-gray-500 mt-4">Không có chi tiết đơn hàng</p>
                    )}
                     <div className="flex justify-between w-full pl-4 pr-10 mt-3">
                            <h1 className="font-bold">Tổng giá</h1>
                            <p>{formatCurrency(totalAmount)}</p>
                        </div>
                    <div className='flex justify-center'>
                       
                
                        <button
                            type="button"
                            onClick={() => setSelectedOrderId(null)} // Close modal
                            className="mt-3 text-red-600 font-bold"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
