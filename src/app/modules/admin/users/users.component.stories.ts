import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { UsersComponent } from './users.component';
import { UsersModule } from './users.module';

type ComponentWithCustomControls = UsersComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Users',
  component: UsersComponent,
  decorators: [
    moduleMetadata({
      imports: [UsersModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Users` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const Users = Template.bind({});
Users.args = {};
