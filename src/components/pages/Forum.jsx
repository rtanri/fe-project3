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
    padding: 10,
    border: "1px solid #111B47",
    boxShadow: "5px 10px #6f7cb2",
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

function Forum(props) {
  let history = useHistory();
  const classes = useStyles();
  const [myToken, setMyToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [context, setContext] = useState("");

  useEffect(() => {
    authenticateUser();
    fetchListOfPosts();
  }, []);

  const authenticateUser = () => {
    console.log(props.cookies);
    const token = props.cookies.get("auth_token");

    if (!token) {
      history.push("/login-user");
      toast("Login user to open forum");
    }
    setMyToken(token);
  };

  const fetchListOfPosts = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/v1/posts`
    );
    console.log(result.data);
    setPosts(result.data);
  };

  const sendAPost = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/v1/posts`,
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
      })
      .finally(async () => {
        await fetchListOfPosts();
      });
  };

  const handlePostSubmit = async () => {
    // toast("Post button is clicked");
    sendAPost();
    setContext("");
    await fetchListOfPosts();
  };

  return (
    <div className="main-body">
      <h1 align="center">FreshStart Forum</h1>
      <div className="post-list flexbox-column-forum">
        <div className="new-post-container">
          <p className="new-post-title">Tell us your story</p>
          <form>
            <TextField
              id="comment"
              label="today i feel ..."
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
            {/* <p className={classes.jsonState}>{JSON.stringify(context)}</p> */}
          </form>
        </div>
        {posts.map(post => (
          // <Post userId={post.userId} content={post.title} />

          <Post
            key={post._id}
            item={post}
            myToken={myToken}
            commentsArr={post.comments}
          />
        ))}
      </div>
    </div>
  );
}

function Post({ item, myToken }) {
  const classes = useStyles();

  //inside post
  const [avatar, setAvatar] = useState("");
  const [context, setContext] = useState("");
  const [username, setUsername] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postId, setPostId] = useState("");
  const [commentsId, setCommentsId] = useState([]);

  // comment
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    setInitialData();
    // if (postId) {
    //   fetchListOfComment(postId);
    // }
  }, []);

  const setInitialData = async () => {
    try {
      console.log(item.comments);
      setCommentsId(item.comments);

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
    } catch (err) {
      console.log(err);
    }
    if (item._id) {
      await fetchListOfComment(item._id);
    } else {
      console.log("PostId cannot be found");
    }
  };

  const fetchListOfComment = async anyPostId => {
    console.log("fetch list of comment");
    // toast("fetch comment by post id");
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/v1/comments/${anyPostId}`
    );
    console.log(result.data);
    setComments(result.data);
  };

  const sendAComment = () => {
    console.log("send Comment");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/v1/comments/${postId}`,
        { context: commentContent },
        {
          headers: {
            token: myToken,
          },
        }
      )
      .then(response => {
        console.log("comment is successful");
      })
      .catch(err => {
        toast(err.response.data.message);
        console.log(err.response);
      })
      .finally(async () => {
        await fetchListOfComment(postId);
      });
  };

  const handleCommentSubmit = async anyPostId => {
    // toast("Say button is clicked");
    await sendAComment();
    setCommentContent("");
    console.log("anyPostId");
    console.log(anyPostId);
    await fetchListOfComment(anyPostId);
  };

  return (
    <Card className={classes.cardStyling}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{avatar}</Avatar>}
        //title={props.userId}
        title={username}
        subheader={postDate}
        titleTypographyProps={{ variant: "h6" }}
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
            onClick={() => handleCommentSubmit(postId)}
          >
            Say
          </Button>
          {/* <p className={classes.jsonState}>{JSON.stringify(commentContent)}</p> */}
        </form>
      </CardActions>
      {comments.map(item => (
        <Comment key={item._id} item={item} />
      ))}
    </Card>
  );
}

function Comment({ item }) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState("");
  const [context, setContext] = useState("");
  const [username, setUsername] = useState("");
  const [postDate, setPostDate] = useState("");

  useEffect(() => {
    setInitialData();
    handleStyling();
  }, []);

  const setInitialData = async () => {
    console.log("set initial comment data");
    console.log(item);
    if (item.username) {
      const titleString = item.username;
      const username = `@${titleString}`;
      setUsername(username);
      const avatarName = titleString.slice(0, 1).toUpperCase();
      setAvatar(avatarName);
    }

    const dateRaw = item.createdAt.slice(0, 10);
    const postDate = new Date(dateRaw).toString().slice(0, 15);
    setPostDate(postDate);

    const context = item.context;
    setContext(context);
  };

  const handleStyling = () => {
    const commentPadding = document.querySelectorAll(
      ".MuiCardContent-root:last-child"
    );
    for (let i = 0; i < commentPadding.length; i++) {
      commentPadding[i].style.paddingBottom = 0;
    }
  };

  return (
    <Card classes={classes.mainCard}>
      <CardContent className={classes.commentCard}>
        <ListItem className={classes.commentFlexbox}>
          <ListItemAvatar>
            <Avatar className={classes.commentAvatar}>{avatar}</Avatar>
          </ListItemAvatar>
          <div className="comment-context-box">
            <p className="forum-username">
              {username} <span className="forum-date">{postDate}</span>
            </p>
            {/* <p className="forum-date">{postDate}</p> */}
            <p className="forum-context">{context}</p>
          </div>
        </ListItem>
      </CardContent>
    </Card>
  );
}

export default withCookies(Forum);
