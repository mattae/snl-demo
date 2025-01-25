import { argbFromHex, Hct, hexFromArgb, SchemeContent } from '@material/material-color-utilities'

import { useLayoutEffect, useState } from 'react';
import { TonalPalette, TonalPaletteDefault } from '../types/TonalPalette';

export const TONAL_PALETTE_KEY = 'TonalPaletteKey';

/**
 * export interface Theme {
 *     source: number;
 *     schemes: {
 *         light: Scheme;
 *         dark: Scheme;
 *     };
 *     palettes: {
 *         primary: TonalPalette;
 *         secondary: TonalPalette;
 *         tertiary: TonalPalette;
 *         neutral: TonalPalette;
 *         neutralVariant: TonalPalette;
 *         error: TonalPalette;
 *     };
 *     customColors: CustomColorGroup[];
 * }
 */

const LEVELS = [0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100];

export const useTonalPalette = () => {

    const [tonalPalette, setTonalPalette] = useState<TonalPalette>(TonalPaletteDefault);

    useLayoutEffect(() => {
        if (localStorage.getItem(TONAL_PALETTE_KEY)) {
            const localTonalPalette = JSON.parse(localStorage.getItem(TONAL_PALETTE_KEY) || '{}');
            setTonalPalette(localTonalPalette);
        }
    }, []);

    const generatePalette = (hexColor: string) => {
        const light = new SchemeContent(Hct.fromInt(argbFromHex(hexColor)), false, 0);
        const dark = new SchemeContent(Hct.fromInt(argbFromHex(hexColor)), true, 0);
        const theme= {
            schemes: {
                light,
                dark
            },
            palettes: {
                primary: light.primaryPalette,
                secondary: light.secondaryPalette,
                tertiary: light.tertiaryPalette,
                neutral: light.neutralPalette,
                neutralVariant: light.neutralVariantPalette,
                error: light.errorPalette,
            }
        }
       // const intColor = argbFromHex(hexColor)
        const { palettes } = theme;//themeFromSourceColor(intColor);
        const tones: any = {};

        for (const [key, palette] of Object.entries(palettes)) {
            const toneLevel: any = {}
            for (const level of LEVELS) {
                toneLevel[level] = hexFromArgb(palette.tone(level));
            }
            tones[key] = toneLevel;
        }

        setTonalPalette(tones);
        localStorage.setItem(TONAL_PALETTE_KEY, JSON.stringify(tones));
    }

    /*
    const setDefaultPalette = () => {
        generatePalette('#6750A4');
    }*/

    return [tonalPalette, generatePalette] as const;
}
