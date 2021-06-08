import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Fade from "@material-ui/core/Fade";


import {
    ResponsiveContainer,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    Area
} from "recharts";

const styles = theme => ({
    radarChart: {
        width: "100%",
        height: 400,
        [theme.breakpoints.between("xs", "sm")]: {
            height: 250,
        },
        [theme.breakpoints.between(1280, 1800)]: {
            height: 250,
        }
    },
    fullHeight: {
        height: "100%"
    },
});


class CoinChartsRadar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            coin_data: props.coin_data
        };
    };

    componentWillReceiveProps(new_props) {

        this.setState({...new_props});
    }

    _custom_tooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Card style={{padding: 12}}>
                    <b>{label}</b><br />
                    <span>Score: {payload[0].value}</span>
                </Card>
            );
        }

        return null;
    };

    render() {

        const { classes, coin_data } = this.state;

        const market_radar_card_data = coin_data !== null ? [
            { domain: "Feeling", score: coin_data.sentiment_votes_up_percentage },
            { domain: "Avr. Score", score: coin_data.coingecko_score },
            { domain: "Dev. score", score: coin_data.developer_score },
            { domain: "Liquidity", score: coin_data.liquidity_score }
        ]: [];

        const market_score_card = coin_data !== null ?
            <Fade in={true}>
                <Card className={classes.fullHeight}>
                    <CardHeader title="Score" />
                    <CardContent>
                        <Fade in timeout={300}>
                            <div className={classes.radarChart}>
                                <ResponsiveContainer>
                                    <RadarChart cx="50%" cy="50%" data={market_radar_card_data} legendType="circle" paddingAngle={1} minAngle={1}>
                                        <PolarGrid/>
                                        <PolarAngleAxis dataKey="domain" />
                                        <PolarRadiusAxis angle={90} />
                                        <Radar name={coin_data.name} dataKey="score" stroke="#131162" fill="#131162"  dot={false} strokeWidth={3} activeDot={{ strokeWidth: 0, r: 6 }} fillOpacity={0.3} />
                                        <Tooltip content={data => this._custom_tooltip(data)}/>
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </Fade>
                    </CardContent>
                </Card>
            </Fade>: null;

        return (
            <div className={classes.fullHeight}>{market_score_card}</div>
        );
    }
}

export default withStyles(styles)(CoinChartsRadar);
