import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("01-search-by-text", () => {
  it("demonstrate different query methods", async () => {
    render(<Sandbox />);

    screen.debug();

    // 1. getByText
    // const heading = screen.getByText("React Testing Library Examples");
    // expect(heading).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();

    const phoneRegex = /\d{3}-\d{3}-\d{4}/;
    const phoneText = screen.getByText(phoneRegex);
    expect(phoneText).toBeInTheDocument();

    const errorMessage = screen.queryByText("Error message");
    expect(errorMessage).not.toBeInTheDocument();

    // const items = screen.getByText("Item 1");
    const items = screen.getAllByText("Item 1");
    expect(items).toHaveLength(4);

    // const asyncMessage = await screen.findByText("Async message");
    // expect(asyncMessage).toBeInTheDocument();
    expect(await screen.findByText("Async message"));
  });
});
