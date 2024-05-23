export async function getWorkshopsByTitle(title: string): Promise<any> {
    try {
      const response = await fetch(`http://localhost:3000/workshop/${title}`, {
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