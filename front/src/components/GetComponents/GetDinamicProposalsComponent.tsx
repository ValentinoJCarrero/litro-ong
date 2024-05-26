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
    <div className="flex items-center justify-center h-full flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <SpinnersPrimary />
        </div>
      ) : message === "No se encontraron propuestas en esta pagina" ? (
        <NotFound />
      ) : (
        <>
          <div className="flex flex-col w-5/6 h-1/2 justify-between items-center">
            <div>
              <h6 className="text-tertiary text-2xl font-semibold">
                {proposals?.title}
              </h6>
              <p className="text-center">{`Fecha de creacion: ${proposals?.date}`}</p>
            </div>
            <p className="text-center">{proposals?.description}</p>
            <div className="w-full flex-col items-center justify-center ">
              <p className="m-10 text-center">{proposals?.status}</p>
              <div className="w-full flex justify-around">
                <ButtonWarningSmall
                  title="Rechazar"
                  idEvent={`reject-${proposals?.id}`}
                  onClick={() => proposals?.id && handleStatusChange(proposals.id, "REJECTED")}
                />
                <ButtonCTASmallReact
                  title="Aceptar"
                  idEvent={`accept-${proposals?.id}`}
                  onClick={() => proposals?.id && handleStatusChange(proposals.id, "APPROVED")}
                />
              </div>
            </div>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default DynamicProposals;