import { writable } from "svelte/store";
import { Head, WordNode } from "$lib/word";

let defaultHead = new Head('사', 0)
let placeholder = new WordNode(defaultHead, undefined);
export const current = writable(placeholder)
export const root = writable(placeholder)