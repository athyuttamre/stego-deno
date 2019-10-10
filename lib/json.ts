// TODO: simplify in TypeScript 3.7. See blog post for example.
export type Json = string | number | boolean | null | JsonObject | JsonArray;

interface JsonObject {
  [property: string]: Json;
}

interface JsonArray extends Array<Json> {}
