import Cookies from "js-cookie";

export async function postEvents(newsResponse:any): Promise<any> {
  try {
    const token = Cookies.get('token');

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

    const response = await fetch(`https://litro-ong.onrender.com/event/create`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear el evento", error);
    throw error; 
  }
} 
