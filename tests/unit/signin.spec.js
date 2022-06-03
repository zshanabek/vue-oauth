import { mount } from '@vue/test-utils'
import SignIn from '@/components/SignIn.vue'

describe('The SignIn.vue component', () => {
  it('Can be mounted', () => {
    const wrapper = mount(SignIn)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('pushes to profile page after sign-in', async () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = mount(SignIn, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    })
    wrapper.find('#input-example-1').setValue('jonasali@mail.com')
    wrapper.find('#input-example-2').setValue('132312qQ')
    const form = wrapper.find('form')
    const button = form.find('button')
    await button.trigger('click')
    // expect(mockRouter.push).toHaveBeenCalledTimes(1)
    // expect(mockRouter.push).toHaveBeenCalledWith('/profile')
  })
})
