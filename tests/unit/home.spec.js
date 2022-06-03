import { mount } from '@vue/test-utils'
import HomeComponent from '@/components/HomeComponent.vue'

describe('HomeComponent.vue', () => {
  it('renders string', () => {
    const wrapper = mount(HomeComponent)
    expect(wrapper.text()).toMatch('Home Page')
  })
})
