export async function subscribeEmail(email: string): Promise<any> {
  try {
    console.log("Enviando solicitud de suscripción con el correo:", email);
    const response = await fetch(`https://litro-ong.onrender.com/externalUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    console.log("Respuesta recibida del servidor:", response);

    const responseText = await response.text();
    console.log("Texto de la respuesta:", responseText);

    if (response.ok) {  // Use response.ok instead of checking for status 200
      return { success: true, message: responseText };
    } else {
      console.error("Error en la solicitud:", responseText);
      return { success: false, message: responseText };
    }
  } catch (error: any) {
    console.error("Error al suscribirse:", error);
    return { success: false, message: error.message };
  }
}
