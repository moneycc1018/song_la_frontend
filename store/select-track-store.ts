"use client";

import { atom } from "jotai";

export const selectedTrackAtom = atom<Record<string, string>>({});
