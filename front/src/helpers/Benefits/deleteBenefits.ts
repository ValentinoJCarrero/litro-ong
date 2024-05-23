export async function deleteBenefits(id:any): Promise<any> {
    fetch(`https://litro-ong.onrender.com/benefit/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la noticia');
          }
          console.log('Noticia eliminada con éxito');

        })
        .catch(error => {
          console.error('Error al eliminar la noticia:', error);

        });
  } 