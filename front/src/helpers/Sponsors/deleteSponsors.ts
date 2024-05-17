export async function deleteSponsors(id:any): Promise<any> {
    fetch(`https://litro-ong.onrender.com/sponsor/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la esponsor');
          }
          console.log('Noticia eliminada con éxito');

        })
        .catch(error => {
          console.error('Error al eliminar el esponsor:', error);
        });
  } 