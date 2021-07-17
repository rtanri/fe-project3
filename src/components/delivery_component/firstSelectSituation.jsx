import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
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

export default function SelectSituation() {
  const classes = useStyles();
  return (
    <div className="flexbox-column main-body">
      <h1 className="">What kind of relationship do you have?</h1>
      <p className={classes.subTitle}>
        Let us handle the sentimental items collection and delivery for you
      </p>
      <div className="flexbox-row">
        <RelationshipCard
          title="One Night Love"
          context="Mostly with 1-2 items that you feel too shy to give or ask for return in person"
          image={imageUrlMapping.oneNightLove}
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
        />
      </div>
    </div>
  );
}

function RelationshipCard({ title, context, image }) {
  const classes = useStyles();

  return (
    <Link to={"/add-item"} className={classes.cardStyling}>
      <Card>
        <CardActionArea>
          <CardMedia className={classes.cardImage} image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {context}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
