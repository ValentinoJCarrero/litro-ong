export async function postProposals(id:any, newsResponse: any): Promise<any> {
  try {
    console.log(id);
    console.log(newsResponse);
    const url= new URL(`https://litro-ong.onrender.com/proposals`);
    url.searchParams.append('userId', id.toString());
         
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsResponse)
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear la propuesta", error);
    throw error; 
  }
}