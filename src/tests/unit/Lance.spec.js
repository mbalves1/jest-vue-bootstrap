import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

const wrapper = mount(Lance)
const input = wrapper.find('input')

describe('um lance sem valor min', () => {
  test('não aceitar lances negativos', () => {
    input.setValue(-100)
    const lancesEmitidos = wrapper.emitted('novo-lance')
    wrapper.trigger('submit')
    expect(lancesEmitidos).toBeUndefined()
  })

  test('emite um lance quando valor > 0', () => {
    // const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('emite valor esperado de um lance valido', () => {
    // const input = wrapper.find('input')
    input.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // [
    //   [100]
    // ]
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(100)
  })
})

describe('um lance com valor min', () => {
  test('todos os lances devem possuir um valor > que o min informado', () => {
    const wrapperDes = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const inputDes = wrapperDes.find('input')
    inputDes.setValue(400)
    wrapperDes.trigger('submit')
    const lancesEmitidos = wrapperDes.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('emite o valor esperado de um lance valido', () => {
    const wrapperDes = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const inputDes = wrapperDes.find('input')
    inputDes.setValue(400)
    wrapperDes.trigger('submit')
    const lancesEmitidos = wrapperDes.emitted('novo-lance')
    const valoDoLance = parseInt(lancesEmitidos[0][0])
    expect(valoDoLance).toBe(400)
  })

  test('não são aceitos lances com valores < do que informados', async () => {
    const wrapperDes = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const inputDes = wrapperDes.find('input')
    inputDes.setValue(100)
    wrapperDes.trigger('submit')
    await wrapperDes.vm.$nextTick()
    const mensagemErro = wrapperDes.find('p.alert').element.textContent
    const mesagemEsperada = 'O valor mínimo para o lance é de R$ 300'
    expect(mensagemErro).toContain(mesagemEsperada)
  })
})
