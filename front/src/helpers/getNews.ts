
export async function getNews(): Promise<any> {
    try{const response = await fetch(`https://litro-ong-2.onrender.com/news`, {
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
