export async function getNewsByTitle(title: string): Promise<any> {
    try {
      const response = await fetch(`https://litro-ong.onrender.com/news/${title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error al buscar noticias con el título: ${title}`, error);
    }
  }