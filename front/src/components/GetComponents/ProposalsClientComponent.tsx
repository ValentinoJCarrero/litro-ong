import React, { useEffect, useState } from "react";
import vectorIcon from "../../assets/vectorIcon.svg";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import { getProposals } from "../../helpers/Proposals/getProposals";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
interface ProposalsItem {
  status: string;
  title: string;
  date: string;
  id: number;
}

const ProposalsComponent = () => {
  const [page, setPage] = useState (1)
  const [message, setMessage] = useState ("")
  const [totalPages, setTotalPages] = useState (3)
  const [proposals, setProposals] = useState<ProposalsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");


  useEffect(() => {
    const fetchNews = async (page: number) => {
      const newsData = await getProposals(3,page,status);
      setProposals(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total/3));
      setIsLoading(false);
    };
    fetchNews(page);
  }, [page, status]);


  return (
    <div className="flex items-center justify-center h-full flex-col">
      <div className="shadow-xl w-full flex items-end justify-end mb-10 rounded-full px-10">
        <button onClick={() => setStatus("APPROVED")}>APROBADOS</button>
        <button onClick={() => setStatus("REJECTED")} className="mx-10">RECHAZADOS</button>
        <button onClick={() => setStatus("")}>TODOS</button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
        <SpinnersPrimary />
        </div>
      ) : message ==="No se encontraron propuestas en esta pagina" ? (
        <NotFound />
      ) : (
        <ul className=" w-full">
          {proposals.map(({ status, title,  date, id }) => (
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
                  
                <div className="w-40 flex justify-center">
                    <a href={`/dashboardAdmin/proposals/DinamicProposals/${id}`}>Ver mas</a>
                </div>
                <img src={vectorIcon.src} alt="icono de vector" />
              </li>
              <hr />
              
            </>
          ))}
          <div className="flex items-center justify-center flex-row w-full mt-8">
              <div  className="rounded-lg w-12 h-12  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
                <button onClick={()=>(page > 1) && setPage(page - 1)} className="w-full h-full font-medium text-xl">{"<"}</button>
              </div>
                <p className=" font-base text-lg mx-4">{page}/{totalPages}</p>
              <div  className="rounded-lg w-12 h-12  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
                <button onClick={()=>(page < totalPages) && setPage(page + 1)} className="w-full h-full font-medium text-xl">{">"}</button>
              </div> 
          </div>
        </ul>
      )}
      {/*<div className="w-full flex justify-end mt-10">
        <ButtonWarningSmall title="Eliminar propuestas" idEvent="newProposal" onClick={() => {}} />
      </div>*/}
    </div>
  );
};

export default ProposalsComponent;
