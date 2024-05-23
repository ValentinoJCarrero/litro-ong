import React, { useEffect, useState } from "react";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import SpinnersDelete from "../Spinners/SpinnersDelete";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import { getSponsors } from "../../helpers/Sponsors/getSponsors";
import { deleteSponsors } from "../../helpers/Sponsors/deleteSponsors";
import NotFound from "../NotFound/NotFound";
interface SponsorsItem {
  logo: string;
  name: string;
  email: string;
  id: number;
}

const SponsorsComponent = () => {
  const [page, setPage] = useState (1)
  const [message, setMessage] = useState ("")
  const [totalPages, setTotalPages] = useState (3)
  const [sponsors, setSponsors] = useState<SponsorsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      const newsData = await getSponsors(3,page);
      setSponsors(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total/3));
      setIsLoading(false);
    };
    fetchSponsors();
  }, []);

  const onClic = async (id: any): Promise<void> => {
    console.log("Eliminando noticia con ID:", id);
    setDeletingId(id);
    setIsDeleting(true);

    await deleteSponsors(id);

    setTimeout(() => {
      setSponsors(sponsors.filter((item) => item.id !== id));
      setIsDeleting(false);
      setDeletingId(null);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center h-full">
      {isLoading ? (
        <SpinnersPrimary />
      ) : message ==="No se encontraron patrocinadores" ? (
        <NotFound />
      ) : (
        <ul className=" w-full">
          {sponsors.map(({ logo, name, email, id }) => (
            <li
              key={id}
              className="flex flex-row flex-nowrap justify-between pr-10 items-center"
            >
              <div
                className="flex flex-row justify-between p-10 items-center text-sm w-full"
                id={`card${id}`}
              >
                <div className="flex">
                  <img
                    src={logo}
                    alt={name}
                    className="w-20 h-20 rounded-full object-cover mr-4"
                  />
                  <div className="flex flex-col justify-center">
                    <h6 className="text-tertiary text-base font-semibold">
                      {name}
                    </h6>
                    <p>{email}</p>
                  </div>
                </div>
              </div>
              <div className="w-40 flex justify-center">
                {isDeleting && deletingId === id ? (
                  <SpinnersDelete />
                ) : (
                  <ButtonWarningSmall
                    title="Eliminar"
                    idEvent={`delete-${id}`}
                    onClick={() => onClic(id)}
                  />
                )}
              </div>
            </li>
          ))}
          <div className="flex items-center justify-center flex-row w-full mt-8">
              <div  className="rounded-lg w-12 h-12  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
                <button onClick={()=>(page > 1) && setPage(page - 1)} className="w-full h-full font-medium text-xl">{"<"}</button>
              </div>
                <p className=" font-base text-lg mx-4">{page}/{totalPages}</p>
              <div  className="rounded-lg w-12 h-12  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
                <button onClick={()=>setPage(page + 1)} className="w-full h-full font-medium text-xl">{">"}</button>
              </div> 
          </div>
        </ul>
      )}
    </div>
  );
};
export default SponsorsComponent;
