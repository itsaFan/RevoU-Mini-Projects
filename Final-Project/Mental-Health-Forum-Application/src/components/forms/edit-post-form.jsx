/* eslint-disable react/prop-types */
import { Label, Spinner, TextInput, Textarea } from "flowbite-react";

export default function EditPostForm({ onSubmit, loading, defaultContent, contentRef, titleRef, defaultTitle }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className="mb-2">
          <Label htmlFor="editTitle" value="Edit Title" />
        </div>
        <TextInput id="editTitle" placeholder="ex: self-introduction" ref={titleRef} defaultValue={defaultTitle} required autoComplete="off" />
      </div>
      <div className="mb-2">
        <div className="mb-2">
          <Label htmlFor="editContent" value="Edit your content" />
        </div>
        <Textarea id="editContent" about="editContent" className="h-40" placeholder=". . . . . . . . ." ref={contentRef} defaultValue={defaultContent} required />
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
            <span>Edit Post</span>
          )}
        </button>
      </div>
    </form>
  );
}
