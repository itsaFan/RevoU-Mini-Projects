/* eslint-disable react/prop-types */
import { Button, TextInput } from "flowbite-react";

export default function AddTodoForm({titleRef, descriptionRef, onSubmit}) {
  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <TextInput color="info" placeholder="Plan" name="title" id="title" ref={titleRef}  required/>
      </div>
      <div>
        <TextInput color="info" placeholder="Details" name="description" id="description" ref={descriptionRef} required />
      </div>
      <div>
        <Button type="submit" gradientDuoTone="pinkToOrange" outline>
          Add
        </Button>
      </div>
    </form>
  );
}
