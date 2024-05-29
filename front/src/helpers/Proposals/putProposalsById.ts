import Cookies from "js-cookie";
export async function putProposalsById(id: string, newsResponse: any): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
    const url= new URL(`https://litro-ong.onrender.com/proposals/${id}`);
    url.searchParams.append('status', newsResponse.toString());
    
    try {
      const response = await fetch(url.toString(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error al buscar propuesta con el id: ${id}`, error);
    }
  }