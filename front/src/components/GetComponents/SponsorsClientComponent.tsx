import React, { useEffect, useState } from "react";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import SpinnersDelete from "../Spinners/SpinnersDelete";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import { getSponsors } from "../../helpers/Sponsors/getSponsors";
import { deleteSponsors } from "../../helpers/Sponsors/deleteSponsors";
import NotFound from "../NotFound/NotFound";
import Swal from "sweetalert2";
interface SponsorsItem {
  logo: string;
  name: string;
  email: string;
  id: number;
}

const SponsorsComponent = () => {
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(3);
  const [sponsors, setSponsors] = useState<SponsorsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      const newsData = await getSponsors(5, page);
      setSponsors(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total / 5));
      setIsLoading(false);
    };
    fetchSponsors();
  }, [page]);

  const onClic = async (id: any): Promise<void> => {
    Swal.fire({
      title: "Estas seguro/a de eliminar este sponsor?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009BDB",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeletingId(id);
        setIsDeleting(true);

        await deleteSponsors(id);

        setTimeout(() => {
          setSponsors(sponsors.filter((item) => item.id !== id));
          setIsDeleting(false);
          setDeletingId(null);
        }, 1000);
        Swal.fire({
          title: "Eliminado!",
          text: "El sponsor ha sido eliminada.",
          icon: "success",
        });
      }
    });
    console.log("Eliminando sponsor con ID:", id);
  };

  return (
    <div className="flex flex-col items-center justify-between p-5 h-full ">
      {isLoading ? (
        <SpinnersPrimary />
      ) : message === "No se encontraron patrocinadores" ? (
        <NotFound />
      ) : (
        <ul className=" w-full flex flex-col gap-2  ">
          {sponsors.map(({ logo, name, email, id }) => (
            <div>
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between px-10 items-center"
              >
                <div
                  className="flex flex-row justify-between  items-center text-sm w-full"
                  id={`card${id}`}
                >
                  <div className="flex">
                    <img
                      src={logo}
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
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
              <hr />
            </div>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-center flex-row w-full">
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
export default SponsorsComponent;
