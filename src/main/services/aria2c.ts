import path from "node:path";
import { spawn } from "node:child_process";
import { app } from "electron";
import { logger } from "./logger";

export const startAria2 = () => {
  const binaryPath = app.isPackaged
    ? path.join(process.resourcesPath, "aria2", "aria2c")
    : path.join(__dirname, "..", "..", "aria2", "aria2c");

  logger.log("starting aria2 at:", binaryPath);

  const cp = spawn(binaryPath, [
    "--enable-rpc",
    "--rpc-listen-all",
    "--file-allocation=none",
    "--allow-overwrite=true",
  ]);

  cp.stdout?.on("data", async (data) => {
    const msg = Buffer.from(data).toString("utf-8");
    logger.info(msg);
  });

  return cp;
};
