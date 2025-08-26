import { render, screen } from "@testing-library/react";
import Sandbox from "../Sandbox";
import userEvent from "@testing-library/user-event";
import { getFormElements } from "../../../final/06-reviews-app/__tests__/Form.test";

describe("Reviews App", () => {
  it("renders review App Title", () => {
    render(<Sandbox />);
    screen.debug();

    expect(
      screen.getByRole("heading", { level: 1, name: /reviews app/i })
    ).toBeInTheDocument();
  });

  it("add a new review when form is submitted", async () => {
    const user = userEvent.setup();
    render(<Sandbox />);

    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await user.type(emailInput, "test@gmail.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "Great Product!!!!");
    await user.click(submitButton);

    expect(screen.getByText("test@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("⭐".repeat(5))).toBeInTheDocument();
    expect(screen.getByText("Great Product!!!!")).toBeInTheDocument();
  });

  it("alternative - add a new review when form is submitted", async () => {
    const user = userEvent.setup();
    render(<Sandbox />);

    const reviews = screen.queryAllByRole("article");
    expect(reviews).toHaveLength(0);

    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await user.type(emailInput, "test@gmail.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "Great Product!!!!");
    await user.click(submitButton);

    expect(screen.getAllByRole("article")).toHaveLength(1);
  });
});
