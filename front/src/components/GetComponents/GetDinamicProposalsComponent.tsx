import React, { useEffect, useState } from "react";
import NotFound from "../NotFound/NotFound";
import SpinnersPrimary from '../Spinners/SpinnersPrimary';
import { getProposalsById } from "../../helpers/Proposals/getProposalsById";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import ButtonCTASmallReact from "../Buttons/ButtonCTASmallReact";
import { putProposalsById } from "../../helpers/Proposals/putProposalsById";

interface ProposalsItem {
  status: string;
  title: string;
  description: string;
  date: string;
  id: number;
}

const DynamicProposals: React.FC = () => {
  const [proposals, setProposals] = useState<ProposalsItem | null>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fullUrl = window.location.href;
    const regex = /DinamicProposals\/(.+)/;
    const match = fullUrl.match(regex);

    if (match && match[1]) {
      const decodedUrl = decodeURIComponent(match[1]);
      setUrl(decodedUrl);
      console.log(decodedUrl);
    } else {
      setUrl("");
    }
  }, []);

switch (proposals?.status) {
  case "PENDING":
    proposals.status = "Pendiente";
    break;
  case "APPROVED":
    proposals.status = "Aceptado";
    break;
  case "REJECTED":
    proposals.status = "Rechazado";
    break;
}

  const fetchProposalsById = async (proposalId: string) => {
    if (proposalId) {
      try {
        setIsLoading(true);
        const newsData = await getProposalsById(proposalId);
        setProposals(newsData);
        setMessage(newsData.message);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (url) {
      fetchProposalsById(url);
    }
  }, [url]);

  const handleStatusChange = async (proposalId: number, status: string) => {
    if (proposalId) {
      try {
        await putProposalsById(proposalId.toString(), status);
        fetchProposalsById(url); // Vuelve a cargar las propuestas después de cambiar el estado
      } catch (error: any) {
        console.error("Error updating proposal status:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-between h-full flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <SpinnersPrimary />
        </div>
      ) : message === "No se encontraron propuestas en esta pagina" ? (
        <NotFound />
      ) : (
        <>
        <div className="flex flex-col text-center h-full justify-center gap-3 ">
            <div>
              <h6 className="text-tertiary text-2xl font-semibold">
                {proposals?.title}
              </h6>
              <div className="flex flex-row items-center text-xs gap-2">
                
              <p className="text-center font-semibold">Fecha de creación:</p>
              <p className="">{proposals?.date}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2" >

            <p className="text-xs  font-semibold text-start">Descripción:</p>
            <p className="text-start">{proposals?.description}</p>
            </div>
            <div className="w-full flex-col items-center justify-center ">
              <div className="flex flex-col">

              <p className="text-xs font-semibold">Estado:</p>
              <p className={`text-center text-white font-bold ${proposals?.status=="Aceptado"?"bg-green-400":proposals?.status=="Rechazado" ?"bg-red-400":"bg-gray-400"} `} >{proposals?.status}</p> </div>
            </div>
          </div>
          <hr />
        </>
      )}
              <div className="w-full flex justify-around">
                <ButtonWarningSmall
                  title="Rechazar"
                  idEvent={`reject-${proposals?.id}`}
                  onClick={() => proposals?.id && handleStatusChange(proposals.id, "REJECTED")}
                />
                <ButtonCTASmallReact
                  title="Aceptar"
                  idEvent={`accept-${proposals?.id}`}
                  color="white"
                  onClick={() => proposals?.id && handleStatusChange(proposals.id, "APPROVED")}
                />
              </div>
    </div>
  );
};

export default DynamicProposals;