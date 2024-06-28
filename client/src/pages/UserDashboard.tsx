import { useNavigate } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import GlycemiaLineChart from "@/components/GlycemiaLineChart";
import HypertensionBarChart from "@/components/HyperTensionBarChart";
import DiabeteAlertCard from "@/components/DiabeteAlertCard";
import HyperTensionAlertCard from "@/components/HypertensionAlertCard";
import ReminderCalendar from "@/components/ReminderCalendar";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <div className='flex flex-grow w-full flex-col bg-muted/40'>
                <div className='flex flex-col sm:gap-4 sm:py-4'>
                    <main className='flex flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
                        <Tabs defaultValue='glycemie' className='w-full'>
                            <TabsList className='grid w-full grid-cols-3'>
                                <TabsTrigger value='glycemie'>Diabete</TabsTrigger>
                                <TabsTrigger value='hypertension'>Hypertension</TabsTrigger>
                                <TabsTrigger value='rappel'>Rappels</TabsTrigger>
                            </TabsList>
                            <TabsContent value='glycemie'>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <div className='md:col-span-2'>
                                        <GlycemiaLineChart />
                                    </div>
                                    <div className='flex flex-col gap-4 w-full'>
                                        <DiabeteAlertCard />
                                        <Button
                                            variant='outline'
                                            className='w-full'
                                            onClick={() => {
                                                navigate("/user/diabete");
                                            }}
                                        >
                                            Enregistrer sa glycémie
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value='hypertension'>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <div className='col-span-2'>
                                        <HypertensionBarChart />
                                    </div>
                                    <div className='flex flex-col h-full gap-4'>
                                        <HyperTensionAlertCard />
                                        <Button
                                            variant='outline'
                                            className='w-full'
                                            onClick={() => {
                                                navigate("/user/hypertension");
                                            }}
                                        >
                                            Enregistrer sa tension
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value='rappel'>
                                <div className='w-full'>
                                    <ReminderCalendar />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
