export async function postLogin(newsResponse: any): Promise<any> {
  try {
      const response = await fetch(`https://litro-ong.onrender.com/auth/signin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newsResponse) 
      });

      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
  } catch (error) {
      console.error("Error al logear el usuario", error);
      throw error;
  }
}