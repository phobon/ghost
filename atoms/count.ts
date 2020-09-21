import { atom } from "jotai";

export const countAtom = atom(0);

export const fetchCountAtom = atom(
  get => get(countAtom),
  async (_get, set, url: string) => {
    const response = await fetch(url);
    set(countAtom, (await response.json()).count);
  }
);