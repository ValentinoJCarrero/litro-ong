
export async function getNews(): Promise<any> {
    try{const response = await fetch(`${import.meta.env.API_URL}/news`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();

    console.log(data);
    return data;}
    catch{
      console.log("holis");
    }
  } 
