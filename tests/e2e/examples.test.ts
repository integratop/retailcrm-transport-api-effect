import { Effect, pipe } from "effect";
import { makeHttpClient } from "./httpClient.js";
import { testLayer } from "./layer.js";
import { make } from "../../src/index.js";

test("ListChannels", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListChannels();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});

test("GetTemplates", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.GetTemplates();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});
