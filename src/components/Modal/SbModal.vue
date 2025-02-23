<template>
  <SbPortal
    ref="portalRef"
    slim
    append
    unmount-on-destroy
    target-slim
    :target="modalTarget"
    :disabled="disabledTargetDefault"
  >
    <SbBlokUi v-if="open" :style="computedBlokUiStyle" @mousedown="wrapClose">
      <div
        ref="modal"
        class="sb-modal"
        :class="computedClasses"
        role="dialog"
        :style="computedStyle"
        v-bind="$attrs"
      >
        <SbModalCloseButton v-if="showClose" />
        <slot />
      </div>
    </SbBlokUi>
  </SbPortal>
</template>

<script>
import SbBlokUi from '../BlockUI'
import SbPortal from '../Portal'
import { randomString } from '../../utils'

import SbModalCloseButton from './components/SbModalCloseButton'

export default {
  name: 'SbModal',

  components: {
    SbPortal,
    SbBlokUi,
    SbModalCloseButton,
  },

  provide() {
    return {
      modalContext: () => this.modalContext,
    }
  },

  props: {
    closeOnHeader: Boolean,
    isOpen: {
      type: Boolean,
      default: false,
    },
    escCloses: {
      type: Boolean,
      default: true,
    },
    fullWidth: Boolean,
    scrollbar: Boolean,
    large: Boolean,
    maxWidth: {
      type: [String, Number],
      default: null,
    },
    modalTarget: {
      type: String,
      default: () => `#sb-modal-target-${randomString(4)}`,
    },
    disabledTargetDefault: Boolean,
    overlayPosition: {
      type: String,
      default: 'fixed',
    },
    overlayTransparent: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['hide', 'show'],

  data() {
    return {
      open: false || this.isOpen,
    }
  },

  computed: {
    computedClasses() {
      return [
        this.customClass?.length && this.customClass,
        this.fullWidth && 'sb-modal__full-width',
        this.large && 'sb-modal__large',
        this.scrollbar && 'sb-modal--scrollbar',
        this.closeOnHeader && 'sb-modal--close-on-header',
      ]
    },

    computedBlokUiStyle() {
      const style = { position: this.overlayPosition }

      if (this.overlayTransparent) style.background = 'none'

      return { ...style }
    },

    computedStyle() {
      if (!this.maxWidth) return null

      return { maxWidth: `${this.maxWidth}px` }
    },

    modalContext() {
      return {
        closeModal: this.handleCloseModal,
      }
    },
  },

  watch: {
    isOpen(value) {
      if (value) {
        this.handleOpenModal()
      } else {
        this.handleCloseModal()
      }
    },
  },

  created() {
    this.$_createPortalInstance()
  },

  methods: {
    escapeEventListener(e) {
      if (e.key === 'Escape') {
        this.handleCloseModal()
      }
    },

    removeListener() {
      window.removeEventListener('keydown', this.escapeEventListener)
    },

    registerListener() {
      window.addEventListener('keydown', this.escapeEventListener)
    },
    /**
     * handler for closing the modal by pressing ESC on the keyboard
     */
    handleCloseModalByPressingEsc() {
      if (this.escCloses) {
        this.registerListener()
      }
    },
    /**
     * handler for close modal
     */
    handleCloseModal() {
      if (this.open && this.escCloses) {
        this.removeListener()
        this.open = false
        this.$nextTick(() => {
          document.querySelector('body').style.overflow = 'auto'
          this.$emit('hide')
        })
      }
    },

    /**
     * handler for open modal
     */
    handleOpenModal() {
      if (!this.open) {
        this.handleCloseModalByPressingEsc()
        this.open = true
        this.$nextTick(() => {
          document.querySelector('body').style.overflow = 'hidden'
          this.$emit('show')
        })
      }
    },

    /**
     * this function allows to hide the overflow
     */
    hideOverflow() {
      document.querySelector('body').style.overflow = 'hidden'
    },

    wrapClose(event) {
      if (this.$refs.modal && !this.$refs.modal.contains(event.target)) {
        this.handleCloseModal(event)
      }
    },

    /**
     * function to create the portal instance
     */
    $_createPortalInstance() {
      if (this.$refs.portalRef) {
        this.$refs.portalRef.mountTarget()
      }
    },
  },
}
</script>
