import { Tab as Tab$1 } from '@headlessui/react';
import { ComponentProps, ReactElement, ReactNode } from 'react';

type TabItem = string | ReactNode;
type TabObjectItem = {
    label: TabItem;
    disabled: boolean;
};
declare function _Tabs({ items, selectedIndex: _selectedIndex, defaultIndex, onChange, children, storageKey }: {
    items: (TabItem | TabObjectItem)[];
    selectedIndex?: number;
    defaultIndex?: number;
    onChange?: (index: number) => void;
    children: ReactNode;
    storageKey?: string;
}): ReactElement;
declare function Tab({ children, ...props }: ComponentProps<typeof Tab$1.Panel>): ReactElement;
declare const Tabs: typeof _Tabs & {
    displayName: string;
    Tab: typeof Tab;
};

export { Tab, Tabs };
