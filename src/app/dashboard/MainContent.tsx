import { SidebarInset } from '@/components/ui/sidebar';
import { useTab } from '@/components/ui/tab-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MainContent() {
    const { tabs, activeTab } = useTab();

    return (
        <SidebarInset className='items-center justify-center'>
            <Tabs value={activeTab?.id} className='size-full'>
                <TabsList>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.id} value={tab.id}>
                            {tab.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.id} className='items-center justify-center'>
                        {tab.name}
                    </TabsContent>
                ))}
            </Tabs>
        </SidebarInset>
    );
}
