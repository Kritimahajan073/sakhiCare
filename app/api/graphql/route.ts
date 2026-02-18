import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getApolloServer } from "@/lib/graphql/server";

let handlerPromise: ReturnType<typeof startServerAndCreateNextHandler> | null = null;

async function getHandler() {
  if (!handlerPromise) {
    const server = await getApolloServer();
    handlerPromise = startServerAndCreateNextHandler(server, {
      context: async () => ({}),
    });
  }
  return handlerPromise;
}

export async function GET(request: Request) {
  const handler = await getHandler();
  return handler(request);
}

export async function POST(request: Request) {
  const handler = await getHandler();
  return handler(request);
}
