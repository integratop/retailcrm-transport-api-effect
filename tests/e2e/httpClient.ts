import { HttpClient, HttpClientRequest } from "@effect/platform";
import { Duration, Effect, flow, pipe, Redacted, Schedule } from "effect";
import { RateLimiter } from "effect";
import { RETAILCRM_TRANSPORT_ENDPOINT, RETAILCRM_TRANSPORT_TOKEN } from "./config.js";

export const makeHttpClient = Effect.gen(function* () {
  const baseUrl = yield* RETAILCRM_TRANSPORT_ENDPOINT;
  const token = yield* RETAILCRM_TRANSPORT_TOKEN;
  const apiUrl = new URL("/api/transport/v1", baseUrl);

  const rateLimiter = yield* RateLimiter.make({
    limit: 30,
    interval: "1 second",
  });

  return pipe(
    yield* HttpClient.HttpClient,
    HttpClient.transform((effect, _request) => rateLimiter(effect)),
    HttpClient.retryTransient({
      times: 3,
      schedule: pipe(
        Schedule.exponential(1000, 1.5),
        Schedule.jittered,
        Schedule.tapOutput((delay) =>
          Effect.logWarning(
            `HTTP request transient failure. Retry after: ${Duration.toMillis(delay)} ms`,
          ),
        ),
      ),
    }),
    HttpClient.mapRequest(
      flow(
        HttpClientRequest.prependUrl(apiUrl.href),
        HttpClientRequest.setHeaders({
          "X-Transport-Token": `${Redacted.value(token)}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      ),
    ),
  );
});
