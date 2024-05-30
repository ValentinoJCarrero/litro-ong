import Cookies from "js-cookie";
export async function getVolunteersByID(idDecodificado: string): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
  try {
    const response = await fetch(
      `https://litro-ong.onrender.com/users/${idDecodificado}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al traer voluntario", error);
    throw error;
  }
}
