import {Request} from "express";

export default function getFrom(req: Request): string {
  return `${req.socket.remoteAddress}:${req.socket.remotePort}`;
}
