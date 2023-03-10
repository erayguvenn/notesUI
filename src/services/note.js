// Tokeni ve aranılacak kelimeyi alıp notları çeken fonksiyonu yazıyoruz.
export async function GetAllNotes(token, searchQuery) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/note?search=${searchQuery}`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}

// Tokeni, not başlığını ve not içeriğini alıp not oluşturan fonksiyonu yazıyoruz.
export async function CreateNote(token, title, body) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/note`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body
    })
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}

// Tokeni ve not id'sini alıp notu silen fonksiyonu yazıyoruz.
export async function DeleteNote(token, id) {
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

// Tokeni, not id'sini, not başlığını ve not içeriğini alıp notu güncelleyen fonksiyonu yazıyoruz.
export async function UpdateNote(token, id, title, body) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/note/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body
    })
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}