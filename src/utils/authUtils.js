export const isTokenExpired = () => {
  const expiration = localStorage.getItem("expiresAt");

  if (!expiration) {
    return true;
  } else {
    return new Date(expiration) < new Date();
  }
};
