import { writable } from "svelte/store";
import { Word, WordNode } from "$lib/word";

let defaultWord = new Word('사', '', 0)
let placeholder = new WordNode(defaultWord, undefined, undefined);
export const current = writable(placeholder)
export const root = writable(placeholder)