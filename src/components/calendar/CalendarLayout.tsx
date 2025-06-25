import { useState, useMemo, type FC } from 'react';
import { isEqual } from 'date-fns';
import { useAppSelector, useAppDispatch } from '../../slices/hooks';
import CalendarGrid from './CalendarGrid';
import CalendarToolbar from './CalendarToolbar';
import { getTimeSlots } from '../../utils/time';
import type { Event } from '../../types/Event';
import { toggleDisplayMode } from '../../slices/calendarSlice';
import CreateEventModal from '../modals/createEventModal';
import { useGetSlotSize } from '../../hooks/useGetSlotSize';
import { computePositionedEvents } from '../../utils/computePositionedEvents';
import './CalendarLayout.css';

const CalendarLayout: FC = () => {
  const dispatch = useAppDispatch();

  const [events, setEvents] = useState<Event[]>([]);
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

  // const daysToRender = useMemo(() => {
  //   if (animationStage === 'collapsing') return fullWeek;
  //   if (animationStage === 'collapsed') return [currentDay];
  //   if (animationStage === 'expanding') return [currentDay];
  //   return fullWeek;
  // }, [fullWeek, currentDay, animationStage]);

  const [visualDays, setVisualDays] = useState<string[]>(fullWeek);

  const timeSlots = getTimeSlots();

  // const handleToggleMode = () => {
  //   if (displayMode === 'week') {
  //     setAnimationStage('collapsing');
  //     setIsAnimating(true);
  //     setTimeout(() => {
  //       dispatch(toggleDisplayMode());
  //       setIsAnimating(false);
  //       setAnimationStage('collapsed');
  //     }, 700);
  //   } else {
  //     setAnimationStage('expanding');
  //     setIsAnimating(true);
  //     dispatch(toggleDisplayMode());
  //     setTimeout(() => {
  //       setIsAnimating(false);
  //       setAnimationStage('expanded');
  //     }, 700);
  //   }
  // };
  const handleToggleMode = () => {
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
        dispatch(toggleDisplayMode()); // режим WEEK
        setVisualDays(fullWeek); // выкатываем все дни каскадом
        setAnimationStage('expanded');
        setIsAnimating(false);
      }, 600); // длительность expand
    }
  };
  console.log(animationStage);
  const handleAddEvent = (data: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...data,
      id: crypto.randomUUID(),
    };
    setEvents(prev => [...prev, newEvent]);
    setIsModalOpen(false);
  };

  const { ref: slotRef, slotWidth, slotHeight } = useGetSlotSize(visualDays);

  const eventsToRender = useMemo(() => {
    if (!slotWidth || !slotHeight) return [];
    return computePositionedEvents({
      events,
      slotWidth,
      timeSlots,
      daysToRender: visualDays,
      slotHeight,
    });
  }, [events, slotWidth, timeSlots, visualDays, slotHeight]);
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
