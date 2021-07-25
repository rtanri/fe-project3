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
import { withCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

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

function Forum(props) {
  let history = useHistory();
  const classes = useStyles();
  const [myToken, setMyToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [context, setContext] = useState("");
  // const [newPost, setNewPost] = useState({ user: "", context: "" });
  // const token = cookie.get("auth_token");

  //get auth token from cookie, if doesnt exist/empty, redirect to login
  useEffect(() => {
    authenticateUser();
  }, [props.cookies]);

  function authenticateUser() {
    // validate and see if token exist
    console.log(props.cookies);
    const token = props.cookies.get("auth_token");

    if (!token) {
      history.push("/login-user");
      toast("Login user to open forum");
    }
    setMyToken(token);
  }

  function sendAPost() {
    toast(1);
    console.log(myToken);
    axios
      .post(
        "http://localhost:4000/api/v1/posts",
        { context },
        {
          headers: {
            token: myToken,
          },
        }
      )
      .then(response => {
        toast(2);
        console.log("post is successful");
      })
      .catch(err => {
        toast(3);
        toast(err.response.data.message);
        console.log(err.response);
      });
  }

  // useEffect (async() => {
  //   //const postsData = await fetchAllPosts()
  //   setPosts(postsData);

  // }, []);

  const handlePostSubmit = () => {
    toast("Post button is clicked");
    sendAPost();
    setContext("");
  };

  return (
    <div className="main-body">
      <h1 align="center">FreshStart Forum</h1>
      <div className="post-list flexbox-column-forum">
        <div>
          <form>
            <TextField
              id="comment"
              label="Write Post Content..."
              variant="outlined"
              size="small"
              value={context}
              className={classes.formInput}
              onChange={e => {
                setContext(e.target.value);
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
            <p className={classes.jsonState}>{JSON.stringify(context)}</p>
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
    // setComments(commentsData);
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

    // commentsData.push(createNewComment);

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

export default withCookies(Forum);
/*
1. frontend: call the data for post based on the dates , limit 5.

2. backend: will send an array of post. 
Each post of the array need to have user property. 
Must also have user name and email. and profile picture.

3. post need to return all comments in array related to the post.
4. each comment need to return the users name and content. 
5. write for axios post and get and render , refresh page with new post.
*/
