import { app } from "./app.js";
import "dotenv/config";
import { connectDb } from "./db/index.js";

console.log("database connection started");

connectDb().then(() => {
  app.on("error", (error) => {
    console.error("failed to start the app");
    throw error;
  });

  app.listen(process.env.PORT, () => {
    console.log("app started....");
  });
}).catch((error)=>{
    console.log("database connection failed",error)
    process.exit(1);
})
