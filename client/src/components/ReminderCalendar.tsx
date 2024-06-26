import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const localizer = momentLocalizer(moment);

const generateReminders = (startDate, endDate) => {
    const reminders = [];
    let currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate)) {
        if (currentDate.date() === 15) {
            reminders.push({
                title: 'Enseigner le taux de tension artérielle',
                start: currentDate.toDate(),
                end: currentDate.toDate(),
                colorEvento: '#3366CC'
            });
            reminders.push({
                title: 'Enseigner le taux de glycémie',
                start: currentDate.toDate(),
                end: currentDate.toDate(),
                colorEvento: '#FF5733'
            });
        } else {
            reminders.push({
                title: 'Enseigner le taux de glycémie',
                start: currentDate.toDate(),
                end: currentDate.toDate(),
                colorEvento: '#FF5733'
            });
        }

        currentDate.add(1, 'days');
    }

    return reminders;
};


const startDate = moment();
const endDate = moment().add(1, 'year');
const reminders = generateReminders(startDate, endDate);


const ReminderCalendar = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={reminders}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                eventPropGetter={(event) => {
                    const backgroundColor = event.colorEvento ? event.colorEvento : 'blue';
                    return {
                        style: {
                            backgroundColor,
                            color: 'white',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer'
                        }
                    };
                }}
                onSelectEvent={handleEventClick}
            />

            {showDialog && selectedEvent && (
                <Dialog open={showDialog}>
                    <DialogTrigger asChild>
                        <div style={{ display: 'none' }}></div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedEvent.title}</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <button onClick={handleCloseDialog}>Fermer</button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ReminderCalendar;
