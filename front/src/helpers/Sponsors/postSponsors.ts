export async function postSponsors(newsResponse:any): Promise<any> {
  console.log(newsResponse);
  try {
    console.log(newsResponse);
    const formData = new FormData();
    formData.append('name', newsResponse.name);
    formData.append('email', newsResponse.email);

    if (newsResponse.logo) formData.append('files', newsResponse.logo);

console.log(formData);
    const response = await fetch(`${import.meta.env.PUBLIC_API_LOCAL}/sponsor`, {
      method: 'POST',
      body: formData 
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear l sponsor", error);
    throw error; 
  }
} 
