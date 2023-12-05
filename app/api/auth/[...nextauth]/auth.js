import { getProviders } from "next-auth/react";

export async function getServerSideProps() {
  try {
    const providers = await getProviders();

    return {
      props: {
        providers: providers ?? {},
      },
    };
  } catch (error) {
    console.log("Error fetching providers:", error);

    return {
      props: {
        providers: {},
      },
    };
  }
}

export default function NextAuthRoute(req, res) {
  // This function is required for the API route to work.
  res.end();
}
