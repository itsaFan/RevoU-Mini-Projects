import { useState, FormEvent, ChangeEvent } from "react";
import { EditTaskProps } from "../../../helpers/content-interface";
import { Button } from "antd";

export default function TaskEditForm({ initialValues, onSubmit }: EditTaskProps) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="font-semibold">
          Title:
        </label>
        <div>
          <input placeholder="title" aria-label="title" type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required />
        </div>
      </div>
      <div>
        <label htmlFor="description" className="font-semibold">
          Description:
        </label>
        <div></div> <input aria-label="description" id="description" name="description" value={formData.description} onChange={handleChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required />
      </div>
      <div>
        <label htmlFor="dueDate" className="font-semibold">
          Due Date:
        </label>
        <div>
          <input aria-label="dueDate" type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required />
        </div>
      </div>
      <div>
        <label htmlFor="priority" className="font-semibold">
          Priority:
        </label>
        <div>
          <select aria-label="priority" id="priority" name="priority" value={formData.priority} onChange={handleChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required>
            <option>Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div>
        <Button type="primary" htmlType="submit" className="w-full h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5">
          Edit Task
        </Button>
      </div>
    </form>
  );
}
