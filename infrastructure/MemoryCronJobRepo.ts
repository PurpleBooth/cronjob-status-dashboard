import { ServerSideCronJob } from "../domain/entities/CronJob";
import { RunStatus } from "../domain/value-objects/RunStatus";
import { CronJobRepo } from "./CronJobRepo";

export class MemoryCronJobRepo implements CronJobRepo {
  public async getCronJobs(namespace: string): Promise<ServerSideCronJob[]> {
    return Promise.resolve([
      {
        id: "1",
        name: "audible-cli-import",
        lastSchedule: "2016-01-01 21:03:01",
        paused: true,
        runStatus: [
          RunStatus.Failed,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.InProgress,
        ],
      },
      {
        id: "2",
        name: "beets-music-genre",
        paused: false,
        runStatus: [],
        lastSchedule: null,
      },
      {
        id: "3",
        name: "beets-music-import",
        lastSchedule: "2016-03-01 21:03:01",
        paused: false,
        runStatus: [
          RunStatus.Failed,
          RunStatus.Failed,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Succeeded,
          RunStatus.Failed,
          RunStatus.InProgress,
        ],
      },
    ]);
  }
}
