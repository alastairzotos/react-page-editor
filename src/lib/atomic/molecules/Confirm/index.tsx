import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import * as React from 'react';

export interface IConfirmProps {
    title: string;
    open: boolean;
    cancelPrompt?: string;
    confirmPrompt?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const Confirm: React.FC<IConfirmProps> = ({
    title,
    open,
    cancelPrompt = 'Cancel',
    confirmPrompt = 'OK',
    onConfirm,
    onCancel,
    children,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>{cancelPrompt}</Button>
                <Button color="primary" onClick={onConfirm}>{confirmPrompt}</Button>
            </DialogActions>
        </Dialog>
    );
};
