<template>
  <div class="sb-editor-header__mobile--more">
    <SbHeaderItem>
      <SbMenu>
        <SbMenuButton label="More" is-borderless />
        <SbMenuList placement="bottom-start">
          <SbMenuGroup v-if="actions" title="More Actions">
            <SbMenuItem
              v-for="act in actions"
              :key="act.id"
              @click="handleSelectNewAction(act.name)"
            >
              <SbIcon :name="act.name.toLowerCase()" size="large" />
              {{ act.name }}
            </SbMenuItem>
          </SbMenuGroup>
          <SbMenuGroup v-if="languages" title="Languages">
            <SbMenuItem
              v-for="lang in languages"
              :key="lang.id"
              @click="handleSetNewLanguage(lang)"
            >
              {{ lang }}
            </SbMenuItem>
          </SbMenuGroup>
          <SbMenuGroup v-if="users" title="People viewing">
            <SbMenuItem v-for="user in users" :key="user.id">
              <SbAvatar :src="user.src" size="small" :name="user.name" />
              {{ user.name }}
            </SbMenuItem>
          </SbMenuGroup>
        </SbMenuList>
      </SbMenu>
    </SbHeaderItem>
  </div>
</template>

<script>
import SbAvatar from '../../Avatar'
import SbHeaderItem from './HeaderItem'
import SbIcon from '../../Icon'

import {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  SbMenuItem,
  SbMenuGroup,
} from '../../Menu'

import { sharedProps } from '../lib'

export default {
  name: 'SbMobileViewer',

  components: {
    SbHeaderItem,
    SbAvatar,
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbIcon,
  },

  props: {
    ...sharedProps,
  },

  emits: ['changes'],

  methods: {
    /**
     * method to emit new language
     */
    handleSetNewLanguage(lang) {
      this.$emit('changes', { type: 'lang', language: lang })
    },

    /**
     * method to emit new action
     */
    handleSelectNewAction(act) {
      this.$emit('changes', { type: 'act', action: act })
    },
  },
}
</script>
