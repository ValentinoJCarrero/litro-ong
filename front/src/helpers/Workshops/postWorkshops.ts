import Cookies from "js-cookie";
export async function postWorkshops(newsResponse: any): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
  try {
    const formData = new FormData();
    formData.append('name', newsResponse.name);
    formData.append('teacher', newsResponse.teacher);
    formData.append('teacherPhone', newsResponse.teacherPhone);
    formData.append('timeStart', newsResponse.timeStart);
    formData.append('duration', newsResponse.duration);
    formData.append('dateEnd', newsResponse.dateEnd);
    formData.append('dateStart', newsResponse.dateStart);
    formData.append('cost', newsResponse.cost);
    newsResponse.days.forEach((day: string) => formData.append('days', day));
    formData.append('description', newsResponse.description);

    if (newsResponse.photo) formData.append('files', newsResponse.photo);

    const response = await fetch(`https://litro-ong.onrender.com/workshop`, {
      method: 'POST',
      body: formData,
       headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear el taller", error);
    throw error; 
  }
}