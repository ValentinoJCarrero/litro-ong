import Cookies from "js-cookie";
export async function getProposalsById(id: string): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
    try {
      const response = await fetch(`https://litro-ong.onrender.com/proposals/${id}`, {
        method: 'GET',
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