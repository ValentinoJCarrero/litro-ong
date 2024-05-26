import React, { useEffect, useState } from "react";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import { getVolunteersByID } from "../../helpers/SocioVoluntario/getUserSocioVoluntarioByID";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
interface ProposalsItem {
  status: string;
  title: string;
  date: string;
  id: number;
}

const GetProposalsComponent = () => {
  let idDecodificado: string;
  const tokenFromCookies = Cookies.get("token");

  const [proposals, setProposals] = useState<ProposalsItem[] >([]);
  const [message, setMessage] = useState ("");
  const [isLoading, setIsLoading] = useState(true);
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
          console.log(data.proposals);
          setProposals(data.proposals);
          setMessage(data.message);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idDecodificado]);


  return (
    <div className="flex items-center justify-center h-full flex-col">

      {isLoading ? (
        <div className="flex items-center justify-center">
        <SpinnersPrimary />
        </div>
      ) : message ==="No se encontro al usuario por el id ingresado" ? (
        <NotFound />
      ) : (
        <ul className=" w-full">
          {proposals?.map(({ status, title,  date, id }) => (
            <>
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between pr-10 items-center"
              >
                  <div className="flex w-full justify-between items-center">
                    <div>
                      <h6 className="text-tertiary text-base font-semibold">
                        {title}
                      </h6>
                      <p>{date}</p>
                    </div>
                    <p  className="mx-10">{status}</p>
                  </div>
              </li>
              <hr />
            </>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default GetProposalsComponent;
