import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Signup } from "../../../pages/Signup";
import { BrowserRouter } from "react-router-dom";

describe("Sign Up", () => {
  it("There should be a clickable registration button", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const ButtonSignUp = screen.getByText("SIGN UP");
    expect(ButtonSignUp).toBeTruthy();
    fireEvent.click(ButtonSignUp);
  });

  it("There should be error messages when click on registration buttom", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const ButtonSignUp = screen.getByText("SIGN UP");
    expect(ButtonSignUp).toBeTruthy();
    fireEvent.click(ButtonSignUp);

    await waitFor(() => {
      expect(screen.getAllByText("Required field")).toBeTruthy();
    });
  });
});
