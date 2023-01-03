export async function Login(email, password) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}

export async function Register(name, surname, email, password) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
      }),
    }
  );

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}
