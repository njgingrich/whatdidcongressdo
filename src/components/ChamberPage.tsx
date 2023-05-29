import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import EmptyState from "~/components/EmptyState";
import BillCard from '~/components/BillCard';

type TypeProps = {
    today: any[];
    recent: any[];
    emptyMessage: string;
}

const ListComponent = (data: any) => <BillCard bill={data} />;

export default function ChamberPage({ today, recent, emptyMessage }: TypeProps) {
    return (
        <Tabs>
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
                        {today.map(action => (
                            <li className="action-card--list__item" key={action.description}>
                                <ListComponent data={action} />
                            </li>
                        ))}
                    </ul>
                </TabPanel>
                <TabPanel>
                    <ul className="action-card--list">
                        {recent.map(action => (
                            <li className="action-card--list__item" key={action.description}>
                                <ListComponent data={action} />
                            </li>
                        ))}
                    </ul>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}