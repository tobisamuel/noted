import { useLayoutEffect, useRef } from "react";
import { useFormik } from "formik";
import useId from "../hooks/useId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/requests";
import Spinner from "./spinner";

export type NoteDeets = {
  title: string;
  content: string;
  userId: string;
};

const NoteForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const userId = useId();
  const queryClient = useQueryClient();

  const postMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const formik = useFormik<NoteDeets>({
    initialValues: {
      title: "",
      content: "",
      userId: userId,
    },
    onSubmit: (note, { resetForm }) => {
      postMutation.mutate(note);
      resetForm();
    },
  });

  const disabled = postMutation.isLoading;

  useLayoutEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [formik.values.content]);

  return (
    <div className="min-h-[250px] bg-gray-200">
      {postMutation.isLoading && <Spinner />}
      <form className="p-4 h-full flex flex-col" onSubmit={formik.handleSubmit}>
        <div>
          <input
            className="block w-full mb-3 bg-transparent text-xl font-medium sm:text-2xl focus:outline-none"
            type="text"
            placeholder="Title"
            autoComplete="off"
            {...formik.getFieldProps("title")}
          />
        </div>
        <div className="flex-auto">
          <textarea
            className="w-full leading-relaxed bg-transparent resize-none focus:outline-none"
            placeholder="Write a Note..."
            autoComplete="off"
            ref={textareaRef}
            {...formik.getFieldProps("content")}
          />
        </div>
        <div className="flex justify-end items-end">
          <button
            type="submit"
            className="h-9 w-16 px-3 py-1 bg-zinc-400 rounded-lg border-2 flex justify-center items-center border-zinc-300 text-white disabled:cursor-not-allowed"
            disabled={disabled}
          >
            {postMutation.isLoading ? (
              <div className="border-2 border-t-2 border-white border-t-gray-300 rounded-full h-4 w-4 animate-spin"></div>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
