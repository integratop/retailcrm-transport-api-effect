#!/usr/bin/env -S pnpm tsx
import { createInterface as readLine } from "node:readline";
import process from "node:process";

const input = JSON.parse((await Array.fromAsync(readLine(process.stdin))).join("\n"));

const newJson = {
  name: input.name,
  version: input.version,
  description: input.description,
  repository: input.repository,
  author: input.author,
  license: input.license,
  keywords: input.keywords,
  dependencies: input.dependencies,
  peerDependencies: input.peerDependencies,
  bin: input.bin,
  type: input.type,
  main: input.main,
  types: input.types,
  module: input.module,
  exports: input.publishConfig?.exports || input.exports,
  engines: input.publishConfig?.engines || input.engines,
};

const output = JSON.stringify(newJson, null, 2).replaceAll("dist/", "").replaceAll("src/", "");

console.log(output);
