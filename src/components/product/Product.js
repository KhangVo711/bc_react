import Items from "./Items"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Product() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5001/product")
    .then((response) => {
        if (response.status === 200) {
            setProducts(response.data.product);  
        }
    })
    .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
    });

    }, []);


    const listProduct = products.map((product) => {
        return (
            <Items key={product.masp} product={product} />
        );
    });

    return (
        <div>
            <h2 className="lg:text-3xl text-xl tracking-wide font-bold uppercase text-center">Sản phẩm</h2>
            <div className="container mx-auto grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-5 pt-4 pb-12 ">
                {listProduct}
            </div>
        </div>
    );
}
