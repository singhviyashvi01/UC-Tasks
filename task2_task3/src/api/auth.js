import Cookies from "js-cookie";

const BASE = "https://task4-authdb.onrender.com/auth";

export async function registerUser(data) {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!json.error) {
    // Store username for profile display
    localStorage.setItem("signupUsername", data.username || data.name || "");
    localStorage.setItem("signupName", data.name || "");
  }
  return json;
}

  export async function loginUser(data) {
    const res = await fetch(`${BASE}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.token) {
          // Store login details for profile page
          localStorage.setItem("loginEmail", data.email);
        }
        return json;
      }

export async function fetchMe() {
        const token = Cookies.get("token");
   const res = await fetch(`${BASE}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      return res.json(); 
      }

      export async function getMe() {
        const token = Cookies.get("token"); 
        const res = await fetch(`${BASE}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
     return data.user;

      }

      export async function getAllUsers() {
        const token = Cookies.get("token");
        const res = await fetch(`${BASE}/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        const data = await res.json();
        return data.users; 
      }
