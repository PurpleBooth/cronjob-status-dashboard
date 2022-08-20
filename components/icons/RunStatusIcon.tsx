import { RunStatusFailedIcon } from "./RunStatusFailedIcon";
import { RunStatusInProgressIcon } from "./RunStatusInProgressIcon";
import { RunStatusSucceededIcon } from "./RunStatusSucceededIcon";
import { RunStatusPlaceholderIcon } from "./RunStatusPlaceholderIcon";
import { RunStatus } from "../../domain/value-objects/RunStatus";

export const RunStatusIcon = ({ status }: { status?: RunStatus }) => {
  switch (status) {
    case RunStatus.Failed:
      return <RunStatusFailedIcon />;
    case RunStatus.InProgress:
      return <RunStatusInProgressIcon />;
    case RunStatus.Succeeded:
      return <RunStatusSucceededIcon />;
    case undefined:
      return <RunStatusPlaceholderIcon />;
  }
};
