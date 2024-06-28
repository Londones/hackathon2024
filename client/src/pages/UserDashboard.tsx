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
  
                    <main className="p-6 space-y-6">
                        <Tabs defaultValue='glycemie'>
                            <TabsList className="flex space-x-4">
                                <TabsTrigger value='glycemie'>Diabète</TabsTrigger>
                                <TabsTrigger value='hypertension'>Hypertension</TabsTrigger>
                                <TabsTrigger value='rappel'>Rappels</TabsTrigger>
                            </TabsList>
                            <TabsContent value='glycemie' className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                
                                    <div className='col-span-2'>
                                        <GlycemiaLineChart />
                                    </div>
                                    <div className="space-y-6">
                                        <Button
                                            className='w-full'
                                            onClick={() => {
                                                navigate("/user/diabete");
                                            }}
                                        >
                                            Enregistrer sa glycémie
                                        </Button>
                                        <DiabeteAlertCard />
                                    </div>
                               
                            </TabsContent>
                            <TabsContent value='hypertension'>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <div className='col-span-2'>
                                        <HypertensionBarChart />
                                    </div>
                                    <div className='flex flex-col h-full gap-4'>
                                        <Button
                                            className='w-full'
                                            onClick={() => {
                                                navigate("/user/hypertension");
                                            }}
                                        >
                                            Enregistrer sa tension
                                        </Button>
                                        <HyperTensionAlertCard />
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

        </>
    );
};

export default UserDashboard;
