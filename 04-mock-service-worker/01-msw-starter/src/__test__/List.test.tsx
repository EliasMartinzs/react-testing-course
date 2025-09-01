import { render, screen } from "@testing-library/react";
import { Post } from "../hooks/usePosts";
import List from "../components/List";

const mockPosts: Post[] = [
  {
    id: "0",
    likes: 1,
    title: "new post 1",
  },
  {
    id: "2",
    likes: 2,
    title: "new post 2",
  },
];

const mockOnLikes = vi.fn();
const mockOnDelete = vi.fn();

describe("List Component", () => {
  it("renders correct numbers of articles", () => {
    render(
      <List posts={mockPosts} onLike={mockOnLikes} onDelete={mockOnDelete} />
    );

    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(2);
  });

  it("renders empty posts when no posts provided", () => {
    render(<List posts={[]} onLike={mockOnLikes} onDelete={mockOnDelete} />);

    const articles = screen.queryAllByRole("article");
    expect(articles).toHaveLength(0);
  });
});
