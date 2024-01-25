import { ValueObject } from "./value-object.interface";
import crypto from "crypto";

export class Id implements ValueObject {
  private _id: string;

  constructor(id?: string) {
    this._id = id || crypto.randomUUID();
  }

  get value(): string {
    return this._id;
  }
}