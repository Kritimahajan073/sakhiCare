import { MongoClient, Db } from "mongodb";

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error(
      "Please set MONGODB_URI in .env.local (or in Vercel Environment Variables)"
    );
  }

  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

/** Get the database instance, or null if MONGODB_URI is not set. */
export async function getDb(): Promise<Db | null> {
  if (!process.env.MONGODB_URI?.trim()) {
    return null;
  }
  try {
    const client = await getClientPromise();
    return client.db();
  } catch {
    return null;
  }
}
