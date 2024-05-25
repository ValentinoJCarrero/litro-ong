export async function getVolunteersByID(idDecodificado: string): Promise<any> {
  try {
    const response = await fetch(
      `https://litro-ong.onrender.com/users/${idDecodificado}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al traer voluntario", error);
    throw error;
  }
}
