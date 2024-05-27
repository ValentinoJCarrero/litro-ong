export async function putProposalsById(id: string, newsResponse: any): Promise<any> {

    const url= new URL(`https://litro-ong.onrender.com/proposals/${id}`);
    url.searchParams.append('status', newsResponse.toString());
    
    try {
      const response = await fetch(url.toString(), {
        method: 'PUT',
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