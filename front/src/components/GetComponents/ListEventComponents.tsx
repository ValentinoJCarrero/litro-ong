import { useEffect, useState } from "react";
import NotFound from "../NotFound/NotFound";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import { getEvents } from "../../helpers/Events/getEvents";
import vectorIcon from "../../assets/vectorIcon.svg";

interface EventItem {
  primaryImage: string;
  title: string;
  address: string;
  date: string;
  location: string;
  href: string;
  id: number;
  timeStart: string;
  timeEnd: string;
}

interface Color {
  color: string;
}

const ListEventComponents = (props: Color) => {
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(3);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchEvents = async () => {
      const newsData = await getEvents(3, page);
      setEvents(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total / 3));
      setIsLoading(false);
    };
    fetchEvents();
  }, []);
  console.log(events);

  return (
    <div className="flex flex-col flex-nowrap justify-between items-stretch my-2 h-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <SpinnersPrimary />
        </div>
      ) : message === "No se encontraron eventos en esta pagina" ? (
        <NotFound />
      ) : (
        <ul className=" w-full flex flex-col gap-5 justify-center items-stretch content-center my-5">
          {events.map(({ primaryImage, title, address, date, id }) => (
            <>
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between items-center"
              >
                <a
                  className="flex flex-row justify-between items-center text-sm w-full"
                  id={`card${id}`}
                  href={`/dashboardAdmin/${title}`}
                >
                  <div className="flex">
                    <img
                      src={primaryImage}
                      alt={title}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h6
                        className={`text-${props.color} text-base font-semibold`}
                      >
                        {title}
                      </h6>
                      <div className=" text-sm text-textParagraph">

                      <p className=" ">{address}</p>
                      <p className="text-xs">{date}</p>
                      </div>
                    </div>
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
                onClick={() => page <= totalPages && setPage(page + 1)}
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

export default ListEventComponents;
