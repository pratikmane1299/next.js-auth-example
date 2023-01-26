import axios from "axios";

export function getAvatarUrl(
  data: string,
  { uppercase = true, round = true, bold = false } = {}
) {
  // TODO: Save image in storage bucket...
  const url = `${process.env.GENERATE_AVATAR_URL}?name=${data}&rounded=${round}&bold=${bold}&uppercase=${uppercase}`;
  return url;
}
