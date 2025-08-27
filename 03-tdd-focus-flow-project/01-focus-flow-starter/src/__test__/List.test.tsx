import { render, screen } from "@testing-library/react";
import List from "../components/List";
import { Item } from "../utils";

vi.mock("../components/ItemCard", () => {
  const MockItemCard = ({
    id,
    title,
    description,
    category,
    onDelete,
  }: {
    id: string;
    title: string;
    description: string;
    category: string;
    onDelete: ReturnType<typeof vi.fn>;
  }) => (
    <article data-testid="item-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{category}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </article>
  );

  return {
    default: MockItemCard,
  };
});

describe("List Component", () => {
  const mockItems: Item[] = [
    {
      id: "1",
      title: "Test item 1",
      category: "urgent",
      description: "Content 1",
    },
    {
      id: "2",
      title: "Test item 2",
      category: "urgent",
      description: "Content 2",
    },
  ];

  const mockOnDelete = vi.fn();

  it("renders the flow board heading", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />);
    screen.debug();

    expect(
      screen.getByRole("heading", { level: 2, name: /flow board/i })
    ).toBeInTheDocument();
  });

  it("renders correct number of ItemCards", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />);

    const cards = screen.getAllByTestId("item-card");
    // const cards = screen.getAllByRole("article");

    expect(cards).toHaveLength(2);
  });

  it("renders empty grid when items not provided", () => {
    render(<List items={[]} onDelete={mockOnDelete} />);
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });

  it("ALTERNATIVE: renders correct number of ItemCards", () => {
    const { getAllByRole } = render(
      <List items={mockItems} onDelete={mockOnDelete} />
    );

    const cards = getAllByRole("article");
    expect(cards).toHaveLength(2);
  });

  it("ALTERNATIVE: renders empty grid when items not provided", () => {
    const { queryAllByRole } = render(
      <List items={[]} onDelete={mockOnDelete} />
    );
    expect(queryAllByRole("article")).toHaveLength(0);
  });
});
