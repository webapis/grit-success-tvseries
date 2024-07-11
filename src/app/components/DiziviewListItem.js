import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export default function Diziview({ title, href }) {
    return (
        <List sx={{ maxWidth: 345 }}>
            <ListItem disablePadding>
                <ListItemButton component='a'
                    href={href}
                >
                    {title}
                </ListItemButton>
            </ListItem>
        </List>
    );
}


