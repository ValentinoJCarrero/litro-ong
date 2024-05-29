import Cookies from "js-cookie";
export async function postAddVolunteer(id:any, newsResponse:any): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
  try {  
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", newsResponse);
  
  const response = await fetch(`https://litro-ong.onrender.com/event/addVolunteer/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al crear la noticia", error);
      throw error; 
    }
  } 
  