export async function postSubscriptionClose(subId: string, userId: string): Promise<any> {
  try {
    const validSubId = subId;
    const validUserId = userId;

    console.log(validSubId);
    console.log(validUserId);
    const url = new URL('https://litro-ong.onrender.com/subs');
    url.searchParams.append('subId', validSubId.toString());
    url.searchParams.append('userId', validUserId.toString());

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cerrar la suscripción", error);
    throw error; 
  }
}