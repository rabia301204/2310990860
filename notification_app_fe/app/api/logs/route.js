import { NextResponse } from "next/server"

async function getToken() {
  const res = await fetch("http://20.207.122.201/evaluation-service/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "rabia0860.be23@chitkara.edu.in",
      name: "rabia",
      rollNo: "2310990860",
      accessCode: "EXfvDp",
      clientID: "603124a2-773a-4a44-b1fb-dadc1341e841",
      clientSecret: "UDwCzvTukauksUuY",
    }),
  })
  const data = await res.json()
  return data.access_token
}

export async function POST(request) {
  try {
    const body = await request.json()
    const token = await getToken()
    const res = await fetch(
      "http://20.207.122.201/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    )
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Log failed" }, { status: 500 })
  }
}