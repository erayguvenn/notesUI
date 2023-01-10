export async function GetAllNotes(token) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/note/`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}

export async function CreateNote(token, title, body){
  const response = await fetch(`${import.meta.env.VITE_API_URL}/note`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      title,
      body
    })
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}

export async function DeleteNote(token, id){
  const response = await fetch(`${import.meta.env.VITE_API_URL}/note/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}