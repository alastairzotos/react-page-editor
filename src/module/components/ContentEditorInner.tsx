import { PageItem } from '@bitmetro/cms-common';
import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { ThemeProvider } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { contentEditorActions } from '../actions';
import { Panel } from '../atomic/atoms/Panel';
import SplitPanel from '../atomic/atoms/SplitPanel';
import { defaultThemeSettings, Slot, SlotRenderer, usePageItem } from '@bitmetro/content-renderer';
import { DROP_TARGET_CLASS } from '../editor/editting/ContainerEditor';
import { ContentEditorCore } from '../editor/editting/ContentEditorCore';
import { DraggingItem } from '../editor/editting/DraggingItem';
import { Settings } from '../editor/settings/Settings';
import { getContent, getCurrentNamespace, getDraggingItem, getDropTarget, isDroppingItem } from '../selectors';
import { getIndexedItem } from '../utils';

import { ContentEditorProps } from './ContentEditor';

type ContentEditorInnerProps = Omit<ContentEditorProps, 'theme'>;

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    container: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
        padding: theme.spacing(1, 10)
    }
}));

const DefaultWrapper: React.FC = ({ children }) =>
    <ThemeProvider theme={defaultThemeSettings}>{children}</ThemeProvider>;

export const ContentEditorInner: React.FC<ContentEditorInnerProps> = ({
    id,
    content,
    onChange,
    Wrapper = DefaultWrapper
}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const currentContent = useSelector(getContent);
    const currentNs = useSelector(getCurrentNamespace);
    const draggingItem = useSelector(getDraggingItem);
    const droppingItem = useSelector(isDroppingItem);
    const dropTarget = useSelector(getDropTarget);

    const ref = React.useRef<HTMLDivElement>(null);
    const editorRect = !!ref.current && ref.current.getBoundingClientRect();
    const dragRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (currentNs !== id) {
            dispatch(contentEditorActions.setNamespace(id));
        } else if (!!currentNs) {
            if (!currentContent) {
                dispatch(contentEditorActions.setContent(content));
            } else if (currentContent !== content) {
                onChange(currentContent);
            }
        }
    }, [id, currentNs, currentContent]);

    if (!currentContent) {
        return null;
    }

    const handleBackgroundClick = () => {
        dispatch(contentEditorActions.selectItem(null));
    };

    const handleDragScroll = (clientY: number) => {
        if (!!ref && !!ref.current) {
            const containerRect = ref.current.getBoundingClientRect();

            const diff = clientY - containerRect.y;
            const perc = (diff / containerRect.height) * 100;

            const cutoff = 10;  // If above top X% of page or below bottom X% of page, scroll

            const speedMultiplier = 0.85;
            const scrollUpSpeed = (cutoff - perc) * speedMultiplier;
            const scrollDownSpeed = (cutoff - (100 - perc)) * speedMultiplier;

            const shouldScrollUp = perc < cutoff;
            const shouldScrollDown = perc > 100 - cutoff;
            let scrollSpeed = 0;

            if (shouldScrollUp) {
                scrollSpeed = -scrollUpSpeed;
            } else if (shouldScrollDown) {
                scrollSpeed = scrollDownSpeed;
            } else {
                scrollSpeed = 0;
            }

            if (!!scrollSpeed) {
                // This doesn't quite work
                if (ref.current.scrollTop >= 0 && ref.current.scrollTop <= editorRect.height - draggingItem.height) {
                    ref.current.scrollBy(0, scrollSpeed);
                }
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!!draggingItem && !droppingItem) {
            e.preventDefault();

            // Scroll page if moving too high or too low
            handleDragScroll(e.clientY);

            // Move the draggable element
            dragRef.current.style.left = `${e.clientX - draggingItem.offset.x}px`;
            dragRef.current.style.top = `${e.clientY - draggingItem.offset.y}px`;

            // Get potential targets under the mouse
            // Ignore currently dragged item and its children
            const targets = document.elementsFromPoint(e.clientX, e.clientY)
                .filter(el => !draggingItem.ignoreChildren.includes(el.id));

            // Get container index from list of potential targets
            const targetElIndex = targets.findIndex(trg => trg.classList.contains(DROP_TARGET_CLASS));

            let target: PageItem;

            if (targetElIndex >= 0) {

                // Get drop target DOM element and page item
                const targetEl = targets[targetElIndex];
                target = getIndexedItem(targetEl.id);
            } else {
                target = currentContent;
            }

            if (!!target) {
                let insertIndex = 0;

                // Get the insert index by checking the last item we're below
                // or 0 if we're not below any items
                const validChildren = target.children.filter(child => child.id !== draggingItem.item.id);

                for (let i = 0; i < validChildren.length; i++) {
                    const itemRect = document.getElementById(validChildren[i].id).getBoundingClientRect();

                    if (e.clientY >= itemRect.y + itemRect.height / 2) {
                        insertIndex = i + 1;
                    }
                }

                // Get old target container and index
                const oldDropTargetId = dropTarget && dropTarget.container ? dropTarget.container.id : null;
                const oldInsertIndex = dropTarget ? dropTarget.index : -1;

                // If insert target or index and different than old ones, update
                if (target.id !== oldDropTargetId || insertIndex !== oldInsertIndex) {
                    dispatch(contentEditorActions.setDropTarget({
                        container: target,
                        index: insertIndex
                    }));
                }
            }
        }
    };

    const handleMouseUp = () => {
        if (!!draggingItem && !droppingItem) {
            if (!!dropTarget) {
                dispatch(contentEditorActions.startDroppingItem());
            } else {
                dispatch(contentEditorActions.dragItem(null));
            }
        }
    };

    return (
        <div
            ref={ref}
            className={classes.root}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Wrapper>
                <SplitPanel id="__editor_core" split="vertical" primary="second" defaultSplit={300}>
                    <Panel>
                        <div
                            className={classes.container}
                            onClick={handleBackgroundClick}
                        >
                            <ContentEditorCore />
                        </div>
                    </Panel>

                    <Settings />
                </SplitPanel>

                <DraggingItem ref={dragRef} />
            </Wrapper>
        </div>
    );
};
