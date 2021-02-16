import { Dictionary } from '@bitmetro/cms-common';
import * as React from 'react';

import { ItemEditorSettings } from '../../component';
import { DefaultItemProps } from '../model';

import { LayoutSettings } from './layout';

export const defaultSettingsEditors: Dictionary<React.FC<ItemEditorSettings<any>>> = {
    Layout: LayoutSettings
};
