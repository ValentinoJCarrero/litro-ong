
export async function getNews(): Promise<any> {
    try{const response = await fetch(`${import.meta.env.PUBLIC_API_LOCAL}/news`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();

    console.log(data);
    return data;}
    catch{
      console.log("Error al traer las noticia");
    }
  } 
