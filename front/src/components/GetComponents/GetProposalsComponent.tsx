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
  const tokenFromCookies: string | undefined = Cookies.get("token");

  const [proposals, setProposals] = useState<ProposalsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    if (tokenFromCookies) {
      const decodedToken: any = jwtDecode(tokenFromCookies);
      const idDecodificado = decodedToken.userPayload.sub;
      setIdUser(idDecodificado);
    } else {
      setIsLoading(false);
    }
  }, [tokenFromCookies]);

  useEffect(() => {
    if (idUser) {
      getVolunteersByID(idUser)
        .then((data) => {
          setProposals(data.proposals);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idUser]);
  const translateStatus = (status:string) => {
    switch(status) {
      case 'PENDING':
        return 'PENDIENTE';
      case 'APPROVED':
        return 'APROBADO';
      default:
        return 'RECHAZADO';
    }
  }

  return (
    <div className="flex flex-col flex-nowrap justify-between items-stretch p-4 h-full ">
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full">
          <SpinnersPrimary />
        </div>
      ) : proposals?.length === 0 ? (
        <NotFound />
      ) : (
        <ul className=" w-full flex flex-col  ">
          <h2 className="text-lg font-medium w-full text-center my-6">Puedes visualizar el estado de tus propuestas aquí:</h2>
          {proposals?.map(({ status, title, date, id }) => (
            
            <div className="flex flex-col ">
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between pr-10 items-center my-2"
              >
                <div className="flex w-full justify-between items-center">
                  <div>
                    <h6 className="text-colorSocioVoluntario text-base font-semibold">
                      {title}
                    </h6>
                    <p className=" text-textParagraph text-sm">{date}</p>
                  </div>
                  <p className={`text-xs font-bold ${status==='PENDING'?'text-yellow-500':(status==='APPROVED'?'text-green-400':'text-red-500')}`}>{translateStatus(status)}</p> </div>
              </li>
              <hr />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetProposalsComponent;
