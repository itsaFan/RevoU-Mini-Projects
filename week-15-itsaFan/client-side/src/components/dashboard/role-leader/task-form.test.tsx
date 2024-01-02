import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddTaskForm from "./add-task";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import TaskEditForm from "./edit-task-form";

describe("Testing for Add Task Form", () => {
  test("field for description render correctly", async () => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );
    // screen.debug();
    const descLabel = screen.getByText("Description:");
    const descInput = screen.getByRole("textbox", { name: "description" });
    // const descriptionInput = screen.getByLabelText("description");

    expect(descLabel).toBeDefined();
    expect(descInput).toBeDefined();
    // expect(descriptionInput).toBeDefined();
  });

  test("field for project render correctly", async () => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );
    const projectLabel = screen.getByText("Project:");
    const projectSelect = screen.getByLabelText("project");

    expect(projectLabel).toBeDefined();
    expect(projectSelect).toBeDefined();
  });

  test("field for title render correctly", async () => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );
    const titleLabel = screen.getByText("Title:");
    const titleInput = screen.getByRole("textbox", { name: "title" });

    expect(titleLabel).toBeDefined();
    expect(titleInput).toBeDefined();
  });

  test("field for due date render correctly", async () => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );
    const dueDateLabel = screen.getByText("Due Date:");
    const dueDateInput = screen.getByLabelText("dueDate");
    // const dueDateInput = screen.getByRole("combobox", { name: "dueDate" });

    expect(dueDateLabel).toBeDefined();
    expect(dueDateInput).toBeDefined();
  });

  test("field for priority render correctly", async () => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );
    const priorityLabel = screen.getByText("Priority:");
    const prioritySelect = screen.getByLabelText("priority");
    userEvent;

    expect(priorityLabel).toBeDefined();
    expect(prioritySelect).toBeDefined();

    userEvent.selectOptions(prioritySelect, "low");

    await waitFor(() => {
      expect(prioritySelect).toHaveValue("low");
    });
  });

  test("field for assigning member render correctly", async () => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );
    const assignLabel = screen.getByText("Assigned To:");
    const assignSelect = screen.getByLabelText("assignedTo");

    expect(assignLabel).toBeDefined();
    expect(assignSelect).toBeDefined();

    userEvent.selectOptions(assignSelect, "Select a member");
    expect(assignSelect).toHaveValue("Select a member");
  });

  test("button for creating task render properly", async () => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );
    const btn = screen.getByText("Create Task");
    expect(btn).toBeDefined();
  });

  test("forms works correctly", async () => {
    const mockSubmit = jest.fn();
    render(
      <MemoryRouter>
        <AddTaskForm onSubmit={mockSubmit} />
      </MemoryRouter>
    );
    const project = screen.getByLabelText("project");
    const title = screen.getByLabelText("title");
    const description = screen.getByLabelText("description");
    const dueDate = screen.getByLabelText("dueDate");
    const priority = screen.getByLabelText("priority");
    const assignMember = screen.getByLabelText("assignedTo");
    const btn = screen.getByText("Create Task");

    userEvent.type(project, "Project Value");
    userEvent.type(title, "Task Title");
    userEvent.type(description, "Task Description");
    userEvent.type(dueDate, "2023-12-31");
    userEvent.selectOptions(priority, "low");
    userEvent.selectOptions(assignMember, "Select a member");
    userEvent.click(btn);
  });
});

describe("Testing for Edit Task Form ", () => {
  const onEditMock = () => {};
  const initialValuesMock = {
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  };
  test("field for title render correctly", async () => {
    render(<TaskEditForm initialValues={initialValuesMock} onSubmit={onEditMock} />);
    const titleLabel = screen.getByText("Title:");
    const titleInput = screen.getByLabelText("title");

    expect(titleLabel).toBeDefined();
    expect(titleInput).toBeDefined();
  });

  test("field for description render correctly", async () => {
    render(<TaskEditForm initialValues={initialValuesMock} onSubmit={onEditMock} />);
    const descriptionLabel = screen.getByText("Description:");
    const descriptionInput = screen.getByLabelText("description");

    expect(descriptionLabel).toBeDefined();
    expect(descriptionInput).toBeDefined();
  });

  test("field for dueDate render correctly", async () => {
    render(<TaskEditForm initialValues={initialValuesMock} onSubmit={onEditMock} />);
    const dueDateLabel = screen.getByText("Due Date:");
    const dueDateInput = screen.getByLabelText("dueDate");

    expect(dueDateLabel).toBeDefined();
    expect(dueDateInput).toBeDefined();
  });

  test("field for priority render correctly", async () => {
    render(<TaskEditForm initialValues={initialValuesMock} onSubmit={onEditMock} />);
    const priorityLabel = screen.getByText("Priority:");
    const prioritySelect = screen.getByLabelText("priority");

    expect(priorityLabel).toBeDefined();
    expect(prioritySelect).toBeDefined();
    userEvent.selectOptions(prioritySelect, "low");

    await waitFor(() => {
      expect(prioritySelect).toHaveValue("low");
    });
  });

  test("button for submitting edit task render properly", async () => {
    render(<TaskEditForm initialValues={initialValuesMock} onSubmit={onEditMock} />);
    const btn = screen.getByText("Edit Task");

    expect(btn).toBeDefined();
  });

  test("handle for submit update the formData correctly", async () => {
    const { getByLabelText, getByText } = render(<TaskEditForm initialValues={initialValuesMock} onSubmit={onEditMock} />);
    let title = getByLabelText("title");
    let desc = getByLabelText("description");
    let dueDate = getByLabelText("dueDate");
    let priority = getByLabelText("priority");
    let btn = getByText("Edit Task");

    fireEvent.change(title, { target: { value: "Test Edit" } });
    fireEvent.change(desc, { target: { value: "Test Edit Description" } });
    fireEvent.change(dueDate, { target: { value: "2023-10-10" } });
    fireEvent.select(priority, { target: { value: "low" } });
    fireEvent.click(btn);

    expect(title).toHaveValue("Test Edit");
    expect(desc).toHaveValue("Test Edit Description");
    expect(dueDate).toHaveValue("2023-10-10");
    expect(priority).toHaveValue("low");
  });
});
