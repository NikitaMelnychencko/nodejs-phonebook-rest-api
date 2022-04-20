const { mkdir } = require("fs/promises");
const app = require("./app");

app.listen(3000, async () => {
  await mkdir(process.env.UPLOAD_FOLDER, { recursive: true });
  console.log("Server running. Use our API on port: 3000");
});
