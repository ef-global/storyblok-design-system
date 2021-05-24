import SbFormItem from './index'
import SbRadio from '../Radio'
import SbTextField from '../TextField'
import SbButton from '../Button'

export default {
  title: 'Design System/Components/Form/SbFormItem',
  component: SbFormItem,
  args: {
    label: 'Label',
    helperIconText: 'Helper icon text',
    helperText: 'Helper text',
  },
}

export const Default = (args) => ({
  components: { SbButton, SbFormItem, SbRadio, SbTextField },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Selected',
    placeholder: 'Placeholder',
  }),
  template: `
    <div>
      <SbFormItem
        :label="label"
        :helper-icon-text="helperIconText"
        :helper-text="helperText"
        style="margin-bottom: 20px"
      >
        <SbTextField
          :placeholder="placeholder"
        />
      </SbFormItem>

      <SbFormItem :label="label">
        <SbRadio
          name="example"
          id="inactive"
          label="Inactive"
          v-model="internalValue"
          native-value="Inactive"
          inline
          style="margin-right: 20px;"
        />

        <SbRadio
          name="example"
          id="selected"
          label="Selected"
          v-model="internalValue"
          native-value="Selected"
          inline
        />
      </SbFormItem>

      <SbFormItem :label="label" grouped>
        <SbTextField
          name="example"
          id="textfield"
          style="flex: 1"
        />

        <SbButton label="Just a button" />
      </SbFormItem>
    </div>
  `,
})
