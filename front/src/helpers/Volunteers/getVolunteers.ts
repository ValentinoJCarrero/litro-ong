import Cookies from "js-cookie";
export async function getVolunteer(limit: number, page: number): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
  try {
    const validLimit = limit;
    const validPage = page;

    const url = new URL('https://litro-ong.onrender.com/volunteer/all');
    url.searchParams.append('limit', validLimit.toString());
    url.searchParams.append('page', validPage.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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