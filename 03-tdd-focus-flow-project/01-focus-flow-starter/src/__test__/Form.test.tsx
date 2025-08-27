import { render, screen } from "@testing-library/react";
import Form from "../components/Form";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /category/i }),
    submitButton: screen.getByRole("button", { name: /add task/i }),
  };
};

describe("Form Component", () => {
  let user: UserEvent;
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    user = userEvent.setup();
    render(<Form onSubmit={mockOnSubmit} />);
    screen.debug();
  });

  it("renders form with empty fields correctly", () => {
    const { categorySelect, descriptionInput, titleInput } = getFormElements();

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
  });

  it("submit form with entered values", async () => {
    const { categorySelect, descriptionInput, submitButton, titleInput } =
      getFormElements();

    await user.type(titleInput, "Title input");
    await user.type(descriptionInput, "Description here!!!!!");
    await user.selectOptions(categorySelect, "urgent");
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Title input",
      description: "Description here!!!!!",
      category: "urgent",
    });
  });

  it("validate required fields", async () => {
    const { submitButton } = getFormElements();

    await user.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("clears form after succesfuly submission", async () => {
    const { categorySelect, descriptionInput, submitButton, titleInput } =
      getFormElements();

    await user.type(titleInput, "Title input");
    await user.type(descriptionInput, "Description here!!!!!");
    await user.selectOptions(categorySelect, "urgent");
    await user.click(submitButton);

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
  });
});
