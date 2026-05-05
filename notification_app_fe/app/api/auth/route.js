import { NextResponse } from "next/server"

export async function GET() {
  try {
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
    return NextResponse.json({ token: data.access_token })
  } catch (err) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 })
  }
}