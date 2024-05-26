export async function getProposals(limit: number, page: number, status: string): Promise<any> {

  try {
    const validLimit = limit;
    const validPage = page;

    const url = new URL('https://litro-ong.onrender.com/proposals');
    url.searchParams.append('limit', validLimit.toString());
    url.searchParams.append('page', validPage.toString());
    url.searchParams.append('filter', status.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log("esto es data", data);
    return data;
  } catch (error) {
    console.error("Error al traer las propuestas", error);
    throw error; 
  }
}