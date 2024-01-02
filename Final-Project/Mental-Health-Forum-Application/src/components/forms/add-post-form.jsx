/* eslint-disable react/prop-types */
import { Label, Select, TextInput, Textarea } from "flowbite-react";

export default function CreatePostForm({ forums, onSubmit, onForumSelect, titleRef, contentRef }) {
  const groupedForums = forums.reduce((acc, forum) => {
    if (!acc[forum.category]) {
      acc[forum.category] = [];
    }
    acc[forum.category].push(forum);
    return acc;
  }, {});

  const handleForumChange = (event) => {
    const forumId = event.target.value;
    onForumSelect(forumId);
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <div className="mb-2">
            <Label htmlFor="forums" value="Select which forum you want to post" />
          </div>
          <Select id="forums" onChange={handleForumChange} required>
            <option className="font-semibold select-none">Select the forum where you want to post</option>
            {Object.entries(groupedForums).map(([category, forumsInCategory]) => (
              <optgroup className="font-semibold" label={category} key={category}>
                {forumsInCategory.map((forum) => (
                  <option className="font-normal" key={forum._id} value={forum._id}>
                    {forum.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
        </div>
        <div>
          <div className="mb-2">
            <Label htmlFor="title" value="Write your post title" />
          </div>
          <TextInput id="title" placeholder="ex: self-introduction" ref={titleRef} required autoComplete="off" />
        </div>
        <div>
          <div className="mb-2">
            <Label htmlFor="content" value="Write your content" />
          </div>
          <Textarea id="content" about="post-content" className="h-40" placeholder=". . . . . . . . ." ref={contentRef} required />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-dark-navy hover:opacity-90 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-light-navy dark:hover:opacity-90 focus:outline-none dark:focus:ring-blue-800"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
