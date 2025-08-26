import { render, screen } from "@testing-library/react";
import Sandbox from "../Form";
import userEvent from "@testing-library/user-event";

const getFormElements = () => {
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const ratingInput = screen.getByRole("combobox", { name: /rating/i });
  const textAreaInput = screen.getByRole("textbox", {
    name: /your review/i,
  });
  const submitButton = screen.getByRole("button", { name: /submit review/i });

  return { emailInput, ratingInput, textAreaInput, submitButton };
};

describe("Review Form", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders form elements correctly", () => {
    render(<Sandbox onSubmit={mockOnSubmit} />);
    screen.debug();

    const { emailInput, ratingInput, submitButton, textAreaInput } =
      getFormElements();

    expect(emailInput).toHaveValue("");
    expect(ratingInput).toHaveValue("");
    expect(textAreaInput).toHaveValue("");
    expect(submitButton).toBeInTheDocument();
  });

  it("show error messages when review is too short", async () => {
    const user = userEvent.setup();

    render(<Sandbox onSubmit={mockOnSubmit} />);
    screen.debug();

    const { emailInput, ratingInput, submitButton, textAreaInput } =
      getFormElements();

    await user.type(emailInput, "test@gmail.com");
    await user.selectOptions(ratingInput, "5");
    await user.type(textAreaInput, "short");
    await user.click(submitButton);
    expect(
      screen.getByText(/review must be at least 10 characters long/i)
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits form valid data", async () => {
    const user = userEvent.setup();

    render(<Sandbox onSubmit={mockOnSubmit} />);
    screen.debug();

    const { emailInput, ratingInput, submitButton, textAreaInput } =
      getFormElements();

    await user.type(emailInput, "test@gmail.com");
    await user.selectOptions(ratingInput, "5");
    await user.type(
      textAreaInput,
      "this is a valid review text that is long enough"
    );
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@gmail.com",
      rating: "5",
      text: "this is a valid review text that is long enough",
    });
  });
});
