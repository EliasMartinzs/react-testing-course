import { render, screen } from "@testing-library/react";
import { type Item } from "../utils";
import ItemCard from "../components/ItemCard";
import userEvent, { UserEvent } from "@testing-library/user-event";

type mockItem = Item & {
  onDelete: (id: string) => void;
};

describe("Item Card Component", () => {
  let user: UserEvent;
  const mockProps: mockItem = {
    id: "1",
    description: "Text description",
    category: "urgent",
    title: "Title here!!!!",
    onDelete: vi.fn(),
  };

  it("renders card with correct content ", () => {
    render(<ItemCard {...mockProps} />);
    screen.debug();

    expect(
      screen.getByRole("heading", { level: 3, name: /title here!!!!/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Text description")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
  });

  it("call onDelete button when delete button is clicked", async () => {
    user = userEvent.setup();
    render(<ItemCard {...mockProps} />);

    const deleteButton = screen.getByRole("button", {
      name: /delete task: 1/i,
    });

    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalledWith("1");
  });
});
