export async function signin(credentials) {
    console.log(credentials);
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const body = await response.json();
      
      if (response.ok) {
        const user = await response.json();
        console.log(user);
      } else {
        if (body) {
          throw body;
        } else {
          throw new Error("Error connection");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function signup(values) {
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        body: values,
      });
      const body = await response.json();
      if (response.ok) {
        return body;
      } else {
        if (body) {
          throw body;
        } else {
          throw new Error("Error register");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function getUser(id) {
    const response = await fetch(`http://localhost:8000/getUser/${id}`);
    return response.json();
  }

  export async function addAchievement(values) {
    try {
      const response = await fetch("http://localhost:8000/addAchievement", {
        method: "POST",
        body: values,
      });
      const body = await response.json();
      if (response.ok) {
        return body;
      } else {
        if (body) {
          throw body;
        } else {
          throw new Error("Error register");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  export async function updateProfile(formData, userId) {
    try {
      const response = await fetch(`http://localhost:8000/updateProfile/${userId}`, {
        method: "PUT",
        body: formData,
      });
  
      const body = await response.json();
  
      if (response.ok) {
        return body;
      } else {
        if (body) {
          throw body;
        } else {
          throw new Error("Error updating profile");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function getConnectedUser() {
    const response = await fetch("http://localhost:8000/getConnectedUser");
    const userC = await response.json();
    console.log(userC);
    return userC;
  }

  export async function signout () {
    await fetch("http://localhost:8000/logout");
    method: "DELETE"
  }

  