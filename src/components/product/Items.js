import { useContext } from "react";
import { Context } from '../../components/Context.js';
import { formatCurrency } from "../../utils/utils.js";
export default function Items({ product, onViewDetail }) {
    const { addToCart } = useContext(Context);
    return (

            <article className=" w-full lg:h-[350px] h-[250px] flex p-2 flex-col items-center rounded-md ">
                <div className="relative group hover:grow hover:scale-105 hover:shadow-xl transition ease-in-out duration-200">

                    <img className="mb-2.5 w-full lg:h-[250px] bg-gray-400 h-[150px] rounded-sm transition duration-300 ease-in-out" src={require(`../../uploads/${product.hinhanh}`)} alt={`Image of ${product.tensp}`} />
                    <div className="absolute items-center lg:h-[250px] h-[150px] w-full top-0 bg-black hidden group-hover:bg-opacity-40 group-hover:flex justify-center transition ease-in-out duration-200">
                        <div className="flex flex-col justify-between items-center h-1/3">
                            <button onClick={onViewDetail} className="text-black text-center px-2.5 py-1.5 bg-gray-100 rounded-md shadow-md hover:bg-gray-300 transition ease-in-out duration-200">Xem chi tiết</button>
                            <button onClick={() => addToCart(product)} className="text-black text-center px-2.5 py-1.5 bg-gray-100 rounded-md shadow-md hover:bg-gray-300 transition ease-in-out duration-200">Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                    <div className="pt-1 flex items-center justify-between group-hover:px-3 transition ease-in-out duration-200">
                        <p className="mb-4"><strong>{product.tensp}</strong></p>
                        <p className="mb-4"><strong>{formatCurrency(product.gia)}</strong></p>
                    </div>
                    <p className="mb-8 group-hover:px-3 transition ease-in-out duration-200">{product.thongtinchitiet}</p>
                </div>
            </article>
    )
}