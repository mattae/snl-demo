
import { useContext, useMemo } from "react";
import { CssBaseline, createTheme, ThemeProvider, GlobalStyles, alpha } from '@mui/material';
import { deepmerge } from "@mui/utils";
import { ThemeModeContext } from "../providers/ThemeModeProvider";
import { ThemeSchemeContext } from "../providers/ThemeSchemeProvider";
import { getMUIPalette } from "../utils/getMUIPalette";
import { getMUIComponents } from "../utils/getMUIComponents";


interface M3Props {
    children?: React.ReactNode;
};

const inputGlobalStyles = (
    <GlobalStyles
        styles={(theme) => ({
            html: {
                backgroundColor: `${theme.palette.background.default}!important`,
                color: `${theme.palette.text.primary}!important`
            },
            body: {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary
            },
            /*  'code:not([class*="language-"])': {
        color: theme.palette.secondary.dark,
        backgroundColor:
          theme.palette.mode === 'light' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)',
        padding: '2px 3px',
        borderRadius: 2,
        lineHeight: 1.7,
      }, */
            '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.paper,
            },
            '& .border-divider ': {
                borderColor: `${theme.palette.divider}!important`
            },
            'table.simple tbody tr th': {
                borderColor: theme.palette.divider
            },
            'table.simple thead tr th': {
                borderColor: theme.palette.divider
            },
            'a:not([role=button]):not(.MuiButtonBase-root)': {
                color: theme.palette.secondary.main,
                textDecoration: 'underline',
                '&:hover': {}
            },
            'a.link, a:not([role=button])[target=_blank]': {
                background: alpha(theme.palette.secondary.main, 0.2),
                color: 'inherit',
                borderBottom: `1px solid ${theme.palette.divider}`,
                textDecoration: 'none',
                '&:hover': {
                    background: alpha(theme.palette.secondary.main, 0.3),
                    textDecoration: 'none'
                }
            },
            '[class^="border"]': {
                borderColor: theme.palette.divider
            },
            '[class*="border"]': {
                borderColor: theme.palette.divider
            },
            '[class*="divide-"] > :not([hidden]) ~ :not([hidden])': {
                borderColor: theme.palette.divider
            },
            hr: {
                borderColor: theme.palette.divider
            },
            '::-webkit-scrollbar-thumb': {
                boxShadow: `inset 0 0 0 20px ${
                    theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
                }`
            },
            '::-webkit-scrollbar-thumb:active': {
                boxShadow: `inset 0 0 0 20px ${
                    theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
                }`
            }
        })}
    />
);

const M3Theme = ({ children }: M3Props) => {
    const { themeMode } = useContext(ThemeModeContext);
    const { themeScheme } = useContext(ThemeSchemeContext);

    const m3Theme = useMemo(() => {

        const muiPalette = getMUIPalette(themeMode, themeScheme);

        let theme = createTheme(muiPalette);
        theme = deepmerge(theme, getMUIComponents(theme));

        return theme;

    }, [themeMode, themeScheme]);

    return (
        <ThemeProvider theme={m3Theme}>
            <CssBaseline enableColorScheme />
            {inputGlobalStyles}
            {children}
        </ThemeProvider>
    );
}

export default M3Theme;
