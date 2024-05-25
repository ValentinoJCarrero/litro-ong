export async function postVolunteers(userId: string, volunteerData: any): Promise<any> {
  try {
 
    const requestBody = {
      availableDays: volunteerData.availableDays,
      startHours: volunteerData.startHours,
      endHours: volunteerData.endHours
    };

    const jsonBody = JSON.stringify(requestBody);

    
    const response = await fetch(
      `https://litro-ong.onrender.com/volunteer/assign/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al asignar nuevo voluntario", error);
    throw error;
  }
}