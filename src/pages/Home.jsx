import { useEffect, useState } from "react";
import Header from "../components/Header";
import { GetAllNotes } from "../services/note";
import useAuthStore from "../store/auth";
import { motion, AnimatePresence } from "framer-motion";

import { RiSearchLine } from "react-icons/ri";

function HomePage() {
  const token = useAuthStore((state) => state.token);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await GetAllNotes(token);
        notes[0].body =
          "AHAH AHA HAH AH A A AHA AH AHAHAHAHA HA AH AH AH A AHAH AHA HAH AH A A AHA AH AHAHAHAHA HA AH AH AH A AHAH AHA HAH AH A A AHA AH AHAHAHAHA HA AH AH AH A";
        setNotes([...notes]);
      } catch (err) {
        console.error(err);
      }
    }

    getNotes();
  }, []);

  const dummy = [{}, {}, {}, {}];
  console.log(notes);
  return (
    <div className="w-full flex-1 max-w-5xl py-12 px-4 mx-auto flex flex-col">
      <Header />
      <div className="mt-4 h-full flex-col flex">
        <div className="relative group">
          <RiSearchLine className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-4 group-focus-within:text-white/90 text-white/50 transition" />
          <input
            type="text"
            placeholder="Ara"
            className="bg-darkBlack w-full px-6 py-3 rounded-lg outline-none pl-12 text-white"
          />
        </div>

        <div className="mt-8 h-full flex flex-col">
          <h3>Notlar</h3>
          <div className="h-full flex flex-col overflow-auto scrollbar-none pb-32">
            <div className="grid grid-cols-3 gap-8 auto-rows-[9rem] mt-4 flex-1">
              {notes.map((note, i) => (
                <motion.div
                  key={note.id}
                  layoutId={note.id}
                  className={`bg-darkBlack p-4 rounded-lg overflow-hidden cursor-pointer ${
                    i == 1 && "row-span-2"
                  }`}
                  onClick={(e) => setSelectedNote(note)}
                >
                  <p>{note.body}</p>
                </motion.div>
              ))}
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
            onClick={(e) => setSelectedNote(null)}
          >
            <motion.div
              layoutId={selectedNote.id}
              className={`bg-darkBlack p-4 rounded-lg overflow-hidden cursor-pointer w-96 h-96`}
              onClick={(e) => e.stopPropagation()}
            >
              <p>{selectedNote.body}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
