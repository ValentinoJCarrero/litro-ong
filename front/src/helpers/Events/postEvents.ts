export async function postEvents(newsResponse:any): Promise<any> {
  try {
    console.log(newsResponse);
    // Crear un objeto FormData
    const formData = new FormData();
    formData.append('title', newsResponse.title);
    formData.append('subtitle', newsResponse.subtitle);
    formData.append('description', newsResponse.description);
    formData.append('address', newsResponse.address);
    formData.append('date', newsResponse.date);
    formData.append('timeStart', newsResponse.timeStart);
    formData.append('timeEnd', newsResponse.timeEnd);

    if (newsResponse.primaryImage) formData.append('files', newsResponse.primaryImage);
    if (newsResponse.secondaryImage) formData.append('files', newsResponse.secondaryImage);

console.log(formData);
    const response = await fetch(`https://litro-ong.onrender.com/event/create`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear la noticia", error);
    throw error; 
  }
} 
