import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import StatsCard from "@/components/user/StatsCard";

describe("StatsCard", () => {
  it("renders title and count correctly", () => {
    render(<StatsCard title="Total Users" count={42} />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders with the zero count", () => {
    render(<StatsCard title="Total Users" count={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders with large numbers", () => {
    render(<StatsCard title="Total Users" count={10000000000} />);
    expect(screen.getByText("10000000000")).toBeInTheDocument();
  });
});
