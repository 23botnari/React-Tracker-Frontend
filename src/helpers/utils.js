export const formatDate = (dateObj) => {
  const date = new Date(dateObj);

  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};
