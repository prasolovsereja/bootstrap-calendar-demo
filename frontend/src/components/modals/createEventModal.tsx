import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type { Event } from '../../types/Event';

type FormData = Omit<Event, 'id'>;

interface ModalProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

const CreateEventModal: FC<ModalProps> = ({ onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <>
      <div className="modal show d-block " tabIndex={-1} data-testid="calendar-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)} data-testid="event-form">
              <div className="modal-header">
                <h5 className="modal-title">Добавить событие</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Название
                  </label>
                  <input
                    id="title"
                    {...register('title', { required: true })}
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Описание
                  </label>
                  <textarea
                    id="description"
                    {...register('description')}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Дата
                  </label>
                  <input
                    id="date"
                    type="date"
                    {...register('date', { required: true })}
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="start" className="form-label">
                    Начало
                  </label>
                  <input
                    id="start"
                    type="time"
                    {...register('start', { required: true })}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="end" className="form-label">
                    Конец
                  </label>
                  <input
                    id="end"
                    type="time"
                    {...register('end', { required: true })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  data-testid="close-modal"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => console.log('submit-click')}
                  data-testid="submit-form"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show fade"></div>
    </>
  );
};
export default CreateEventModal;
