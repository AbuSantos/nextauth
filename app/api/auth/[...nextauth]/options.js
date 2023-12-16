import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/(models)/User";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        // console.log("Profile Github:", profile);
        let userRole = "Github User";
        if (profile?.email === "abusomwansantos@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },

      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        // console.log("Profile Google:", profile);
        let userRole = "google User";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .execute();

          if (foundUser) {
            console.log("User found");
            const match = await bcrypt.compare(
              foundUser.password,
              credentials.password
            );
            if (match) {
              console.log("Passed");
              delete foundUser.password;
              foundUser["role"] = "Unverified User";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //allow us to add the token to our role, so it can be used in the server side
      if (user) token.role = user.role;
      return token;
    },
    //so we can use it in the client side
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
