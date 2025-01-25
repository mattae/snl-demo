const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const chroma = require("chroma-js");
const _ = require("lodash");

module.exports = plugin.withOptions((options) => ({addComponents, theme, e}) => {
        const schemeCustomProps = _.map(
            ['light', 'dark'],
            (colorScheme) => {
                const isDark = colorScheme === 'dark';
                const background = theme(
                    `fuse.customProps.background.${colorScheme}`
                );
                const foreground = theme(
                    `fuse.customProps.foreground.${colorScheme}`
                );
                const lightSchemeSelectors =
                    'body.light, .light, .dark .light';
                const darkSchemeSelectors =
                    'body.dark, .dark, .light .dark';

                return {
                    [isDark ? darkSchemeSelectors : lightSchemeSelectors]: {
                        /**
                         * If a custom property is not available, browsers will use
                         * the fallback value. In this case, we want to use '--is-dark'
                         * as the indicator of a dark theme so, we can use it like this:
                         * background-color: var(--is-dark, red);
                         *
                         * If we set '--is-dark' as "true" on dark themes, the above rule
                         * won't work because of the said "fallback value" logic. Therefore,
                         * we set the '--is-dark' to "false" on light themes and not set it
                         * at all on dark themes so that the fallback value can be used on
                         * dark themes.
                         *
                         * On light themes, since '--is-dark' exists, the above rule will be
                         * interpolated as:
                         * "background-color: false"
                         *
                         * On dark themes, since '--is-dark' doesn't exist, the fallback value
                         * will be used ('red' in this case) and the rule will be interpolated as:
                         * "background-color: red"
                         *
                         * It's easier to understand and remember like this.
                         */
                        ...(!isDark ? {'--is-dark': 'false'} : {}),

                        /* Generate custom properties from customProps */
                        ..._.fromPairs(
                            _.flatten(
                                _.map(background, (value, key) => [
                                    [`--fuse-${e(key)}`, value],
                                    [
                                        `--fuse-${e(key)}-rgb`,
                                        chroma(value).rgb().join(','),
                                    ],
                                ])
                            )
                        ),
                        ..._.fromPairs(
                            _.flatten(
                                _.map(foreground, (value, key) => [
                                    [`--fuse-${e(key)}`, value],
                                    [
                                        `--fuse-${e(key)}-rgb`,
                                        chroma(value).rgb().join(','),
                                    ],
                                ])
                            )
                        ),
                    },
                };
            }
        );

        const schemeUtilities = (() => {
            /* Generate general styles & utilities */
            return {};
        })();

        addComponents(schemeCustomProps);
        addComponents(
            {
                '.mat-icon': {
                    '--tw-text-opacity': '1',
                    color: 'rgba(var(--fuse-mat-icon-rgb), var(--tw-text-opacity))'
                },
                '.text-default': {
                    '--tw-text-opacity': '1 !important',
                    color: 'rgba(var(--fuse-text-default-rgb), var(--tw-text-opacity)) !important'
                },
                '.text-secondary': {
                    '--tw-text-opacity': '1 !important',
                    color: 'rgba(var(--fuse-text-secondary-rgb), var(--tw-text-opacity)) !important'
                },
                '.text-hint': {
                    '--tw-text-opacity': '1 !important',
                    color: 'rgba(var(--fuse-text-hint-rgb), var(--tw-text-opacity)) !important'
                },
                '.text-disabled': {
                    '--tw-text-opacity': '1 !important',
                    color: 'rgba(var(--fuse-text-disabled-rgb), var(--tw-text-opacity)) !important'
                },
                '.divider': {
                    color: 'var(--fuse-divider) !important'
                },
                '.bg-card': {
                    backgroundColor: 'var(--mdc-elevated-card-container-color) !important',
                    borderRadius: 'var(--mdc-outlined-card-container-shape) !important',
                    borderWidth: 'var(--mdc-outlined-card-outline-width) !important',
                    borderColor: 'var(--mdc-outlined-card-outline-color) !important',
                    boxShadow: 'var(--mdc-outlined-card-container-elevation) !important',
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                    position: 'relative',
                    borderStyle: 'solid',
                },
                '.fio-card-header': {
                    display: 'flex',
                    padding: '16px 16px 0'
                },
                '.fio-card-content': {
                    display: 'block',
                    padding: '0 16px',
                    paddingBottom: '16px',
                    marginBottom: '0'
                },
                '.fio-card-title': {
                    display: 'block',
                    margin: '0',
                    paddingTop: '0',
                    fontFamily: 'var(--mat-card-title-text-font)',
                    lineHeight: 'var(--mat-card-title-text-line-height)',
                    fontSize: 'var(--mat-card-title-text-size)',
                    letterSpacing: 'var(--mat-card-title-text-tracking)',
                    fontWeight: 'var(--mat-card-title-text-weight)',
                },
                '.fio-card-actions': {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    minHeight: '52px',
                    padding: '8px'
                },
                '.bg-fio-default': {
                    '--tw-bg-opacity': '1 !important',
                    backgroundColor: 'var(--mdc-filled-text-field-container-color)'
                },
                '.default-text': {
                    color: 'var(--mdc-filled-text-field-input-text-color)'
                },
                '.bg-default': {
                    '--tw-bg-opacity': '1 !important',
                    backgroundColor: 'rgba(var(--fuse-bg-default-rgb), var(--tw-bg-opacity)) !important'
                },
                '.bg-dialog': {
                    '--tw-bg-opacity': '1 !important',
                    backgroundColor: 'rgba(var(--fuse-bg-dialog-rgb), var(--tw-bg-opacity)) !important'
                },
                '.ring-bg-default': {
                    '--tw-ring-opacity': '1 !important',
                    '--tw-ring-color': 'rgba(var(--fuse-bg-default-rgb), var(--tw-ring-opacity)) !important'
                },
                '.ring-bg-card': {
                    '--tw-ring-opacity': '1 !important',
                    '--tw-ring-color': 'rgba(var(--mdc-outline-card-container-color), var(--tw-ring-opacity)) !important'
                },
                '.fio-table': {
                    minWidth: '100%',
                    border: '0',
                    borderSpacing: '0',
                    tableLayout: 'auto',
                    whiteSpace: 'normal',
                    backgroundColor: 'var(--mat-table-background-color)'
                },

                '.fio-row, .fio-data-table__content': {
                    '-moz-osx-font-smoothing': 'grayscale',
                    '-webkit-font-smoothing': 'antialiased',
                    fontFamily: 'var(--mat-table-row-item-label-text-font, Roboto, sans-serif)',
                    lineHeight: 'var(--mat-table-row-item-label-text-line-height)',
                    fontSize: 'var(--mat-table-row-item-label-text-size, 14px)',
                    fontWeight: 'var(--mat-table-row-item-label-text-weight)',
                }
            }
        );

        addComponents(
            {
                '.bg-hover': {
                    backgroundColor: 'var(--fuse-bg-hover) !important'
                }
            }
        );
    },
    (options) => {
        return {
            theme: {
                fuse: {
                    customProps: {
                        background: {
                            light: {
                                'bg-app-bar': '#FFFFFF',
                                'bg-default': colors.slate[100],
                                'bg-dialog': '#FFFFFF',
                                'bg-hover': chroma(colors.slate[400]).alpha(0.12).css(),
                                'bg-status-bar': colors.slate[300]
                            },
                            dark: {
                                'bg-app-bar': colors.slate[900],
                                'bg-default': colors.slate[900],
                                'bg-dialog': colors.slate[800],
                                'bg-hover': 'rgba(255, 255, 255, 0.05)',
                                'bg-status-bar': colors.slate[900]
                            }
                        },
                        foreground: {
                            light: {
                                'text-default': colors.slate[800],
                                'text-secondary': colors.slate[500],
                                'text-hint': colors.slate[400],
                                'text-disabled': colors.slate[400],
                                'border': colors.slate[200],
                                'divider': colors.slate[200],
                                'icon': colors.slate[500],
                                'mat-icon': colors.slate[500]
                            },
                            dark: {
                                'text-default': '#FFFFFF',
                                'text-secondary': colors.slate[400],
                                'text-hint': colors.slate[500],
                                'text-disabled': colors.slate[600],
                                'border': chroma(colors.slate[100]).alpha(0.12).css(),
                                'divider': chroma(colors.slate[100]).alpha(0.12).css(),
                                'icon': colors.slate[400],
                                'mat-icon': colors.slate[400]
                            }
                        }
                    }
                }
            }
        };
    }
);
