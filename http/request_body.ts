import { Json } from "../lib/json.ts";

const textDecoder = new TextDecoder();

export class RequestBody {
  private _body: () => Promise<Uint8Array>;
  private _collectedBody: Uint8Array | null = null;

  constructor(body: () => Promise<Uint8Array>) {
    this._body = body;
  }

  async value(): Promise<Uint8Array> {
    if (this._collectedBody === null) {
      this._collectedBody = await this._body();
    }

    return this._collectedBody;
  }

  async stream() {
    // TODO
  }

  async text(): Promise<string> {
    const value = await this.value();
    return textDecoder.decode(value);
  }

  async json(): Promise<Json> {
    const text = await this.text();
    // Implicit conversion of any to Json.
    return JSON.parse(text);
  }
}
