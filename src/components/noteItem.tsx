import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoteEditForm from "./noteEditForm";
import { Note } from "../utils/types";
import { deleteNote } from "../api/requests";

type NoteItemProps = {
  note: Note;
};

const NoteItem = ({ note }: NoteItemProps) => {
  const [formOpen, setFormOpen] = useState(false); // state to open and close edit form
  const queryClient = useQueryClient();

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

  const deleteMutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(note._id);
  };

  if (formOpen) {
    return <NoteEditForm {...note} closeForm={toggleForm} />;
  } else {
    return (
      <div className="p-4 min-h-[250px] flex flex-col bg-gray-100 shadow-lg">
        <div className="basis-1/4">
          <h1 className="text-xl font-medium text-zinc-700 sm:text-2xl">
            {note.title}
          </h1>
        </div>
        <div className="basis-2/4 leading-relaxed break-words">
          {note.content}
        </div>
        <div className="basis-1/4 flex justify-start items-end">
          <button
            className="p-2 rounded-full text-lg text-zinc-500 hover:bg-zinc-200"
            onClick={toggleForm}
          >
            <FaEdit />
          </button>
          <button
            className="p-2 rounded-full text-lg text-zinc-500 hover:bg-zinc-200"
            onClick={handleDelete}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    );
  }
};

export default NoteItem;
