//! este es propio

// export async function postHorarioVoluntario(formDatas: any): Promise<any> {
//   try {
//     console.log(formDatas.availableDays);

//     const formDataContainer = new FormData();

//     formDataContainer.append("startHours", formDatas.startHours);
//     formDataContainer.append("endHours", formDatas.endHours);

//     formDatas.availableDays.forEach((availableDay: string) => formDataContainer.append("availableDays", availableDay));

  
//     console.log(formDataContainer);
//     const response = await fetch(`https://litro-ong.onrender.com/volunteer/`, {
//       method: "POST",
//       body: formDataContainer,
//     });

//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error al crear el horario del Voluntario", error);
//     throw error;
//   }
// }
