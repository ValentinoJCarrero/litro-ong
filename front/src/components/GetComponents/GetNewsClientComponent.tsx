import React, { useEffect, useState } from "react";
import { getNews } from "../../helpers/getNews";
import rectangle from  "../../assets/rectangleCard.svg";
import calendarIcon from  "../../assets/calendarIcon.svg";
import cursorIcon from  "../../assets/cursorIcon.svg";
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

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews();
      setNews(newsData);
    };
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col gap-12 items-center justify-center mb-20">
        <ul>

      
        <li>
      <div className="flex flex-row gap-10 items-center justify-center m-2">
        {!news.length ? (
                <p className="text-tertiary w-full text-center text-3xl">No hay noticias disponibles por ahora.</p>
            ) : (news.map(({id, title, href, date, primaryImage}) => (
<div key={id}  className="h-[25rem] w-[25rem] list-none rounded-3xl shadow-3xl hover:shadow-4xl">
<a href={`/news/DinamicNew/${title}`}>
    <img src={primaryImage} alt="imagen" />
    <img src={rectangle.src} alt="fondo card" className="relative bottom-80 z-0"/>
    <div className="relative bottom-[32rem] z-20">
      <div className="m-9">
        <h6 className="font-semibold">{title}</h6>
        <div className="flex">
          <img src={calendarIcon.src} alt="icono calendario"/>
          <p className="font-semibold m-1">{date}</p>
        </div>
      </div>
      <div className="flex justify-end relative bottom-8 m-4">
        <img src={cursorIcon.src} alt="icono cursor"/>
        <h6 className="font-semibold m-4">Ver detalles</h6>
      </div>
    </div>
  </a>
</div>
        )))}
      </div>
         </li> </ul>
    </div>
  );
};

export default GetNewsClientComponent;


