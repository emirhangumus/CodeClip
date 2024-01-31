import { nanoid } from "nanoid";

export function generateID() {
    return nanoid(10);
}