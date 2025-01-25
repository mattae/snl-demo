import {
    Box,
    Drawer,
    DrawerProps,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import { FC, useEffect, useState } from 'react';

import { Link, useLocation } from "react-router-dom";
import pagesData from '../../../pages/pagesData.tsx';
import SvgIcon from '../../../utils/SvgIcon';

const MainDrawer: FC<DrawerProps> = (props) => {
    const {onClose, ...others} = props;

    const location = useLocation();
    const [selectedIndex, setSelectedIndex] = useState(location.pathname.replace('/', ''));

    useEffect(() => {
        setSelectedIndex(location.pathname.replace('/', ''));
    }, [location.pathname])


    const handleListItemClick = (index: string) => {
        setSelectedIndex(index);
        onClose?.({}, 'backdropClick');
    };
    return (
        <Drawer {...others} onClose={onClose}>
            <Toolbar>
            </Toolbar>
            <List>
                <Box>
                    {pagesData.map((page, idx) => {
                        return (
                            <ListItem key={idx}>
                                <ListItemButton component={Link} to={`/${page.path}`}
                                                selected={selectedIndex == page.path}
                                                onClick={() => handleListItemClick(page.title)}>
                                    {page.icon &&
                                        <ListItemIcon>
                                            <SvgIcon>{page.icon}</SvgIcon>
                                        </ListItemIcon>
                                    }
                                    <ListItemText>{page.title}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                    }
                </Box>
            </List>
        </Drawer>
    );
};

export default MainDrawer;
