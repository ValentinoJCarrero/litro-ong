import Cookies from "js-cookie";
export async function postAddVolunteer(id:any, newsResponse:any): Promise<any> {
  try {  
    const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
    const requestBody = {
      title: newsResponse
    };
    
  const response = await fetch(`https://litro-ong.onrender.com/event/addVolunteer/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(requestBody),
  });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al crear la noticia", error);
      throw error; 
    }
  } 
  