import { render, screen } from "@testing-library/react";
import { RunStatusPlaceholderIcon } from "@/components/icons/RunStatusPlaceholderIcon";

describe("RunStatusPlaceholderIcon", () => {
  it("has correct aria tags", async () => {
    render(<RunStatusPlaceholderIcon />);
    expect(
      await screen.findByRole("img", { name: "Job status placeholder icon" })
    ).toBeInTheDocument();
  });
});
