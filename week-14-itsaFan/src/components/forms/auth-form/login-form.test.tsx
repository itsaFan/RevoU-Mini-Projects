import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./login-form";


describe("test login form", () => {
  const onLoginMock = () => {};
  const initialValuesMock = { username: "", password: "" };


  test("input field for username render correctly", async () => {
    render(<LoginForm initialValues={initialValuesMock} onLogin={onLoginMock} />);
    const username = screen.getByPlaceholderText("Username");
    expect(username).toBeDefined();
  });

  test("input field for password render correctly", async () => {
    render(<LoginForm initialValues={initialValuesMock} onLogin={onLoginMock} />);
    const password = screen.getByPlaceholderText("password");
    expect(password).toBeDefined();
  });

  test("button for submitting login render correctly", async () => {
    render(<LoginForm initialValues={initialValuesMock} onLogin={onLoginMock} />);
    const btn = screen.getByText("Login");
    expect(btn).toBeDefined();
  });

  test("onLogin works properly", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LoginForm initialValues={initialValuesMock} onLogin={onSubmit} />);
    let usernameInput = getByPlaceholderText("Username");
    let passwordInput = getByPlaceholderText("password");
    let btn = getByText("Login");

    fireEvent.change(usernameInput, { target: { value: "Test" } });
    fireEvent.change(passwordInput, { target: { value: "test12345" } });

    fireEvent.click(btn);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        username: "Test",
        password: "test12345",
      });
    });
  });
});
