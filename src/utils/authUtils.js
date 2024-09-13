export const isAuthenticated = () => {
  // Vérifiez la présence du token dans localStorage
  return !!localStorage.getItem("token");
};
