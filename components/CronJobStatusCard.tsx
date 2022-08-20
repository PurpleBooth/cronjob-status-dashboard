import { CronJob } from "../domain/entities/CronJob";
import { CronJobPausedIcon } from "./icons/CronJobPausedIcon";
import { RunStatusIcon } from "./icons/RunStatusIcon";
import { formatDistanceToNow, formatISO } from "date-fns";

export const CronJobStatusCard = ({ cronJob }: { cronJob: CronJob }) => (
  <article className="bg-neutral-100 p-0 m-0 w-96 drop-shadow p-0 m-2 dark:bg-neutral-800">
    <div className="p-4 border-b-fuchsia-900 border-b-2 flex justify-between">
      <h1>{cronJob.name}</h1>
      {cronJob.paused && <CronJobPausedIcon />}
    </div>
    <div className="px-4 pb-4 pt-5 flex flex-row justify-evenly gap-2 p-2 border-2 border m-8">
      {cronJob.runStatus.length < 10 &&
        Array.from(Array(10 - cronJob.runStatus.length).keys()).map((item) => (
          <RunStatusIcon key={item} />
        ))}
      {cronJob.runStatus.slice(-10).map((status, index) => (
        <RunStatusIcon status={status} key={index} />
      ))}
    </div>
    {cronJob.lastSchedule && (
      <p
        className={
          "px-4 pb-4 text-sm text text-neutral-800/75 dark:text-neutral-100/75"
        }
      >
        Last ran{" "}
        <time dateTime={formatISO(cronJob.lastSchedule)}>
          {formatDistanceToNow(cronJob.lastSchedule)}
        </time>{" "}
        ago
      </p>
    )}
  </article>
);
