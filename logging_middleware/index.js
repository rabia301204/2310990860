const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYWJpYTA4NjAuYmUyM0BjaGl0a2FyYS5lZHUuaW4iLCJleHAiOjE3Nzc5NjA0MTMsImlhdCI6MTc3Nzk1OTUxMywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU0MDRhNDQzLThjZmUtNDg5Ni1iZjYwLTlhZWYzMGRkOTE1MCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhYmlhIiwic3ViIjoiNjAzMTI0YTItNzczYS00YTQ0LWIxZmItZGFkYzEzNDFlODQxIn0sImVtYWlsIjoicmFiaWEwODYwLmJlMjNAY2hpdGthcmEuZWR1LmluIiwibmFtZSI6InJhYmlhIiwicm9sbE5vIjoiMjMxMDk5MDg2MCIsImFjY2Vzc0NvZGUiOiJFWGZ2RHAiLCJjbGllbnRJRCI6IjYwMzEyNGEyLTc3M2EtNGE0NC1iMWZiLWRhZGMxMzQxZTg0MSIsImNsaWVudFNlY3JldCI6IlVEd0N6dlR1a2F1a3NVdVkifQ.YePqr8PaI29KTCsfTgiP4GLl1csJNn7V8vtZK5i0E9E"
async function Log(stack, level, packageName, message) {
  try {
    const response = await fetch(
      "http://20.207.122.201/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          stack: stack,
          level: level,
          package: packageName,
          message: message,
        }),
      }
    );
    const data = await response.json();
    console.log("✅ Log sent:", data);
    return data;
  } catch (error) {
    console.error("❌ Log failed:", error);
  }
}

module.exports = { Log };