import { SbEditorHeader } from './index'

const languagesItems = ['English', 'German']

const usersList = [
  {
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'John Doe',
  },
  {
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'Kobe Bryant',
  },
  {
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'Elvis Presley',
  },
]

const optionsList = [
  {
    name: 'Open Draft',
  },
  {
    name: 'Open Published',
  },
  {
    name: 'Draft json',
  },
  {
    name: 'Published json',
  },
  {
    name: 'Unpublish',
    type: 'negative',
  },
]

const actionsList = [
  {
    name: 'Dimensions',
  },
  {
    name: 'Preview',
  },
  {
    name: 'Unpublish',
  },
]

const EditorTemplate = (args) => ({
  components: { SbEditorHeader },
  props: Object.keys(args),
  template: `
    <SbEditorHeader
      v-bind="{
        languages,
        users,
        actions,
        options,
        spaceStatus,
        hasSaveButton,
        showPublishedIcon,
        headerTitle,
        headerSubTitle,
      }"
    />
  `,
})

export default {
  title: 'Design System/Components/SbEditorHeader',
  component: SbEditorHeader,
  parameters: {
    docs: {
      description: {
        component: 'SbEditorHeader',
      },
    },
  },
  args: {
    languages: [...languagesItems],
    users: [...usersList],
    actions: [...actionsList],
    options: [...optionsList],
    spaceStatus: 'unpublished',
    hasSaveButton: true,
    showPublishedIcon: true,
    headerTitle: 'API-based & Headless CMS as a Service',
    headerSubTitle: 'Updated 15m ago',
  },
  argTypes: {
    languages: {
      name: 'languages',
      description: 'Available languages array',
      control: {
        type: 'array',
      },
    },
    users: {
      name: 'users',
      description: 'User information array',
      control: {
        type: 'object',
      },
    },
    actions: {
      name: 'actions',
      description: 'Available actions array',
      control: {
        type: 'object',
      },
    },
    options: {
      name: 'options',
      description: 'Available options array',
      control: {
        type: 'object',
      },
    },
    spaceStatus: {
      name: 'spaceStatus',
      description:
        'Change the icon to inform whether the space is published or not',
      control: {
        type: 'select',
        options: ['unpublished', 'published', 'published-and-changes'],
      },
    },
    hasSaveButton: {
      name: 'hasSaveButton',
      description: 'Props to show the save icon',
      control: {
        type: 'boolean',
      },
    },
    showPublishedIcon: {
      name: 'showPublishedIcon',
      description: 'Props to show or not the published icon',
      control: {
        type: 'boolean',
      },
    },
    headerTitle: {
      name: 'headerTitle',
      description: '',
      control: {
        type: 'text',
      },
    },
    headerSubTitle: {
      name: 'headerSubTitle',
      description: '',
      control: {
        type: 'text',
      },
    },
  },
}

export const Default = EditorTemplate.bind({})
