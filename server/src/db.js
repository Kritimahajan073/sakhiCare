import { MongoClient } from "mongodb";

let clientPromise = null;

function getClientPromise() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("Please set MONGODB_URI in server/.env");
  }
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

/** Get the database instance. */
export async function getDb() {
  const client = await getClientPromise();
  return client.db();
}
