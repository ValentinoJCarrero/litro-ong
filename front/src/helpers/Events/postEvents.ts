export async function postEvents(newsResponse:any): Promise<any> {
  try{const response = await fetch(`${import.meta.env.PUBLIC_API_LOCAL}/events`, {
    
    method: 'POST',
    body: JSON.stringify(newsResponse), 
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(import.meta.env.API_URL);
  console.log(newsResponse);
  const data = await response.json();
  console.log(data);
  return data;}
  catch{
    console.log("Error al crear el evento");
  }
} 
