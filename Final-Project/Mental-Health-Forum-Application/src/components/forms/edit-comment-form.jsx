/* eslint-disable react/prop-types */

import { Spinner, Textarea } from "flowbite-react";

export default function EditCommentForm({ onSubmit, defaultText, textRef, loading }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <Textarea id="text" about="edit-comment" className="h-40" placeholder=". . . . . . . . ." ref={textRef} defaultValue={defaultText} required />
      </div>
      <div className="flex justify-end ">
        <button
          type="submit"
          className="text-white flex items-center gap-1 bg-dark-navy hover:opacity-90 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2  dark:bg-light-navy dark:hover:opacity-90 focus:outline-none dark:focus:ring-blue-800"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              Loading
            </>
          ) : (
            <span>Edit Comment</span>
          )}
        </button>
      </div>
    </form>
  );
}
