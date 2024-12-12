
import { Room } from "@/interfaces";


export const getRooms = async (): Promise<Room[]> => {  
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const res = await fetch(`${APIURL}/rooms/getRooms`, {
            headers: {
                'Cache-Control': 'no-store', 
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch rooms');
        }

        const data: Room[] = await res.json(); 
        console.log("Rooms fetched:", data);  
        return data; 
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return [];
    }
};


export const getRoomById = async (id: string): Promise<Room | null> => {
    try {
        const rooms = await getRooms();
        return rooms.find(room => room.id === id) || null;  
    } catch (error) {
        console.error("Error fetching room by id:", error);
        return null;  
    }
};
