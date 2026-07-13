import { IconClose } from "./icons";

export interface ClearButtonProps {
  onClear: () => void;
}

export function ClearButton({ onClear }: ClearButtonProps) {
  return (
    <button
      className="ui-sandpack-action"
      onClick={onClear}
      title="Clear all edits and reload sandbox"
      type="button"
    >
      <IconClose className="ui-sandpack-action-icon" />
      <span>Clear</span>
    </button>
  );
}
