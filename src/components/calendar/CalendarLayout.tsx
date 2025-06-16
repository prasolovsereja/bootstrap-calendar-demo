import type { FC } from "react";
import CalendarGrid from "./CalendarGrid";
import CalendarToolbar from "./CalendarToolbar";

const CalendarLayout: FC = () => {
  return (
    <div className="d-flex flex-column w-100 vh-100">
      <CalendarToolbar />
      <CalendarGrid />
    </div>
  )
};
export default CalendarLayout;