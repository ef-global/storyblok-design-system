import { isSizeValid } from '../Avatar/utils'

import './avatar-group.scss'

import { ClickOutside } from '../../directives'
import { truncate, availableColors } from '../../utils'

// @vue/component
export const MoreAvatars = {
  name: 'SbMoreAvatars',

  functional: true,

  props: {
    size: {
      type: String,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  render(h, { data, children, props }) {
    const childrenElements = children.map((element) => {
      const elementProps = element.componentOptions.propsData

      if (elementProps.name) {
        elementProps.name = truncate(18, elementProps.name)
      }

      element.componentOptions.propsData = {
        ...element.componentOptions.propsData,
        size: props.size || null,
        showName: true,
      }

      return element
    })

    return h(
      'div',
      {
        ...data,
        staticClass: 'sb-avatar-group__avatars',
        attrs: {
          'aria-hidden': `${!props.visible}`,
        },
      },
      childrenElements
    )
  },
}

// @vue/component
export const MoreAvatar = {
  name: 'SbMoreAvatar',

  functional: true,

  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'null',
    },
  },

  render(h, { data, props, listeners }) {
    return h(
      'button',
      {
        staticClass: 'sb-avatar-group__more',
        attrs: {
          'aria-expanded': `${props.expanded}`,
        },
        on: {
          ...listeners,
        },
        ref: data.ref,
      },
      props.label
    )
  },
}

/**
 * @vue/component
 *
 * SbAvatarGroup component
 *
 * SbAvatarGroup is a component to group SbAvatar
 */
const SbAvatarGroup = {
  name: 'SbAvatarGroup',

  directives: {
    ClickOutside,
  },

  props: {
    darkBg: Boolean,
    maxElements: {
      type: Number,
      default: 5,
    },
    size: {
      type: String,
      default: null,
      validator: isSizeValid,
    },
  },

  data: () => ({
    isVisibleDropdown: false,
  }),

  methods: {
    /**
     * @method $_wrapClose
     * @param  {MouseEvent} event
     */
    $_wrapClose(event) {
      if (
        this.$refs.moreAvatarsRef &&
        !this.$refs.moreAvatarsRef.contains(event.target) &&
        this.$refs.moreAvatarButton &&
        !this.$refs.moreAvatarButton.contains(event.target)
      ) {
        this.isVisibleDropdown = false
      }
    },

    toggleDropdown() {
      this.isVisibleDropdown = !this.isVisibleDropdown
    },
    onMoreAvatarKeyDown(event) {
      if (event.key === 'Escape') {
        this.closeDropdown()
      }
    },
    closeDropdown() {
      this.isVisibleDropdown = false
    },
  },

  render(h) {
    const children = this.$slots.default.filter((e) => e.tag)

    const childrenCount = children.length
    const maxElements = this.maxElements || 5

    const data = children.map((element, index) => {
      if (maxElements && index < maxElements) {
        element.componentOptions.propsData = {
          ...element.componentOptions.propsData,
          useTooltip: true,
          size: this.size,
          bgColor: availableColors[index],
        }

        return element
      }

      if (maxElements && index === maxElements) {
        return h(MoreAvatar, {
          props: {
            label: `+${childrenCount - maxElements}`,
            expanded: this.isVisibleDropdown,
          },
          ref: 'moreAvatarButton',
          on: {
            click: this.toggleDropdown,
            keydown: this.onMoreAvatarKeyDown,
          },
        })
      }
    })

    const moreAvatars = children.filter((_, index) => index >= maxElements)

    const renderDropdown = () => {
      return h(
        MoreAvatars,
        {
          props: {
            ...this.$props,
            visible: this.isVisibleDropdown,
          },
          ref: 'moreAvatarsRef',
          directives: [
            {
              name: 'click-outside',
              value: this.$_wrapClose,
            },
          ],
        },
        [...moreAvatars]
      )
    }

    return h(
      'div',
      {
        staticClass: 'sb-avatar-group',
        class: [
          this.size && `sb-avatar-group--${this.size}`,
          this.darkBg && `sb-avatar-group--dark-bg`,
        ],
      },
      [
        data,
        this.isVisibleDropdown && moreAvatars.length > 0 && renderDropdown(),
      ]
    )
  },
}

export default SbAvatarGroup
