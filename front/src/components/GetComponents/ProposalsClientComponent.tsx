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
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(3);
  const [proposals, setProposals] = useState<ProposalsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchNews = async (page: number) => {
      const newsData = await getProposals(3, page, status);
      setProposals(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total / 3));
      setIsLoading(false);
    };
    fetchNews(page);
  }, [page, status]);

  function statusChange(status: string) {
    switch (status) {
      case "PENDING":
        return "Pendiente";
      case "APPROVED":
        return "Aceptado";
      case "REJECTED":
        return "Rechazado";
      default:
        return status;
    }
  }

  return (
    <div className="flex items-center justify-between h-full flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <SpinnersPrimary />
        </div>
      ) : message === "No se encontraron propuestas en esta pagina" ? (
        <NotFound />
      ) : (
        <div className="w-full h-full">
          <div className="shadow-xl w-full flex items-end justify-end mb-10 rounded-full px-10">
            <button onClick={() => setStatus("APPROVED")}>APROBADOS</button>
            <button onClick={() => setStatus("REJECTED")} className="mx-10">
              RECHAZADOS
            </button>
            <button onClick={() => setStatus("")}>TODOS</button>
          </div>
          <div></div>
          <ul className=" w-full">
            {proposals.map(({ status, title, date, id }) => (
              <>
                <li
                  key={id}
                  className="flex flex-row flex-nowrap justify-between mx-10 items-center  my-4"
                >
                  <div className=" w-1/2">
                    <h6 className="text-tertiary text-base font-semibold">
                      {title}
                    </h6>
                    <p>{date}</p>
                  </div>
                  <div className="w-1/3 ">
                    <p
                      className={`text-center  font-bold ${
                        statusChange(status) === "Rechazado"
                          ? "text-red-400"
                          : statusChange(status) == "Pendiente"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {statusChange(status)}
                    </p>
                  </div>
                  <div className="w-8">
                    <a
                      href={`/dashboardAdmin/proposals/DinamicProposals/${id}`}
                    >
                      <img src={vectorIcon.src} alt="icono de vector" />
                    </a>
                  </div>
                </li>
                <hr />
              </>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center justify-center flex-row w-full ">
        <div className="rounded-lg w-8 h-8  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            className="w-full h-full font-medium text-xl"
          >
            {"<"}
          </button>
        </div>
        <p className=" font-base text-lg mx-4">
          {page}/{totalPages}
        </p>
        <div className="rounded-lg w-8 h-8  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            className="w-full h-full font-medium text-xl"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalsComponent;
