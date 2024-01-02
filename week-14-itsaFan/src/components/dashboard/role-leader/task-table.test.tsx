import { render, screen} from "@testing-library/react";
import TasksTable from "./tasks-table";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Testing Table For Showing Task Data", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("title column render correctly", () => {
    render(<TasksTable />);
    const titleColumn = screen.getByText("Title");
    expect(titleColumn).toBeDefined();
  });

  test("priority column render correctly", () => {
    render(<TasksTable />);
    const priorityColumn = screen.getByText("Priority");
    expect(priorityColumn).toBeDefined();
  });
});
