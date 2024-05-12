
export async function postNews(newsResponse:any): Promise<any> {
  const response = await fetch(`${import.meta.env.API_URL}/news`, {
    method: 'POST',
    body: JSON.stringify(newsResponse), 
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(newsResponse);
  const data = await response.json();
  console.log(data);
  return data;
} 

