export async function postSubscription(newsResponse: any): Promise<any> {
    try {
  
      const response = await fetch(`https://litro-ong.onrender.com/news`, {
        method: 'POST',
        body: JSON.stringify(newsResponse)
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