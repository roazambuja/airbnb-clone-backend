import app from "./app";
import { disconnect } from "mongoose";

async function main() {
    app.listen(app.get("port"), () => {
        console.log("Express na porta:", app.get("port"));
        console.log("Express no modo:", app.get("env"));
    });

    await disconnect();
    console.log("Desconectado do MongoDb Atlas");
}

main();
