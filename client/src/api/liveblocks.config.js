
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
const client = createClient({
  publicApiKey: "pk_dev_OZ4v6OOTNZvcHnlTxmkvzHkn",
});
export const {
  useHistory,
  useOthers,
  useBatch,
  RoomProvider,
  useMyPresence,
  useMap,
  useRoom,
} = createRoomContext(client);