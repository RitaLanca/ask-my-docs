import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { UploadPanel } from "./upload-panel";

export const RagWorkspace = () => {
  return (
    <Tabs defaultValue="upload" className="w-2xl">
      <TabsList>
        <TabsTrigger id="upload-tab" value="upload">
          Upload
        </TabsTrigger>
        <TabsTrigger id="retrieve-tab" value="retrieve">
          Perguntar
        </TabsTrigger>
      </TabsList>
      <TabsContent id="upload-panel" value="upload">
        <UploadPanel />
      </TabsContent>
      <TabsContent id="retrieve-panel" value="retrieve">
        Change your password here.
      </TabsContent>
    </Tabs>
  );
};
