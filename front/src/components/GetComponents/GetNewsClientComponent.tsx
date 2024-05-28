import React, { useEffect, useState } from "react";
import { getNews } from "../../helpers/getNews";
import rectangle from "../../assets/rectangleCard.svg";
import calendarIcon from "../../assets/calendarIcon.svg";
import cursorIcon from "../../assets/cursorIcon.svg";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNews(3, page); 
        setNews(newsData.data);
        setTotalPages(Math.ceil(newsData.total / 3));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SpinnersPrimary />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!news.length) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-12 items-center justify-center mb-20">
      <ul>
        <li>
          <div className="flex flex-row gap-10 items-center justify-center m-2">
            {news.map(({ id, title, date, primaryImage }) => {
              const formattedDate = format(new Date(date), 'dd/MM/yyyy', { locale: es });
              return (
                <div
                  key={id}
                  className="h-96 w-96 list-none rounded-3xl shadow-3xl transition-all hover:shadow-4xl my-10 overflow-hidden"
                >
                  <a href={`/news/DinamicNew/${id}`} className="block h-full w-full">
                    <div className="relative h-full w-full">
                      <img src={primaryImage} alt="imagen" className="h-80 w-full object-cover" />
                      <img
                        src={rectangle.src}
                        alt="fondo card"
                        className="absolute bottom-0 w-full z-0"
                      />
                      <div className="absolute bottom-0 w-full z-20 p-4">
                        <h6 className="font-semibold">{title}</h6>
                        <div className="flex items-center">
                          <img src={calendarIcon.src} alt="icono calendario" className="mr-2" />
                          <p className="font-semibold">{formattedDate}</p>
                        </div>
                        <div className="flex justify-end items-center mt-4">
                          <img src={cursorIcon.src} alt="icono cursor" className="mr-2" />
                          <h6 className="font-semibold">Ver detalles</h6>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </li>
      </ul>
      <div className="flex items-center justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="mx-2 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Anterior
        </button>
        <span>{page} / {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="mx-2 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default GetNewsClientComponent;
