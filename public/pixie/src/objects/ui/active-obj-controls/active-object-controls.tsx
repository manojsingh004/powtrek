import React from 'react';
import {Item} from '@react-stately/collections';
import {FormattedMessage} from 'react-intl';
import {TabList} from '../../../common/ui/tabs/tab-list';
import {Tabs} from '../../../common/ui/tabs/tabs';
import {TextStyleTabPanel} from './text-style-tab-panel';
import {TabPanels} from '../../../common/ui/tabs/tab-panels';
import {ColorTabPanel} from './color-tab-panel';
import {OpacityTabPanel} from './opacity-tab-panel';
import {OutlineTabPanel} from './outline-tab-panel';
import {useStore} from '../../../state/store';
import {ImageTabPanel} from './image-tab-panel';
import {ShadowTabPanel} from './shadow-tab-panel';

export function ActiveObjectControls() {
  const active = useStore(s => s.objects.active);

  return (
    <Tabs size="sm" className="pb-18 pt-6">
      <TabList>
        {active.isText && (
          <Item key="font">
            <FormattedMessage defaultMessage="Font" />
          </Item>
        )}
        {!active.isImage && (
          <Item key="fill">
            <FormattedMessage defaultMessage="Color" />
          </Item>
        )}
        {!active.isImage && (
          <Item key="bgColor">
            <FormattedMessage defaultMessage="Background" />
          </Item>
        )}
        {active.isImage && (
          <Item key="image">
            <FormattedMessage defaultMessage="Image" />
          </Item>
        )}
        <Item key="opacity">
          <FormattedMessage defaultMessage="Opacity" />
        </Item>
        <Item key="outline">
          <FormattedMessage defaultMessage="Outline" />
        </Item>
        <Item key="shadow">
          <FormattedMessage defaultMessage="Shadow" />
        </Item>
      </TabList>
      <TabPanels className="flex items-center justify-center gap-10 pt-16 h-50 w-full">
        <Item key="font">
          <TextStyleTabPanel />
        </Item>
        <Item key="fill">
          <ColorTabPanel property="fill" />
        </Item>
        <Item key="bgColor">
          <ColorTabPanel property="backgroundColor" />
        </Item>
        <Item key="image">
          <ImageTabPanel />
        </Item>
        <Item key="opacity">
          <OpacityTabPanel />
        </Item>
        <Item key="outline">
          <OutlineTabPanel />
        </Item>
        <Item key="shadow">
          <ShadowTabPanel />
        </Item>
      </TabPanels>
    </Tabs>
  );
}
