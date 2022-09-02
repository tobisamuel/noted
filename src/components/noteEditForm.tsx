import { useLayoutEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { updateNote } from "../api/requests";
import { Note } from "../utils/types";
import { FaTimes } from "react-icons/fa";

type EditFormProps = {
  closeForm: () => void;
  _id: string;
  title: string;
  content: string;
  userId: string;
};

const NoteEditForm = ({
  closeForm,
  _id,
  title,
  content,
  userId,
}: EditFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const editMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const handleSubmitNote = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      formik.submitForm();
    }
  };

  const formik = useFormik<Note>({
    initialValues: {
      _id,
      title,
      content,
      userId,
    },
    onSubmit: (note, { resetForm }) => {
      editMutation.mutate(note);
      resetForm();
      closeForm();
    },
  });

  useLayoutEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [formik.values.content]);

  return (
    <div className="min-h-[250px] bg-gray-100 bg-opacity-80">
      <form className="p-4 h-full flex flex-col">
        <div className="basis-1/4">
          <h1 className="text-xl font-medium text-zinc-700 sm:text-2xl">
            <input
              className="w-full mb-3 bg-transparent text-xl font-medium sm:text-2xl focus:outline-none"
              type="text"
              placeholder="Title"
              aria-label="title"
              autoComplete="off"
              {...formik.getFieldProps("title")}
            />
          </h1>
        </div>
        <div className="basis-2/4">
          <textarea
            className="w-full  leading-relaxed break-words bg-transparent resize-none focus:outline-none"
            placeholder="Write a note..."
            autoComplete="off"
            autoFocus
            cols={40}
            ref={textareaRef}
            onKeyDown={handleSubmitNote}
            {...formik.getFieldProps("content")}
          />
        </div>
        <div className="basis-1/4 flex justify-start items-end">
          <button
            className="p-2 rounded-full text-lg text-zinc-500 hover:bg-zinc-200"
            type="button"
            onClick={closeForm}
          >
            <FaTimes />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditForm;

// <div className="absolute bottom-0 left-0">
// </div>
