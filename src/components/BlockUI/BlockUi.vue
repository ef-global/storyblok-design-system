<template>
  <div class="sb-block-ui" v-bind="$attrs" :class="computedClass">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SbBlockUi',

  props: {
    inElement: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    computedClass() {
      return {
        'sb-block-ui--in-element': this.inElement,
      }
    },
  },
}
</script>
