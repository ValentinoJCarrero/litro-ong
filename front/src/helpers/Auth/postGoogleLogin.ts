import Cookies from "js-cookie";
export async function postGoogleLogin(data: any) {
  
    try {
      const response = await fetch("https://litro-ong.onrender.com/auth/googlesignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Failed to post Google login");
      }
  
      const token = await response.text();
      console.log(token);
      Cookies.set('token',token);
      return token;
    } catch (error) {
      console.error("Error en postGoogleLogin:", error);
      const tokenJson = { tokenUser: "no esta registrado" };
      return tokenJson;
    }
  }