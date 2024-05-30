export async function unsubscribeEmail(email: string): Promise<any> {
  try {
    console.log("Enviando solicitud de cancelación de suscripción con el correo:", email);
    const response = await fetch(`https://litro-ong.onrender.com/mailer/unsubscribe`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }) 
    });

    console.log("Respuesta recibida del servidor:", response);

    // Leer la respuesta como texto
    const responseText = await response.text();
    console.log("Texto de la respuesta:", responseText);

    if (response.ok) {
      // Suponiendo que el mensaje "La desuscripción fue exitosa" se recibe cuando es exitoso
      if (responseText.includes("La desuscripción fue exitosa")) {
        return { success: true, message: responseText };
      } else {
        return { success: false, message: responseText };
      }
    } else {
      console.error("Error en la solicitud:", responseText);
      return { success: false, message: responseText };
    }
  } catch (error: any) {
    console.error("Error al darse de baja:", error);
    return { success: false, message: error.message };
  }
}
