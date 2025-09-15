import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI; 
let cachedClient = null;

export default async function dbConnect(collectionName) {
  if (!cachedClient) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    cachedClient = await client.connect();
  }

  return cachedClient.db(process.env.DB_NAME).collection(collectionName);
}
