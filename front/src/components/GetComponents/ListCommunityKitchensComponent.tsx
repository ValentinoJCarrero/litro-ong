import { useEffect, useState } from "react";
import vectorIcon from "../../assets/vectorIcon.svg";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import { getCommunityKitchens } from "../../helpers/CommunityKitchens/getCommunityKitchens";
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

interface Color {
  color: string;
}

const ListCommunityKitchensComponent = (props: Color) => {
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(3);
  const [kitchen, setKitchen] = useState<CommunityKitchensItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityKitchens = async (page: number) => {
      const newsData = await getCommunityKitchens(2, page);
      setKitchen(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total / 3));
      setIsLoading(false);
    };
    fetchCommunityKitchens(page);
  }, [page]);

  return (
    <div className="flex flex-col flex-nowrap justify-between items-stretch my-2 h-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <SpinnersPrimary />
        </div>
      ) : message === "No se encontraron merenderos en esta pagina" ? (
        <div className="flex items-center justify-center h-full">
          <NotFound />
        </div>
      ) : (
        <ul className=" w-full flex flex-col gap-5 justify-center items-stretch content-center my-5">
          {kitchen.map(({ name, photo, address, holder, days, id }) => (
            <>
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between items-center"
              >
                <a
                  className="flex flex-row justify-between items-center text-sm w-full"
                  id={`card${id}`}
                  href={`/news/DinamicNew/${name}`}
                >
                  <div className="flex">
                    <img
                      src={photo}
                      alt={name}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div className=" flex flex-col justify-center">
                      <h6
                        className={`text-${props.color} text-base font-semibold`}
                      >
                        {name}
                      </h6>
                      <div className="text-sm  text-textParagraph">

                      <p className=" ">{holder}</p>
                      <p className="text-xs">{address}</p>
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-row gap-2">
                    {days.map((day) => (
                      <p>{day}</p>
                    ))}
                  </div>
                  <img src={vectorIcon.src} alt="icono de vector" />
                </a>
              </li>
              <hr />
            </>
          ))}
        
      <div className="flex items-center justify-center flex-row w-full  ">
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
      </ul>
      )}
    </div>
  );
};

export default ListCommunityKitchensComponent;
