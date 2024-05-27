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

  return (
    <div className="flex items-center justify-center h-full flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <SpinnersPrimary />
        </div>
      ) : proposals?.length === 0 ? (
        <NotFound />
      ) : (
        <ul className=" w-full flex flex-col gap-4">
          {proposals?.map(({ status, title, date, id }) => (
            <>
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between pr-10 items-center"
              >
                <div className="flex w-full justify-between items-center">
                  <div>
                    <h6 className="text-colorSocioVoluntario text-base font-semibold">
                      {title}
                    </h6>
                    <p className=" text-textParagraph text-sm">{date}</p>
                  </div>
                  <p className="text-xs font-semibold">{status}</p>
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
