import Cookies from "js-cookie";
export async function deleteVolunteer(id:any): Promise<any> {
  const token = Cookies.get('token');
    fetch(`https://litro-ong.onrender.com/volunteer/removeVolunteer/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar al voluntario');
          }
          console.log('Voluntario eliminado con éxito');

        })
        .catch(error => {
          console.error('Error al eliminar al voluntario:', error);

        });
  } 