import { blueGrey as secondary, green as primary } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const editorTheme = createMuiTheme({
    palette: {
        type: 'dark',

        primary,
        secondary,

        background: {
            default: '#020005',
            paper: '#0e0024'
        },
    },

    typography: {
        // fontFamily: 'Monaco, "Courier New", Courier, monospace'
        // fontFamily: 'Menlo, Monaco, "Courier New", monospace'
    },

    mixins: {
        toolbar: {
            minHeight: 40,
        }
    }
});
