export const getAvatar = (name: string) => {
  return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
    name
  )}.svg`;
};
