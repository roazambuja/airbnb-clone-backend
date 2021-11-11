import app from "./app";

async function main() {
    app.listen(app.get("port"), () => {
        console.log("Express na porta:", app.get("port"));
        console.log("Express no modo:", app.get("env"));
    });
}

main();
