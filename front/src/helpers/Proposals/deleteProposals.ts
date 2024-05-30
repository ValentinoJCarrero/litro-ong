import Cookies from "js-cookie";
export async function deleteProposals(id:any): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
    fetch(`https://litro-ong.onrender.com/proposals/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la propuesta');
          }

        })
        .catch(error => {
          console.error('Error al eliminar la propuesta:', error);

        });
  } 