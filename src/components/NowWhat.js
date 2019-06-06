import React from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import DroneGraph from "./DroneGraph";
import DroneMap from "./DroneMap";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);




const styles = {
  card: {
    margin: "5% 25%"
  }
};

const NowWhat = props => {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader title="Map Visualization" />
        <CardContent>
          <DroneMap></DroneMap>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardHeader title="Graph Visualization" />
        <CardContent>
          <DroneGraph></DroneGraph>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(NowWhat);
