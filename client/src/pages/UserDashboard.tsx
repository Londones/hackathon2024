import { useNavigate } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import GlycemiaLineChart from "@/components/GlycemiaLineChart";
import HypertensionBarChart from "@/components/HyperTensionBarChart";
import DiabeteAlertCard from "@/components/DiabeteAlertCard";
import HyperTensionAlertCard from "@/components/HypertensionAlertCard";
import ReminderCalendar from "@/components/ReminderCalendar";

const UserDashboard = () => {
    const { auth } = useAuth();

    return (
        <>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="flex flex-col sm:gap-4 sm:py-4">
                    <main className="flex flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Tabs defaultValue="glycemie" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="glycemie">Diabete</TabsTrigger>
                                <TabsTrigger value="hypertension">Hypertension</TabsTrigger>
                                <TabsTrigger value="rappel">Rappels</TabsTrigger>
                            </TabsList>
                            <TabsContent value="glycemie">
                                <div className="flex gap-4 md:gap-8">
                                    <div className="flex-grow">
                                        <GlycemiaLineChart />
                                    </div>
                                    <div className="w-1/3">
                                        <DiabeteAlertCard />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="hypertension">
                                <div className="flex gap-4 md:gap-8">
                                    <div className="flex-grow">
                                        <HypertensionBarChart />
                                    </div>
                                    <div className="w-1/3">
                                        <HyperTensionAlertCard />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="rappel">
                                <div className="w-full">
                                    <ReminderCalendar />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>
        </>
    )
};

export default UserDashboard;
