import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
const {signOut } = await import("auth-astro/client")
import {jwtDecode} from "jwt-decode";
import { getVolunteersByID } from "../../../helpers/SocioVoluntario/getUserSocioVoluntarioByID";

let idDecodificado = "";
const tokenUser = Cookies.get("token")? Cookies.get("token") : "";


interface MenuProps {
  children: React.ReactNode;
}

const MenuUser: React.FC<MenuProps> = ({ children}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [infoUser, setInfoUser] = useState<any>(null);


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  if (tokenUser) {
    try {
      const decodedToken: any = jwtDecode(tokenUser);
      idDecodificado = decodedToken.userPayload.sub;
      console.log(tokenUser)
      console.log("el token magico decodificado es:",decodedToken.userPayload.sub)

  
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  
  useEffect(() => {
    if (idDecodificado) {
      getVolunteersByID(idDecodificado)
        .then((data) => {
          console.log(data);
          setInfoUser(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idDecodificado]);

    // console.log("este es infouser:",infoUser.role[0].role)

  
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
          <a href={infoUser?.role[0]?.role?"/dashboardUserVolunteer/profile":"/dashboardUser/profile"} className="flex flex-col px-4 p-2 bg-secondary rounded-t-lg hover:bg-gray-100 hover:rounded-lg">
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