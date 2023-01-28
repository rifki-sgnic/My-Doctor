export const getChatTime = (date: any) => {
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = (today: any) => {
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${year}-${month}-${date}`;
};
