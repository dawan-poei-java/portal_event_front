export const isTokenExpired = () => {
  const expiration = sessionStorage.getItem("expiresAt");

  if (!expiration) {
    return true;
  } else {
    return new Date(expiration) < new Date();
  }
};
