import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import * as sut from "./score_ranking.ts";

Deno.test("exists", () => {
  assertEquals(typeof sut.scoreRanking, "function");
});

Deno.test("takes file text", async () => {
  const filePath = "./sample-input.txt";
  const data = await Deno.readTextFile(filePath);
  const actual = sut.scoreRanking(data);
  assertEquals(typeof actual, "string");
});

Deno.test("parse file for scores and ranks", async () => {
  const filePath = "./sample-input.txt";
  const data = await Deno.readTextFile(filePath);
  const ranking = sut.scoreRanking(data);
  assertEquals(typeof ranking, "string");

  const expected = await Deno.readTextFile("./expected-output.txt");
  assertEquals(ranking, expected);
});
