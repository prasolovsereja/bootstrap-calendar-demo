import type { FC } from "react";

const CalendarToolbar: FC = () => {
  return (
    <div
      className="d-flex flex-row calendar-toolbar h-auto vw-100 py-2"
      style={{minWidth: "max-content"}}
    >
      <div className="d-flex flex-row align-items-center justify-content-evenly w-50">
        <button className="btn btn-outline-primary">{'<-'}</button>
        <p className="m-0">Date</p>
        <button className="btn btn-outline-primary">{'->'}</button>
      </div>
      <div className="d-flex flex-row justify-content-evenly w-50">
        <button className="btn btn-primary">
          Добавить событие
        </button>
        <button className="btn btn-primary">Свернуть календарь</button>
      </div>
    </div>
  );
};
export default CalendarToolbar;