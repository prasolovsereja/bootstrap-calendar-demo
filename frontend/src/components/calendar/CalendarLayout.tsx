import { useState, useMemo, type FC } from 'react';
import { isEqual, isWithinInterval, parseISO } from 'date-fns';
import { useAppSelector, useAppDispatch } from '../../slices/hooks';
import CalendarGrid from './CalendarGrid';
import CalendarToolbar from './CalendarToolbar';
import { getTimeSlots } from '../../utils/time';
import { toggleDisplayMode } from '../../slices/calendarSlice';
import CreateEventModal from '../modals/createEventModal';
import { useGetSlotSize } from '../../hooks/useGetSlotSize';
import { computePositionedEvents } from '../../utils/computePositionedEvents';
import { useGetEventsQuery, useCreateEventMutation } from '../../api/eventsApi';
import type { Event } from '../../types/Event';

const CalendarLayout: FC = () => {
  const dispatch = useAppDispatch();

  const { data: events = [] } = useGetEventsQuery({});
  const [createEvent] = useCreateEventMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStage, setAnimationStage] = useState<
    | 'expanded'
    | 'collapsing'
    | 'collapsed'
    | 'expanding'
    | 'disappearing-collapsing'
    | 'disappearing-expanding'
  >('expanded');

  const { displayMode, currentDay, selectedWeek, currentWeek } = useAppSelector(
    state => state.calendar,
  );

  const isCurrentWeek = isEqual(selectedWeek.start, currentWeek.start);
  const fullWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

  const [visualDays, setVisualDays] = useState<string[]>(fullWeek);

  const timeSlots = getTimeSlots();

  const handleToggleMode = async () => {
    if (displayMode === 'week') {
      setIsAnimating(true);
      setAnimationStage('collapsing');

      setTimeout(() => {
        setAnimationStage('disappearing-collapsing');
        setVisualDays([]);

        setTimeout(() => {
          dispatch(toggleDisplayMode());
          setVisualDays([currentDay]);

          setAnimationStage('collapsed');
          setIsAnimating(false);
        }, 900);
      }, 300);
    } else {
      setIsAnimating(true);
      setAnimationStage('expanding');
      setVisualDays([currentDay]);

      setTimeout(() => {
        setAnimationStage('disappearing-expanding');
        setVisualDays([]);
      }, 100);
      setTimeout(() => {
        dispatch(toggleDisplayMode());
        setVisualDays(fullWeek);
        setAnimationStage('expanded');

        setIsAnimating(false);
      }, 600);
    }
  };
  const handleAddEvent = async (data: Event) => {
    try {
      await createEvent(data).unwrap();
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false);
  };

  const { ref: slotRef, slotWidth, slotHeight } = useGetSlotSize(visualDays);
  const eventsInSelectedWeek = events.filter(e =>
    isWithinInterval(parseISO(e.date), {
      start: selectedWeek.start,
      end: selectedWeek.end,
    }),
  );
  const eventsToRender = useMemo(() => {
    if (!slotWidth || !slotHeight) return [];
    return computePositionedEvents({
      events: eventsInSelectedWeek,
      slotWidth,
      timeSlots,
      daysToRender: visualDays,
      slotHeight,
    });
  }, [eventsInSelectedWeek, slotWidth, timeSlots, visualDays, slotHeight]);
  return (
    <div className="d-flex flex-column w-100 vh-100">
      <CalendarToolbar
        displayMode={displayMode}
        isCurrentWeek={isCurrentWeek}
        selectedWeek={selectedWeek}
        openModal={() => setIsModalOpen(true)}
        handleToggleMode={handleToggleMode}
        isAnimating={isAnimating}
      />
      <CalendarGrid
        daysToRender={visualDays}
        timeSlots={timeSlots}
        positionedEvents={eventsToRender}
        slotRef={slotRef}
        displayMode={displayMode}
        animationStage={animationStage}
      />
      {isModalOpen && (
        <CreateEventModal onSubmit={handleAddEvent} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
export default CalendarLayout;
