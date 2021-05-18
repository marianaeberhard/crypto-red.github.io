import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from "@material-ui/core/Divider";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import SecurityIcon from '@material-ui/icons/Security';
import FeedbackIcon from '@material-ui/icons/Feedback';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import api  from "../utils/api";
import actions from "../actions/utils";
import InnerToolbar from "../components/InnerToolbar";
import DrawerContent from "../components/DrawerContent";

import { HISTORY } from "../utils/constants";
import Jdenticon from "react-jdenticon";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    swipeableDrawer: {
        width: 256,
        flexShrink: 0,
        [theme.breakpoints.up('md')]: {
            display: "none"
        }
    },
    drawerPaper: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        width: 256
    },
    drawerButton: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            display: "none"
        }
    },
    accountButton: {
        marginLeft: theme.spacing(1),
    },
    accountButtonHidden: {
        marginLeft: theme.spacing(1),
        opacity: 0
    },
    drawerToolbarSpacer: {
        minWidth: 256 - theme.spacing(2+2),
        height: 64,
        lineHeight: "64px",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
        marginRight: theme.spacing(1),
        cursor: "pointer"
    },
    swipeableDrawerToolbar: {
        height: 64,
        lineHeight: "64px",
        marginRight: theme.spacing(1),
        cursor: "pointer"
    },
    appLogo: {
        verticalAlign: "middle",
        marginRight: theme.spacing(1)
    },
    appTitle: {
        verticalAlign: "middle",
        fontWeight: "bold",
        fontFamily: "Saira"
    },
    swipeableDrawerAppTitle: {
        verticalAlign: "middle",
        fontWeight: "bold",
        fontFamily: "Saira"
    },
    avatar: {
        backgroundColor: "transparent",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(-1.5),
        padding: theme.spacing(1.5),
        height: 48,
        width: 48,
        cursor: "pointer",
        "& div": {
            display: "inherit"
        }
    },
});

class AppToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            pathname: props.pathname,
            panic_mode: props.panic_mode,
            logged_account: props.logged_account,
            know_if_logged: props.know_if_logged,
            _history: HISTORY,
            _swipeable_app_drawer_open: false,
            _account_menu_anchor_element: null,
            
            
        };
    };

    componentWillReceiveProps(new_props) {

        this.setState({...new_props});
    }

    _handle_open_swipeable_app_drawer = () => {
        
        this.setState({_swipeable_app_drawer_open: true});
    };

    _handle_close_swipeable_app_drawer = () => {

        this.setState({_swipeable_app_drawer_open: false});
    };

    _open_account_menu = (event) => {
      
        this.setState({_account_menu_anchor_element: event.currentTarget});
    };

    _close_account_menu = () => {

        this.setState({_account_menu_anchor_element: null});
    };

    _open_home = () => {

        const { _history } = this.state;
        _history.push("/");
    };

    _open_settings = () => {

        const { _history } = this.state;
        _history.push("/settings");
    };

    _open_accounts = () => {

        const { _history } = this.state;
        _history.push("/accounts");
    };

    _send_feedback = () => {

        window.open("https://github.com/crypto-red/crypto-red.github.io/discussions/categories/feedback");
    };

    _exit_to_app = () => {

        api.reset_all_databases(function(){

            window.location.reload();
        });
    };

    _show_double_click_snackbar = () => {

        actions.trigger_snackbar("You must double click to reset everything!");
    };

    render() {

        const { classes, pathname, know_if_logged, _swipeable_app_drawer_open, _account_menu_anchor_element, logged_account, panic_mode } = this.state;

        return (
            <div>

                <SwipeableDrawer
                    anchor="left"
                    className={classes.swipeableDrawer}
                    classes={{paper: classes.drawerPaper}}
                    open={_swipeable_app_drawer_open}
                    onOpen={this._handle_open_swipeable_app_drawer}
                    onClose={this._handle_close_swipeable_app_drawer}>
                        <Toolbar className={classes.appBar}>
                            <div className={classes.swipeableDrawerToolbar} onClick={this._open_home}>
                                <span className={classes.swipeableDrawerAppTitle}>WALLET.CRYPTO.RED</span>
                            </div>
                        </Toolbar>
                        <DrawerContent pathname={pathname} onClose={this._handle_close_swipeable_app_drawer}/>
                </SwipeableDrawer>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.drawerButton} color="inherit" aria-label="menu" onClick={this._handle_open_swipeable_app_drawer}>
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.drawerToolbarSpacer}  onClick={this._open_home}>
                            <span className={classes.appTitle}>WALLET.CRYPTO.RED</span>
                        </div>
                        <InnerToolbar know_if_logged={know_if_logged} logged_account={logged_account} pathname={pathname} />
                        <Fade in={know_if_logged}>
                            {
                                logged_account ?
                                    <Tooltip title={logged_account.name} aria-label="Account's name">
                                        <Avatar aria-label="Acronym"
                                                className={classes.avatar}
                                                onClick={this._open_account_menu}>
                                            <Jdenticon size="24" value={logged_account.name}/>
                                        </Avatar>
                                    </Tooltip> :
                                    <IconButton className={know_if_logged ? classes.accountButton: classes.accountButtonHidden}
                                                edge="end"
                                                aria-label="account of current user"
                                                aria-haspopup="true"
                                                color="inherit"
                                                onClick={this._open_account_menu}>
                                        <AccountCircleIcon/>
                                    </IconButton>
                            }
                        </Fade>
                        <Menu anchorEl={_account_menu_anchor_element}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right',}}
                            open={Boolean(_account_menu_anchor_element)}
                            onClose={this._close_account_menu} >
                            <MenuItem onClick={this._open_accounts}>
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="All accounts"/>
                            </MenuItem>
                            <MenuItem onClick={this._open_settings}>
                                <ListItemIcon>
                                    <SettingsIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Settings"/>
                            </MenuItem>
                            {
                                Boolean(panic_mode) ?
                                <div>
                                    <Divider />
                                    <MenuItem onClick={this._exit_to_app}>
                                        <ListItemIcon>
                                            <SecurityIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="RESET"/>
                                    </MenuItem>
                                </div>: null
                            }

                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(AppToolbar);