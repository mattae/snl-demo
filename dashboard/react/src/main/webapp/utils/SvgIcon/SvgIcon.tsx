import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
import Icon from '@mui/material/Icon';
import clsx from 'clsx';
import { forwardRef } from 'react';

type SvgIconProps = BoxProps & {
    fill?: string;
    xmlns?: string;
    viewBox?: string;
    size?: number | string;
    color?: 'inherit' | 'disabled' | 'primary' | 'secondary' | 'action' | 'error' | 'info' | 'success' | 'warning';
};

/**
 * The Root styled component is used to style the root div of the SvgIcon component.
 * It uses the styled function from the MUI styles library to create a styled component.
 */
const Root = styled(Box)<SvgIconProps>(({theme, size = 20, color = 'inherit'}) => ({
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    fontSize: size,
    lineHeight: size,
    color: {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        info: theme.palette.info.main,
        success: theme.palette.success.main,
        warning: theme.palette.warning.main,
        action: theme.palette.action.active,
        error: theme.palette.error.main,
        disabled: theme.palette.action.disabled,
        inherit: 'currentColor'
    }[color] as string
}));

/**
 * The SvgIcon component is responsible for rendering an SVG icon with a specified size and color.
 * It uses various MUI components to render the icon.
 * The component is memoized to prevent unnecessary re-renders.
 */
const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
    const {children, className = '', color = 'inherit'} = props;

    if (typeof children !== 'string') {
        return null;
    }

    if (!children.includes(':')) {
        return (
            <Box
                component={Icon}
                ref={ref}
                {...props}
            />
        );
    }
    const isDev = process.env.NODE_ENV === 'development';
    const iconPath = isDev ? children.replace(':', '.svg#') : children;
    const path = isDev ? `/assets/icons/${iconPath}` : `http://localhost:3000/api/icon-sets/${iconPath}`;
    return (
        <Root
            {...props}
            as="svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className={clsx('shrink-0 fill-current', className)}
            ref={ref}
            color={color}
        >
            <use xlinkHref={path}/>
        </Root>
    );
});

export default SvgIcon;
