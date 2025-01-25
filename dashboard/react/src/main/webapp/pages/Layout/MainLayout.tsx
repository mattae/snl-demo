import { Box, Grid, SxProps, useMediaQuery, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import MainDrawer from '../../layout/components/Drawer/MainDrawer.tsx';
import MainAppBar from '../../layout/components/AppBar/MainAppBar.tsx';
import MainContainer from '../../layout/components/Container/MainContainer.tsx';


const drawerWidth = 260;

const MainLayout: FC = () => {

    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('md'));

    const [mobileOpen, setMobileOpen] = useState(false);

    const rootStyles: SxProps = {
        display: 'flex',
        minHeight: '100vh',
    };
    const navStyles: SxProps = {
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
    };

    const mainStyles: SxProps = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        //bgcolor: '#f3f3f3'
    };
    const containerStyles: SxProps = {
        p: 0,
        flex: 1,
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (

        <Box sx={rootStyles} className="w-full">
            <Box component="nav" sx={navStyles}>
                {isSmUp ? null : (
                    <MainDrawer
                        PaperProps={{ style: { width: drawerWidth } }}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    />
                )}
                <MainDrawer variant="permanent"
                    PaperProps={{ style: { width: drawerWidth } }}
                    sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }} />
            </Box>
            <Box sx={mainStyles}>
                <Box sx={containerStyles}>
                    <MainAppBar onDrawerToggle={handleDrawerToggle} />
                    <MainContainer>
                        <Grid container columns={1} rowSpacing={2}>
                            <Outlet />
                        </Grid>
                    </MainContainer>
                </Box>
            </Box>
        </Box>
    );
}

export default MainLayout;
