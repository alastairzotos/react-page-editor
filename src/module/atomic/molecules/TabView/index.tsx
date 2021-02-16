import { AppBar, Box, makeStyles, Tab, Tabs } from '@material-ui/core';
import * as React from 'react';

interface ITabPanelProps {
    currentTab: string;
    thisTab: string;
}

const TabPanel: React.FC<ITabPanelProps> = ({ currentTab, thisTab, children }) => {
    return (
        <div hidden={currentTab !== thisTab}>
            {currentTab === thisTab && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
};


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


export interface ITabViewProps {
    tabs: {
        [key: string]: React.FC<any>;
    }
}

export const TabView: React.FC<ITabViewProps> = ({ tabs }) => {
    const classes = useStyles();

    const tabNames = Object.keys(tabs);

    const [tab, setTab] = React.useState(tabNames[0]);

    const handleChangeTab = (e: React.ChangeEvent<{}>, newTab: string) => {
        setTab(newTab);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Tabs value={tab} onChange={handleChangeTab}>
                    {
                        tabNames.map((tabName, index) => (
                            <Tab key={index} label={tabName} value={tabName} />
                        ))
                    }
                </Tabs>
            </AppBar>
            {
                tabNames.map((tabName, index) => {
                    const Component = tabs[tabName];

                    return (
                        <TabPanel key={index} currentTab={tab} thisTab={tabName}>
                            <Component />
                        </TabPanel>
                    );
                })
            }
        </div>
    );
};
