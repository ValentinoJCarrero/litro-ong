export async function deleteNews(id:any): Promise<any> {
    fetch(`https://litro-ong.onrender.com/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la noticia');
          }
        })
        .catch(error => {
          console.error('Error al eliminar la noticia:', error);
        });
  } 