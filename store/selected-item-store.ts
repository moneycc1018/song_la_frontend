"use client";

import { atom } from "jotai";

export const selectedArtistsAtom = atom<Array<Record<string, string>>>([]);

export const selectedTrackAtom = atom<Record<string, string | Array<string>>>({});

export const selectedInteractionAtom = atom<string>("playground");
