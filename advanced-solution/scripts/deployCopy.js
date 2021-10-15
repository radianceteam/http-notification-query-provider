require("dotenv-safe").config();

const path = require("path");
const fs = require("fs");
const Client = require("ssh2-sftp-client");

let sftp = new Client();

async function start() {
  await sftp.connect({
    host: process.env.REMOTE_HOST,
    username: process.env.REMOTE_USER,
    privateKey: fs.readFileSync(path.join(__dirname, "../deploy-rsa"), "utf-8"),
  });

  sftp.on("upload", (info) => {
    console.log(`Uploaded ${info.source}`);
  });

  await sftp.uploadDir(
    path.join(__dirname, "../"),
    process.env.REMOTE_APP_FOLDER,
    /^(?!.*node_modules|\.git|dist|\.next|out).*$/
  );

  console.log("Upload finished");

  await sftp.end();
}

start();
