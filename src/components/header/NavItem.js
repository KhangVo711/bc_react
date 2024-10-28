import {Link} from "react-router-dom";
export default function NavItem({navI}) {
    return (
        <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
            <Link
                className="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                to={navI.url}
                data-twe-nav-link-ref
                data-twe-ripple-init
                data-twe-ripple-color="light"
            >
                {navI.name}
            </Link>
        </li>
    )
}