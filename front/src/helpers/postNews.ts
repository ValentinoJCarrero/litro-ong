export async function postNews(newsResponse: any): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('title', newsResponse.title);
    formData.append('subtitle', newsResponse.subtitle);
    formData.append('description', newsResponse.description);

    if (newsResponse.primaryImage) formData.append('files', newsResponse.primaryImage);
    if (newsResponse.secondaryImage) formData.append('files', newsResponse.secondaryImage);
    if (newsResponse.tertiaryImage) formData.append('files', newsResponse.tertiaryImage);

    const response = await fetch(`https://litro-ong.onrender.com/news`, {
      method: 'POST',
      body: formData 
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear la noticia", error);
    throw error; 
  }
}