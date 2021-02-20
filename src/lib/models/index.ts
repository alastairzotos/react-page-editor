import { PageItem } from '@bitmetro/cms-common';

export interface Position {
    x: number;
    y: number;
}

export interface DragInfo {
    item: PageItem;
    width: number;
    height: number;
    position: Position;
    offset: Position;
    ignoreChildren: string[];
}

export interface DropTarget {
    container: PageItem;
    index: number;
}
