import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { TextField, Button, Divider } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles(theme => ({
  cardStyling: {
    maxWidth: 450,
    marginBottom: 20,
    border: "1px solid #eaeaea",
  },
  avatar: {
    backgroundColor: "#111B47",
  },
  formInput: {
    width: "350px",
    marginRight: 10,
    display: "inline-flex",
  },
  commentCard: {
    margin: 0,
    padding: 0,
  },
  repliedCommentText: {
    border: "1px solid #eaeaea",
    borderRadius: 5,
    padding: 10,
    marginTop: 0,
  },
  commentFlexbox: {
    display: "flex",
    alignItems: "flex-start",
    paddingTop: 10,
  },
  commnetAvatar: {
    marginTop: 10,
    backgroundColor: "coral",
  },
}));

class Forum extends React.Component {
  render() {
    return (
      <div className="main-body">
        <h1 align="center">FreshStart Forum</h1>
        <div className="post-list flexbox-row-forum">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    );
  }
}

function Post() {
  const classes = useStyles();
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    toast("Comment button is clicked");
  };

  return (
    <Card className={classes.cardStyling}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>E</Avatar>}
        action={
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        }
        title="Energetic Armadillo"
        subheader="July 5, 2021"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          I feel very down when she said she want to broke up with me because
          the time is not right. Well, she did mention that she want to focus on
          her study in University especially in final year. Recently situation
          between us was not good because of the stress she got from final year
          project and I always demand more time on her weekends.
        </Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <form>
          <TextField
            id="comment"
            label="Write encouragement..."
            variant="outlined"
            size="small"
            value={comment}
            className={classes.formInput}
            onChange={e => {
              setComment(e.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ display: "inline" }}
          >
            Post
          </Button>
        </form>
      </CardActions>
      <Comment />
    </Card>
  );
}

function Comment() {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.commentCard}>
        <ListItem className={classes.commentFlexbox}>
          <ListItemAvatar>
            <Avatar className={classes.commnetAvatar}>S</Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.repliedCommentText}
            primary="Super Flamingo"
            secondary="Bro, i feel you, you can try to eat more pizza and be happy"
          />
        </ListItem>
      </CardContent>
    </Card>
  );
}

export default Forum;
