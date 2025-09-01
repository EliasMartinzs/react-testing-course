import { render, screen } from "@testing-library/react";
import { userEvent, type UserEvent } from "@testing-library/user-event";
import Form from "../components/Form";

export const getElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    submitButton: screen.getByRole("button", { name: /add post/i }),
  };
};

describe("Form Component", () => {
  const mockOnSubmit = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    mockOnSubmit.mockClear();
    render(<Form onSubmit={mockOnSubmit} />);
  });

  it("rensers correctly ", () => {
    const { submitButton, titleInput } = getElements();

    expect(titleInput).toHaveValue("");
    expect(submitButton).toBeInTheDocument();
  });

  it("update input value on change", async () => {
    const { titleInput } = getElements();

    await user.type(titleInput, "new title!!!");
    expect(titleInput).toHaveValue("new title!!!");
  });

  it("requires title inputs before submission", async () => {
    const { submitButton } = getElements();

    await user.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits the form with the correct data", async () => {
    const { titleInput, submitButton } = getElements();

    await user.type(titleInput, "new post");
    await user.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "new post",
      likes: 0,
    });
  });

  it("clears input after submission", async () => {
    const { submitButton, titleInput } = getElements();

    await user.type(titleInput, "new post");
    await user.click(submitButton);
    expect(titleInput).toHaveValue("");
  });
});
