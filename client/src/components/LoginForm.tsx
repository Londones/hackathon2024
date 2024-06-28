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
    email: z.string().email("Please enter a valid email address"),
    password: z.string(),
    persist: z.boolean().default(false).optional(),
});

export default function LoginForm() {
    const { setAuth, persist, setPersist } = useAuth();
    const navigateTo = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                toast.success("Success", {
                    description: "You have successfully logged in",
                    action: {
                        label: "Dismiss",
                        onClick: () => {
                            toast.dismiss();
                        },
                    },
                });
            } else {
                let toastMsg = "";
                if (response.status === 400) {
                    toastMsg = "Email or password incorrect";
                } else if (response.status === 401) {
                    toastMsg = "Unauthorized access";
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

            const accessToken = response?.data?.token;
            const userId = response?.data?.id;
            const name = response?.data?.name;
            const firstName = response?.data?.firstName;
            const role = response?.data?.role;
            setAuth({ userId, name, firstName, email, accessToken, role });
            setEmail("");
            setPassword("");
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
                            <h1 className='text-3xl font-bold'>Login</h1>
                            <p className='text-balance text-muted-foreground'>
                                Enter your email below to login to your account
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
                                        <span>Remember me</span>
                                    </Label>
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <Button type='submit' className='btn btn-primary w-full'>
                                Login
                            </Button>
                        </FormItem>
                        <div className='flex justify-between'>
                            <FormDescription>
                                No account?{" "}
                                <Link to='/register' className='text-primary underline'>
                                    Register instead
                                </Link>
                            </FormDescription>
                            <FormDescription>
                                <Link to='/forgot-password' className='text-primary underline'>
                                    Forgot password?
                                </Link>
                            </FormDescription>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
