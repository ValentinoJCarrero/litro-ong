export async function deleteWorkshops(id:any): Promise<any> {
    fetch(`https://litro-ong.onrender.com/workshop/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el taller');
          }
          console.log('Taller eliminado con éxito');
        })
        .catch(error => {
          console.error('Error al eliminar el taller:', error);
        });
  } 