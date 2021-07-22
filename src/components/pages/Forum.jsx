import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { TextField, Button, Divider } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles(theme => ({
  cardStyling: {
    maxWidth: 500,
    marginBottom: 20,
    border: "1px solid #eaeaea",
  },
  avatar: {
    backgroundColor: "#111B47",
  },
  formInput: {
    width: 390,
    marginRight: 10,
    display: "inline-flex",
  },
  mainCard: {},
  commentCard: {
    margin: 0,
    padding: 0,
  },
  repliedCommentText: {
    border: "1px solid #eaeaea",
    padding: 10,
    marginTop: 0,
  },
  commentFlexbox: {
    display: "flex",
    alignItems: "flex-start",
    paddingTop: 10,
  },
  commentAvatar: {
    marginTop: 10,
    backgroundColor: "coral",
  },
}));

let posts = [
  {
    id: "1",
    user: "Energetic Pomerian",
    create_at: "July 5, 2021",
    context:
      "I feel very down when she said she want to broke up with me because the time is not right. Well, she did mention that she want to focus on her study in University especially in final year. Recently situation between us was not good because of the stress she got from final year project and I always demand more time on her weekends.",
  },
  {
    id: "2",
    user: "Spicy Duck",
    create_at: "July 7, 2021",
    context:
      "My ex-boyfriend keep calling me fat, he's so mean. But i like eating more than him. Good bye ex",
  },
  {
    id: "3",
    user: "Worry Koala",
    create_at: "July 9, 2021",
    context:
      "Just finished my toxic relationship, feels so good and so much freedom. Do you think i should watch Black Widow with my family or new potential girlfriend?",
  },
];

let comments = [
  {
    id: "123",
    user: "Super Flamingo",
    post_id: "1",
    create_at: "July 9, 2021",
    context:
      "Bro, i feel you, you can try to eat more pizza and be happy. Try new stuff crust hawaiian pizza",
  },
  {
    id: "912",
    user: "Super Flamingo",
    post_id: "3",
    create_at: "July 10, 2021",
    context:
      "I can say it is a family movie, try to bring your most annoying siblings to watch with you.",
  },
  {
    id: "542",
    user: "Super Flamingo",
    post_id: "3",
    create_at: "July 9, 2021",
    context: "Super like Natasha Romanov life story. Four thumbs up!",
  },
];

function Forum() {
  const [newPost, setNewPost] = useState("");
  const [allPosts, setAllPosts] = useState(posts);

  // console.log(posts);
  const displayPost = () => {
    posts.map(post => {
      return <Post props={post} />;
    });
  };

  return (
    <div className="main-body">
      <h1 align="center">FreshStart Forum</h1>
      <div className="post-list flexbox-column-forum">{displayPost}</div>
    </div>
  );
}

function Post(comments, props) {
  const classes = useStyles();
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(comments);

  const handleCommentSubmit = () => {
    toast("Comment button is clicked");
  };

  return (
    <Card className={classes.cardStyling}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>E</Avatar>}
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
            value={newComment}
            className={classes.formInput}
            onChange={e => {
              setNewComment(e.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ display: "inline" }}
            onClick={handleCommentSubmit}
          >
            Post
          </Button>
        </form>
      </CardActions>
      <Comment />
      <Comment />
    </Card>
  );
}

function Comment() {
  const classes = useStyles();

  const handleStyling = () => {
    const commentPadding = document.querySelectorAll(
      ".MuiCardContent-root:last-child"
    );
    for (let i = 0; i < commentPadding.length; i++) {
      commentPadding[i].style.paddingBottom = 0;
    }
  };

  useEffect(() => {
    handleStyling();
  }, []);

  return (
    <Card classes={classes.mainCard}>
      <CardContent className={classes.commentCard}>
        <ListItem className={classes.commentFlexbox}>
          <ListItemAvatar>
            <Avatar className={classes.commentAvatar}>S</Avatar>
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
