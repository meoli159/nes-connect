import React from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap } from "@liveblocks/client";
import { RoomProvider } from "../../api/liveblocks.config";
import LiveBlocksContext from "../../components/LiveBlocksContext/index";

function LiveBlocks() {
  return (
    <RoomProvider
      id="react-whiteboard-app"
      initialStorage={{
        shapes: new LiveMap(),
      }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => <LiveBlocksContext />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default LiveBlocks;
