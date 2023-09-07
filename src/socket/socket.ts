import io from "socket.io-client";

const baseUrl = `${process.env.NEXT_PUBLIC_WHEELYX_BACKEND_DEV_SOCKET}`;
export const rankSocket = io(baseUrl);
