export async function getWorkshops(limit: number, page: number): Promise<any> {
  console.log(page);
  console.log(limit);
  try {
    const validLimit = limit;
    const validPage = page;

    const url = new URL('https://litro-ong.onrender.com/workshop');
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
    console.error("Error al traer el taller", error);
    throw error; 
  }
}