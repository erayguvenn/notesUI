import { useEffect, useState } from "react";
import Header from "../components/Header";
import { CreateNote, DeleteNote, GetAllNotes } from "../services/note";
import useAuthStore from "../store/auth";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {
  RiSearchLine,
  RiDeleteBin5Line,
  RiAddCircleFill,
  RiEdit2Fill,
} from "react-icons/ri";
import produce from "immer";
import NoteView from "../components/NoteView";

function zeroPad(str) {
  return String(str).length < 2 ? "0" + str : String(str);
}

function parseDate(dateStr) {
  const date = new Date(dateStr);

  const days = zeroPad(date.getDate());
  const months = zeroPad(date.getMonth() + 1);
  const years = zeroPad(date.getFullYear());

  const minutes = zeroPad(date.getMinutes());
  const hours = zeroPad(date.getHours());

  return `${days}/${months}/${years} ${hours}:${minutes}`;
}

function HomePage() {
  const token = useAuthStore((state) => state.token);

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [createNoteBody, setCreateNoteBody] = useState("");
  const [createNoteTitle, setCreateNoteTitle] = useState("");

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await GetAllNotes(token, searchQuery);
        setNotes([...notes]);
      } catch (err) {
        console.error(err);
      }
    }

    getNotes();
  }, [searchQuery]);

  const onClickDelete = async (e, noteId) => {
    e.stopPropagation();

    setNotes(notes.filter((note) => note.id !== noteId));
    try {
      await DeleteNote(token, noteId);
    } catch (err) {}
  };

  const onCloseCreateNote = () => {
    setIsCreatingNote(false);
    setCreateNoteTitle("");
    setCreateNoteBody("");
  };

  const onCreateNote = () => {
    let title = createNoteTitle;
    const body = createNoteBody;

    if (title.trim() == "") title = "Başlıksız";

    let temporaryId = uuidv4();

    setNotes((notes) => [
      {
        temporaryId,
        title,
        body,
        isCreating: true,
      },
      ...notes,
    ]);

    CreateNote(token, title, body).then((newNote) =>
      setNotes(
        produce((oldNotes) => {
          let noteToUpdate = oldNotes.find(
            (note) => note.temporaryId == temporaryId
          );

          if (noteToUpdate) {
            Object.entries(newNote).forEach(
              ([key, value]) => (noteToUpdate[key] = value)
            );
            noteToUpdate.isCreating = false;
            console.log(noteToUpdate);
          }
        })
      )
    );
    setCreateNoteTitle("");
    setCreateNoteBody("");

    setIsCreatingNote(false);
  };

  return (
    <div className="w-full flex-1 max-w-5xl py-12 px-4 mx-auto flex flex-col">
      <Header />
      <div className="mt-4 h-full flex-col flex">
        <div className="relative group">
          <RiSearchLine className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-4 group-focus-within:text-white/90 text-white/50 transition" />
          <input
            type="text"
            placeholder="Ara"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-darkBlack w-full px-6 py-3 rounded-lg outline-none pl-12 text-white"
          />
        </div>

        <div className="mt-8 h-full flex flex-col">
          <h3>Notlar</h3>
          <div className="h-full flex flex-col overflow-auto scrollbar-none pb-32">
            <div className="grid grid-cols-3 gap-8 auto-rows-[9rem] mt-4 flex-1">
              <AnimatePresence mode="popLayout">
                {!isCreatingNote && searchQuery.trim().length == 0 && (
                  <motion.div
                    animate={{
                      opacity: 0.25,
                    }}
                    whileHover={{
                      opacity: 0.5,
                    }}
                    onClick={() => setIsCreatingNote(true)}
                    layoutId="createNote"
                    className="flex items-center justify-center bg-darkBlack/25 rounded-lg cursor-pointer"
                  >
                    <RiAddCircleFill className="w-6 h-6" />
                  </motion.div>
                )}
                {isCreatingNote && <div></div>}
                {notes.map((note, i) => (
                  <motion.div
                    key={note.temporaryId || note.id}
                    layoutId={note.temporaryId || note.id}
                    className={`bg-darkBlack p-4 rounded-lg overflow-hidden cursor-pointer group
                    ${note.isCreating && "animate-pulse"}`}
                    exit={{ scale: 0 }}
                    onClick={(e) =>
                      note.isCreating ? null : setSelectedNote(note)
                    }
                  >
                    <div className="h-full flex flex-col">
                      <div className="title flex justify-between items-center">
                        <div className="relative flex-1 overflow-hidden">
                          <p className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                            {note.title}
                          </p>
                        </div>
                        <button
                          onClick={(e) =>
                            note.isCreating ? null : onClickDelete(e, note.id)
                          }
                          className="mx-2 shrink-0"
                        >
                          <RiDeleteBin5Line className="w-4 " />
                        </button>
                      </div>
                      <p className="text-white/75 text-sm mt-2 flex-1 overflow-hidden">
                        {note.body}
                      </p>
                      <p className="text-green-500 text-xs bottom-2">
                        {parseDate(note.createdAt)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ backgroundColor: "#00000000" }}
            animate={{ backgroundColor: "#000000aa" }}
            exit={{ backgroundColor: "#00000000" }}
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center"
            onClick={(e) =>
              e.target == e.currentTarget && setSelectedNote(null)
            }
          >
            <NoteView
              noteId={selectedNote.temporaryId || selectedNote.id}
              noteTitle={selectedNote.title}
              noteBody={selectedNote.body}
              editable
              onUpdate={(title, body) => {
                setSelectedNote(null);
                setNotes(
                  produce((oldNotes) => {
                    let noteToUpdate = oldNotes.find(
                      (note) => note.id == selectedNote.id
                    );
                    if (noteToUpdate) {
                      noteToUpdate.title = title;
                      noteToUpdate.body = body;
                    }

                    return oldNotes;
                  })
                );
              }}
            />
          </motion.div>
        )}

        {isCreatingNote && (
          <motion.div
            initial={{ backgroundColor: "#00000000" }}
            animate={{ backgroundColor: "#000000aa" }}
            exit={{ backgroundColor: "#00000000" }}
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center"
            onClick={(e) => onCloseCreateNote()}
          >
            <form onSubmit={(e) => (e.preventDefault(), onCreateNote())}>
              <motion.div
                layoutId="createNote"
                className={`bg-darkBlack p-4 rounded-lg overflow-hidden w-96 h-96 flex flex-col`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Başlık.."
                    value={createNoteTitle}
                    onChange={(e) => setCreateNoteTitle(e.target.value)}
                    className="bg-transparent outline-none flex-1 focus:bg-white/10 p-2 transition rounded"
                  />
                </div>
                <div className="h-full flex scrollbar-thin scrollbar-track-slate-600 mt-2">
                  <textarea
                    type="text"
                    value={createNoteBody}
                    onChange={(e) => setCreateNoteBody(e.target.value)}
                    placeholder="İçerik..."
                    className="bg-transparent flex-1 outline-none rounded focus:bg-white/10 transition text-start resize-none scrollbar-thin scrollbar-track-slate-500 p-2"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button className="bg-green-800 text-white px-4 py-2 rounded-lg mt-4 w-1/2">
                    Oluştur{" "}
                  </button>
                </div>
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
