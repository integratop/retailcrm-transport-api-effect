#!/usr/bin/env -S pnpm tsx
import { createInterface as readLine } from "node:readline";
import process from "node:process";
import { name } from "../package.json" with { type: "json" };

async function* gen() {
  for await (let line of readLine(process.stdin)) {
    // Добавление префикса к идентификаторам типов моделей
    let _line = line.replace(
      /export class (\w+) extends S\.Class<(\w+)>\("(\w+)"\)/,
      (line, identifier) => {
        return line.replace(`"${identifier}"`, `"${name}/${identifier}"`);
      },
    );
    // исправление суффикса default
    _line = _line.replace("default extends", "Default extends");

    if (line !== _line) {
      console.error(_line);
      line = _line;
    }
    yield line;
  }
}

const lines = await Array.fromAsync(gen());
const output = lines.join("\n");

console.log(output);
