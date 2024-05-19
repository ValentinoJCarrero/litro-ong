import React, { useEffect, useState } from 'react';
import iconNews from "../../assets/logoOG.png";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import SpinnersDelete from "../Spinners/SpinnersDelete";
import SpinnersPrimary from '../Spinners/SpinnersPrimary';
import { getEvents } from '../../helpers/Events/getEvents';
import { deleteEvents } from '../../helpers/Events/deleteEvents';
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


const EventsComponent = () => {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            const newsData = await getEvents();
            setEvents(newsData);
            setIsLoading(false);
        };
        fetchNews();
    }, []);

    const onClic = async (id:any): Promise<void> => {
        console.log('Eliminando noticia con ID :', id);
        setDeletingId(id);
        setIsDeleting(true);

        await deleteEvents(id);

        setTimeout(() => {
            setEvents(events.filter(item => item.id !== id));
            setIsDeleting(false);
            setDeletingId(null);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center h-full">
            {isLoading ? (
        <SpinnersPrimary />
      ) :!events.length ? (
                <p className="text-tertiary w-full text-center text-3xl">No hay eventos disponibles por ahora.</p>
            ) : (
                <ul className="overflow-auto h-80 w-full">
                    {events.map(({primaryImage, title, address, date, location, id, timeStart, timeEnd }) => (
                        <li key={id} className="flex flex-row flex-nowrap justify-between pr-10 items-center">
                            <a className="flex flex-row justify-between p-10 items-center text-sm w-full" id={`card${id}`} href={`/dashboardAdmin/${title}`}>
                                <div className="flex">
                                    <img src={primaryImage} alt={title} className="w-20 h-20 rounded-full object-cover mr-4" />
                                    <div>
                                        <h6 className="text-tertiary text-base font-semibold">{title}</h6>
                                        <p>{address}</p>
                                        <p>{date}</p>
                                        <div className="flex">
                                        <p>{timeStart}</p>
                                        <p className="ml-2">{timeEnd}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p>{location}</p>
                                </div>
                               
                            </a>
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
                </ul>
            )}
        </div>
    );
};

export default EventsComponent;