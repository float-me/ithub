import { writable } from "svelte/store";
import { WordGraph } from "$lib/graph";

let placeholder = new WordGraph([])
export const wordGraph = writable(placeholder)