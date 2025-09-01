import userEvent, { UserEvent } from "@testing-library/user-event";
import { Post } from "../hooks/usePosts";
import { render, screen } from "@testing-library/react";
import Item from "../components/Item";

const mockPost: Post = {
  id: "2",
  likes: 5,
  title: "new post",
};

const mockOnLike = vi.fn();
const mockOnDelete = vi.fn();

describe("Item Component", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    render(
      <Item post={mockPost} onDelete={mockOnDelete} onLike={mockOnLike} />
    );
  });

  it("renders post title correctly ", () => {
    expect(screen.getByText("new post")).toBeInTheDocument();
  });

  it("displays correct number of likes", () => {
    expect(screen.getByText(`👍 ${mockPost.likes}`));
  });

  it("calls onLike when like button is clicled", async () => {
    const buttonLike = screen.getByRole("button", {
      name: `👍 ${mockPost.likes}`,
    });
    await user.click(buttonLike);
    expect(mockOnLike).toHaveBeenCalledTimes(1);
    expect(mockOnLike).toHaveBeenCalledWith(mockPost.id);
  });

  it("calls onDelete when onDelete button is clicked", async () => {
    const buttonDelete = screen.getByRole("button", {
      name: /delete/i,
    });
    await user.click(buttonDelete);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockPost.id);
  });
});
