const { Log } = require("./logging_middleware/index.js");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYWJpYTA4NjAuYmUyM0BjaGl0a2FyYS5lZHUuaW4iLCJleHAiOjE3Nzc5NjA0MTMsImlhdCI6MTc3Nzk1OTUxMywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU0MDRhNDQzLThjZmUtNDg5Ni1iZjYwLTlhZWYzMGRkOTE1MCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhYmlhIiwic3ViIjoiNjAzMTI0YTItNzczYS00YTQ0LWIxZmItZGFkYzEzNDFlODQxIn0sImVtYWlsIjoicmFiaWEwODYwLmJlMjNAY2hpdGthcmEuZWR1LmluIiwibmFtZSI6InJhYmlhIiwicm9sbE5vIjoiMjMxMDk5MDg2MCIsImFjY2Vzc0NvZGUiOiJFWGZ2RHAiLCJjbGllbnRJRCI6IjYwMzEyNGEyLTc3M2EtNGE0NC1iMWZiLWRhZGMxMzQxZTg0MSIsImNsaWVudFNlY3JldCI6IlVEd0N6dlR1a2F1a3NVdVkifQ.YePqr8PaI29KTCsfTgiP4GLl1csJNn7V8vtZK5i0E9E"

// Priority weights
function getWeight(type) {
  if (type === "Placement") return 300;
  if (type === "Result") return 200;
  if (type === "Event") return 100;
  return 0;
}

// Fetch notifications from API
async function fetchNotifications() {
  await Log("frontend", "info", "middleware", "Fetching notifications from server");

  const response = await fetch(
    "http://20.207.122.201/evaluation-service/notifications",
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  await Log("frontend", "info", "middleware", "Notifications fetched successfully");
  return data.notifications;
}

// Sort by priority (weight + recency)
function getPriorityInbox(notifications, topN = 10) {
  const scored = notifications.map((n) => {
    const weight = getWeight(n.Type);
    const recency = new Date(n.Timestamp).getTime();
    const score = weight * 1000000000000 + recency;
    return { ...n, score };
  });

  // Sort highest score first
  scored.sort((a, b) => b.score - a.score);

  // Return top N
  return scored.slice(0, topN);
}

// Main function
async function main() {
  console.log("🚀 Starting Priority Inbox...\n");

  await Log("frontend", "info", "middleware", "Priority inbox started");

  const notifications = await fetchNotifications();
  console.log(`📬 Total notifications received: ${notifications.length}\n`);

  const top10 = getPriorityInbox(notifications, 10);

  await Log("frontend", "info", "middleware", "Top 10 priority notifications calculated");

  console.log("🏆 TOP 10 PRIORITY NOTIFICATIONS:");
  console.log("=====================================");
  top10.forEach((n, index) => {
    console.log(`${index + 1}. [${n.Type}] ${n.Message} — ${n.Timestamp}`);
  });
}

main();