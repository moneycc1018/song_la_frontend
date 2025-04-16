"use client";

import { atom } from "jotai";

import { TagType } from "@/types/index.type";

export const selectedArtistsAtom = atom<Array<Record<string, string>>>([]);

export const selectedTrackAtom = atom<Record<string, string | Array<string>>>({});

export const selectedInteractionAtom = atom<string>("playground");

export const selectedTagsAtom = atom<Array<TagType>>([]);
