export const saveProfile = (profile: any) => {
  localStorage.setItem("profile-data", JSON.stringify(profile));
};

export const getProfile = () => {
  const data = localStorage.getItem("profile-data");
  return data ? JSON.parse(data) : null;
};
