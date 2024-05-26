import React, { useEffect, useState } from "react";
// import iconNews from "../../assets/logoOG.png";
// import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
// import SpinnersDelete from "../Spinners/SpinnersDelete";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import { getEvents } from "../../helpers/Events/getEvents";
// import { deleteEvents } from '../../helpers/Events/deleteEvents';
import NotFound from "../NotFound/NotFound";
// import ButtonCTASmall from '../Buttons/ButtonCTASmall.astro';
// import ButtonCTASmallReact from '../Buttons/ButtonCTASmallReact';
// import VolunteersClientComponent from './VolunteersClientComponent';
import GetVolunteersWithEvents from "./GetVolunteersWithEvents";
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
  // const [isDeleting, setIsDeleting] = useState(false);
  // const [deletingId, setDeletingId] = useState<number | null>(null);
  const [volunteers, setVolunteers] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState<string>("");
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

  
  return (
    <div className="flex items-center justify-center h-full">
      {isLoading ? (
        <SpinnersPrimary />
      ) : message === "No se encontraron eventos en esta pagina" ? (
        <NotFound />
      ) : (
        <ul className=" w-full h-full flex flex-col justify-between bg-red-500">
          {events.map(
            ({
              primaryImage,
              title,
              address,
              date,
              location,
              id,
              timeStart,
              timeEnd,
            }) => (
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between pr-10 items-center bg-green-200"
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
                      <p>{address}</p>
                      <p>{date}</p>
                      <div className="flex">
                        {/* <p>{timeStart}</p> */}
                        {/* <p className="ml-2">{timeEnd}</p> */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>{location}</p>
                  </div>
                </a>
              </li>
            )
          )}
          <div className="flex items-center justify-center flex-row w-full  bg-blue-200">
            <div className="rounded-lg w-10 h-10  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
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
            <div className="rounded-lg w-10 h-10  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
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
      {/* <div
        className={
          volunteers === true
            ? "absolute z-20 bg-textPrimary shadow-3xl rounded-2xl p-10"
            : "hidden"
        }
      >
        <GetVolunteersWithEvents>{selectedEventTitle}</GetVolunteersWithEvents>
        <button
          className="absolute top-2 right-2 bg-warning w-8 h-8 text-textPrimary font-semibold rounded-lg"
          onClick={() => setVolunteers(false)}
        >
          X
        </button>
      </div> */}
    </div>
  );
};

export default ListEventComponents;