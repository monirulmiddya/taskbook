import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { toast, ToastContainer } from "react-toastify";

import Note from "./Note";
import { TextareaAutosize } from "@mui/material";
import Textarea from "@mui/joy/Textarea";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["title", "content"]);
  const [open, setOpen] = React.useState(false);
  const [impdStatus, setImpdStatus] = React.useState(false);
  const [nid, setNid] = React.useState("");
  const [ntitle, setNtitle] = React.useState("");
  const [ncontent, setNcontent] = React.useState("");

  const handleClickOpen = () => {
    noteFormOpen();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const impdOpen = () => {
    setImpdStatus(true);
  };

  const impdClose = () => {
    setImpdStatus(false);
  };

  const impdSave = (e) => {
    try {
      let ifile = document.getElementById("notes_file").files[0];
      if (ifile) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          let jdata = JSON.parse(evt.target.result) || null;
          if (jdata != null) {
            let lnotes = JSON.parse(localStorage.getItem("notes_list")) || [];
            let imaxid = lnotes.reduce((v, d) => (v = v > d.id ? v : d.id), 0);
            let importedNotes = jdata.filter((d, i) => {
              if (d.id && d.title && d.content) {
                d.id = ++i + imaxid;
                return d;
              }
            });
            localStorage.setItem(
              "notes_list",
              JSON.stringify([...lnotes, ...importedNotes])
            );
            toast.success("Imported successfully");
            setImpdStatus(false);
            fetchNotes();
          } else {
            toast.error("Please select valid json file! try again");
            setImpdStatus(false);
          }
        };
        reader.readAsText(ifile);
      } else {
        toast.error("First select a json file! try again");
        setImpdStatus(false);
      }
    } catch (error) {
      toast.error("Something went wrong! please try again");
      setImpdStatus(false);
    }
  };

  const noteSave = () => {
    try {
      let nid = document.getElementById("note_id").value;
      let title = document.getElementById("note_title").value;
      let content = document.getElementById("note_content").value;
      if (title !== "" && content !== "") {
        let newList = [];
        let update_flag = false;
        if (nid > 0) {
          newList = notes.map((d) => {
            if (d.id == nid) {
              update_flag = true;
              return {
                ...d,
                title,
                content
              };
            } else return d;
          });
        } else {
          let maxid = notes.reduce((v, d) => (v = v > d.id ? v : d.id), 0);
          newList = [
            ...notes,
            {
              id: maxid + 1,
              title,
              content
            }
          ];
        }

        localStorage.setItem("notes_list", JSON.stringify(newList));
        if (update_flag) {
          toast.success("Updated successfully");
        } else {
          toast.success("Save successfully");
        }
        setOpen(false);
        resetForm();
        fetchNotes();
      } else {
        toast.error("Can not be empty title & content");
      }
    } catch (error) {
      toast.error("Something went wrong! please try again");
    }
  };

  const resetForm = () => {
    document.getElementById("note_id").value = "";
    document.getElementById("note_title").value = "";
    document.getElementById("note_content").value = "";
  };

  const noteFormOpen = (id = "", title = "", content = "") => {
    setNid(id);
    setNtitle(title);
    setNcontent(content);
    setOpen(true);
  };

  const editNote = (e) => {
    try {
      let nid = e.target.getAttribute("data-id") || null;
      let list = JSON.parse(localStorage.getItem("notes_list")) || [];
      let match = list.find((d) => d.id == nid) || null;
      if (match != null) {
        noteFormOpen(match.id, match.title, match.content);
      } else {
        toast.error("please try again later");
      }
    } catch (error) {
      toast.error("Something went wrong! please try again");
    }
  };

  const delNote = (e) => {
    try {
      if (confirm("Are you sure want to delete")) {
        let note_id = e.target.getAttribute("data-id");
        let list = JSON.parse(localStorage.getItem("notes_list")) || [];
        if (list.find((v) => v.id == note_id)) {
          let newNotes = list.filter((d) => d.id != note_id);
          localStorage.setItem("notes_list", JSON.stringify(newNotes));
          fetchNotes();
          toast.success("Deleted successfully");
        } else {
          toast.error("Deleting failed");
        }
      }
    } catch (error) {
      toast.error("Something went wrong! please try again");
    }
  };

  const exportNotes = () => {
    try {
      if (confirm("Are you sure?") !== true) {
        return false;
      }
      let jlist = JSON.parse(localStorage.getItem("notes_list")) || null;

      if (jlist != null) {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(jlist)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "notes.json";

        link.click();
      } else {
        toast.error("please try again later");
      }
    } catch (error) {
      toast.error("Something went wrong! please try again");
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }));

  const fetchNotes = () => {
    let list = JSON.parse(localStorage.getItem("notes_list")) || [];
    if (list.length > 0) {
      setNotes(list);
    } else {
      let staticNotes = [
        {
          id: 1,
          title: "Example Note 1",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`
        },
        {
          id: 2,
          title: "Example Note 2",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`
        },
        {
          id: 3,
          title: "Example Note 3",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`
        },
        {
          id: 4,
          title: "Example Note 4",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`
        }
      ];
      localStorage.setItem("notes_list", JSON.stringify(staticNotes));
      setNotes(staticNotes);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const search = (stext) => {
    setQ(stext);
    let items = JSON.parse(localStorage.getItem("notes_list")) || [];
    if (stext) {
      items = items.filter((item) => {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      });
    }
    setNotes(items);
  };

  const noteDialog = (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
      <DialogTitle>Note</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>content</DialogContentText> */}
        <TextField id="note_id" type="hidden" defaultValue={nid} />
        <TextField
          autoFocus
          margin="dense"
          id="note_title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue={ntitle}
          sx={{ mb: 3 }}
        />

        <TextField
          id="note_content"
          label="Notes"
          placeholder="Write somethings..."
          multiline
          rows={10}
          fullWidth
          defaultValue={ncontent}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={noteSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );

  const importDialog = (
    <Dialog open={impdStatus} onClose={impdClose}>
      <DialogTitle>Notes Import</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="notes_file"
          label="Title"
          type="file"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={impdClose}>Cancel</Button>
        <Button onClick={impdSave.bind(this)}>Save</Button>
      </DialogActions>
    </Dialog>
  );

  const noteActions = (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          New Note
        </Button>
        <Button variant="outlined" size="small" onClick={exportNotes}>
          Export
        </Button>
        <Button variant="outlined" size="small" onClick={impdOpen}>
          Import
        </Button>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          type="search"
          size="small"
          value={q}
          onChange={(e) => search(e.target.value)}
        />
      </Grid>
    </>
  );

  return (
    <>
      {noteActions}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {notes.map((d, i) => {
            return (
              <Grid item md={3} key={i}>
                <Note
                  id={d.id}
                  title={d.title}
                  content={d.content}
                  editNoteBtn={editNote}
                  delNoteBtn={delNote}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {importDialog}
      {noteDialog}
    </>
  );
}

export default Notes;
