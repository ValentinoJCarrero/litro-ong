export async function getVolunteer(limit: number, page: number): Promise<any> {

  try {
    const validLimit = limit;
    const validPage = page;

    const url = new URL('https://litro-ong.onrender.com/volunteer/all');
    url.searchParams.append('limit', validLimit.toString());
    url.searchParams.append('page', validPage.toString());

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
    console.error("Error al traer a los voluntarios", error);
    throw error; 
  }
}