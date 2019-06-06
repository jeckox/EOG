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

const avatarStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});


const styles = {
  card: {
    margin: "5% 25%"
  }
};

const NowWhat = props => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardHeader title="Map Visualization" />
      <CardContent>
        <DroneMap></DroneMap>
      </CardContent>
      <CardHeader  title="Graph Visualization" />
      <CardContent>
          <DroneGraph></DroneGraph>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(NowWhat);
