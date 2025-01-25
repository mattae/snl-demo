import { FC, useContext } from "react";
import { AppBar, Grid, IconButton, Toolbar, Tooltip, useScrollTrigger } from "@mui/material";

import { ThemeModeContext } from "../../theme/M3/providers/ThemeModeProvider";

import MenuIcon from '@mui/icons-material/MenuTwoTone';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';


interface HeaderProps {
    onDrawerToggle?: () => void,
    window?: () => Window;
}

const MainAppBar: FC<HeaderProps> = ({onDrawerToggle, window}) => {

    const {toggleTheme, themeMode} = useContext(ThemeModeContext);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return (
        <>
            <AppBar position="sticky" elevation={trigger ? 2 : 0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item sx={{display: {md: 'none', sm: 'block'}}}>
                            <IconButton color="inherit" edge="start" onClick={onDrawerToggle}>
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Tooltip title='Switch Theme'>
                                <IconButton size='large' color='inherit' onClick={toggleTheme}>
                                    {themeMode == 'light' ? <DarkIcon/> : <LightIcon/>}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default MainAppBar;
