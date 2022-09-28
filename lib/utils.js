export const fetchData = async (query, variables = undefined) => {
  const response = await fetch(process.env.CMS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),

    method: "POST",
  });

  const data = await response.json();

  return data.data;
};
