const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function fetchPlatformStats() {
  const response = await fetch(`${API_BASE_URL}/api/stats/platform`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = await response.json();

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Failed to fetch platform stats");
  }

  return payload.data;
}
