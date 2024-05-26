export async function postAddVolunteer(id:any, newsResponse:any): Promise<any> {
    console.log(id);
    console.log(newsResponse);
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
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al crear la noticia", error);
      throw error; 
    }
  } 
  