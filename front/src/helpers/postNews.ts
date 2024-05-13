export async function postNews(newsResponse:any): Promise<any> {
  try{const response = await fetch(`https://litro-ong.onrender.com/news`, {
    
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
    console.log("holis");
  }
} 
