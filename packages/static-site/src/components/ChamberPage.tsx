import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import EmptyState from "~/components/EmptyState";
import BillCard from '~/components/BillCard';
import { TypeBill } from "~/api/v2/schemas/bill";

interface TypeProps {
    today: TypeBill[];
    recent: TypeBill[];
    emptyMessage: string;
}

export default function ChamberPage({ today, recent, emptyMessage }: TypeProps) {
    const hasToday = today.length > 0;

    return (
        <Tabs defaultIndex={hasToday ? 0 : 1}>
            <TabList className="chamber-page--tabs">
                <Tab className="chamber-page--tab">
                    <h2>Today</h2>
                </Tab>
                <Tab className="chamber-page--tab">
                    <h2>Recent</h2>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {today.length === 0 && (
                        <EmptyState message={emptyMessage} />
                    )}
                    <ul className="action-card--list">
                        {today.map(item => (
                            <li className="action-card--list__item">
                                <BillCard bill={item} />
                            </li>
                        ))}
                    </ul>
                </TabPanel>
                <TabPanel>
                    <ul className="action-card--list">
                        {recent.map(item => (
                            <li className="action-card--list__item">
                                <BillCard bill={item} />
                            </li>
                        ))}
                    </ul>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
