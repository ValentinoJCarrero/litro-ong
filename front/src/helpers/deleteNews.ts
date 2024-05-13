export async function deleteNews(id:any): Promise<any> {
    fetch(`${import.meta.env.PUBLIC_API_URL}/news/${id}`, {
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
          // Realiza cualquier otra acción necesaria después de eliminar la noticia
        })
        .catch(error => {
          console.error('Error al eliminar la noticia:', error);
          // Maneja el error de acuerdo a tus necesidades
        });
  } 