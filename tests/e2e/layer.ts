import { NodeHttpClient } from "@effect/platform-node";
import { Layer, Logger, LogLevel } from "effect";

export const testLayer = Layer.mergeAll(
  Logger.minimumLogLevel(LogLevel.All),
  NodeHttpClient.layer,
  Layer.scope,
);
