export async function getProposalsById(id: string): Promise<any> {
    try {
      const response = await fetch(`https://litro-ong.onrender.com/proposals/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error al buscar propuesta con el id: ${id}`, error);
    }
  }