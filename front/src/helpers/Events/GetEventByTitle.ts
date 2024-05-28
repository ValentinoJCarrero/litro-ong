export async function getEventByTitle(id: string): Promise<any> {
    try {
      const response = await fetch(`https://litro-ong.onrender.com/event/one/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error al buscar eventos con el título: ${id}`, error);
    }
  }