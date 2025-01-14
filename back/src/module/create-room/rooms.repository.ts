import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from '../../entities/Room.entity';
import { Repository } from "typeorm";
import { FilesService } from '../files/files.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { roomsMock } from './rooms-mock';


@Injectable()
export class RoomsRepository {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        private readonly filesService: FilesService
    ){}


   
  async createRoom(createRoomDto: Partial<Room>): Promise<Room> {
    const lastRoom = await this.roomRepository.find({
      order: { roomNumber: 'DESC'},
      take: 1
    });

    const newRoomNumber = lastRoom[0]?.roomNumber ? lastRoom[0].roomNumber + 1: 1;
    const newRoom = this.roomRepository.create({
      ...createRoomDto,
      roomNumber: newRoomNumber,
    });

    return await this.roomRepository.save(newRoom);
  }

    

    async getAllRooms(page: number, limit: number): Promise<Room[]> {
        return this.roomRepository.find({

          where: { isDeleted: false },

          take: limit > 0 ? limit : 10, // Ajusta el valor predeterminado si es necesario
          skip: (page - 1) * limit,
        });
      }



    async deleteRoomById(id: string): Promise<{id:string}> {    
        await this.roomRepository.delete(id), { isDeleted: false }; 
        return {id};
    }

    
    async findById(id: string): Promise<Room | null> {
        return await this.roomRepository.findOne({ where: { id, isDeleted: false } });
      }


    async findByTitle(title: string): Promise<Room | null> {
     return this.roomRepository.findOne({ where: { title } });
  }

  async seedRooms() {
    const existingRoom = (await this.roomRepository.find()).map(
      (rooms) => rooms.title,
      );

      for(const roomsData of roomsMock) {
        if(!existingRoom.includes(roomsData.title)) {
          const rooms = new Room();
          rooms.title = roomsData.title;
          rooms.size = roomsData.size;
          rooms.beds = roomsData.beds;
          rooms.rating = roomsData.rating;
          rooms.image = roomsData.image;
          rooms.price = roomsData.price;
          rooms.description = roomsData.description;
          rooms.roomType = roomsData.roomType;
          rooms.roomNumber = roomsData.roomNumber;

          await this.roomRepository.save(rooms)
        }
      }

      console.log('Rooms seeding complete')
  }
}