import { logRoles, render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("03-search-by-role", () => {
  it("renders nav and navgations links", () => {
    const { container } = render(<Sandbox />);
    logRoles(container);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("renders heading with correct hierachy", () => {
    render(<Sandbox />);

    expect(screen.getByRole("heading", { name: "Main Heading", level: 1 }));
    expect(screen.getByRole("heading", { name: "Subheading", level: 2 }));
  });

  it("renders image with alt text", () => {
    render(<Sandbox />);

    expect(screen.getByRole("img", { name: "example" })).toBeInTheDocument();
  });

  it("renders inital buttons", () => {
    render(<Sandbox />);

    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("error button is not initially visivle", () => {
    render(<Sandbox />);

    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
