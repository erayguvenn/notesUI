import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { RiEdit2Fill } from "react-icons/ri";
import { UpdateNote } from "../services/note";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/auth";

// Bu component; başlığı, içeriği, id'si, güncellenebilir olup olmadığı gibi bilgileri alunan bir notu gösterir.
function NoteView({
  noteTitle,
  noteBody,
  noteId,
  layoutId,
  editable,
  onUpdate,
}) {
  const [title, setTitle] = useState(noteTitle || "");
  const [body, setBody] = useState(noteBody || "");
  const [isEditing, setIsEditing] = useState(false);
  const token = useAuthStore((store) => store.token);

  // Bu fonksiyon, notun başlığunu günceller.
  const onChangeTitle = (e) => {
    if (!editable) return;

    setTitle(e);
  };

  // Bu fonksiyon, notun içeriğini günceller.
  const onChangeBody = (e) => {
    if (!editable) return;

    setBody(e);
  };

  // Bu fonksiyon, notun edit moduna geçmesini sağlar.
  const onClickEdit = (e) => {
    if (!editable) return;

    setIsEditing((isEditing) => !isEditing);
  };

  // Bu fonksiyon, notun güncellenmesini sağlar.
  // Eğer güncelleme başarılı olursa, onUpdate fonksiyonu çalıştırılır ve ana component'i bilgilendirir.
  // Eğer güncelleme başarısız olursa, kullanıcıya toast mesajı gösterilir.
  const onClickUpdate = async (e) => {
    if (!editable) return;

    setIsEditing((isEditing) => !isEditing);

    toast.promise(
      new Promise(async (res, rej) => {
        try {
          const x = await UpdateNote(token, noteId, title, body);
          res(x);
          if (onUpdate) onUpdate(title, body);
        } catch (err) {
          rej(err);
        }
      }),
      {
        loading: "Not güncelleniyor",
        success: "Not güncellendi",
        error: "Not güncellenemedi",
      }
    );
  };

  // Bu fonksiyon, notun başlığı ve içeriği değişmişse ve not güncellenebilir ise güncelleme butonunu gösterir.
  const shouldShowUpdate =
    editable && (title !== noteTitle || body !== noteBody);

  return (
    <motion.div
      layoutId={layoutId}
      className={`bg-darkBlack p-4 rounded-lg overflow-hidden cursor-pointer w-96 h-96 flex flex-col`}
    >
      <div className="title flex justify-between items-center">
        <div className="relative flex-1 overflow-hidden">
          <div className="flex relative">
            <input
              type="text"
              value={title}
              disabled={!isEditing}
              onChange={(e) => onChangeTitle(e.target.value)}
              className={`bg-transparent outline-none flex-1 focus:bg-white/10 p-2 transition rounded ${
                editable && "pr-10"
              }`}
            />
            {editable && (
              <button
                onClick={onClickEdit}
                className={`shrink-0 absolute w-10 h-full top-0 right-0 flex items-center justify-center ${
                  isEditing && "bg-white/10"
                }`}
              >
                <RiEdit2Fill className=" w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col mt-2 gap-4">
        <textarea
          type="text"
          value={body}
          disabled={!isEditing}
          onChange={(e) => onChangeBody(e.target.value)}
          className="bg-transparent flex-1 outline-none rounded focus:bg-white/10 transition text-start resize-none scrollbar-thin scrollbar-track-slate-500 p-2"
        />
        {editable && (
          <button
            disabled={!shouldShowUpdate}
            onClick={onClickUpdate}
            className="disabled:opacity-10 transition bg-violet-500 p-2 disabled:bg-transparent"
          >
            Güncelle
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default NoteView;
