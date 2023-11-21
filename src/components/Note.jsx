import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Note = (props) => {
  let { id, title, content, editNoteBtn, delNoteBtn } = props;

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" noWrap>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="info"
          className="editBtn"
          data-id={id}
          onClick={editNoteBtn.bind(this)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          className="delBtn"
          data-id={id}
          onClick={delNoteBtn.bind(this)}
        >
          Delete
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box>
      <Card
        variant="outlined"
        sx={{ minWidth: 200, minHeight: 150, maxHeight: 150 }}
      >
        {card}
      </Card>
    </Box>
  );

  //   return (
  //     <>
  //       <div className="note">
  //         <h1>{title}</h1>
  //         <p>{content}</p>
  //         <div>
  //           <button
  //             className="app-btn"
  //             onClick={editNote.bind(this)}
  //             data-id={id}
  //           >
  //             Edit
  //           </button>
  //           <button
  //             className="app-btn"
  //             onClick={deleteNote.bind(this)}
  //             data-id={id}
  //           >
  //             Delete
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   );
};

export default Note;
