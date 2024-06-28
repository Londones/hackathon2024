import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Switch } from "./ui/switch";

const LoginFormSchema = z.object({
    email: z.string().email("Entrez un email valide"),
    password: z.string(),
    persist: z.boolean().default(false).optional(),
});

export default function LoginForm() {
    const { setAuth, persist, setPersist } = useAuth();
    const navigateTo = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
    });

    const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
        try {
            const response = await axios.post(
                `${(import.meta as any).env.VITE_SERVER_URL}/auth/login`,
                JSON.stringify({ email: values.email, password: values.password }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                toast.success("Validé", {
                    description: "Vous êtes connecté",
                    action: {
                        label: "Fermer",
                        onClick: () => {
                            toast.dismiss();
                        },
                    },
                });
            } else {
                let toastMsg = "";
                if (response.status === 400) {
                    toastMsg = "Email ou mot de passe incorrect";
                } else if (response.status === 401) {
                    toastMsg = "Accès non autorisé";
                }

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

            const accessToken = response?.data?.token;
            const userId = response?.data?.id;
            const name = response?.data?.name;
            const firstName = response?.data?.firstName;
            const role = response?.data?.role;
            const age = response?.data?.age;
            const email = response?.data?.email;
            setAuth({ userId, name, firstName, age, email, accessToken, role });
            navigateTo(from, { replace: true });
            if (role === "admin") {
                navigateTo("/admin", { replace: true });
            } else if (role === "user") {
                navigateTo("/user", { replace: true });
            }

            localStorage.setItem("userConnected", "true");
            localStorage.setItem("userName", response.data.firstName);
            localStorage.setItem("persist", values.persist.toString());
            setPersist(values.persist);

            if (values.persist) {
                localStorage.setItem("auth", JSON.stringify({ userId, name, firstName, email, accessToken, role }));
            }
        } catch (error: any) {
            console.error(error);
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
                            <h1 className='text-3xl font-bold'>Connexion</h1>
                            <p className='text-balance text-muted-foreground'>
                                Connectez-vous pour accéder à votre compte
                            </p>
                        </div>
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
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='Mot de passe' {...field} />
                                    </FormControl>
                                    <FormDescription>Entrez votre mot de passe</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='persist'
                            render={({ field }) => (
                                <FormItem className='w-full flex justify-end'>
                                    <Label htmlFor='persist' className='flex items-center'>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            id='persist'
                                            className='mr-4'
                                        />
                                        <span>Se sourvenir de moi</span>
                                    </Label>
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <Button type='submit' className='btn btn-primary w-full'>
                                Se connecter
                            </Button>
                        </FormItem>
                        <div className='flex justify-between'>
                            <FormDescription>
                                Pas de compte ?{" "}
                                <Link to='/register' className='text-primary underline'>
                                    S'inscrire
                                </Link>
                            </FormDescription>
                            <FormDescription>
                                <Link to='/forgot-password' className='text-primary underline'>
                                    Mot de passe oublié ?
                                </Link>
                            </FormDescription>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
