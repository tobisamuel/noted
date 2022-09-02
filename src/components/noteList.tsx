import useAuth from "../hooks/useAuth";
import useFetchNotes from "../hooks/useFetchNotes";
import NoteItem from "./noteItem";
import NoteForm from "./noteForm";
import Loader from "./loader";

const NoteList = () => {
  const { auth } = useAuth();

  const { data, error, isError, isLoading } = useFetchNotes(auth.userId!);

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 md:p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data!.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      <NoteForm />
    </div>
  );
};

export default NoteList;
