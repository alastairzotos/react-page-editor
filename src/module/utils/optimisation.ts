import { Dictionary, PageItem } from '@bitmetro/cms-common';

export const contentIndex: Dictionary<PageItem> = {};

export const getIndexedItem = (id: string) => contentIndex[id];
