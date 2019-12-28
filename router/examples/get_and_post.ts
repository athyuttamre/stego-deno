import { Server, Request, Response } from "../../http/mod.ts";
import { Router, Match } from "../mod.ts";
import { generateId } from "./lib.ts";

interface Task {
  title: string;
  description: string;
}
const tasks: { [id: string]: Task } = {};

const createTask = async (request: Request) => {
  const body = await request.body.json();
  if (!(body && typeof body === "object" && !Array.isArray(body))) {
    return new Response({ status: 400, body: "Invalid body." });
  }

  const { title, description } = body;
  if (!(typeof title === "string" && typeof description === "string")) {
    return new Response({ status: 400, body: "Missing title or description." });
  }

  const id = generateId();
  tasks[id] = {
    title: title,
    description: description
  };

  // TODO: fix converting typed objects to JsonObject.
  return new Response({ body: { id, ...tasks[id] } });
};

const getTask = async (request: Request, match: Match) => {
  const { id } = match.params;
  if (!id) {
    throw new Error("Unexpectedly missing param.");
  }

  // TODO: fix converting typed objects to JsonObject.
  return new Response({ body: tasks[id] as any });
};

const router = new Router();
router.post("/tasks", createTask);
// TODO: actually implement param matching.
router.get("/tasks/:id", getTask);

const server = new Server(router.handler);
server.listen(3000);
