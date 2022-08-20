import { render, screen } from "@testing-library/react";
import { CronJobPausedIcon } from "@/components/icons/CronJobPausedIcon";

describe("CronJobPausedIcon", () => {
  it("has correct aria tags", async () => {
    render(<CronJobPausedIcon />);
    expect(
      await screen.findByRole("img", { name: "Paused cronjob" })
    ).toBeInTheDocument();
  });
});
