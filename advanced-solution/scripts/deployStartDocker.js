require("dotenv-safe").config();

const fs = require("fs");
const path = require("path");
const { NodeSSH } = require("node-ssh");

let ssh = new NodeSSH();

async function start() {
  ssh = await ssh.connect({
    host: process.env.REMOTE_HOST,
    username: process.env.REMOTE_USER,
    privateKey: fs.readFileSync(path.join(__dirname, "../deploy-rsa"), "utf-8"),
  });

  try {
    await ssh.exec(
      "docker-compose -f docker-compose.prod.yml up -d --build",
      [],
      {
        cwd: process.env.REMOTE_APP_FOLDER,
        onStdout(chunk) {
          console.log(chunk.toString("utf8"));
        },
        onStderr(chunk) {
          console.log(chunk.toString("utf8"));
        },
      }
    );
  } catch {}

  console.log("Docker startup finished");
}

try {
  start().then(() => process.exit(0));
} catch (e) {
  console.error(e);
  process.exit(1);
}
