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
    <div className="flex flex-col flex-nowrap justify-between  items-stretch  h-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <SpinnersPrimary />
        </div>
      ) : message === "No se encontraron merenderos en esta pagina" ? (
        <div className="flex items-center justify-center h-full">
          <NotFound />
        </div>
      ) : (
        <ul className=" w-full flex flex-col  justify-center items-stretch content-center ">
          <h2 className="text-lg font-medium w-full text-center my-6">Aquí encontrarás un resumen de los comedores comunitarios</h2>
          {kitchen.map(({ name, photo, address, holder, days, id }) => (
            <div className="flex flex-col">
              <div className=" flex flex-col justify-betweend items-center w-full">
              <li
                key={id}
                className="flex flex-row  flex-nowrap my-2 justify-between items-center w-full"
              >
                <a
                      className="flex flex-row  items-center  text-sm w-full"
                  id={`card${id}`}
                  href={`/communityKitchens/DinamicCommunityKitchen/${id}`}
                >
                   <div className="flex w-2/5 ">
                    <img
                      src={photo}
                      alt={name}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                     <div className="text-sm  text-textParagraph">
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
                  <div className="text-center flex flex-row h-full justify-center items-center text-xs w-96  ">
                  {days.join(' ')}
                  </div>
                  {/* <img src={vectorIcon.src} alt="icono de vector" /> */}
                </a>
              </li>
              </div>
              <hr />
            </div>
          )
          )}
        
      
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
