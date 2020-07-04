import * as sr from "./score_ranking.ts";

const filePath = Deno.args[0];
const data = await Deno.readTextFile(filePath);
const ranking = sr.scoreRanking(data);
const bytes = new TextEncoder().encode(ranking);
await Deno.writeAll(Deno.stdout, bytes);
