<template>
  <div class="sb-toggle" :class="componentClasses">
    <input
      :id="id"
      v-model="internalValue"
      v-bind="$attrs"
      :indeterminate.prop="indeterminate"
      class="sb-toggle__native"
      type="checkbox"
      :name="name"
      :value="nativeValue"
      :required="required"
      :disabled="disabled"
      @click.stop
      @input="handleInput"
    />
    <label :for="id" class="sb-toggle__label">{{ label }}</label>
    <SbIcon
      v-if="icon"
      class="sb-toggle__icon sb-toggle__icon--active"
      :name="icon"
    />
    <SbIcon
      v-if="icon"
      class="sb-toggle__icon sb-toggle__icon--inactive"
      :name="icon"
    />
  </div>
</template>

<script>
import CheckboxRadioMixin from '../../mixins/checkbox-radio-mixin'
import SbIcon from '../Icon'

export default {
  name: 'SbToggle',
  components: {
    SbIcon,
  },
  mixins: [CheckboxRadioMixin],

  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    indeterminate: Boolean,
  },
  computed: {
    componentClasses() {
      return [this.variant ? `sb-toggle--${this.variant}` : '']
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('update:modelValue', e.target.checked)
    },
  },
}
</script>
