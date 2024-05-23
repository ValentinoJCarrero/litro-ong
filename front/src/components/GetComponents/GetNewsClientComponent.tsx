import React, { useEffect, useState } from "react";
import { getNews } from "../../helpers/getNews";
import rectangle from "../../assets/rectangleCard.svg";
import calendarIcon from "../../assets/calendarIcon.svg";
import cursorIcon from "../../assets/cursorIcon.svg";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface MainNews {
  id: string;
  title: string;
  subtitle: string;
  primaryImage: string;
  secondaryImage: string;
  tertiaryImage: string;
  description: string;
  date: string;
  href: string;
}

const GetNewsClientComponent: React.FC = () => {
  const [news, setNews] = useState<MainNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNews(2, 1);
        setNews(newsData.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <SpinnersPrimary />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 items-center justify-center mb-20">
      <ul>
        <li>
          <div className="flex flex-row gap-10 items-center justify-center m-2">
            {!news.length ? (
              <p className="text-tertiary w-full text-center text-3xl">
                No se encontraron noticias.
              </p>
            ) : (
              news.map(({ id, title, href, date, primaryImage }) => (
                <div
                  key={id}
                  className="h-96 w-80 list-none rounded-3xl shadow-3xl transition-all hover:shadow-4xl my-10"
                >
                  <a href={`/news/DinamicNew/${id}`}>
                    <img src={primaryImage} alt="imagen" className="h-80 w-80 object-cover" />
                    <img
                      src={rectangle.src}
                      alt="fondo card"
                      className="relative bottom-80 z-0"
                    />
                    <div className="relative bottom-[32rem] z-20">
                      <div className="m-9">
                        <h6 className="font-semibold">{title}</h6>
                        <div className="flex">
                          <img src={calendarIcon.src} alt="icono calendario" />
                          <p className="font-semibold m-1">
                            {format(new Date(date), "MMMM dd, yyyy, EEEE", { locale: es })}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end relative bottom-8 m-4">
                        <img src={cursorIcon.src} alt="icono cursor" />
                        <h6 className="font-semibold m-4">Ver detalles</h6>
                      </div>
                    </div>
                  </a>
                </div>
              ))
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GetNewsClientComponent;
