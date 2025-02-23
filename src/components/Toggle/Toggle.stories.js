import SbToggle from './index'
import LIB_ICONS from '../../lib/internal-icons'

const availableIcons = Object.keys(LIB_ICONS)

export default {
  title: 'Design System/Components/Form/SbToggle',
  component: SbToggle,
  args: {
    id: 'example',
    name: 'example',
    modelValue: false,
    nativeValue: false,
    indeterminate: false,
    disabled: false,
    required: false,
    variant: 'primary',
    icon: null,
  },
  argTypes: {
    variant: {
      name: 'variant',
      description: '`SbToggle` variant',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost', 'danger'],
      },
    },
    icon: {
      name: 'icon',
      description: '`SbToggle` icon',
      control: {
        type: 'select',
        options: [...availableIcons],
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbToggle },
  setup() {
    return { ...args }
  },
  template: `
    <div>
      <SbToggle
        :name="name"
        id="inactive"
        label="Inactive"
        :modelValue="modelValue"
        :disabled="disabled"
        :required="required"
        :icon="icon"
        :variant="variant"
        style="margin-bottom: 10px;"
      />

      <SbToggle
        :name="name"
        id="active"
        label="Active"
        :modelValue="true"
        :disabled="disabled"
        :required="required"
        :icon="icon"
        :variant="variant"
        style="margin-bottom: 10px;"
      />

      <SbToggle
        :name="name"
        id="inactive-disabled"
        label="Inactive - Disabled"
        :modelValue="modelValue"
        :required="required"
        :icon="icon"
        :variant="variant"
        disabled
      />

    </div>
  `,
})

export const WithIcon = (args) => ({
  components: { SbToggle },
  setup() {
    return { ...args }
  },
  template: `
    <div>
      <div style="margin-bottom: 20px">
        <SbToggle
          id="selected"
          label="With Icon Inactive"
          :name="name"
          :modelValue="false"
          :icon="'world'"
          :variant="variant"
          native-value="With Icon Inactive"
          style="margin-bottom: 10px;"
        />
      </div>
    </div>
  `,
})
export const WithVariant = (args) => ({
  components: { SbToggle },
  setup() {
    return { ...args }
  },
  template: `
    <div>
      <SbToggle
        id="default-variant"
        label="Default Variant"
        :name="name"
        :modelValue="true"
        :icon="icon"
        :variant="'primary'"
        native-value="Default Variant"
        style="margin-bottom: 10px;"
      />

      <SbToggle
        id="secondary-variant"
        label="Secondary Variant"
        :name="name"
        :modelValue="true"
        :icon="icon"
        :variant="'secondary'"
        native-value="Secondary Variant"
        style="margin-bottom: 10px;"
      />

      <SbToggle
        id="ghost-variant"
        label="Ghost Variant"
        :name="name"
        :modelValue="true"
        :icon="icon"
        :variant="'ghost'"
        native-value="Ghost Variant"
        style="margin-bottom: 10px;"
      />

      <SbToggle
        id="danger-variant"
        label="Danger Variant"
        :name="name"
        :modelValue="true"
        :icon="icon"
        :variant="'danger'"
        native-value="Danger Variant"
        style="margin-bottom: 10px;"
      />
    </div>
  `,
})
