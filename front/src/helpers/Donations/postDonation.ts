interface IFormValues {
  fullName: string | undefined;
  email: string | undefined;
  amount: number | null;
}
export async function postDonations(newsResponse: IFormValues): Promise<any> {
console.log(newsResponse);
  try {

    const response = await fetch("https://litro-ong.onrender.com/mercadopago", {
      method: 'POST',
      body: JSON.stringify(newsResponse),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      const textData = await response.text();
      return { url: textData };
    }
  } catch (error) {
    console.error("Error al traer las donaciones", error);
    throw error; 
  }
}