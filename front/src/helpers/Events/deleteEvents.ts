export async function deleteEvents(id:any): Promise<any> {
    fetch(`${import.meta.env.PUBLIC_API_LOCAL}/events/${id}`, {
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