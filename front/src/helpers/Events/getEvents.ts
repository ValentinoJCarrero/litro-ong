
export async function getEvents(): Promise<any> {
    try{const response = await fetch(`${import.meta.env.PUBLIC_API_LOCAL}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();

    console.log(data);
    return data;}
    catch{
      console.log("Error al traer el evento");
    }
  } 
