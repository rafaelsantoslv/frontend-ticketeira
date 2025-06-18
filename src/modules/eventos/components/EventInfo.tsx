import { TabsContent } from "@radix-ui/react-tabs";
import { EventCardInfo } from "./EventCardInfo";

export function EventInfo({ event, setIsFormOpen }) {

    return (
        <TabsContent value="info">
            <EventCardInfo event={event} setIsFormOpen={setIsFormOpen} />
        </TabsContent>
    )
}