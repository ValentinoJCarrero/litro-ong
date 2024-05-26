export async function postProposals(newsResponse: any): Promise<any> {
  try {
    console.log(newsResponse);

    const formData = new FormData();
    formData.append('title', newsResponse.title);
    formData.append('description', newsResponse.description);

console.log(formData);
    const response = await fetch(`https://litro-ong.onrender.com/proposals`, {
      method: 'POST',
      body: formData 
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear la propuesta", error);
    throw error; 
  }
}