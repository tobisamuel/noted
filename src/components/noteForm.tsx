import { useFormik } from "formik";
import useId from "../hooks/useId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/requests";
import useAutosizeTextArea from "../hooks/useAutosizeTextarea";

export type NoteDeets = {
  title: string;
  content: string;
  userId: string;
};

const NoteForm = () => {
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

  const textareaRef = useAutosizeTextArea(formik.values.content);

  return (
    <div className="min-h-[250px] bg-gray-200">
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
            rows={1}
            ref={textareaRef}
            {...formik.getFieldProps("content")}
          />
        </div>

        <div className="flex justify-end items-end">
          <button
            type="submit"
            className="h-9 px-3 py-1 bg-zinc-400 rounded-lg border-2 flex justify-center items-center border-zinc-300 text-white disabled:bg-zinc-300"
            disabled={!formik.dirty || formik.isSubmitting}
          >
            <div className="flex items-center gap-2">
              <span>Save</span>
              <span
                className={`${
                  postMutation.isLoading ? "block" : "hidden"
                } border-2 border-t-2 border-white border-t-gray-300 rounded-full h-4 w-4 animate-spin`}
              ></span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
