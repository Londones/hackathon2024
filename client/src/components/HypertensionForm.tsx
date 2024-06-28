import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { axiosPrivate } from "@/api/axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import { fr } from "date-fns/locale/fr";

const HypertensionFormSchema = z.object({
    systolic: z.coerce
        .number({
            required_error: "Entrez un nombre pour la pression systolique",
        })
        .int("La pression systolique doit être un nombre entier")
        .positive("La pression systolique doit être un nombre positif"),
    diastolic: z.coerce
        .number({
            required_error: "Entrez un nombre pour la pression diastolique",
        })
        .int("La pression diastolique doit être un nombre entier")
        .positive("La pression diastolique doit être un nombre positif"),
    date: z.date({
        required_error: "Entrez une date",
    }),
});

const HypertensionForm = () => {
    const { auth } = useAuth();
    const form = useForm<z.infer<typeof HypertensionFormSchema>>({
        resolver: zodResolver(HypertensionFormSchema),
    });
    const [open, setOpen] = React.useState(false);
    const [warningMsg, setWarningMsg] = React.useState("");
    const [formValues, setFormValues] = React.useState<z.infer<typeof HypertensionFormSchema> | null>(null);

    const onSubmit = async (values: z.infer<typeof HypertensionFormSchema>) => {
        try {
            const response = await axiosPrivate.post(
                "/disease/hypertension",
                {
                    systolic: values.systolic,
                    diastolic: values.diastolic,
                    date: values.date.toISOString(),
                    userID: auth?.userId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.accessToken}`,
                    },
                }
            );
            if (response.status === 201) {
                toast.success(response.data.message, {
                    action: {
                        label: "Fermer",
                        onClick: () => {
                            toast.dismiss();
                        },
                    },
                });
                form.reset();
            }
        } catch (error) {
            let toastMsg = "Erreur lors de l'ajout de la pression artérielle";
            // Check if error.response exists
            if (error.response) {
                if (error.response.status === 409) {
                    setFormValues(values);
                    setWarningMsg(error.response.data.warning);
                    setOpen(true);
                } else if (error.response.status > 400) {
                    toastMsg = error.response.data.error;
                }
            } else {
                toastMsg = "Erreur réseau ou réponse inattendue du serveur";
            }

            if (error.response.status !== 409) {
                toast.error("Erreur", {
                    description: toastMsg,
                    action: {
                        label: "Fermer",
                        onClick: () => {
                            toast.dismiss();
                        },
                    },
                });
            }
        }
    };

    const onSubmitConfirmUpsert = async () => {
        try {
            const response = await axiosPrivate.post(
                "/disease/hypertension",
                {
                    systolic: formValues.systolic,
                    diastolic: formValues.diastolic,
                    date: formValues.date,
                    userID: auth?.userId,
                    confirmUpsert: true,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.accessToken}`,
                    },
                }
            );

            if (response.status === 201) {
                toast.success(response.data.message, {
                    action: {
                        label: "Fermer",
                        onClick: () => {
                            toast.dismiss();
                        },
                    },
                });
                setOpen(false);
                form.reset();
            }
        } catch (error) {
            let toastMsg = "";
            if (!error?.response) {
                toastMsg = "Erreur réseau";
            } else if (error.response?.status > 400) {
                toastMsg = error.response?.data.error;
            }

            toast.error("Error", {
                description: toastMsg,
                action: {
                    label: "Fermer",
                    onClick: () => {
                        toast.dismiss();
                    },
                },
            });
        }
    };

    return (
        <div className='w-96 py-12 justify-center'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader className='font-bold'>Attention</DialogHeader>
                    <DialogDescription>{warningMsg}</DialogDescription>
                    <FormItem>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type='button' variant='secondary'>
                                    Annuler
                                </Button>
                            </DialogClose>
                            <Button
                                className='bg-red-500 hover:bg-red-400 dark:text-white'
                                onClick={onSubmitConfirmUpsert}
                            >
                                Confirmer
                            </Button>
                        </DialogFooter>
                    </FormItem>
                </DialogContent>
            </Dialog>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "d MMMM yyyy", { locale: fr })
                                                ) : (
                                                    <span>Choissez une date</span>
                                                )}
                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0' align='start'>
                                        <Calendar
                                            mode='single'
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Choisissez pour quel jour vous voulez enregistrer votre pression artérielle
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='systolic'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Pression Systolique</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Entrez la pression systolique' value={field.value} />
                                </FormControl>
                                <FormDescription>Entrez la valeur de la pression systolique en mmHg</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='diastolic'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Pression Diastolique</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Entrez la pression diastolique' />
                                </FormControl>
                                <FormDescription>Entrez la valeur de la pression diastolique en mmHg</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex flex-row gap-2'>
                        <Button
                            variant='outline'
                            className='w-1/2'
                            onClick={() => {
                                window.history.back();
                            }}
                        >
                            Retour
                        </Button>
                        <Button className='w-1/2' type='submit'>
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default HypertensionForm;
