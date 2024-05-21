import { useState } from "react";
import Cookies from 'js-cookie';
const {signOut } = await import("auth-astro/client")
interface MenuProps {
  children: React.ReactNode;
}

const MenuUser: React.FC<MenuProps> = ({ children}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="relative">
      <button className="flex items-center" onClick={toggleDropdown}>
        {children}
      </button>
      <ul
        className={`absolute mt-8 right-[-40px] w-80 z-10  bg-white shadow-lg rounded-lg ${
          dropdownVisible ? "block" : "hidden"
        }`}
      >
        <li className="  ">
          <a href="/dashboardUser/profile" className="flex flex-col px-4 p-2 bg-secondary rounded-t-lg hover:bg-gray-100 hover:rounded-lg">
            <h4 className="text-sm font-medium text-textSecondary ">Menú de Usuario</h4>
            <p  className="text-sm font-base text-textSecondary ">Aquí encontrarás diversas opciones que podrás investigar</p>
          </a>
        </li>
        <li className="text-2xl p-4 hover:bg-gray-100 hover:rounded-b-lg">
          <button onClick={() => {
            signOut()
            Cookies.remove("token");
          }} className="text-textTertiary text-sm font-medium">Cerrar sesión</button>
        </li>
      </ul>
    </div>
  );
};

export default MenuUser;