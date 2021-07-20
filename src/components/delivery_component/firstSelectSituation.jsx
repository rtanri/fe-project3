import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/button";

const styles = theme => ({
  subTitle: {
    whiteSpace: "nowrap",
    marginTop: 0,
    marginBottom: 80,
  },
  cardStyling: {
    width: "33%",
    marginRight: 10,
    marginLeft: 10,
    paddingBottom: 20,
    paddingTop: 0,
    textDecoration: "none",
  },
  cardImage: {
    height: 250,
  },
});

class SelectSituation extends Component {
  onCardClick = params => {
    this.props.parentCallback(params);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="flexbox-column">
        <h1 className="">What kind of relationship do you have?</h1>
        <p className={classes.subTitle}>
          Let us handle the sentimental items collection and delivery for you
        </p>
        <div className="flexbox-row">
          <Card className={classes.cardStyling}>
            <CardActionArea onClick={e => this.onCardClick(2)}>
              <CardMedia
                className={classes.cardImage}
                image={imageUrlMapping.oneNightLove}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  One Night Love
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Mostly with 1-2 items that you feel too shy to give or ask for
                  return in person
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.cardStyling}>
            <CardActionArea onClick={e => this.onCardClick(5)}>
              <CardMedia
                className={classes.cardImage}
                image={imageUrlMapping.shortTermDates}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Short Term Date
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Max 5 Items - couple spent at least Valentine or Christmas
                  together 1 time
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.cardStyling}>
            <CardActionArea onClick={e => this.onCardClick(10)}>
              <CardMedia
                className={classes.cardImage}
                image={imageUrlMapping.almostBTO}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Almost BTO
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Max 10 items where most couples used to live together
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: 20, marginBottom: 20, width: 150 }}
            onClick={this.props.handleNext}
          >
            Next
          </Button>
          <form>
            <label>Test on address state [success]: </label>
            <input
              onChange={e => this.props.addressCallback(e.target.value)}
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SelectSituation);

/* 
<RelationshipCard
  title="One Night"
  context="Mostly with 1-2 items that you feel too shy to give or ask for return in person"
  image={imageUrlMapping.oneNight}
/>

<RelationshipCard
  title="Short Term Dates"
  context="Going through Valentine or Christmas together at least 1 time"
  image={imageUrlMapping.shortTermDates}
/>


<RelationshipCard
  title="Almost Collect BTO Key"
  context="Mostly with 1-2 items that you feel too shy to give or ask for return in person"
  image={imageUrlMapping.almostBTO}
/> */
