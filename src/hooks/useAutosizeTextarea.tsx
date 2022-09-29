import { useLayoutEffect, useRef } from "react";

const useAutosizeTextArea = (value: string) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [textareaRef.current, value]);

  return textareaRef;
};

export default useAutosizeTextArea;
