import { RunStatus } from "../value-objects/RunStatus";
import { parseISO } from "date-fns";

export interface ServerSideCronJob {
  id: string;
  name: string;
  lastSchedule: string | null;
  runStatus: RunStatus[];
  paused: boolean;
}

export interface CronJob extends Omit<ServerSideCronJob, "lastSchedule"> {
  lastSchedule?: Date;
}

export const createCronJobFromServerSide = (
  serverSideCronJob: ServerSideCronJob
): CronJob => {
  return {
    ...serverSideCronJob,
    lastSchedule: serverSideCronJob.lastSchedule
      ? parseISO(serverSideCronJob.lastSchedule)
      : undefined,
  };
};
