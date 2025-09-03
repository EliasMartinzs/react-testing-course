import UserCard from "@/components/user/UserCard";
import { render, screen } from "@testing-library/react";
import { it } from "vitest";

describe("UserCard", () => {
  const mockProps = {
    avatarUrl: "https://example.com/avatar.jpg",
    name: "Jonh Doe",
    bio: "Front End Developer",
    url: "https://github.com/jonhdoe",
  };

  it("renders users information correctly", () => {
    render(<UserCard {...mockProps} />);

    expect(screen.getByText("Jonh Doe")).toBeInTheDocument();
    expect(screen.getByText("Front End Developer")).toBeInTheDocument();

    const avatarImage = screen.getByAltText("Jonh Doe");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg"
    );

    const followLink = screen.getByRole("link", { name: /follow/i });
    expect(followLink).toHaveAttribute("href", "https://github.com/jonhdoe");
    expect(followLink).toHaveAttribute("target", "_blank");
    expect(followLink).toHaveAttribute("rel", "noreferrer");
  });

  it("renders default values when name and bio are not provided", () => {
    const propsWithoutNameAndBio = {
      ...mockProps,
      name: "",
      bio: "",
    };

    render(<UserCard {...propsWithoutNameAndBio} />);

    expect(screen.getByText("Coding Addict")).toBeInTheDocument();
    expect(
      screen.getByText("Passionate about coding and technology")
    ).toBeInTheDocument();
  });
});
