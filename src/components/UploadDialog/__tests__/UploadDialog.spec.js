import { mount } from '@vue/test-utils'

import SbUploadDialog from '..'

import SbIcon from '../../Icon'
import SbLoading from '../../Loading'
import SbBlockUi from '../../BlockUI'

const factory = (propsData) => {
  return mount(SbUploadDialog, {
    propsData,
  })
}

const fakeProps = {
  totalFiles: 2,
  actualFile: 1,
  actualFileName: 'test.png',
  percentageValue: 25,
  timeLeft: 50,
}

describe('Tests for UploadDialog', () => {
  it('Test if UploadDialog renderer correctly', () => {
    const wrapper = factory(fakeProps)

    expect(wrapper.findComponent(SbBlockUi).exists()).toBe(true)

    expect(wrapper.findComponent(SbLoading).exists()).toBe(true)

    expect(wrapper.findComponent(SbLoading).props('value')).toBe(
      fakeProps.percentageValue
    )

    expect(wrapper.findComponent(SbIcon).exists()).toBe(true)

    expect(wrapper.findComponent(SbIcon).props('name')).toBe('refresh')

    const spanLabelHelper = [
      `Uploading ${fakeProps.actualFile}/${fakeProps.totalFiles} - ${fakeProps.actualFileName}`,
      `${fakeProps.timeLeft} sec left`,
    ]

    wrapper.findAll('span').filter((span, index) => {
      expect(span.text()).toBe(spanLabelHelper[index])
    })
  })
})
