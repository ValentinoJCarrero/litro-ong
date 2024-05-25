export async function deleteEvents(id:any): Promise<any> {
    fetch(`https://litro-ong.onrender.com/events/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el evento');
          }
          console.log('Noticia eliminada con éxito');
        })
        .catch(error => {
          console.error('Error el evento:', error);
        });
  } 