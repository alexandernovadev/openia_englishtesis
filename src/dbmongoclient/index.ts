// lib/db.ts

import mongoose from "mongoose";

const uri = process.env.MONGO_URL;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let clientPromise: Promise<typeof mongoose>;

if (process.env.NODE_ENV === "development") {
  // En desarrollo, utiliza una instancia global para evitar múltiples conexiones.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = mongoose
      .connect(uri)
      .then((mongoose) => mongoose);
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, siempre crea una nueva instancia del cliente.
  clientPromise = mongoose.connect(uri).then((mongoose) => mongoose);
}

export default clientPromise;
