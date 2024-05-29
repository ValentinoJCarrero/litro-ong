import Cookies from "js-cookie";
export async function deleteEvents(id:any): Promise<any> {
  const token = Cookies.get('token');

    fetch(`https://litro-ong.onrender.com/events/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el evento');
          }
        })
        .catch(error => {
          console.error('Error el evento:', error);
        });
  } 