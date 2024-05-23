export async function postVolunteers(id: any, formData: any): Promise<any> {
  try {
    

    const response = await fetch(`https://litro-ong.onrender.com/volunteer/${id}`, {
      method: 'POST',
      body: formData 
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear voluntario", error);
    throw error; 
  }
}