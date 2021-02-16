import { PageItem } from '@bitmetro/cms-common';

export const DROPZONE_ID = '__dropzone__';
export const DROPZONE_CLASS = '__dropzone__';

export interface DropzoneProps {
    height: number;
}

export interface DropzoneItem extends PageItem {
    props: DropzoneProps;
}

export const createDropzone = (height: number, parentId: string): DropzoneItem => ({
    id: DROPZONE_ID,
    itemType: DROPZONE_CLASS,
    props: { height },
    parentId
});
