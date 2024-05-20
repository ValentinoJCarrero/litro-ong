import React, { useEffect, useState } from "react";
import { getNews } from "../../helpers/getNews";
import iconNews from "../../assets/logoOG.png";
import vectorIcon from "../../assets/vectorIcon.svg";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import SpinnersDelete from "../Spinners/SpinnersDelete";
import { deleteNews } from "../../helpers/deleteNews";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
interface NewsItem {
  primaryImage: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  href: string;
  id: number;
}

const NewsComponent = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews();
      setNews(newsData);
      setIsLoading(false);
    };
    fetchNews();
  }, []);

  const onClic = async (id: any): Promise<void> => {
    console.log("Eliminando noticia con ID:", id);
    setDeletingId(id);
    setIsDeleting(true);

    await deleteNews(id);

    setTimeout(() => {
      setNews(news.filter((item) => item.id !== id));
      setIsDeleting(false);
      setDeletingId(null);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center h-full">
      {isLoading ? (
        <div className="flex items-center justify-center">
        <SpinnersPrimary />
        </div>
      ) : !news.length ? (
        <NotFound />
      ) : (
        <ul className="overflow-auto h-[22rem] w-full">
          {news.map(({ primaryImage, title, subtitle, date, location, id }) => (
            <>
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between pr-10 items-center"
              >
                <a
                  className="flex flex-row justify-between p-10 items-center text-sm w-full"
                  id={`card${id}`}
                  href={`/news/DinamicNew/${title}`}
                >
                  <div className="flex">
                    <img
                      src={primaryImage}
                      alt={title}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h6 className="text-tertiary text-base font-semibold">
                        {title}
                      </h6>
                      <p>{subtitle}</p>
                      <p>{date}</p>
                    </div>
                  </div>
                  <div>
                    <p>{location}</p>
                  </div>
                  <img src={vectorIcon.src} alt="icono de vector" />
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
              <hr />
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsComponent;
