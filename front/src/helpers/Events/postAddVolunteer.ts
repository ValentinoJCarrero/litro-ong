export async function postAddVolunteer(id:any, newsResponse:any): Promise<any> {
  try {  
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", newsResponse);
  
  const response = await fetch(`https://litro-ong.onrender.com/event/addVolunteer/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al crear la noticia", error);
      throw error; 
    }
  } 
  