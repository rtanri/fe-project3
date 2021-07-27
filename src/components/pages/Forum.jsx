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
    fetchListOfPosts();
  }, []);

  const authenticateUser = () => {
    // validate and see if token exist
    console.log(props.cookies);
    const token = props.cookies.get("auth_token");

    if (!token) {
      history.push("/login-user");
      toast("Login user to open forum");
    }
    setMyToken(token);
  };

  const fetchListOfPosts = async () => {
    const result = await axios.get("http://localhost:4000/api/v1/posts");
    console.log(result.data);
    setPosts(result.data);
  };

  const sendAPost = () => {
    // console.log(myToken);
    axios
      .post(
        "http://localhost:4000/api/v1/posts",
        { context },
        {
          headers: {
            token: props.cookies.get("auth_token"),
          },
        }
      )
      .then(response => {
        console.log("post is successful");
      })
      .catch(err => {
        toast(err.response.data.message);
        console.log(err.response);
      });
  };

  const handlePostSubmit = () => {
    toast("Post button is clicked");
    sendAPost();
    setContext("");
    // await fetchListOfPosts();
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
              onClick={() => handlePostSubmit()}
            >
              Post
            </Button>
            <p className={classes.jsonState}>{JSON.stringify(context)}</p>
          </form>
        </div>
        {posts.map(post => (
          // <Post userId={post.userId} content={post.title} />

          <Post key={post._id} item={post} myToken={myToken} />
        ))}
      </div>
    </div>
  );
}

function Post({ key, item, myToken }) {
  const classes = useStyles();

  //inside post
  const [avatar, setAvatar] = useState("");
  const [context, setContext] = useState("");
  const [username, setUsername] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postId, setPostId] = useState("");

  // comment
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    setInitialData();
    // fetchListOfComment();
  }, []);

  const setInitialData = async () => {
    const titleString = item.username;
    const username = `@${titleString}`;
    setUsername(username);
    const avatarName = titleString.slice(0, 1).toUpperCase();
    setAvatar(avatarName);

    const dateRaw = item.createdAt.slice(0, 10);
    const postDate = new Date(dateRaw).toString().slice(0, 15);
    setPostDate(postDate);

    const context = item.context;
    setContext(context);

    const postRef = item._id;
    setPostId(postRef);
    await fetchListOfComment();
  };

  const fetchListOfComment = async () => {
    // toast("fetch comment by post id");
    console.log(postId);
    const result = await axios.get(
      "http://localhost:4000/api/v1/posts/comments",
      { postId: postId }
    );
    console.log(result.data);
    setComments(result.data);
  };

  const sendAComment = () => {
    axios
      .post(
        "http://localhost:4000/api/v1/posts/comments",
        { context: commentContent, postId: postId },
        {
          headers: {
            token: myToken,
          },
        }
      )
      .then(response => {
        toast(2);
        console.log("comment is successful");
      })
      .catch(err => {
        toast(err.response.data.message);
        console.log(err.response);
      })
      .finally(async () => {
        await fetchListOfComment();
      });
  };

  const handleCommentSubmit = async () => {
    toast("Post button is clicked");
    sendAComment();
    setCommentContent("");
    await fetchListOfComment();
  };

  return (
    <Card className={classes.cardStyling}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{avatar}</Avatar>}
        //title={props.userId}
        title={username}
        subheader={postDate}
      />

      <CardContent>{context}</CardContent>
      <Divider />
      <CardActions disableSpacing>
        <form>
          <TextField
            id="comment"
            label="Write encouragement..."
            variant="outlined"
            size="small"
            value={commentContent}
            className={classes.formInput}
            onChange={e => {
              setCommentContent(e.target.value);
            }}
          />
          <Button
            type="button"
            variant="contained"
            color="secondary"
            style={{ display: "inline" }}
            onClick={handleCommentSubmit}
          >
            Say
          </Button>
          <p className={classes.jsonState}>{JSON.stringify(commentContent)}</p>
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
