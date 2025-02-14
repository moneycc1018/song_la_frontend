import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import KkboxTab from "./components/kkbox/kkbox-tab";
import YtmusicTab from "./components/ytmusic/ytmusic-tab";

export default function MainPage() {
  return (
    <ScrollArea className="h-full">
      <div className="px-16 py-4">
        <Tabs defaultValue="kkbox" className="flex w-full flex-col">
          <TabsList className="w-1/2 self-center">
            <TabsTrigger value="kkbox" className="flex w-full items-center gap-2">
              <div className="relative min-h-5 min-w-5">
                <Image
                  src={"/images/kkbox_logo.svg"}
                  alt="kkbox_logo"
                  className="absolute"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  fill
                />
              </div>
              <span>KKBOX</span>
            </TabsTrigger>
            <TabsTrigger value="ytmusic" className="flex w-full items-center gap-2">
              <div className="relative min-h-5 min-w-5">
                <Image
                  src={"/images/ytmusic_logo.svg"}
                  alt="ytmusic_logo"
                  className="absolute"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  fill
                />
              </div>
              <span>YouTube Music</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="kkbox">
            <KkboxTab />
          </TabsContent>
          <TabsContent value="ytmusic">
            <YtmusicTab />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
