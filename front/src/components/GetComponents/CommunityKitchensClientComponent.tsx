import React, { useEffect, useState } from "react";
import vectorIcon from "../../assets/vectorIcon.svg";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import SpinnersDelete from "../Spinners/SpinnersDelete";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import { deleteCommunityKitchens } from "../../helpers/CommunityKitchens/deleteCommunityKitchens";
import { getCommunityKitchens } from "../../helpers/CommunityKitchens/getCommunityKitchens";
import Swal from "sweetalert2";
interface CommunityKitchensItem {
  name: string;
  address: string;
  photo: string;
  holder: string;
  kidsNumber: string;
  description: string;
  time: string;
  days: string[];
  id: number;
}

const CommunityKitchensComponent = () => {
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(3);
  const [kitchen, setKitchen] = useState<CommunityKitchensItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCommunityKitchens = async (page: number) => {
      const newsData = await getCommunityKitchens(4, page);
      setKitchen(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total / 4));
      setIsLoading(false);
    };
    fetchCommunityKitchens(page);
  }, [page]);

  const onClic = async (id: any): Promise<void> => {
    Swal.fire({
      title: "Estas seguro/a de eliminar este merendero?",
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

        await deleteCommunityKitchens(id);

        setTimeout(() => {
          setKitchen(kitchen.filter((item) => item.id !== id));
          setIsDeleting(false);
          setDeletingId(null);
        }, 1000);
        Swal.fire({
          title: "Eliminado!",
          text: "El merendero ha sido eliminado.",
          icon: "success",
        });
      }
    });
    console.log("Eliminando el merendero con ID:", id);
  };

  return (
    <div className="flex flex-col flex-nowrap justify-between items-stretch p-4 h-full ">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <SpinnersPrimary />
        </div>
      ) : message === "No se encontraron merenderos en esta pagina" ? (
        <NotFound />
      ) : (
        <ul className=" w-full flex flex-col   ">
          {kitchen.map(
            ({
              name,
              photo,
              address,
              holder,
              // kidsNumber,
              // description,
              // time,
              days,
              id,
            }) => (
              <div className="flex flex-col">
                <div className=" flex flex-col justify-betweend items-center w-full">
                  <li
                    key={id}
                    className="flex flex-row  flex-nowrap my-2 justify-between items-center w-full"
                  >
                    <a
                      className="flex flex-row  items-center  text-sm w-full"
                      id={`card${id}`}
                      href={`/news/DinamicNew/${name}`}
                    >
                      <div className="flex w-2/5">
                        <img
                          src={photo}
                          alt={name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div className="text-sm  text-textParagraph">
                          <h6 className="text-tertiary text-base font-semibold">
                            {name}
                          </h6>
                          <div className="text-sm text-textParagraph ">
                            <p>{holder}</p>
                            <p className="text-xs">{address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-center flex flex-row h-full justify-center items-center text-xs w-96  ">
                        {days.join(" ")}
                      </div>
                    </a>
                    <div className="flex flex-row justify-center gap-10">
                      <div className="w-40 flex justify-center  ">
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
                    </div>
                  </li>
                </div>
                <hr />
              </div>
            )
          )}
        </ul>
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

export default CommunityKitchensComponent;
