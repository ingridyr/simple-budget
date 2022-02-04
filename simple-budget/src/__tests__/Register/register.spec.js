import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { theme } from "../../styles/theme";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Providers } from "../../providers";

describe("Sign Up", () => {
  it("Should be able to register a new user", async () => {
    //render(<BrowserRouter><MyComponent/></BrowserRouter>);
    render(
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Providers>
            <App />
          </Providers>
        </ChakraProvider>
      </BrowserRouter>
    );
    const ButtonSignUp = screen.getByRole("button", {
      name: /Sign up/i,
    });
    fireEvent.click(ButtonSignUp);

    await waitFor(() => {
      const inputName = screen.getByPlaceholderText("John Smith");
      const inputEmail = screen.getByPlaceholderText("your@email.com");
      const inputPassowrd = screen.getByTestId("SignUpPassword");
      const inputConfirm = screen.getByTestId("SignUpConfirmPassword");
      expect(
        inputName && inputEmail && inputPassowrd && inputConfirm
      ).toBeTruthy();
    });
  });

  it("Register a new user", async () => {
    render(
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Providers>
            <App />
          </Providers>
        </ChakraProvider>
      </BrowserRouter>
    );
    const ButtonSignUp = screen.getByRole("button", {
      name: /Sign up/i,
    });

    fireEvent.click(ButtonSignUp);

    const inputName = screen.getByPlaceholderText("John Smith");
    const inputEmail = screen.getByPlaceholderText("your@email.com");
    const inputPassowrd = screen.getByTestId("SignUpPassword");
    const inputConfirm = screen.getByTestId("SignUpConfirmPassword");
    expect(
      inputName && inputEmail && inputPassowrd && inputConfirm
    ).toBeTruthy();

    fireEvent.change(inputName, { target: { value: "JhonDo" } });
    fireEvent.change(inputEmail, { target: { value: "JhonDo@mail.com" } });
    fireEvent.change(inputPassowrd, { target: { value: "jhon123" } });
    fireEvent.change(inputConfirm, { target: { value: "jhon123" } });
    await waitFor(() => {
      expect(inputName).toHaveValue("JhonDo");
    });

    await waitFor(() => {
      expect(inputEmail).toHaveValue("JhonDo@mail.com");
    });

    await waitFor(() => {
      expect(inputPassowrd).toHaveValue("jhon123");
    });

    await waitFor(() => {
      expect(inputConfirm).toHaveValue("jhon123");
    });

    const registerButton = screen.getByText("SIGN UP");
    expect(registerButton).toBeTruthy();

    fireEvent.click(registerButton);
  });
});

/**
 * await waitFor(() => {
      screen.getAllByText("Login").toBeTruthy();
    });
 */
