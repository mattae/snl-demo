import {
    TranslocoTestingModule,
    TranslocoTestingOptions,
} from '@jsverse/transloco';
// @ts-ignore
import en from './assets/i18n/en.json';
// @ts-ignore
import es from './assets/i18n/es.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
    return TranslocoTestingModule.forRoot({
        langs: { en, es },
        translocoConfig: {
            availableLangs: ['en', 'es'],
            defaultLang: 'en',
        },
        preloadLangs: true,
        ...options,
    });
}
