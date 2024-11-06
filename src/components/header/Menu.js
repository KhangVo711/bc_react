import NavItem from "./NavItem.js"
export default function Menu() {
    const navItems = [
        {
            name: "Trang chủ",
            url: "/"
        },
        {
            name: "Sản phẩm",
            url: "/product"
        },
    ]
    if (localStorage.getItem("jwt")) {
        navItems.push(
            {
                name: "Đơn đã đặt",
                url: "/order"
            },
            {
                name: "Hồ sơ",
                url: "/profile"
            },
            {
                name: "Đăng xuất",
                url: "/logout"
            },
        );
    } else {
        navItems.push({
            name: "Đăng nhập",
            url: "/login"
        });
    }
    const nav = navItems.map((navItem, index) => (<NavItem key={index} navI={navItem} />))
    return (
        <ul className="me-auto flex flex-col lg:flex-row" data-twe-navbar-nav-ref>
            {nav}
        </ul>
    )
}