import React, { useEffect, useState } from 'react';
import { getNews } from '../../helpers/getNews';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import rectangle from '../../assets/rectangleCard.svg';
import calendarIcon from '../../assets/calendarIcon.svg';
import cursorIcon from '../../assets/cursorIcon.svg';

interface News {
  id: string;
  title: string;
  subtitle: string;
  primaryImage: string;
  secondaryImage?: string | null;
  tertiaryImage?: string | null;
  description: string;
  date: string;
}

const NewsForHome: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNews(100, 1);
        setNews(newsData.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return <div className="text-tertiary w-full text-center text-3xl">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500 w-full text-center text-3xl">Error: {error}</div>;
  }

  // Para hacerlo por fecha es el metodo comentado, pero como por ahora todas las que creo tienen la misma fecha, solo estoy dando vuelta el array 
  // const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // const latestNews = sortedNews.slice(0, 3);
  const latestNews = news.slice(-3).reverse();

  return (
    <div className="flex flex-col gap-12 items-center justify-center mb-20">
      <ul>
        <li>
          <div className="flex flex-row gap-10 items-center justify-center m-2">
            {latestNews.map(({ id, title, date, primaryImage }) => {
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
    </div>
  );
};

export default NewsForHome;