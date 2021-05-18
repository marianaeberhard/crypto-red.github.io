import React from "react";
import { withStyles } from "@material-ui/core/styles";

import FlashInfo from "../components/FlashInfo";
import { HISTORY } from "../utils/constants";


import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ShareIcon from '@material-ui/icons/Share';
import FeedbackIcon from "@material-ui/icons/Feedback";

import ShareDialog from "../components/ShareDialog";

const styles = theme => ({
    root: {
    },
    backgroundImage: {
        minHeight: "calc(100vh - 160px)",
        backgroundImage: "url(/src/images/wallet-dark-2.svg)",
        position: "relative",
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "content-box",
        padding: theme.spacing(8)
    },
    flashInfoContainer: {
        padding: theme.spacing(2, 2, 0, 2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0)
        },
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    quoteContainer: {
        margin: theme.spacing(2, 2),
        position: "absolute",
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(192, 192, 192, .5)",
        borderRadius: 4,
    },
    backdrop: {
        zIndex: 1310,
    },
    speedDialFab: {
        zIndex: 1311,
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        "& .MuiSpeedDial-fab": {
            backgroundColor: theme.palette.primary.action,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.primary.action,
            },
        }
    },
});


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _history: HISTORY,
            _is_speed_dial_open: false,
            _is_share_dialog_open: false,
            _random: Math.floor(Math.random() * 10)
        };
    };

    _go_to_url = (event, url) => {

        const { _history } = this.state;
        _history.push(url);
    };


    _handle_share_dialog_close = () => {

        this.setState({_is_share_dialog_open: false});
    };

    _handle_share_dialog_open = () => {

        this.setState({_is_share_dialog_open: true});
    };

    _handle_speed_dial_close = () => {

        this.setState({_is_speed_dial_open: false});
    };

    _handle_speed_dial_open = () => {

        this.setState({_is_speed_dial_open: true});
    };

    _send_feedback = () => {

        window.open("https://github.com/crypto-red/crypto-red.github.io/discussions/categories/feedback");
    };

    _handle_speed_dial_action = (event, action) => {

        switch (action) {

            case "share":
                this._handle_share_dialog_open();
                break;

            case "feedback":
                this._send_feedback();
                break;
        }
    };

    render() {

        const { classes, _is_speed_dial_open, _random, _is_share_dialog_open } = this.state;

        let quote = null;

        switch (_random) {

            case 1:
                quote =
                    <blockquote>
                        “You, the people have the power - the power to create machines. The power to create happiness! You, the people, have the power to make this life free and beautiful, to make this life a wonderful adventure.”<br />
                        ― Charlie Chaplin
                    </blockquote>;
                break;
            case 2:
                quote =
                    <blockquote>
                        “Know that the heavens were created to descend into the five elemental manifestations. One piece, a small mirror of all others. It is all the same. All the same. Each piece of existence is its own small universe.”<br />
                        ― Unknown
                    </blockquote>;
                break;
            case 3:
                quote =
                    <blockquote>
                        “What we now want is closer contact and better understanding between individuals and communities all over the earth, and the elimination of egoism and pride which is always prone to plunge the world into primeval barbarism and strife... Peace can only come as a natural consequence of universal enlightenment...”<br />
                        ― Nikola Tesla
                    </blockquote>;
                break;
            case 4:
                quote =
                    <blockquote>
                        “Bitcoin is a remarkable cryptographic achievement and the ability to create something that is not duplicate in the digital world has enormous value.”<br />
                        ― Eric Schmidt
                    </blockquote>;
                break;
            case 5:
                quote =
                    <blockquote>
                        “Man is least himself when he talks in his own person. Give him a mask, and he will tell you the truth.”<br />
                        ― Oscar Wilde
                    </blockquote>;
                break;
            case 6:
                quote =
                    <blockquote>
                        “Being able to talk to people over long distances, to transmit images, flying, accessing vast amounts of data like an oracle. These are all things that would have been considered magic a few hundred years ago. So engineering is for all intents and purposes, magic, and who wouldn't want to be a magician?”<br />
                        ― Elon Musk
                    </blockquote>;
                break;
            case 7:
                quote =
                    <blockquote>
                        “If the word government literally means "to control the mind," wouldn't learning to control your own mind negate the opportunity for outside government? You see, it's the simple act of asking questions that exemplifies the Achilles heel of the control system; you can condition animals, but if humans ask questions, they can learn the path to freedom.”<br />
                        ― Unknown
                    </blockquote>;
                break;
            case 8:
                quote =
                    <blockquote>
                        “Truth cannot be taught. It must be experienced. Place always the inner light of understanding above the outer light of common dogma.”<br />
                        ― Unknown
                    </blockquote>;
                break;
            default:
                quote =
                    <blockquote>
                        “You know what, sometimes I really do not know what needs to be done here on earth to get the people moving because they are still sitting in their chair. And I do not refer to violent rebellion of some kind. No, I am talking about making connection. Unite.”<br />
                        ― Unknown
                    </blockquote>;
                break;

        }

        return (
            <div className={classes.root}>
                <ShareDialog
                    open={_is_share_dialog_open}
                    onClose={this._handle_share_dialog_close}/>
                <Backdrop
                    className={classes.backdrop}
                    open={_is_speed_dial_open} />
                <SpeedDial
                    ariaLabel="Home speed dialogue"
                    className={classes.speedDialFab}
                    icon={<SpeedDialIcon />}
                    onClose={this._handle_speed_dial_close}
                    onOpen={this._handle_speed_dial_open}
                    open={_is_speed_dial_open}
                >
                    <SpeedDialAction
                        key="share"
                        icon={<ShareIcon />}
                        tooltipTitle="Share"
                        tooltipOpen
                        onClick={(event) => {this._handle_speed_dial_action(event, "share")}}
                    />
                    <SpeedDialAction
                        key="feedback"
                        icon={<FeedbackIcon />}
                        tooltipTitle="Feedback"
                        tooltipOpen
                        onClick={(event) => {this._handle_speed_dial_action(event, "feedback")}}
                    />
                </SpeedDial>
                <div className={classes.flashInfoContainer}>
                    <FlashInfo image="/src/images/wallet.svg" text="Ready to start now? Create a new anonymous wallet!" button="ACCOUNTS" onClick={(event) => this._go_to_url(event, "/accounts")}/>
                </div>
                <div className={classes.backgroundImage}>
                    <div className={classes.quoteContainer}>
                        {quote}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);