export async function getCommunityKitchensTitle(title: string): Promise<any> {
    try {
      const response = await fetch(`https://litro-ong.onrender.com/communityKitchens/${title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error al buscar merenderos con el título: ${title}`, error);
    }
  }