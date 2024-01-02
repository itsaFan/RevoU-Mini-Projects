import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import * as authApi from "../../../api/auth-api";
import Login from "./login";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../api/auth-api");

describe("Testing Authentication Login", () => {
  test("submits the form and sets token in localStorage", async () => {
    const mockSetItem = jest.spyOn(Storage.prototype, "setItem");
    const mockLoginApi = authApi.loginApi as jest.MockedFunction<typeof authApi.loginApi>;

    const mockReload = jest.fn();
    Object.defineProperty(window, "location", {
      value: { reload: mockReload },
    });

    mockLoginApi.mockResolvedValue("mockedToken");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const username = screen.getByPlaceholderText("Username");
    const password = screen.getByPlaceholderText("password");
    const button = screen.getByText("Login");

    act(() => {
      fireEvent.change(username, { target: { value: "Leader" } });
      fireEvent.change(password, { target: { value: "zxc12345" } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(mockLoginApi).toHaveBeenCalledWith("Leader", "zxc12345");
      expect(mockSetItem).toHaveBeenCalledWith("accessToken", "mockedToken");
    });
  });
});
