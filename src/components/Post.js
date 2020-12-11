import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from './Avatar';
import { makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import CardMedia from '@material-ui/core/CardMedia';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';
import Comments from './Comments';


const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarAndName: {
    display: 'flex',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  nameSection: {
    marginLeft: '5px',
    display: 'flex',
    flexDirection: 'column'
  },
  actionBar: {
    display: 'flex',
  },

  hand: {
    cursor: 'pointer'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#ccc',
    border: '2px solid #000',
    boxShadow: '#eee',
    top: `50%`,
    left: `50%`,
    transform: `translate(-${50}%, -${50}%)`,
    // padding: theme.spacing(2, 4, 3),
  },

  postContainer: {
    border: 'solid 1px #ccc',
    marginBottom: '8px',
    marginTop: '8px'
  }

});

export default function Post({
  location,
  username = "Abbas",
  caption = 'hello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, world',
  comments = [
    {
      id: '1',
      username: 'Afshin',
      text: 'hello, worldhello, worldhello, worldhello, w',
    },
    {
      id: '2',
      username: 'Afshin',
      text: 'hello, worldhello, worldhello, worldhello, w',
    },
    {
      id: '3',
      username: 'Afshin',
      text: 'hello, worldhello, worldhello, worldhello, w',
    },
  ],
  liked,
  usersLiked = [
    {
      id: '1',
      username: 'reza',
      avatar: 'http://www.unsplash.it/48/48'
    }
  ],
  image = '/picture.jpg',
  date,
  saved
}) {

  const [expanded, setExpanded] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [openLikes, setOpenLikes] = useState(false);
  const [commentText, setCommentText] = useState('');

  function handleClose() {
    setOpenComments(false);
    setOpenLikes(false);
  }

  const {
    container,
    nameSection,
    avatarAndName,
    media,
    hand,
    actionBar,
    postContainer,
    paper } = useStyles();

  let captionToDisplay = caption;
  let truncated = false;
  if (captionToDisplay.length > 100) {
    captionToDisplay = captionToDisplay.split('').slice(0, 100).join('') + ' ...';
    truncated = true;
  }

  const commentsAvailable = comments.length !== 0;

  const body = (
    <div className={paper}>
      <Comments data={comments} />
    </div>
  );

  return (
    <div className={postContainer}>
      <Box component="div" m={1} className={container}>
        <div className={avatarAndName}>
          <Avatar />
          <Box className={nameSection}>
            <Typography variant="body2">
              name
            </Typography>
            <Typography variant="body2">
              Location
            </Typography>
          </Box>
        </div>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
      {/* <img src={image} alt={username} /> */}
      <CardMedia
        className={media}
        image={image}
        title="Paella dish"
      />
      <div className={container}>
        <div className={actionBar}>
          <IconButton>
            {liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton onClick={() => setOpenComments(true)}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton>
            <SendIcon />
          </IconButton>
        </div>
        <IconButton>
          {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </div>
      {usersLiked.length !== 0 && <Box m={1} className={hand} onClick={() => setOpenLikes(true)}>
        <Typography variant="subtitle2">
          {usersLiked.length} likes
        </Typography>
      </Box>}
      <Box m={1}>
        <Typography variant="h6" component='span'>
          {username}:
        </Typography>
        <Typography variant="span" component='span'>
          {expanded ? caption : captionToDisplay}
          {truncated && !expanded && <button onClick={() => setExpanded(true)}>more</button>}
        </Typography>
      </Box>
      {commentsAvailable && <Box
        m={1}
        onClick={() => setOpenComments(true)}
        className={hand}
      >
        <Typography variant="h6" component='span'>
          View {comments.length} comments:
        </Typography>
      </Box>}
      {commentsAvailable && <Box m={1}>
        {comments.slice(0, 2).map(comment => (
          <Typography variant="subtitle2" key={comment.id}>
            {comment.username}: {_.truncate(comment.text, { length: 15, omission: '...' })}
          </Typography>
        ))}
      </Box>}
      <Box m={1} className={avatarAndName}>
        <TextField
          fullWidth
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder='Add a comment ...'
        />
        <Button disabled={commentText === ''}>Post</Button>
      </Box>
      <Modal
        open={openComments || openLikes}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>

  )
}
