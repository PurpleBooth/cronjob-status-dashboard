import { render, screen } from "@testing-library/react";
import { RunStatusFailedIcon } from "@/components/icons/RunStatusFailedIcon";

describe("RunStatusFailedIcon", () => {
  it("has correct aria tags", async () => {
    render(<RunStatusFailedIcon />);
    expect(
      await screen.findByRole("img", { name: "Job status failed icon" })
    ).toBeInTheDocument();
  });
});
