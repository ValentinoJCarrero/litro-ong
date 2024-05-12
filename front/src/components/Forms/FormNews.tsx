
import { ValidateFormsNews} from "../../middlewares/ValidateFormsNews";

import { useEffect, useState } from "react";
import type {FormEvent, MouseEventHandler} from "react"

interface DataNews {
    title: string;
    subtitle: string;
    primaryImage: File | null;
    secondaryImage: File | null; // Corrección: "secondaryImage" en lugar de "secundaryImage"
    tertiaryImage: File | null;
    description: string;
  }
  
  export default function FormNews() {
    const [newsData, setNewsData] = useState<DataNews>({
      title: "",
      subtitle: "",
      primaryImage: null,
      secondaryImage: null,
      tertiaryImage: null,
      description: ""
    });
    
    const [newsErrorData, setNewsErrorData] = useState({
      title: "",
      subtitle: "",

      description: ""
    });
  
    useEffect(() => {
      const errors = ValidateFormsNews(newsData);
      setNewsErrorData(errors);
    }, [newsData]);
  
    const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        const inputElement = event.currentTarget as HTMLInputElement;
        const files = inputElement.files;
    
        if (files && files.length > 0) {
            // Aquí puedes trabajar con los archivos seleccionados
            const primaryImage = files[0]; // Suponiendo que solo estás interesado en el primer archivo
            setNewsData({ ...newsData, [name]: primaryImage });
        } else {
            // Si no hay archivos seleccionados, actualiza el valor normalmente
            setNewsData({ ...newsData, [name]: value });
        }
    };
  
    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
      event.preventDefault();
      console.log(newsData);
    };

    return(

        <form className="text-sm text-textParagraph h-full" method="POST">
        <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Titulo</label>
            <input type="text" name="title" placeholder="Titulo de la noticia" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" onChange={handleOnChange}/>
            <p>{newsErrorData.title}</p>

        </div>
        <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">Subtitulo</label>
            <input type="text" name="subtitle" placeholder="Subtitulo de la noticia" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" onChange={handleOnChange}/>
            <p></p>
            
        </div>
        <div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Foto Principal</label>
            <input type="file" name="primaryImage" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" onChange={handleOnChange}/>
            <p></p>
        </div>
        <div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Foto secundaria 1</label>
            <input type="file" name="secondaryImage" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" onChange={handleOnChange}/>
            <p></p>
        </div>
        <div className="flex flex-col">
            <label htmlFor="image" className="font-medium my-2 ">Foto secundaria 2</label>
            <input type="file" name="tertiaryImage" className="rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" onChange={handleOnChange}/>
            <p></p>
        </div>
        <div className="flex flex-col h-1/3">
            <label htmlFor="description" className="font-medium my-2 " >Descripcion</label>
            <input type="text" name="description" placeholder="Describe la noticia" className="h-full rounded-md boder-backgroundGrey border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary" onChange={handleOnChange}/>
            <p></p>
        </div>
        <div className="my-3 w-full flex justify-end">
            <a href="/dashboardAdmin" className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6">
                Anterior
                </a>
            <button type="submit" className="bg-primary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap" onClick={handleSubmit}>Agregar</button>
        </div>
    </form>
    )
}
