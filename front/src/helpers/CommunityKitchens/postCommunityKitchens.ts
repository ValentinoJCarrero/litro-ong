export async function postCommunityKitchens(newsResponse: any): Promise<any> {
  try {
    console.log(newsResponse);

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
      body: formData 
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear la merenderos", error);
    throw error; 
  }
}