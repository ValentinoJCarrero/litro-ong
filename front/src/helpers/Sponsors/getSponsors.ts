
export async function getSponsors(): Promise<any> {
    try{const response = await fetch(`https://litro-ong.onrender.com/sponsor`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();

    console.log(data);
    return data;}
    catch{
      console.log("Error al crear el sponsor")
    }
  } 
