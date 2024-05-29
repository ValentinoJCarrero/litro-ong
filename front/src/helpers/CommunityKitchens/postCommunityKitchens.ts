import Cookies from "js-cookie";
export async function postCommunityKitchens(newsResponse: any): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';
  
if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
  console.log(token);
}
  try {
    const formData = new FormData();
    formData.append('name', newsResponse.name);
    formData.append('holder', newsResponse.holder);
    formData.append('address', newsResponse.address);
    formData.append('kidsNumber', newsResponse.kidsNumber.toString());
    formData.append('description', newsResponse.description);
    formData.append('time', newsResponse.time);
    newsResponse.days.forEach((day: string) => formData.append('days', day));

    if (newsResponse.photo) formData.append('files', newsResponse.photo);

console.log(formData);
    const response = await fetch(`https://litro-ong.onrender.com/communityKitchens`, {
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
    console.error("Error al crear la merenderos", error);
    throw error; 
  }
}