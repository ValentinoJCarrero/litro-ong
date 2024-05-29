import Cookies from "js-cookie";
export async function postProposals(id:any, newsResponse: any): Promise<any> {
  const token = Cookies.get('token');
  try {
    const url= new URL(`https://litro-ong.onrender.com/proposals`);
    url.searchParams.append('userId', id.toString());
         
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newsResponse)
    });
    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }  

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear la propuesta", error);
    throw error; 
  }
}