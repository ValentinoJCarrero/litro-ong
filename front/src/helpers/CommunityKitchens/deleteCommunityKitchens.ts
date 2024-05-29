import Cookies from "js-cookie";
export async function deleteCommunityKitchens(id:any): Promise<any> {
  const token = Cookies.get('token');
    fetch(`https://litro-ong.onrender.com/communityKitchens/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la merenderos');
          }

        })
        .catch(error => {
          console.error('Error al eliminar la merenderos:', error);

        });
  } 