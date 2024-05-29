import Cookies from "js-cookie";
export async function postVolunteers(userId: string, volunteerData: any): Promise<any> {
  const tokenData = Cookies.get('token');
  let token = '';

if (tokenData) {
  const tokenObject = JSON.parse(tokenData); 
  token = tokenObject.token; 
}
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: jsonBody,
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    } 
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al asignar nuevo voluntario", error);
    throw error;
  }
}