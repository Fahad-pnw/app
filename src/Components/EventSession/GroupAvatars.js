import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { openJoinParticipant } from "../../Redux/dialogs";
import { useDispatch } from "react-redux";
import ParticipantAvatar from "../Misc/ParticipantAvatar";

const useStyles = makeStyles((theme) => ({
  participantContainer: {
    marginRight: theme.spacing(2),
    cursor: "pointer",
    width: 46,
  },
  participantDetails: {
    flexGrow: 1,
    textAlign: "center",
    marginTop: 4,
  },
  avatar: {
    marginTop: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  name: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    width: 46,
  },
}));

export default function (props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { group } = props;

  const handleAvatarClick = React.useCallback((participant) => () => dispatch(openJoinParticipant(participant)), [
    dispatch,
  ]);
  return (
    <React.Fragment>
      {group.map((participant) => {
        if (!participant) return null;
        return (
          // <Tooltip key={participant.id} title={`${participant.firstName} ${participant.lastName}`}>
          <div key={participant.id} className={classes.participantContainer} onClick={handleAvatarClick(participant)}>
            {/* {participant.avatarUrl && (
                <Avatar alt={participant.firstName} src={participant.avatarUrl} className={classes.avatar} />
              )}
              {!participant.avatarUrl && (
                <Avatar className={classes.avatar}>
                  {participant.firstName.charAt(0)}
                  {participant.lastName.charAt(0)}
                </Avatar>
              )} */}
            <ParticipantAvatar participant={participant} />
            <div className={classes.participantDetails}>
              <Typography variant="caption" className={classes.name}>
                {`${participant.firstName} ${
                  participant.lastName.trim() !== "" ? participant.lastName.charAt(0) + "." : ""
                }`}
              </Typography>
            </div>
          </div>
          //</Tooltip>
        );
      })}
    </React.Fragment>
  );
}
