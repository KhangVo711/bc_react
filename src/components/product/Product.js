import Items from "./Items"
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DetailProduct from "./DetailProduct";

export default function Product() {
    const detailRef = useRef(null);
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");
        return savedProducts ? JSON.parse(savedProducts) : [];
    });
    useEffect(() => {
        axios.get("http://localhost:5001/product")
            .then((response) => {
                if (response.status === 200) {
                    setProducts(response.data.products);
                    localStorage.setItem("products", JSON.stringify(response.data.products));
                }
            })
            .catch((error) => {
                console.error("Có lỗi xảy ra khi gọi API:", error);
            });
    }, []);

    const [detailProduct, setDetailProduct] = useState(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailRef.current && !detailRef.current.contains(event.target)) {
                setDetailProduct(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const onViewDetail = (product) => {
        setDetailProduct(product);
    };
    const listProduct = products.map((product) => {
        return (
            <Items key={product.masp} product={product} onViewDetail={() => onViewDetail(product)} />
        );
    });

    return (
        <div className="relative w-screen">
            <h2 className="lg:text-3xl text-xl tracking-wide font-bold uppercase text-center">Sản phẩm</h2>
            <div className="container mx-auto grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-5 pt-4 pb-12 ">
                {listProduct}
            </div>
            <DetailProduct detailProduct={detailProduct} detailRef={detailRef} />
        </div>
    );
}
