export async function postLogin(newsResponse: any): Promise<any> {
  try {
      const response = await fetch(`https://litro-ong.onrender.com/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsResponse),
      });
  
      if (!response.ok) {
        throw new Error("Failed to post Google login");
      }
  
      const token = await response.text();
      const tokenJson = { tokenUser: token };
      return tokenJson;
    } catch (error) {
      console.error("Error en postGoogleLogin:", error);;
    }
}