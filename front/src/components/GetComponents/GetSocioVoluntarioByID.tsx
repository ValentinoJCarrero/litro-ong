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
  const [messagePartner, setMessagePartner] = useState("");

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

  const mapRole = (role: string) => {
    switch (role) {
      case "Volunteer":
        return "Voluntario";
      case "Partner":
        return "Socio";
      case "Admin":
        return "Administrador";
      default:
        return role;
    }
  };
  useEffect(() => {
    if (idUser) {
      getVolunteersByID(idUser)
        .then((data) => {
          Cookies.set("fullName", data.fullName);
          setInfoUser(data);
          console.log(data);
          setIsLoading(false);
          setMessage(data.volunteerData);
          setMessagePartner(data.partnerData);
          console.log(data.partnerData);
          console.log(data.volunteerData);
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
      ) : message || messagePartner ? (
        <div className="flex flex-col items-center gap-5 h-full w-full font-medium ">
          <div className="h-28 w-28 my-5">
            <img src={avatarUser.src} alt="Avatar" className="rounded-3xl" />
          </div>
          <div className="flex flex-col w-3/4 gap-4 text-sm">
            <hr />
            <div className="flex flex-row gap-12">
              <span className="text-textParagraph w-1/3">Nombre y apellido</span>
              <p className="w-1/2">{infoUser?.fullName}</p>
            </div>
            <hr />
            <div className="flex flex-row gap-12">
              <span className="text-textParagraph w-1/3">Teléfono</span>
              <p className="w-1/2">{infoUser?.phone}</p>
            </div>
            <hr />
            <div className="flex flex-row gap-12">
              <span className="text-textParagraph w-1/3">Email</span>
              <p className="w-1/2">{infoUser?.email}</p>
            </div>
            <hr />
            <div className="flex flex-row gap-12">
              <span className="text-textParagraph w-1/3">Domicilio</span>
              <p className="w-1/2">{infoUser?.fullAddress}</p>
            </div>
            <hr />
            <div className="flex flex-row">
              <span className="text-textParagraph w-1/3">Estado</span>
              <p className="ml-10 mr-4">
                {infoUser?.role?.[0] ? mapRole(infoUser.role[0].role) : ""}
              </p>
              {infoUser?.role?.[1] && <p>{mapRole(infoUser.role[1].role)}</p>}
            </div>
            <hr />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <NotFound />
        </div>
      )}
    </div>
  );
}

export default GetVolunteerByID;
