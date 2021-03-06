import React, {useState} from 'react';
import {Collapse, Container, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography} from "@material-ui/core";
import {FirestoreCollection} from "@react-firebase/firestore";
import {ExpandLess, ExpandMore, Fastfood} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import {IfFirebaseAuthed} from "@react-firebase/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const DistroHub = ({user}) => {
    const classes = useStyles();
    const [open, setOpen] = useState({});

    const handleClick = (prop) => {
        setOpen({
            [prop]: open.hasOwnProperty(prop) ? !open[prop] : true,
        });
    };

    return (
        <div>
            <Container maxWidth="md">
                <IfFirebaseAuthed>
                    {({user}) => (
                        <Typography variant="h6" gutterBottom>
                            Welcome to the Distro Hub, {user.displayName}!
                        </Typography>
                    )}
                </IfFirebaseAuthed>
                <FirestoreCollection path={process.env.REACT_APP_FIREBASE_FIRESTORE_COLLECTION} orderBy={[{field: 'created', type: 'asc'}]} limit={1000}>
                    {({isLoading, value}) => {
                        return isLoading ? "Loading" : (
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Available from the Hub
                                    </ListSubheader>
                                }
                                className={classes.root}>
                                {value.map(({name, ...rest}) => {
                                    return (
                                        <div key={name}>
                                            <ListItem button onClick={() => handleClick(name)}>
                                                <ListItemIcon>
                                                    <Fastfood/>
                                                </ListItemIcon>
                                                <ListItemText primary={name}/>
                                                {open[name] ? <ExpandLess/> : <ExpandMore/>}
                                            </ListItem>
                                            <Collapse in={open[name]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {Object.keys(rest).map((key) => {
                                                        return (
                                                            <div key={key}>
                                                                <ListItem button className={classes.nested}>
                                                                    <ListItemText primary={key} secondary={String(rest[key])}/>
                                                                </ListItem>
                                                            </div>
                                                        )
                                                    })}
                                                </List>
                                            </Collapse>
                                        </div>
                                    )
                                })}
                            </List>
                        )
                    }}
                </FirestoreCollection>
            </Container>
        </div>
    );
}

export default DistroHub;