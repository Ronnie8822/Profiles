export const saveProfile = (data: any) => {
  localStorage.setItem("profile-data", JSON.stringify(data));
};

export const getProfile = () => {
  const data = localStorage.getItem("profile-data");
  return data ? JSON.parse(data) : null;
};

export const clearProfile = () => {
  localStorage.removeItem("profile-data");
};
