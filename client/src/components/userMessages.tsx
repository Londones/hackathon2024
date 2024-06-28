import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableFooter,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";

import {
 Card,
} from "@/components/ui/card"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

const fetchUserMessages = async (userId, accessToken) => {
 try {
   const response = await axios.get(`${(import.meta as any).env.VITE_SERVER_URL}/message/${userId}`, {
     headers: {
       Authorization: `Bearer ${accessToken}`,
       "Content-Type": "application/json",
     },
   });

   console.log("response" + response.data);
   return response.data;
 } catch (error) {
   console.error(error);
   return [];
 }
};

export function UserMessages() {
 const { auth } = useAuth();
 const [messages, setMessages] = useState([]);

 useEffect(() => {
   const getMessages = async () => {
     const fetchedMessages = await fetchUserMessages(auth.userId, auth.accessToken);
     setMessages(fetchedMessages);
   };
   getMessages();
 }, [auth.userId, auth.accessToken]);

 return (
   <Card className="m-6">
     <Table>
       <TableHeader>
         <TableRow>
           <TableHead>Date</TableHead>
           <TableHead>Type de message</TableHead>
           <TableHead>Contenue</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         {messages.map((message, index) => (
           <TableRow key={index}>
             <TableCell>{new Date(message.date).toLocaleString()}</TableCell>
             <TableCell style={{ color: message.messageType === 'warning' ? 'orange' : 'inherit' }}>
               {message.messageType}
             </TableCell>
             <TableCell>{message.content}</TableCell>
           </TableRow>
         ))}
       </TableBody>
       <TableFooter>
         <TableRow>
           <TableCell colSpan={3}>Total Messages: {messages.length}</TableCell>
         </TableRow>
       </TableFooter>
     </Table>
   </Card>
 );
}
