import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("02-tdd-example", () => {
  it("should render heading", () => {
    render(<Sandbox />);

    const heading = screen.getByText(/react/i);
    expect(heading).toBeInTheDocument();
  });
});
