import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';

export interface SettingsGroupProps {
    title: string;
    open: boolean;
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
}));

export const SettingsGroup: React.FC<SettingsGroupProps> = ({ title, open, children }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(open);

    return (
        <Accordion expanded={expanded} onChange={(_, isExpanded) => setExpanded(isExpanded)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography className={classes.heading}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};
