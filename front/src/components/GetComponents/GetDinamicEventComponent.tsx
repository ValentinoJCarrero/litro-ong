import React, { useEffect, useState } from "react";
import { getEventByTitle } from "../../helpers/Events/GetEventByTitle";
import NotFound from "../NotFound/NotFound";
import BannerIndividualEvent from "../fromEvents/BannerIndividualEvent";
import SpinnersPrimary from '../Spinners/SpinnersPrimary';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Event {
  id: string;
  title: string;
  subtitle: string;
  address: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  description: string;
  primaryImage: string;
  secondaryImage?: string | null;
  tertiaryImage?: string | null;
}

const DynamicEvent: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fullUrl = window.location.href;
    const regex = /DinamicEvent\/(.+)/;
    const match = fullUrl.match(regex);

    if (match && match[1]) {
      const decodedUrl = decodeURIComponent(match[1]);
      setUrl(decodedUrl);
    } else {
      setUrl("");
    }
  }, []);

  useEffect(() => {
    const fetchEventByTitle = async () => {
      if (url) {
        try {
          const eventData = await getEventByTitle(url);
          setEvent(eventData);
          console.log(eventData);
          setIsLoading(false);
        } catch (error: any) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };
    fetchEventByTitle();
  }, [url]);

  if (isLoading) {
    return <SpinnersPrimary />;
  }

  if (error) {
    return <div className="text-red-500 w-full text-center text-3xl">Error: {error}</div>;
  }

  return (
    <div>
      {!event ? (
        <div className="flex flex-col justify-center items-center m-20">
          <NotFound />
        </div>
      ) : (
        <div className="flex flex-col">
          <BannerIndividualEvent
            titulo={event.title}
            fecha={format(new Date(event.date), "MMMM dd, yyyy, EEEE", { locale: es })}
            banner={event.primaryImage}
            direccion={event.address}
          />

          <div className="bg-secondary">
            <div className="mx-24 p-16 flex flex-col gap-5">
              <h4 className="text-3xl font-bold text-textTertiary">
                {event.subtitle}
              </h4>
              <p className="text-base font-normal text-textParagraph">
                {event.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {event.secondaryImage && event.tertiaryImage && (
              <div className="rounded-3xl w-1/2 h-96 flex flex-row items-center justify-center flex-wrap content-center gap-10">
                <img
                  src={event.secondaryImage}
                  alt="imagen"
                  className="h-80 object-fit rounded-3xl"
                />
                <img
                  src={event.tertiaryImage}
                  alt="imagen"
                  className="h-80 object-fit rounded-3xl"
                />
              </div>
            )}

            {!event.secondaryImage && event.tertiaryImage && (
              <div className="m-24 w-full h-96 flex flex-row items-center flex-wrap justify-center gap-10">
                <img
                  src={event.tertiaryImage}
                  alt="imagen"
                  className="h-96 object-fit rounded-3xl"
                />
              </div>
            )}

            {event.secondaryImage && !event.tertiaryImage && (
              <div className="m-24 w-full h-96 flex flex-row items-center flex-wrap justify-center gap-10">
                <img
                  src={event.secondaryImage}
                  alt="imagen"
                  className="h-96 object-fit rounded-3xl"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicEvent;
