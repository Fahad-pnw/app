import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { joinConversation } from "../../Modules/eventSessionOperations";
import { useSnackbar } from "material-ui-snackbar-provider";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getParticipantsJoined, getLiveGroups, getSessionId, getUserId } from "../../Redux/eventSession";
import Alert from "@material-ui/lab/Alert";
import { isJoinRoomOpen, getJoinRoomEntity, closeJoinRoom } from "../../Redux/dialogs";
import { Typography, Grid } from "@material-ui/core";
import ParticipantAvatar from "../Misc/ParticipantAvatar";
const useStyles = makeStyles((theme) => ({
  content: {
    position: "relative",
    width: theme.breakpoints.values.sm,
    padding: theme.spacing(6),
  },
  closeContainer: {
    position: "absolute",
  },
  buttonContainer: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(2),
  },
  hintText: {
    marginBottom: theme.spacing(4),
    display: "block",
    width: 400,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(2),
  },
  emptySpaceBottom: {
    marginBottom: theme.spacing(4),
  },
  participantContainer: {
    marginBottom: theme.spacing(3),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  avatarsContainer: {
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(0.5),
  },
}));

export default function (props) {
  const classes = useStyles();
  const snackbar = useSnackbar();
  const dispatch = useDispatch();

  const open = useSelector(isJoinRoomOpen);
  const room = useSelector(getJoinRoomEntity, shallowEqual);

  const participantsJoined = useSelector(getParticipantsJoined, shallowEqual);
  const liveGroups = useSelector(getLiveGroups, shallowEqual);
  const sessionId = useSelector(getSessionId);
  const userId = useSelector(getUserId);

  const handleClose = () => {
    dispatch(closeJoinRoom());
  };

  if (!room) {
    return null;
  }

  const handleJoinRoom = (e) => {
    e.preventDefault();
    joinConversation(sessionId, participantsJoined, liveGroups, userId, room.id, snackbar, false);
    handleClose();
  };

  let isMyGroup = room.participants.find((participant) => participant.id === userId) !== undefined;
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <div className={classes.content}>
          <div style={{ marginBottom: isMyGroup ? -16 : 8 }}>
            <Typography color="primary" variant="h4" align="center">
              {room.roomName}
            </Typography>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.avatarsContainer}
              spacing={2}
            >
              {room.participants.map((participant) => {
                return (
                  <div className={classes.avatar}>
                    <ParticipantAvatar participant={participant} />
                  </div>
                );
              })}
              {room.participants.length === 0 && (
                <Typography color="textsecondary">No one is currently on this room!</Typography>
              )}
            </Grid>
          </div>
          {!isMyGroup && (
            <div>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleJoinRoom}>
                  Join Room
                </Button>
              </div>
              <Alert severity="info" className={classes.alert}>
                You will join this room video conferencing call
              </Alert>
            </div>
          )}
          {/* {isMyGroup && <div className={classes.emptySpaceBottom}></div>} */}
        </div>
      </Dialog>
    </div>
  );
}