import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
  produto: 'Um livro da casa do código',
  lanceInicial: 50,
  descricao: 'Um livro bem bacana sobre VUE'
}


describe('Leiloeiro inicia um leilao que possui lances', () => {
  test('avisa quando nao avisa lances', async () => {

    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([
      // {
      //   id: 1,
      //   valor: 100,
      //   data: '2020-12-01',
      //   leilao_id: 1
      // }
    ])

    const wrapper = mount(Leiloeiro, {
      id: 1
    })

    await flushPromises()

    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(true)
  })
})
