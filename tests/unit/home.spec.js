import { shallowMount } from '@vue/test-utils'
import HomeComponent from '@/components/HomeComponent.vue'

describe('HomeComponent.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(HomeComponent)
    expect(wrapper.text()).toMatch('Home Page')
  })
})


