export async function postRegister(newsResponse: any): Promise<any> {
  try {
      const response = await fetch(`https://litro-ong.onrender.com/auth/signup`, {
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
      return data;
  } catch (error) {
      console.error("Error al registrar el usuario", error);
      throw error;
  }
}