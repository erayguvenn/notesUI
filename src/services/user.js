export async function GetUser(token) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}
