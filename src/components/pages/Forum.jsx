import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
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
  jsonState: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
}));

let postsData = [
  {
    id: "0",
    user: "Energetic Pomerian",
    create_at: "July 5, 2021",
    context:
      "I feel very down when she said she want to broke up with me because the time is not right. Well, she did mention that she want to focus on her study in University especially in final year. Recently situation between us was not good because of the stress she got from final year project and I always demand more time on her weekends.",
  },
  {
    id: "1",
    user: "Spicy Duck",
    create_at: "July 7, 2021",
    context:
      "My ex-boyfriend keep calling me fat, he's so mean. But i like eating more than him. Good bye ex",
  },
  {
    id: "2",
    user: "Worry Koala",
    create_at: "July 9, 2021",
    context:
      "Just finished my toxic relationship, feels so good and so much freedom. Do you think i should watch Black Widow with my family or new potential girlfriend?",
  },
];

let commentsData = [
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

//source of post - https://jsonplaceholder.typicode.com/posts
//source of comment - https://jsonplaceholder.typicode.com/comments

function Forum() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ user: "", context: "" });

  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts", {
  //       params: {
  //         _limit: 5,
  //       },
  //     })
  //     .then(res => {
  //       console.log(res);
  //       setPosts(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    setPosts(postsData);
  }, []);

  const handlePostSubmit = () => {
    toast("Post button is clicked");
    // set the postId
    const postId = posts.length;

    //ingest the new post into postData array
    let createNewPost = {
      id: postId,
      user: newPost.user,
      create_at: "July 23, 2021",
      context: newPost.context,
    };

    postsData.push(createNewPost);

    //empty the input-box
    setNewPost({ user: "", context: "" });
  };

  return (
    <div className="main-body">
      <h1 align="center">FreshStart Forum</h1>
      <div className="post-list flexbox-column-forum">
        <div>
          <form>
            <TextField
              id="user_comment"
              label="Username"
              variant="outlined"
              size="small"
              value={newPost.user}
              className={classes.formInput}
              onChange={e => {
                setNewPost({ ...newPost, user: e.target.value });
              }}
            />
            <TextField
              id="comment"
              label="Write Post Content..."
              variant="outlined"
              size="small"
              value={newPost.context}
              className={classes.formInput}
              onChange={e => {
                setNewPost({ ...newPost, context: e.target.value });
              }}
            />
            <Button
              type="button"
              variant="contained"
              color="secondary"
              style={{ display: "inline" }}
              onClick={handlePostSubmit}
            >
              Post
            </Button>
            <p className={classes.jsonState}>{JSON.stringify(newPost)}</p>
          </form>
        </div>
        {posts.map(post => (
          // <Post userId={post.userId} content={post.title} />
          <Post key={post.id} title={post.user} body={post.context} />
        ))}
      </div>
    </div>
  );
}

function Post({ title, body }) {
  const classes = useStyles();
  const [newComment, setNewComment] = useState({ user: "", context: "" });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(commentsData);
  }, []);

  const handleCommentSubmit = () => {
    toast("Comment button is clicked");
    // set the postId
    const commentId = comments.length;

    //ingest the new post into postData array
    let createNewComment = {
      id: commentId,
      user: newComment.user,
      create_at: "July 23, 2021",
      context: newComment.context,
    };

    commentsData.push(createNewComment);

    //empty the input-box
    setNewComment({ user: "", context: "" });
  };

  return (
    <Card className={classes.cardStyling}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>E</Avatar>}
        //title={props.userId}
        title={title}
        subheader="July 5, 2021"
      />

      <CardContent>{body}</CardContent>
      <Divider />
      <CardActions disableSpacing>
        <form>
          <TextField
            id="user_comment"
            label="User"
            variant="outlined"
            size="small"
            value={newComment.user}
            className={classes.formInput}
            onChange={e => {
              setNewComment({ ...newComment, user: e.target.value });
            }}
          />
          <TextField
            id="comment"
            label="Write encouragement..."
            variant="outlined"
            size="small"
            value={newComment.context}
            className={classes.formInput}
            onChange={e => {
              setNewComment({ ...newComment, context: e.target.value });
            }}
          />
          <Button
            type="button"
            variant="contained"
            color="secondary"
            style={{ display: "inline" }}
            onClick={handleCommentSubmit}
          >
            Post
          </Button>
          <p className={classes.jsonState}>{JSON.stringify(newComment)}</p>
        </form>
      </CardActions>
      {comments.map(item => (
        <Comment key={item.id} title={item.user} body={item.context} />
      ))}
    </Card>
  );
}

function Comment({ title, body }) {
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
            primary={title}
            secondary={body}
          />
        </ListItem>
      </CardContent>
    </Card>
  );
}

export default Forum;
