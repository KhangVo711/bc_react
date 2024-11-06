import { Link } from "react-router-dom";

export default function Banner() {
    return(
    <div
        className="relative w-full h-[400px] overflow-hidden bg-[url('http://econaur.com/wp-content/uploads/2021/05/Building-Materials.jpg')] bg-cover bg-[50%] bg-no-repeat">
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mb-6 text-5xl font-bold">Vật liệu xây dựng</h1>
              <h3 className="mb-8 text-xl font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</h3>
              <Link 
                to="/product"
                className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                data-twe-ripple-init
                data-twe-ripple-color="light">
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}