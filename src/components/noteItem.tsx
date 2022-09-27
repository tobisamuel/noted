import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoteEditForm from "./noteEditForm";
import { Note } from "../utils/types";
import { deleteNote } from "../api/requests";
import Modal from "./modal";
import ConfirmDelete from "./confirmDelete";
import Spinner from "./spinner";

type NoteItemProps = {
  note: Note;
};

const NoteItem = ({ note }: NoteItemProps) => {
  const [formOpen, setFormOpen] = useState(false); // state to open and close edit form
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteMutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(note._id);
    closeModal();
  };

  if (formOpen) {
    return <NoteEditForm {...note} closeForm={toggleForm} />;
  } else {
    return (
      <>
        <div className="p-4 min-h-[250px] flex flex-col bg-gray-200 shadow-lg">
          <div>
            <h1 className="mb-3 text-xl font-medium text-zinc-700 sm:text-2xl">
              {note.title}
            </h1>
          </div>
          <div className="flex-auto leading-relaxed break-words">
            {note.content}
          </div>
          <div className="flex justify-start items-end">
            <button
              className="p-2 rounded-full text-lg text-zinc-500 hover:bg-zinc-200"
              onClick={toggleForm}
            >
              <FaEdit />
            </button>
            <button
              className="p-2 rounded-full text-lg text-zinc-500 hover:bg-zinc-200"
              onClick={() => setShowModal(true)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>

        {deleteMutation.isLoading && <Spinner />}

        {showModal && (
          <Modal>
            <ConfirmDelete
              handleDelete={handleDelete}
              closeModal={closeModal}
            />
          </Modal>
        )}
      </>
    );
  }
};

export default NoteItem;
