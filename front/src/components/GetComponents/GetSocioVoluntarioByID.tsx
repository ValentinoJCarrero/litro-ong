import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getVolunteersByID } from "../../helpers/SocioVoluntario/getUserSocioVoluntarioByID";
import { useEffect, useState } from "react";
import avatarUser from "../../assets/avatarUser.jpg";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";

interface infoUser {
  fullName: string;
  phone: string;
  email: string;
  fullAddress: string;
  role: Array<{ role: string }>;
}
function GetVolunteerByID() {
  let idDecodificado: string;
  const tokenFromCookies = Cookies.get("token");

  const [infoUser, setInfoUser] = useState<infoUser | null>(null);

  if (!tokenFromCookies) {
    console.error("No hay token en cookies");
    return (
      <div>
        <p className="bg-red-500">No hay token</p>
      </div>
    );
  }

  try {
    const decodedToken: any = jwtDecode(tokenFromCookies);
    idDecodificado = decodedToken.userPayload.sub;
  } catch (error) {
    console.error("Error al decodificar token", error);
    return;
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


  return (
    <div className="h-full flex flex-col justify-between items-stretch ">
      {infoUser ? (
        <div className=" flex flex-col items-center gap-5 h-full w-full font-medium ">
          <div className=" h-28 w-28 my-5">
            <img src={avatarUser.src} alt="Avatar" className="rounded-3xl" />
          </div>
          <div className="flex flex-col w-3/4 gap-4 text-sm  ">
            <hr />
            <div className="flex flex-row  gap-12">
              <span  className="   text-textParagraph w-1/3">
               Nombre y apellido
              </span>
              <p className=" w-1/2">{infoUser?.fullName}</p>
            </div>
            <hr />
            <div className="flex flex-row  gap-12 ">
              <span  className="   text-textParagraph w-1/3">
                Teléfono
              </span>
              <p className=" w-1/2">{infoUser?.phone}</p>
            </div>
            <hr />
            <div className="flex flex-row  gap-12 ">
              <span  className="   text-textParagraph w-1/3">
                Email
              </span>
              <p className=" w-1/2">{infoUser?.email}</p>
            </div>
            <hr />
            <div className="flex flex-row  gap-12 ">
              <span  className="   text-textParagraph w-1/3">
                Domicilio
              </span>
              <p className=" w-1/2">{infoUser?.fullAddress}</p>
            </div>
            <hr />
            <div className="flex flex-row  gap-12 ">
              <span  className="   text-textParagraph w-1/3">
                Estado
              </span>
              <p className=" w-1/2">{infoUser?.role[0].role}</p>
            </div>
            <hr />
          </div>
        </div>
      ) : (
        <div className="h-full w-full justify-center items-center  flex">
          <SpinnersPrimary />
        </div>
      )}
    </div>
  );
}

export default GetVolunteerByID;
