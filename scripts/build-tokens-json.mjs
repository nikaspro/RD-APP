// Генерит tokens/tokens.json из tokens.js для SwiftUI и других рантаймов.
import { tokens } from "../tokens/tokens.js";
import { writeFile } from "node:fs/promises";
await writeFile(
  new URL("../tokens/tokens.json", import.meta.url),
  JSON.stringify(tokens, null, 2) + "\n"
);
console.log("tokens.json обновлён");
