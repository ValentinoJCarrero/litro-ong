export async function deleteProposals(id:any): Promise<any> {
    fetch(`https://litro-ong.onrender.com/proposals/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la propuesta');
          }

        })
        .catch(error => {
          console.error('Error al eliminar la propuesta:', error);

        });
  } 