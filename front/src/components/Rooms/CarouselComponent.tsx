"use client";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import RoomCard from "./RoomCard";
import { getRooms } from "@/api/getRooms";
import { Room } from "@/interfaces/index";
import styles from "./CarouselComponent.module.css";
import type { SwiperRef } from "swiper/react";

const SwiperComponent = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const swiperRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getRooms();
        console.log("Fetched rooms for swiper:", fetchedRooms);
        setRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.navigationButton} ${styles.prevButton}`}
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
        >
          &#x276E;
        </button>
      </div>

      <div className={styles.swiperContainer}>
        {rooms.length > 0 ? (
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            slidesPerView={rooms.length < 3 ? rooms.length : 3}
            navigation={{
              nextEl: `.${styles.nextButton}`,
              prevEl: `.${styles.prevButton}`,
            }}
            loop={rooms.length > 3}
          >
            {rooms.map((room) => (
              <SwiperSlide key={room.id} className={styles.swiperSlide}>
                <RoomCard {...room} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className={styles.noRoomsMessage}>
            No hay habitaciones disponibles
          </p>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.navigationButton} ${styles.nextButton}`}
          onClick={() => swiperRef.current?.swiper?.slideNext()}
        >
          &#x276F;
        </button>
      </div>
    </div>
  );
};

export default SwiperComponent;
