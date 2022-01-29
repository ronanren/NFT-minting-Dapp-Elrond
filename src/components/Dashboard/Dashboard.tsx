import React from 'react';
import { useState } from 'react';
import { Pane, Tablist, Tab } from 'evergreen-ui';
import MainLayout from '../MainLayout';
import AccountTab from './AccountTab';
import MintTab from './MintTab';

const tabs = ['Mint', 'My NFTs'];

const Dashboard: React.FC = () => {
  const [selectedIndex, setTabSelectedIndex] = useState(0);

  return (
    <MainLayout>
      <Pane>
        <Tablist marginBottom={20} marginTop={35}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              id={tab}
              appearance="primary"
              onSelect={() => setTabSelectedIndex(index)}
              isSelected={index === selectedIndex}
              className="no-focus"
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
        <Pane flex="1">{selectedIndex === 0 && <MintTab />}</Pane>
        <Pane flex="1">{selectedIndex === 1 && <AccountTab />}</Pane>
      </Pane>
    </MainLayout>
  );
};

export default Dashboard;
