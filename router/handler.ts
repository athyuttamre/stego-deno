import { Request, Response } from "../http/mod.ts";
import { Match } from "./match.ts";

export type Handler = (request: Request, match: Match) => Promise<Response>;
