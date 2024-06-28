import React from "react";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const RegisterFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string(),
    name: z.string(),
    age: z.union([z.number().min(0, "Age must be a positive number").optional(), z.string().optional()]),
    sexe: z.enum(["Male", "Female", "Other"]).optional(),
    weight: z.union([z.number().min(0, "Weight must be a positive number").optional(), z.string().optional()]),
    height: z.union([z.number().min(0, "Height must be a positive number").optional(), z.string().optional()]),
});

export default function RegisterForm() {
    const navigateTo = useNavigate();

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
    });

    const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
        try {
            await axios.post(`${(import.meta as any).env.VITE_SERVER_URL}/auth/register`, JSON.stringify(values), {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            navigateTo("/login", { replace: true });
        } catch (error: any) {
            let toastMsg = "";
            if (!error?.response) {
                toastMsg = "Network error";
            } else if (error.response?.status === 400) {
                toastMsg = "Email already exists";
            } else {
                toastMsg = "An error occurred";
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
        <div className='w-full flex-grow lg:grid lg:grid-cols-2'>
            <div
                className='hidden bg-muted lg:block'
                style={{
                    backgroundImage:
                        "url('https://plus.unsplash.com/premium_photo-1678310820699-cf7e3e6b8f9b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            ></div>
            <div className='flex items-center justify-center py-12'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto grid w-[350px] gap-4'>
                        <div className='grid gap-2 text-center'>
                            <h1 className='text-3xl font-bold'>Register</h1>
                            <p className='text-balance text-muted-foreground'>
                                Entrez vos informations pour créer un compte
                            </p>
                        </div>
                        <FormField
                            control={form.control}
                            name='firstName'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder='John' {...field} />
                                    </FormControl>
                                    <FormDescription>Entrez vortre prénom</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>Nom de famille</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Doe' {...field} />
                                    </FormControl>
                                    <FormDescription>Entrez votre nom de famille</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='age'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder='25' {...field} />
                                    </FormControl>
                                    <FormDescription>Entre votre age</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='sexe'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>Sexe</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder='Selectionnez votre sexe' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value='Male'>Male</SelectItem>
                                                    <SelectItem value='Female'>Female</SelectItem>
                                                    <SelectItem value='Other'>Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>Selectionnez votre sexe</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='weight'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>Poids</FormLabel>
                                    <FormControl>
                                        <Input type='text' placeholder='70' {...field} />
                                    </FormControl>
                                    <FormDescription>Entrez votre poids en kg</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='height'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>Taille</FormLabel>
                                    <FormControl>
                                        <Input type='text' placeholder='170' {...field} />
                                    </FormControl>
                                    <FormDescription>Entrez votre taille en cm</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='example@mail.com' {...field} />
                                    </FormControl>
                                    <FormDescription>Entrez votre email</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='Mot de passe' {...field} />
                                    </FormControl>
                                    <FormDescription>Entrez votre mot de passe</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <Button type='submit' className='btn btn-primary w-full'>
                                S'inscrire
                            </Button>
                        </FormItem>
                        <div className='flex justify-between'>
                            <FormDescription>
                                Vous avez déjà un compte ?{" "}
                                <Link to='/login' className='text-primary underline'>
                                    Connectez-vous
                                </Link>
                            </FormDescription>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
