const app = require("./app");

app.listen(app.get("port"), () => {
  console.log(`Sever on port ${app.get("port")}. localhost:${app.get("port")}`);
});
