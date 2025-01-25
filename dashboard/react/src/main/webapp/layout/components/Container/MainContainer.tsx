import { Box, Paper, SxProps, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import Scrollbar from 'react-scrollbars-custom';

const MainContainer: FC<{ children?: React.ReactNode }> = ({children}) => {

    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('md'));
    const isSxUp = useMediaQuery(theme.breakpoints.up('sm'));
    const radiusTop = 10;
    const radiusBottom = isSxUp ? 25 : 0;

    const paperStyle: SxProps = {
        p: isSxUp ? 4 : 2,
        borderTopLeftRadius: radiusTop,
        borderTopRightRadius: radiusTop,
        borderBottomLeftRadius: radiusBottom,
        borderBottomRightRadius: radiusBottom,
        //m: isSxUp ? 2 : 0,
        height: isSxUp ? 'auto' : 1,
        mt: 0,
        mb: isSxUp ? 2 : 0,
        mr: isSxUp ? 2 : 0,
        ml: isSxUp ? (isSmUp ? 0 : 2) : 0
    };


    return (
        <>
            <Scrollbar>
                <Box className="p-4">
                    <div className="flex flex-col flex-auto w-full min-w-0 mat-typography">
                        <div className="flex flex-col flex-auto h-screen layout mat-app-background">
                            <Paper sx={paperStyle} elevation={0}>
                                {children}
                            </Paper>
                        </div>
                    </div>
                </Box>
            </Scrollbar>
            <Box
                component="footer"
                sx={{
                    position: "sticky",
                    bottom: 0,
                    padding: 2,
                    background: theme.palette.background.default,
                    borderTop: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()}
                </Typography>
            </Box>
        </>
    );
}

export default MainContainer;
