import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
    maladie: z.string(),
    frequence: z.coerce.number(),
    heure: z.string(),
});

const EditReminderDialog = ({ onClose, onUpdate, initialValues, mode }) => {
    const [reminders, setReminders] = useState([]);
    const { auth } = useAuth();
    const [heure, setHeure] = useState('');
    const [minute, setMinute] = useState('');
    const [seconde, setSeconde] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            maladie: mode === 'add' ? ['Diabete', 'Hypertension'] : '',
            frequence: null,
            heure: '',
        },
    });


    const fetchReminder = async () => {
        try {
            const response = await axios.get(`${(import.meta as any).env.VITE_SERVER_URL}/rappel/${auth.userId}`, {
                headers: { Authorization: `Bearer ${auth.accessToken}`,
                "Content-Type": "application/json"},
            });

            setReminders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const heureComplete = `${heure.padStart(2, '0')}:${minute.padStart(2, '0')}:${seconde.padStart(2, '0')}`;
    
        values.heure = heureComplete;
    
        const formData = {
            ...values,
            heure: heureComplete,
        };
    
        try {
            let response;
            if (mode === 'add') {
                response = await axios.post(`${(import.meta as any).env.VITE_SERVER_URL}/rappel/${auth.userId}`, formData, {
                    headers: { Authorization: `Bearer ${auth.accessToken}`, "Content-Type": "application/json" },
                });
            } else {
                response = await axios.put(`${(import.meta as any).env.VITE_SERVER_URL}/rappel/${auth.userId}`, formData, {
                    headers: { Authorization: `Bearer ${auth.accessToken}`, "Content-Type": "application/json" },
                });
            }
    
            if (response.status === 200 || response.status === 201) {
                toast.success("Succès", {
                    description: "Rappel modifié avec succès",
                    action: {
                        label: "Fermer",
                        onClick: () => {
                            toast.dismiss();
                        },
                    },
                });
                onClose();
                onUpdate();
            } else if (response.status === 400) {
                toast.error("Erreur", {
                    description: "Rappel déjà existant pour cette maladie",
                    action: {
                        label: "Fermer",
                        onClick: () => {
                            toast.dismiss();
                        },
                    },
                });
                onClose();
            } else {
                toast.error("Erreur", {
                    description: "Erreur lors de la modification du rappel",
                    action: {
                        label: "Fermer",
                        onClick: () => {
                            toast.dismiss();
                        },
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMaladieChange = (value) => {
        if (mode === 'edit') {
            const selectedReminder = reminders.find(reminder => reminder.maladie === value);
            if (selectedReminder) {
                form.setValue('frequence', selectedReminder.frequence);
                
                const [heure, minute, seconde] = selectedReminder.heure.split(':');
                setHeure(heure);
                setMinute(minute);
                setSeconde(seconde);
            }
        }
    };

    useEffect(() => {
        fetchReminder();
    }, []);

    return (
        <Dialog open={true}>
            <DialogTrigger asChild>
                <div style={{ display: 'none' }}></div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gestion des rappels</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="maladie"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Maladie</FormLabel>
                                <Select onValueChange={value => { field.onChange(value); handleMaladieChange(value); }} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez une maladie" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {mode === 'add' ? (
                                            <>
                                                <SelectItem value="Diabete">
                                                    Diabete
                                                </SelectItem>
                                                <SelectItem value="Hypertension">
                                                    Hypertension
                                                </SelectItem>
                                            </>
                                        ) : (
                                            reminders.map((reminder, index) => (
                                                <SelectItem key={index} value={reminder.maladie}>
                                                    {reminder.maladie}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="frequence"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Fréquence</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="1" {...field} />
                            </FormControl>
                            <FormDescription>
                                Entrez la fréquence de rappel.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="heure"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Temps</FormLabel>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                                        <Input value={heure} onChange={e => setHeure(e.target.value)} placeholder="Heure" /> : 
                                        <Input value={minute} onChange={e => setMinute(e.target.value)} placeholder="Minute" /> :
                                        <Input value={seconde} onChange={e => setSeconde(e.target.value)} placeholder="Seconde" />
                                    </div>
                                    <FormDescription>
                                        Entrez le temps du rappel.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <DialogFooter>
                            <Button type="submit">Enregistrer</Button>
                            <Button type="button" variant="secondary" onClick={onClose}>Annuler</Button>
                        </DialogFooter>
                    </form>
                </Form>
                
            </DialogContent>
        </Dialog>
    );
};

export default EditReminderDialog;