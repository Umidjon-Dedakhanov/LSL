function authHeaders() {
  const token = localStorage.getItem("user-token-start");
  if(token)return `${token}`
  return
}

export default authHeaders;