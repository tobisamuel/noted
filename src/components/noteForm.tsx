import { useLayoutEffect, useRef } from "react";
import { useFormik } from "formik";
import useAuth from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/requests";
import { Note } from "../utils/types";

export type NoteDeets = {
  title: string;
  content: string;
  userId: string;
};

const NoteForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const postMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const handleSubmitNote = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      formik.submitForm();
    }
  };

  const formik = useFormik<NoteDeets>({
    initialValues: {
      title: "",
      content: "",
      userId: auth.userId!,
    },
    onSubmit: (note, { resetForm }) => {
      postMutation.mutate(note);
      resetForm();
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
    <div className="min-h-[250px] bg-gray-100">
      <form className="p-4 h-full flex flex-col">
        <div className="basis-1/4 flex-none">
          <input
            className="block w-full mb-3 bg-transparent text-xl font-medium sm:text-2xl focus:outline-none"
            type="text"
            placeholder="Title"
            autoComplete="off"
            {...formik.getFieldProps("title")}
          />
        </div>
        <div className="basis-3/4">
          <textarea
            className="w-full leading-relaxed bg-transparent resize-none focus:outline-none"
            placeholder="Write a Note..."
            autoComplete="off"
            ref={textareaRef}
            {...formik.getFieldProps("content")}
            onKeyDown={handleSubmitNote}
          />
        </div>
      </form>
    </div>
  );
};

export default NoteForm;

{
  /* <div className="min-h-[250px] bg-gray-100 bg-opacity-75">
  <form className="p-4 h-full">
    <div className="h-1/4">
      <input
        className="w-full mb-3 bg-transparent text-xl font-medium sm:text-2xl focus:outline-none"
        type="text"
        placeholder="Title"
        autoComplete="off"
        {...formik.getFieldProps("title")}
      />
    </div>
    <div className="h-3/4">
      <textarea
        className="w-full leading-relaxed bg-transparent resize-none focus:outline-none"
        placeholder="Write a Note..."
        autoComplete="off"
        ref={textareaRef}
        {...formik.getFieldProps("content")}
        onKeyDown={handleSubmitNote}
      />
    </div>
  </form>
</div>; */
}
