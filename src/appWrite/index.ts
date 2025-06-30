import { Client, Storage } from 'appwrite'

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
    .setDevKey(import.meta.env.VITE_APP_WRITE_STORAGE_KEY)

const storage = new Storage(client)

export { storage }
