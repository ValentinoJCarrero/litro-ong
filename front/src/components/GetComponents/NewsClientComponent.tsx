import React, { useEffect, useState } from "react";
import { getNews } from "../../helpers/getNews";
import vectorIcon from "../../assets/vectorIcon.svg";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import SpinnersDelete from "../Spinners/SpinnersDelete";
import { deleteNews } from "../../helpers/deleteNews";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import Swal from "sweetalert2";
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
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(3);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchNews = async (page: number) => {
      const newsData = await getNews(3, page);
      setNews(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total / 3));
      setIsLoading(false);
    };
    fetchNews(page);
  }, [page]);

  const onClic = async (id: any): Promise<void> => {
    Swal.fire({
      title: "Estas seguro/a de eliminar esta noticia?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009BDB",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeletingId(id);
        setIsDeleting(true);

        await deleteNews(id);

        setTimeout(() => {
          setNews(news.filter((item) => item.id !== id));
          setIsDeleting(false);
          setDeletingId(null);
        }, 1000);
        Swal.fire({
          title: "Eliminado!",
          text: "La noticia ha sido eliminada.",
          icon: "success",
        });
      }
    });
    console.log("Eliminando noticia con ID:", id);
  };

  return (
    <div className="flex flex-col flex-nowrap justify-between items-stretch p-4 h-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <SpinnersPrimary />
        </div>
      ) : message === "No se encontraron noticias en esta pagina" ? (
        <div className="flex items-center justify-center h-full">
          <NotFound />
        </div>
      ) : (
        
          <ul className=" w-full flex flex-col  ">
            {news.map(
              ({ primaryImage, title, subtitle, date, id }) => (
                <div className="">
                  <li
                    key={id}
                    className="flex flex-row my-3 flex-nowrap justify-between items-center"
                  >
                    <a
                      className="flex flex-row justify-between items-center  text-sm w-full"
                      id={`card${id}`}
                      href={`/news/DinamicNew/${title}`}
                    >
                      <div className="flex">
                        <img
                          src={primaryImage}
                          alt={title}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div className="text-sm  text-textParagraph">
                          <h6 className="text-tertiary text-base font-semibold">
                            {title}
                          </h6>
                          <div className="text-sm  text-textParagraph">
                            <p>{subtitle}</p>
                            <p>{date}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div className="flex flex-row justify-center gap-10">
                      <div className="w-40 flex justify-center ">
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

                      <img src={vectorIcon.src} alt="icono de vector" />
                    </div>
                  </li>
                  <hr />
                </div>
              )
            )}
          </ul>
        
      )}
          <div className="flex items-center justify-center flex-row w-full ">
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
    </div>
  );
};

export default NewsComponent;
