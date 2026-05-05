"use client";
import { useEffect, useState } from "react";
import { Log, getAuthHeaders } from "../lib/logger";
import Link from "next/link";

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [readIds, setReadIds] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    await Log("info", "page", "Opening All Notifications page");
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(
"/api/notifications",
        { headers }
      );
      const data = await res.json();
      await Log("info", "api", "Fetched all notifications successfully");
      setNotifications(data.notifications);
    } catch (err) {
      await Log("error", "api", "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  }

  function markAsRead(id) {
    setReadIds((prev) => [...prev, id]);
    Log("info", "component", `Notification ${id} marked as read`);
  }

  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.Type === filter);

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>
        📬 All Notifications
      </h1>

      <Link href="/priority">
        <button
          style={{
            marginBottom: 16,
            padding: "8px 16px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          ⭐ Go to Priority Inbox
        </button>
      </Link>

      {/* Filter Buttons */}
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {["All", "Placement", "Result", "Event"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              padding: "6px 14px",
              backgroundColor: filter === type ? "#1976d2" : "#e0e0e0",
              color: filter === type ? "white" : "black",
              border: "none",
              borderRadius: 20,
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((n) => {
            const isRead = readIds.includes(n.ID);
            return (
              <div
                key={n.ID}
                style={{
                  padding: 16,
                  borderRadius: 10,
                  backgroundColor: isRead ? "#f5f5f5" : "#ffffff",
                  border: isRead ? "1px solid #ccc" : "2px solid #1976d2",
                  opacity: isRead ? 0.6 : 1,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        n.Type === "Placement"
                          ? "#2e7d32"
                          : n.Type === "Result"
                          ? "#1565c0"
                          : "#e65100",
                    }}
                  >
                    {n.Type === "Placement"
                      ? "💼"
                      : n.Type === "Result"
                      ? "📝"
                      : "🎉"}{" "}
                    {n.Type}
                  </span>
                  <span style={{ fontSize: 12, color: "#888" }}>
                    {n.Timestamp}
                  </span>
                </div>
                <p style={{ margin: "8px 0" }}>{n.Message}</p>
                {!isRead && (
                  <button
                    onClick={() => markAsRead(n.ID)}
                    style={{
                      padding: "4px 12px",
                      backgroundColor: "#43a047",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    ✓ Mark as Read
                  </button>
                )}
                {isRead && (
                  <span style={{ fontSize: 12, color: "#888" }}>✓ Read</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}