import Cookies from "js-cookie";
export async function deleteWorkshops(id:any): Promise<any> {
  const token = Cookies.get('token');
    fetch(`https://litro-ong.onrender.com/workshop/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
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