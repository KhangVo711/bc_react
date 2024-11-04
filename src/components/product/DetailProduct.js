import { formatCurrency } from "../../utils/utils.js";

export default function DetailProduct({detailProduct, detailRef}) {
    return (
        <div className={`absolute top-0 w-full h-[30rem] justify-center items-start pt-20 ${detailProduct ? 'flex' : 'hidden'}`}>
                <div ref={detailRef} className="container mx-auto h-full w-1/3 xl:w-1/4 flex items-center justify-around flex-col shadow-xl rounded-md bg-slate-200">
                    <h2 className="text-black text-2xl font-bold">Chi tiết sản phẩm</h2>
                    {detailProduct && (
                        <>
                            <img className="w-1/3 h-1/3" src={require(`../../uploads/${detailProduct.hinhanh}`)} alt="product" />
                            <div className="flex flex-col justify-start w-full pl-4">
                                <div >
                                    <div className="flex ">     
                                        <p className="text-black text-lg font-bold">Mã sản phẩm:</p>
                                        <p className="text-black text-lg">{detailProduct.masp}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-black text-lg font-bold">Tên sản phẩm: </p>
                                        <p className="text-black text-lg">{detailProduct.tensp}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-black text-lg font-bold">Giá: </p>
                                        <p className="text-black text-lg">{formatCurrency(detailProduct.gia)}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-black text-lg font-bold">Loại sản phẩm: </p>
                                        <p className="text-black text-lg">{detailProduct.loaisp}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-black text-lg font-bold">Nhà sản xuất: </p>
                                        <p className="text-black text-lg">{detailProduct.tennsx}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center flex-col">
                                <p className="text-black text-lg font-bold">Chi tiết sản phẩm</p>
                                <p className="text-black text-lg px-4">{detailProduct.thongtinchitiet}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
    )
}