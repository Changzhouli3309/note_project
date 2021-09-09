const AuthService = {
  register: async (user) => {
    try {
      const res = await fetch("/user/register", {
        method: "post",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return { error: error };
    }
  },
  login: async (user) => {
    try {
      const res = await fetch("/user/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status !== 401) {
        const data = await res.json();
        return data;
      } else {
        return {
          isAuthenticated: false,
          user: { _id: null, username: "" },
          message: { msgBody: "Unauthorized", msgError: true },
        };
      }
    } catch (error) {
      return { error: error };
    }
  },
  isAuthenticated: async () => {
    try {
      const res = await fetch("/user/authenticated");
      if (res.status !== 401) {
        const data = await res.json();
        return data;
      } else {
        return {
          isAuthenticated: false,
          user: { _id: null, username: "" },
          message: { msgBody: "Unauthorized", msgError: true },
        };
      }
    } catch (error) {
      return { error: error };
    }
  },
  logout: async () => {
    try {
      const res = await fetch("/user/logout");
      const data = await res.json();
      return data;
    } catch (error) {
      return { error: error };
    }
  },
};

export default AuthService;
