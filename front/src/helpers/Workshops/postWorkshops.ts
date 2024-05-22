export async function postWorkshops(newsResponse: any): Promise<any> {
  try {
    console.log(newsResponse);

    const formData = new FormData();
    formData.append('name', newsResponse.name);
    formData.append('teacher', newsResponse.teacher);
    formData.append('teacherPhone', newsResponse.teacherPhone);
    formData.append('timeStart', newsResponse.timeStart);
    formData.append('duration', newsResponse.duration);
    formData.append('dateEnd', newsResponse.dateEndv);
    formData.append('dateStart', newsResponse.dateStart);
    formData.append('cost', newsResponse.cost);
    formData.append('days', newsResponse.days);
    formData.append('description', newsResponse.description);

    //if (newsResponse.primaryImage) formData.append('files', newsResponse.primaryImage);
console.log(formData);
    const response = await fetch(`https://litro-ong.onrender.com/workshop`, {
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