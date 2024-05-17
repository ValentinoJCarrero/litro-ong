export async function postLogin(newsResponse: any): Promise<any> {
    try {
      
      const response = await fetch(`${import.meta.env.PUBLIC_API_LOCAL}/news`, {
        method: 'POST',
        body: newsResponse // Utiliza FormData en lugar de JSON.stringify
        // No necesitas establecer 'Content-Type' al usar FormData
      });
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al crear la noticia", error);
      throw error; // Lanza el error para manejarlo en el llamado
    }
  }