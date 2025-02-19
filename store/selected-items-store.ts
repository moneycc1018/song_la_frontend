"use client";

import { atom } from "jotai";

export const selectedArtistsAtom = atom<Array<Record<string, string>>>([]);
