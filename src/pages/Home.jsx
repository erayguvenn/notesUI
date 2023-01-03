import { useEffect, useState } from "react";
import Header from "../components/Header";
import { GetAllNotes } from "../services/note";
import useAuthStore from "../store/auth";

function HomePage() {
  const token = useAuthStore((state) => state.token);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await GetAllNotes(token);
        setNotes(notes);
      } catch (err) {
        console.error(err);
      }
    }

    getNotes();
  }, []);
  return (
    <div className="w-full">
      <Header />
      <div className="mt-12 space-y-8">
        {notes.map((note) => (
          <div key={note.id} className="bg-white w-full rounded shadow p-4">
            <h3 className="font-medium text-xl">{note.title}</h3>
            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: note.body }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
