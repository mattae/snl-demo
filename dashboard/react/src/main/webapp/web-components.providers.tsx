import { I18nProvider } from './utils/@i18n/I18nProvider.tsx';
import M3 from './layout/theme/M3/M3.tsx';
import { useContext, useEffect } from 'react';
import { ThemeSchemeContext } from './layout/theme/M3/providers/ThemeSchemeProvider.tsx';
import { ThemeModeContext } from './layout/theme/M3/providers/ThemeModeProvider.tsx';
import { useTranslation } from 'react-i18next';
import { ThemeMode } from './layout/theme/M3/types/ThemeMode.ts';
import { Paper } from '@mui/material';

export interface ProviderProps {
    children?: React.ReactNode;
}

const WrapperComponent = ({children}: ProviderProps) => {
    const {generateScheme} = useContext(ThemeSchemeContext);
    const {setThemeMode} = useContext(ThemeModeContext);
    const {i18n} = useTranslation()

    useEffect(() => {
        const handleStorage = () => {
            const lang = window.localStorage.getItem('lang');
            const mode: 'light' | 'dark' | null = window.localStorage.getItem('mode') as ThemeMode;
            const scheme = window.localStorage.getItem('scheme');
            i18n.changeLanguage(lang ?? 'en');

            generateScheme(scheme ?? '#212a31');
            setThemeMode(mode ?? 'light');
        }

        handleStorage();
        window.addEventListener('storage', handleStorage);
        return () => {
            window.removeEventListener('storage', handleStorage)
        };
    }, [])

    return (
        <Paper>
            {children}
        </Paper>
    )
}

const WebComponentsProviders = ({children}: ProviderProps) => {
    return (
        <I18nProvider>
            <M3>
                <WrapperComponent>
                    {children}
                </WrapperComponent>
            </M3>
        </I18nProvider>
    );
};

export default WebComponentsProviders;
