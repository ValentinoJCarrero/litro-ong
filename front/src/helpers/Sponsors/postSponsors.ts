import Cookies from "js-cookie";
export async function postSponsors(newsResponse:any): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
  try {
    
    const formData = new FormData();
    formData.append('name', newsResponse.name);
    formData.append('email', newsResponse.email);

    if (newsResponse.logo) formData.append('files', newsResponse.logo);

    const response = await fetch(`https://litro-ong.onrender.com/sponsor`, {
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
    console.error("Error al crear el sponsor", error);
    throw error; 
  }
} 
