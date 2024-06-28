import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

const localizer = momentLocalizer(moment);

const generateReminders = (remindersData) => {
    const reminders = [];
    remindersData.forEach(item => {
        const startDate = moment(item.createdAt);
        const endDate = moment().add(1, 'year');
        let currentDate = moment(startDate);

        while (currentDate.isSameOrBefore(endDate)) {
            const startTime = moment(currentDate).set({
                hour: moment(item.heure, 'HH:mm:ss').get('hour'),
                minute: moment(item.heure, 'HH:mm:ss').get('minute'),
                second: moment(item.heure, 'HH:mm:ss').get('second')
            });
            const endTime = moment(startTime).add(1, 'hour');

            reminders.push({
                title: `Enseigner le taux de ${item.maladie}`,
                start: startTime.toDate(),
                end: endTime.toDate(),
                colorEvento: item.maladie === 'Diabete' ? '#FF5733' : '#3366CC'
            });

            currentDate.add(item.frequence, 'days');
        }
    });

    return reminders;
};


const ReminderCalendar = () => {
    const [reminder, setReminder] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { auth } = useAuth();

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const fetchUserReminders = async () => {
        try {
            const response = await axios.get(`${(import.meta as any).env.VITE_SERVER_URL}/rappel/${auth.userId}`, {
                headers: { Authorization: `Bearer ${auth.accessToken}`,
                "Content-Type": "application/json"},
            });
            
            console.log(response.data)
            const reminders = generateReminders(response.data);
            
            setReminder(reminders);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUserReminders();
    }, []);

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={reminder}
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
                views={['month', 'week', 'day']}
                toolbar={true}
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
