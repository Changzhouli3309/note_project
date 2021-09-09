const NoteService = {
  getNotes: async () => {
    try {
      const res = await fetch("/user/getnotes");
      if (res.status !== 401) {
        const data = await res.json();
        return data;
      } else {
        return {
          message: { msgBody: "Unauthorized to get notes", msgError: true },
        };
      }
    } catch (error) {
      return { error: error };
    }
  },
  newNote: async (note) => {
    try {
      const res = await fetch("/user/newnote", {
        method: "post",
        body: JSON.stringify(note),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.status !== 401) {
        const data = await res.json();
        return data;
      } else {
        return {
          message: { msgBody: "Unauthorized to add note", msgError: true },
        };
      }
    } catch (error) {
      return { error: error };
    }
  },
  updateNote: async (note) => {
    try {
      const res = await fetch("/user/updatenote/" + note.id, {
        method: "put",
        body: JSON.stringify(note),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.status !== 401) {
        const data = await res.json();
        return data;
      } else {
        return {
          message: { msgBody: "Unauthorized to update note", msgError: true },
        };
      }
    } catch (error) {
      return { error: error };
    }
  },
  deleteNote: async (noteid) => {
    try {
      const res = await fetch("/user/deletenote/" + noteid, {
        method: "delete",
        headers: { "Content-type": "application/json" }
      }
      );
      if (res.status !== 401) {
        const data = await res.json();
        return data;
      } else {
        return {
          message: { msgBody: "Unauthorized to delete note", msgError: true },
        };
      }
    } catch (error) {
      return { error: error };
    }
  },
};

export default NoteService;
