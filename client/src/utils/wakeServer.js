export async function wakeServer(retries = 3, delay = 2000) {
  const url = import.meta.env.VITE_API_BASE_URL + "/status";

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (err) {}

    if (i < retries - 1) {
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  return false;
}
