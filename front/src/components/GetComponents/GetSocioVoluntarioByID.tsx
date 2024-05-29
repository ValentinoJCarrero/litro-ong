import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getVolunteersByID } from "../../helpers/SocioVoluntario/getUserSocioVoluntarioByID";
import { useEffect, useState } from "react";
import avatarUser from "../../assets/avatarUser.jpg";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";

interface infoUser {
  fullName: string;
  phone: string;
  email: string;
  fullAddress: string;
  role: Array<{ role: string }>;
}
function GetVolunteerByID() {
  let idDecodificado: string;
  const tokenFromCookies: string | undefined = Cookies.get("token");

  const [infoUser, setInfoUser] = useState<infoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [idUser, setIdUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (tokenFromCookies) {
      const decodedToken: any = jwtDecode(tokenFromCookies); // Decodificación correcta
      const idDecodificado = decodedToken.userPayload.sub;
      setIdUser(idDecodificado);
    } else {
      setIsLoading(false); // Detener la carga si no hay token
      setMessage("Token no disponible");
    }
  }, [tokenFromCookies]);

  switch (infoUser?.role[0].role) {
    case "Volunteer":
      infoUser.role[0].role = "Voluntario";
      break;
    case "Partner":
      infoUser.role[0].role = "Socio";
      break;
    case "Admin":
      infoUser.role[0].role = "Administrador";
      break;
  }

  useEffect(() => {
    if (idUser) {
      getVolunteersByID(idUser)
        .then((data) => {
          Cookies.set("fullName", data.fullName);
          setInfoUser(data);
          setIsLoading(false);
          setMessage(data.volunteerData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idUser]);

  return (
    <div className="h-full flex flex-col justify-between items-stretch ">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <SpinnersPrimary />
        </div>
      ) : message === null ? (
        <div className="flex items-center justify-center h-full">
          <NotFound />
        </div>
      ) : (
        <div className=" flex flex-col items-center gap-5 h-full w-full font-medium ">
          <div className=" h-28 w-28 my-5">
            <img src={avatarUser.src} alt="Avatar" className="rounded-3xl" />
          </div>
          <div className="flex flex-col w-3/4 gap-4 text-sm  ">
            <hr />
            <div className="flex flex-row  gap-12">
              <span className="   text-textParagraph w-1/3">
                Nombre y apellido
              </span>
              <p className=" w-1/2">{infoUser?.fullName}</p>
            </div>
            <hr />
            <div className="flex flex-row  gap-12 ">
              <span className="   text-textParagraph w-1/3">Teléfono</span>
              <p className=" w-1/2">{infoUser?.phone}</p>
            </div>
            <hr />
            <div className="flex flex-row  gap-12 ">
              <span className="   text-textParagraph w-1/3">Email</span>
              <p className=" w-1/2">{infoUser?.email}</p>
            </div>
            <hr />
            <div className="flex flex-row  gap-12 ">
              <span className="   text-textParagraph w-1/3">Domicilio</span>
              <p className=" w-1/2">{infoUser?.fullAddress}</p>
            </div>
            <hr />
            <div className="flex flex-row  gap-12 ">
              <span className="   text-textParagraph w-1/3">Estado</span>
              <p className=" w-1/2">{infoUser?.role[0].role}</p>
            </div>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
}

export default GetVolunteerByID;
