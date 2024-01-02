/* eslint-disable react/prop-types */
import { Button, TextInput } from "flowbite-react";

export default function EditTodoForm({ onSubmit, titleRef, descriptionRef, defaultTitle, defaultDescription}) {
  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <TextInput color="info" placeholder="Plan" name="title" id="title" ref={titleRef} defaultValue={defaultTitle} />
      </div>
      <div>
        <TextInput color="info" placeholder="Details" name="description" id="description" ref={descriptionRef} defaultValue={defaultDescription}  />
      </div>
      <div className="flex gap-2">
        <Button type="submit" gradientDuoTone="pinkToOrange" outline>
          Edit
        </Button>
      </div>
    </form>
  );
}
