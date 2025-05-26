import dotenv from "dotenv";
import app from "./app.js";
import connectionDB from "./Db/connectionDb.js";
dotenv.config();
const port = process.env.PORT;
connectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to the database", err));
