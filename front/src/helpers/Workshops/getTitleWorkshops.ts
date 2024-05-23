export async function getWorkshopsByTitle(id: string): Promise<any> {
    try {
      const response = await fetch(`http://localhost:3000/workshop/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error al buscar noticias con el título: ${id}`, error);
    }
  }