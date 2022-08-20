import { render, screen } from "@testing-library/react";
import { RunStatusInProgressIcon } from "@/components/icons/RunStatusInProgressIcon";

describe("RunStatusInProgressIcon", () => {
  it("has correct aria tags", async () => {
    render(<RunStatusInProgressIcon />);
    expect(
      await screen.findByRole("img", { name: "Job status in progress icon" })
    ).toBeInTheDocument();
  });
});
