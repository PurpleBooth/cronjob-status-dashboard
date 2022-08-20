import { render, screen } from "@testing-library/react";
import { CronJobStatusCard } from "@/components/CronJobStatusCard";
import { RunStatus } from "../domain/value-objects/RunStatus";
import { subDays } from "date-fns";

describe("CronJobStatusCard", () => {
  describe("Pause con", () => {
    it("Tells you when the job is paused", async () => {
      render(
        <CronJobStatusCard
          cronJob={{ id: "a", name: "name", runStatus: [], paused: true }}
        />
      );
      expect(
        await screen.findByRole("img", { name: "Paused cronjob" })
      ).toBeInTheDocument();
    });

    it("There is no icon when not paused", async () => {
      render(
        <CronJobStatusCard
          cronJob={{ id: "a", name: "name", runStatus: [], paused: false }}
        />
      );
      expect(screen.queryByRole("img", { name: "Paused cronjob" })).toBeNull();
    });
  });
  describe("Title text", () => {
    it("The title is the title of the job", async () => {
      render(
        <CronJobStatusCard
          cronJob={{ id: "a", name: "Job Name", runStatus: [], paused: false }}
        />
      );
      expect(
        await screen.findByRole("heading", { name: "Job Name" })
      ).toBeInTheDocument();
    });
  });

  describe("Job history", () => {
    it("At least 10 dots are shown", async () => {
      render(
        <CronJobStatusCard
          cronJob={{ id: "a", name: "Job Name", runStatus: [], paused: false }}
        />
      );
      expect(
        await screen.findAllByRole("img", {
          name: "Job status placeholder icon",
        })
      ).toHaveLength(10);
    });
    it("The placeholders vanish as the jobs are ran", async () => {
      render(
        <CronJobStatusCard
          cronJob={{
            id: "a",
            name: "Job Name",
            runStatus: [
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
            ],
            paused: false,
          }}
        />
      );
      expect(
        await screen.findAllByRole("img", {
          name: "Job status placeholder icon",
        })
      ).toHaveLength(1);
    });
    it("10 or more jobs leaves no placeholders", async () => {
      render(
        <CronJobStatusCard
          cronJob={{
            id: "a",
            name: "Job Name",
            runStatus: [
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
              RunStatus.Succeeded,
            ],
            paused: false,
          }}
        />
      );
      expect(
        screen.queryAllByRole("img", { name: "Job status placeholder icon" })
      ).toHaveLength(0);
    });
    it("renders the dots in the order that they appear in the Job given", async () => {
      render(
        <CronJobStatusCard
          cronJob={{
            id: "a",
            name: "Job Name",
            runStatus: [RunStatus.Succeeded, RunStatus.Failed],
            paused: false,
          }}
        />
      );

      const images = await screen.findAllByRole("img");
      expect(images.map((e) => e.getAttribute("aria-label"))).toEqual([
        "Job status placeholder icon",
        "Job status placeholder icon",
        "Job status placeholder icon",
        "Job status placeholder icon",
        "Job status placeholder icon",
        "Job status placeholder icon",
        "Job status placeholder icon",
        "Job status placeholder icon",
        "Job status succeeded icon",
        "Job status failed icon",
      ]);
    });
  });

  describe("Updated at", () => {
    it("shows the last schedule date if there is one", async () => {
      render(
        <CronJobStatusCard
          cronJob={{
            id: "a",
            name: "Job Name",
            runStatus: [],
            paused: false,
            lastSchedule: subDays(new Date(), 100),
          }}
        />
      );

      expect(await screen.findByText("3 months")).toBeInTheDocument();
    });

    it("does not show the date if there isn't one", async () => {
      render(
        <CronJobStatusCard
          cronJob={{
            id: "a",
            name: "Job Name",
            runStatus: [],
            paused: false,
          }}
        />
      );

      expect(screen.queryByText("Last ran")).toBeNull();
    });
  });
});
