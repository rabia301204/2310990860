export async function Log(level, packageName, message) {
  try {
    const response = await fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stack: "frontend",
        level: level,
        package: packageName,
        message: message,
      }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Log failed:", error)
  }
}

export async function getAuthHeaders() {
  const res = await fetch("/api/auth")
  const data = await res.json()
  return {
    Authorization: `Bearer ${data.token}`,
  }
}