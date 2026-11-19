import { Account, Client, Databases, ID } from "appwrite";

const env = import.meta.env;

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = env.VITE_APPWRITE_COLLECTION_ID;

client
  .setEndpoint(env.VITE_APPWRITE_ENDPOINT)
  .setProject(env.VITE_APPWRITE_PROJECT_ID);

export { account, client, databases, ID, DATABASE_ID, COLLECTION_ID };
