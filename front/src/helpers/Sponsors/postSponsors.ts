export async function postSponsors(newsResponse:any): Promise<any> {
  console.log(newsResponse);
  try {
    console.log(newsResponse);
    const formData = new FormData();
    formData.append('name', newsResponse.name);
    formData.append('email', newsResponse.email);

    if (newsResponse.logo) formData.append('files', newsResponse.logo);

console.log(formData);
    const response = await fetch(`https://litro-ong.onrender.com/sponsor`, {
      method: 'POST',
      body: formData 
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear el sponsor", error);
    throw error; 
  }
} 
