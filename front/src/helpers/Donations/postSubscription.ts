export async function postSubscription(newsResponse: any): Promise<any> {
  console.log(newsResponse);
  try {
    const response = await fetch(`https://litro-ong.onrender.com/subs/create`, {
      method: 'POST',
      body: JSON.stringify({ email: newsResponse }), // Envía el correo electrónico como un objeto JSON
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar la subscripción", error);
    throw error; 
  }
}