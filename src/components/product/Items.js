export default function Items({ product }) {
    return (
        <article className=" w-full lg:h-[350px] h-[250px] flex p-2 flex-col items-center rounded-md">
            <a href="#">

                <img className="mb-2.5 hover:grow hover:scale-105 hover:shadow-xl w-full lg:h-[250px] bg-gray-400 h-[150px] rounded-sm transition duration-300 ease-in-out" width="500" height="500" src={`${product.hinhanh}`} alt={`Image of ${product.tensp}`} />

                <div className="pt-4 flex items-center justify-between">
                    <p className=""><strong>{product.tensp}-({product.masp})</strong></p>

                </div>
                <p>{product.thongtinchitiet}</p>
            </a>
        </article>
    )
}