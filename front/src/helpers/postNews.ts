export async function postNews(newsResponse: any): Promise<any> {
  try {
    console.log(newsResponse);
    // Crear un objeto FormData
    const formData = new FormData();
    formData.append('title', newsResponse.title);
    formData.append('subtitle', newsResponse.subtitle);
    formData.append('description', newsResponse.description);

    // Añadir imágenes si están presentes
    if (newsResponse.primaryImage) formData.append('files', newsResponse.primaryImage);
    if (newsResponse.secondaryImage) formData.append('files', newsResponse.secondaryImage);
    if (newsResponse.tertiaryImage) formData.append('files', newsResponse.tertiaryImage);
console.log(formData);
    const response = await fetch(`https://litro-ong.onrender.com/news`, {
      method: 'POST',
      body: formData // Utiliza FormData en lugar de JSON.stringify
      // No necesitas establecer 'Content-Type' al usar FormData
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear la noticia", error);
    throw error; // Lanza el error para manejarlo en el llamado
  }
}