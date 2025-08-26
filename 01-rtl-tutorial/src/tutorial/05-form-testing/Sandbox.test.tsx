import { logRoles, render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  return {
    emailInputElement: screen.getByRole("textbox", { name: /email/i }),
    passwordInputElement: screen.getByLabelText("Password"),
    confirmPasswordInputElement: screen.getByLabelText(/confirm password/i),
    submitButton: screen.getByRole("button", { name: /submit/i }),
  };
};

describe("05-form-testing", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    const { container } = render(<Sandbox />);
    screen.debug();
    logRoles(container);
  });

  it("inputs should be initially empty", () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    expect(emailInputElement).toHaveValue("");

    expect(passwordInputElement).toHaveValue("");

    expect(confirmPasswordInputElement).toHaveValue("");
  });

  it("should be able to type in the input", async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    await user.type(emailInputElement, "test@gmail.com");
    expect(emailInputElement).toHaveValue("test@gmail.com");

    await user.type(passwordInputElement, "123456789");
    expect(passwordInputElement).toHaveValue("123456789");

    await user.type(confirmPasswordInputElement, "123456789");
    expect(confirmPasswordInputElement).toHaveValue("123456789");
  });

  it("should show email error if email is invalid", async () => {
    const { emailInputElement, submitButton } = getFormElements();
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

    await user.type(emailInputElement, "invalid");
    await user.click(submitButton);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it("should show password error if password is less than 5 characteres", async () => {
    const { emailInputElement, submitButton, passwordInputElement } =
      getFormElements();

    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "abcd");
    await user.click(submitButton);
    expect(
      screen.getByText(/password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  it("should show error if password do not match", async () => {
    const {
      emailInputElement,
      submitButton,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    const errorMessage = /passwords do not match/i;

    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "secret");
    await user.type(confirmPasswordInputElement, "secret1");
    await user.click(submitButton);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("valid input show no erros and clear fields", async () => {
    const {
      emailInputElement,
      submitButton,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "secret");
    await user.type(confirmPasswordInputElement, "secret");
    await user.click(submitButton);

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
    expect(confirmPasswordInputElement).toHaveValue("");
  });
});
