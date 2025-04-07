import { useEffect } from "react";
import toast from "react-hot-toast";
import { connection } from "../lib/signalr-client";

let isConnected = false;

export default function SignalRListener() {
  useEffect(() => {
    if (!isConnected && connection.state === "Disconnected") {
      isConnected = true;
      connection
        .start()
        .then(() => console.log("✅ Connected to SignalR"))
        .catch((err) => {
          isConnected = false;
          console.error("❌ Connect fail:", err);
        });
    }

    connection.on("OrderItemUpdatedStatus", (data) => {
      console.log("OrderItemUpdatedStatus:", data);

      toast(data.title, {
        description: data.message,
        duration: Infinity,
        closeButton: true,
      });
      console.log("OrderItemUpdatedStatus:", data);
    });

    return () => {
      connection.off("OrderItemUpdatedStatus");
    };
  }, []);

  return null;
}
