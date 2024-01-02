import { render, screen } from "@testing-library/react";
import ProfilePage from "./profile-page";

test("renders profile page with correct title", () => {
  render(<ProfilePage />);
  const pageTitle = screen.getByText("Profile Page for Testing");

  expect(pageTitle).toBeDefined();
  expect(document.title).toBe("Profile Page");
});
