import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import mysql from "mysql2/promise";
import db from "@/lib/db"; // for GET

// POST: Save school data
export async function POST(req) {
  try {
    const formData = await req.formData();

    // Extract fields
    const schoolName = formData.get("schoolName");
    const schoolAddress = formData.get("schoolAddress");
    const city = formData.get("city");
    const state = formData.get("state");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const image = formData.get("image"); // File

    let imagePath = null;
    if (image && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "schoolImages");
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, image.name);
      await fs.writeFile(filePath, buffer);

      imagePath = `/schoolImages/${image.name}`;
    }

    // MySQL connection
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Sonu@123",
      database: "schools",
    });

    // ✅ Match table columns properly
    await db.execute(
      "INSERT INTO school (schoolName, schoolAddress, city, state, email, contact, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [schoolName, schoolAddress, city, state, email, contact, imagePath]
    );

    await db.end();

    return NextResponse.json(
      { success: true, message: "School saved successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/schools error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// GET: Fetch schools
export async function GET(req) {
  try {
    const { search } = Object.fromEntries(new URL(req.url).searchParams);

    let query = "SELECT * FROM school";
    let params = [];

    if (search) {
      query += " WHERE schoolName LIKE ? OR city LIKE ? OR state LIKE ?";
      params = [`%${search}%`, `%${search}%`, `%${search}%`];
    }

    const [rows] = await db.execute(query, params);

    const schools = rows.map((s) => ({
      ...s,
      image: s.image?.startsWith("http")
        ? s.image
        : s.image
        ? `/schoolImages/${path.basename(s.image)}`
        : null,
    }));

    return new Response(JSON.stringify(schools), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/schools error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
