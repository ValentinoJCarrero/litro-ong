import Cookies from "js-cookie";
export async function deleteWorkshops(id:any): Promise<any> {

  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
    fetch(`https://litro-ong.onrender.com/workshop/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el taller');
          }
        })
        .catch(error => {
          console.error('Error al eliminar el taller:', error);
        });
  } 