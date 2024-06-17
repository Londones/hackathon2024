import React, { useState } from "react";
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

const RegisterFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
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
                toastMsg = "Email or username already exists";
            } else {
                toastMsg = "An error occurred";
            }

            toast.error("Error", {
                description: toastMsg,
                action: {
                    label: "Dismiss",
                    onClick: () => {
                        toast.dismiss();
                    },
                },
            });
        }
    };

    return (
        <div className='w-full flex-grow lg:grid lg:grid-cols-2'>
            <div className='hidden bg-muted lg:block'>
                <img
                    alt='Image'
                    width='1920'
                    height='1080'
                    className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
                />
            </div>
            <div className='flex items-center justify-center py-12'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto grid w-[350px] gap-4'>
                        <div className='grid gap-2 text-center'>
                            <h1 className='text-3xl font-bold'>Register</h1>
                            <p className='text-balance text-muted-foreground'>
                                Enter your details below to create a new account
                            </p>
                        </div>
                        <FormField
                            control={form.control}
                            name='firstName'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='John' {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your first name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='lastName'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Doe' {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your last name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder='johndoe' {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your username</FormDescription>
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
                                    <FormDescription>Enter your email</FormDescription>
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
                                        <Input type='password' placeholder='Password' {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your password</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <Button type='submit' className='btn btn-primary w-full'>
                                Register
                            </Button>
                        </FormItem>
                        <div className='flex justify-between'>
                            <FormDescription>
                                Already have an account?{" "}
                                <Link to='/login' className='text-primary underline'>
                                    Login instead
                                </Link>
                            </FormDescription>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
