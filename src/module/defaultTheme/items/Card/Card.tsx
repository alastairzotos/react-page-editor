import { Button, Card as MuiCard, CardActions, CardContent, CardMedia, Link } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';

import { createClasses, DefaultItemProps, Slot } from '../../../theme';
import { richTextItem } from '../RichText';
import { createRichTextContent } from '../RichText/createContent';

import { cardItem } from '.';

export const contentSlot = new Slot('content', richTextItem.create(createRichTextContent('Card content')));

export interface CardProps extends DefaultItemProps {
    media: {
        image: string;
        title: string;
        height: number;
    },
    buttons: {
        title: string;
        url: string;
        openNewTab: boolean;
    }[]
}

const useStyles = createClasses(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    root: {
        width: '100%'
    },
    media: ({ media }: CardProps) => ({
        height: (media.height || cardItem.toProps().defaultProps.media.height) * theme.spacing
    })
}))

export const Card: React.FC<CardProps> = ({ defaultClass, media, buttons }) => {
    const classes = useStyles({ media, buttons });

    return (
        <div className={clsx(defaultClass, classes.container)}>
            <MuiCard className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={media.image}
                    title={media.title}
                />
                <CardContent>
                    {contentSlot.render()}
                </CardContent>

                {!!buttons && buttons.length > 0 && (
                    <CardActions>
                        {
                            buttons.map((btn, index) => (
                                <Link
                                    key={index}
                                    href={btn.url}
                                    target={btn.openNewTab ? '_blank' : ''}
                                    component={Button}
                                >
                                    {btn.title}
                                </Link>
                            ))
                        }
                    </CardActions>
                )}
            </MuiCard>
        </div>
    );
};
