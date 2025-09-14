import dbconnect from "@/lib/dbconnect";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return new Response(JSON.stringify({ error: "All fields required" }), {
        status: 400,
      });
    }

    const users = await dbconnect("users");
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role, 
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, userId: result.insertedId }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
