import { SbDataTable, SbDataTableColumn } from '.'
import SbAvatar from '../Avatar'
import SbAvatarGroup from '../AvatarGroup'

const description = {
  allowSelection: 'Allow row selection.',
  actionsMenu: 'Select a row to show the actions menu',
  component:
    'Data tables are used to organize and display data efficiently. `SbDataTable` component allows for customization with additional functionality, as needed by your product’s users.',
  headers: 'It must be an array that represents the header content.',
  hideHeader: 'Toggle table header.',
  isLoading: 'Show a loading over the table.',
  items:
    'It must be an array. Each entry in the array represents a row in the table.',
  selectionMode:
    'By default the selection mode is single, meaning only one row at a time can be selected. Use multiple, so multiple rows can be selected. `allowSelection: true` is required.',
  striped: 'Add zebra-striping to any table row within the `<tbody>.`',
}

const DataTableTemplate = (args) => ({
  components: { SbDataTable },
  props: Object.keys(args),
  template: `
    <SbDataTable
      v-bind="{
        allowSelection,
        headers,
        isLoading,
        items,
        selectionMode,
        hideHeader,
        striped
      }"
    />
  `,
})

export default {
  title: 'Design System/Components/SbDataTable',
  components: SbDataTable,
  excludeStories: /.*Data$/,
  parameters: {
    docs: {
      description: {
        component: description.component,
      },
    },
  },
  args: {
    allowSelection: false,
    headers: [],
    hideHeader: false,
    isLoading: false,
    items: [],
    selectionMode: 'single',
    striped: false,
  },
  argTypes: {
    allowSelection: {
      name: 'allowSelection',
      description: description.allowSelection,
      control: {
        type: 'boolean',
      },
    },
    headers: {
      name: 'headers',
      description: description.headers,
    },
    hideHeader: {
      name: 'hideHeader',
      description: description.hideHeader,
      control: {
        type: 'boolean',
      },
    },
    isLoading: {
      name: 'isLoading',
      description: description.isLoading,
      control: {
        type: 'boolean',
      },
    },
    items: {
      name: 'items',
      description: description.items,
    },
    selectionMode: {
      name: 'selectionMode',
      description: description.selectionMode,
      control: {
        type: 'select',
        options: ['single', 'multiple'],
      },
    },
    striped: {
      name: 'striped',
      description: description.striped,
      control: {
        type: 'boolean',
      },
    },
  },
}

export const defaultTableHeadersData = [
  {
    label: 'Dessert (100g serving)',
    value: 'name',
    main: true,
    sortable: true,
  },
  { label: 'Calories', value: 'calories', sortable: true },
  { label: 'Fat (g)', value: 'fat' },
  { label: 'Carbs (g)', value: 'carbs' },
  { label: 'Protein (g)', value: 'protein' },
  { label: 'Iron (%)', value: 'iron' },
]

export const defaultTableItemsData = [
  {
    name: 'Frozen Yogurt',
    calories: 262,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 159,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
  },
]

export const Default = DataTableTemplate.bind({})

Default.args = {
  headers: [...defaultTableHeadersData],
  items: [...defaultTableItemsData],
}

export const ActionsMenu = DataTableTemplate.bind({})

ActionsMenu.args = {
  ...Default.args,
  allowSelection: true,
  selectionMode: 'multiple',
}

ActionsMenu.parameters = {
  docs: {
    description: {
      story: description.actionsMenu,
    },
  },
}

export const HideHeader = DataTableTemplate.bind({})

HideHeader.args = {
  ...Default.args,
  hideHeader: true,
}

HideHeader.parameters = {
  docs: {
    description: {
      story: description.hideHeader,
    },
  },
}

export const IsLoading = DataTableTemplate.bind({})

IsLoading.args = {
  ...Default.args,
  isLoading: true,
}

IsLoading.parameters = {
  docs: {
    description: {
      story: description.isLoading,
    },
  },
}

export const SelectionMode = DataTableTemplate.bind({})

SelectionMode.args = {
  ...Default.args,
  allowSelection: true,
  selectionMode: 'single',
}

SelectionMode.parameters = {
  docs: {
    description: {
      story: description.selectionMode,
    },
  },
}

export const Striped = DataTableTemplate.bind({})

Striped.args = {
  ...Default.args,
  striped: true,
}

Striped.parameters = {
  docs: {
    description: {
      story: description.striped,
    },
  },
}

export const Slots = (args) => ({
  components: {
    SbDataTable,
    SbAvatarGroup,
    SbAvatar,
    SbDataTableColumn,
  },
  props: Object.keys(args),
  template: `
    <div>
      <SbDataTable
        v-bind="{
          allowSelection,
          headers,
          isLoading,
          items,
          selectionMode,
          hideHeader,
          striped
        }"
      >
        <SbDataTableColumn label="Spaces" :sortable="true" value="title" v-slot="props" width="50%">
          <span class="sb-data-table__col-main">{{ props.row.title }}</span><br>
          Edited {{ props.row.editedOn }}
        </SbDataTableColumn>

        <SbDataTableColumn label="Authors" v-slot="props">
          <SbAvatarGroup v-for="(author, index) in props.row.authors" :key="index">
            <SbAvatar v-bind="author" />
          </SbAvatarGroup>
        </SbDataTableColumn>

        <SbDataTableColumn label="Static">
          Static content testing
        </SbDataTableColumn>
      </SbDataTable>
    </div>
  `,
})

Slots.args = {
  heading: [
    {
      label: 'Spaces',
      value: 'title',
      main: true,
      sortable: true,
    },
    { label: 'Authors' },
  ],
  items: [
    {
      title: 'My second space',
      editedOn: '3 days ago',
      authors: [
        {
          name: 'John Doe',
          src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
        },
        {
          name: 'Kobe Bryant',
          src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
        },
      ],
    },
    {
      title: 'My first space',
      editedOn: '3 days ago',
      authors: [
        {
          name: 'John Doe',
          src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
        },
        {
          name: 'Kobe Bryant',
          src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
        },
      ],
    },
    {
      title: 'Storyblok Demo',
      editedOn: '3 days ago',
      authors: [
        {
          name: 'John Doe',
          src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
        },
      ],
    },
  ],
}
