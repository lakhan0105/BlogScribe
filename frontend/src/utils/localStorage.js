export const addUserLS = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export function removeUserLS() {
  localStorage.removeItem("user");
}

export function getUserLS() {
  const result = JSON.parse(localStorage.getItem("user"));
  const user = result ? result : null;
  return user;
}
