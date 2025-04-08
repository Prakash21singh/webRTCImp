import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import axios from "axios";

export default function useSocket() {
  const socketCreate = useRef<boolean | null>(null);

  useEffect(() => {
    if (!socketCreate.current) {
      const socketInitialiser = async () => {
        await axios.get("/api/socket");
      };

      try {
        socketInitialiser();
        socketCreate.current = true;
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
}
