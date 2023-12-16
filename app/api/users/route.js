import User from "@/(models)/User";
// import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, password, email } = await req.json();
    console.log(username, password, email);

    const newUser = new User({ username, password, email });

    if (!username || !password || !email) {
      return new Response(
        { message: "All Fields are required" },
        { status: 400 }
      );
    }
    //checking for duplicates
    const duplicate = await User.findOne({ email: newUser.email })
      .lean()
      .exec();

    if (duplicate) {
      return Response.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    await User.create(newUser);
    return new Response({ message: "user created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response({ message: "Error", error }, { status: 500 });
  }
}
