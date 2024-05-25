import Cookies from "js-cookie";
// import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import EnConstruccion from "../EnConstruccion/EnConstruccion";
import { getVolunteersByID } from "../../helpers/SocioVoluntario/getUserSocioVoluntarioByID";
import { useEffect, useState } from "react";

interface infoUser {
  fullName: string;
  phone: string;
  email: string;
  fullAddress: string;
  role: Array<any>;
  // birthDate: string;
  // dni: string;
  // donation: Array<string>;
  // partnerData: any;
  // volunteerData: any;
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
    console.log("ID decodificado", idDecodificado);
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
    <div>
      {infoUser ? (
        <div>
          <h1>Información del socio voluntario</h1>
          <p>Nombre: {infoUser?.fullName}</p>
        </div>
      ) : (
        <div>
          <h1>Información del socio voluntario</h1>
          <p>No hay información</p>
        </div>
      )}
    </div>
  );
}

export default GetVolunteerByID;
