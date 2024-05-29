
import Cookies from "js-cookie";
export async function postBenefits(newsResponse: any): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
  try {
    const formData = new FormData();
    formData.append('name', newsResponse.name);
    formData.append('address', newsResponse.address);
    formData.append('benefits', newsResponse.benefits);
    formData.append('benefitEndDate', newsResponse.benefitEndDate);
    formData.append('description', newsResponse.description);

    if (newsResponse.logo) formData.append('files', newsResponse.logo);

console.log(formData);
    const response = await fetch(`https://litro-ong.onrender.com/benefit`, {
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
    console.error("Error al crear la noticia", error);
    throw error; 
  }
}