import Cookies from "js-cookie";
export async function postSponsors(newsResponse:any): Promise<any> {
  try {
    const token = Cookies.get('token');
    const formData = new FormData();
    formData.append('name', newsResponse.name);
    formData.append('email', newsResponse.email);

    if (newsResponse.logo) formData.append('files', newsResponse.logo);

    const response = await fetch(`https://litro-ong.onrender.com/sponsor`, {
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
    return data;
  } catch (error) {
    console.error("Error al crear el sponsor", error);
    throw error; 
  }
} 
