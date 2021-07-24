import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";

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
  selectMenu: {
    width: 200,
    height: 30,
    fontSize: 14,
    paddingLeft: 10,
    border: "1px solid lightgrey",
    borderRadius: 4,
  },
  formLabel: {
    marginTop: 30,
    marginBottom: 30,
  },
});

class SelectSituation extends Component {
  onCardClick = (e, params) => {
    this.props.parentCallback(params);
    console.log(e.target);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="flexbox-column">
        <h1 className="">What kind of relationship do you have?</h1>
        <p className={classes.subTitle}>
          Let us handle the sentimental items collection or delivery for you
        </p>
        <div className="flexbox-row">
          <Card className={classes.cardStyling}>
            <CardActionArea onClick={e => this.onCardClick(e, 2)}>
              <CardMedia
                className={classes.cardImage}
                image={imageUrlMapping.oneNightLove}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  One Night Love
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Max 2 items - you feel too shy to give or ask for return in
                  person
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.cardStyling}>
            <CardActionArea onClick={e => this.onCardClick(e, 5)}>
              <CardMedia
                className={classes.cardImage}
                image={imageUrlMapping.shortTermDates}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  1 or 2 Year Dates
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Max 5 Items - couple spent at least Valentine or Christmas
                  together 1 time
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.cardStyling}>
            <CardActionArea onClick={e => this.onCardClick(e, 10)}>
              <CardMedia
                className={classes.cardImage}
                image={imageUrlMapping.almostBTO}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Almost BTO
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Max 10 items - Life must goes on... some couples used to live
                  together
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

        <form>
          <div className="flexbox-column-start">
            <div className="form-line-input">
              <label className="formLabelSize">Delivery Type: </label>
              <select
                required
                onChange={e => this.props.deliveryCallback(e.target.value)}
                className={classes.selectMenu}
              >
                <option value="">Select type</option>
                <option value="collect">Collecting item</option>
                <option value="return">Returning item</option>
              </select>
            </div>
            <div className="form-line-input">
              <label className="formLabelSize">Address: </label>

              <TextField
                required
                id="address"
                label="Address"
                multiline
                rows={3}
                size="small"
                variant="outlined"
                className="formInput"
                onChange={e => this.props.addressCallback(e.target.value)}
              />
            </div>
          </div>
        </form>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 20, marginBottom: 20, width: 150 }}
          onClick={this.props.handleNext}
        >
          Next
        </Button>
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
