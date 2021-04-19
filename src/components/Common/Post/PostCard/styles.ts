import {makeStyles} from "@material-ui/core/styles";

const CARD_SQUARE = 286;
export const postCardStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: 0,
    },
    card: {
        width: '100%',
        display: "inline-block",
        maxWidth: 440,
        minWidth: CARD_SQUARE,
        minHeight: CARD_SQUARE,
    },
    action: {
        height: '100%',
        minHeight: CARD_SQUARE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    media: {
        width: '100%',
        height: 140,
        objectFit: 'cover',
    },
    content: {
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(1),
    },
    detailContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(1),
        bottom: 0,
    },
    userInfo: {
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    detail: {
        color: theme.palette.text.secondary,
        paddingRight: theme.spacing(1),
    },
    postedBy: {
        height: '100%',
    },
}));
