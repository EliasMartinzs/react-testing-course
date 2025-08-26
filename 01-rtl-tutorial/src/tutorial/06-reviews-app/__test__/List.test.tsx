import List from "../List";
import { Review } from "../Sandbox";
import { render, screen } from "@testing-library/react";

const mockReviews: Review[] = [
  {
    email: "teste@gmail.com",
    rating: "4",
    text: "aaaaa",
  },
  {
    email: "teste1@gmail.com",
    rating: "1",
    text: "fsafasfasfs",
  },
];

describe("List Component", () => {
  it("renders heading", () => {
    render(<List reviews={[]} />);
    screen.debug();

    expect(
      screen.getByRole("heading", { level: 2, name: /reviews/i })
    ).toBeInTheDocument();
  });

  it('displays "no reviews yet" when arrays is empty', () => {
    render(<List reviews={[]} />);

    expect(screen.getByText("No reviews yet")).toBeInTheDocument();
  });

  it("renders reviews correctly when provided", () => {
    render(<List reviews={mockReviews} />);

    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      const stars = "⭐".repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
