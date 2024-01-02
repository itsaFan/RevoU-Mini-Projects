import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "./reg-form";

describe("test register form", () => {
  const onRegisterMock = () => {};
  const initialValuesMock = { username: "", email: "", password: "" };

  test("Input field for username render correctly", async () => {
    render(<RegistrationForm initialValues={initialValuesMock} onRegister={onRegisterMock} />);
    const username = screen.getByPlaceholderText("Username");
    expect(username).toBeDefined();
  });

  test("Input field for email render correctly", async () => {
    render(<RegistrationForm initialValues={initialValuesMock} onRegister={onRegisterMock} />);
    const email = screen.getByPlaceholderText("Email Address");
    expect(email).toBeDefined();
  });

  test("Input field for password render correctly", async () => {
    render(<RegistrationForm initialValues={initialValuesMock} onRegister={onRegisterMock} />);
    const password = screen.getByPlaceholderText("password");
    expect(password).toBeDefined();
  });

  test("button for submit register form render correct", async () => {
    render(<RegistrationForm initialValues={initialValuesMock} onRegister={onRegisterMock} />);
    const btn = screen.getByText("Register");
    expect(btn).toBeDefined();
  });

  test("onRegister works properly", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<RegistrationForm initialValues={initialValuesMock} onRegister={onSubmit} />);
    let usernameInput = getByPlaceholderText("Username");
    let emailInput = getByPlaceholderText("Email Address");
    let passwordInput = getByPlaceholderText("password");
    let btn = getByText("Register");

    fireEvent.change(usernameInput, { target: { value: "Test" } });
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "test12345" } });

    fireEvent.click(btn);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        username: "Test",
        email: "test@email.com",
        password: "test12345",
      });
    });
  });
});
