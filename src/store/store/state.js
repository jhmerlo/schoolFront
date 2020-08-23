export default function () {
  return {
    user: null,
    payments: [
      {
        servico: 'Mensalidade',
        pago: true,
        valor: 790,
        data: '26-06-20'
      },
      {
        servico: 'Mensalidade',
        pago: true,
        valor: 790,
        data: '26-07-20'
      },
      {
        servico: 'Mensalidade',
        pago: true,
        valor: 790,
        data: '26-08-20'
      },
      {
        servico: 'Reposição de prova',
        pago: false,
        valor: 110,
        data: null
      }
    ],
    atividades: [
      {
        disciplina: 'Matemática',
        done: true,
        codigo: '17545',
        assunto: 'Matrizes Diagonais'
      },
      {
        disciplina: 'Física',
        done: true,
        codigo: '37348',
        assunto: 'Cinemática'
      },
      {
        disciplina: 'História',
        done: false,
        codigo: '83932',
        assunto: 'Revolta da Vacina',
        pergunta: '(Cesgranrio) O governo Rodrigues Alves (1902-1906) foi responsável pelos processos de modernização e urbanização da Capital Federal - Rio de Janeiro. Coube ao prefeito Pereira Passos a urbanização da cidade e ao Dr. Oswaldo Cruz o saneamento, visando a combater principalmente a febre amarela, a peste bubônica e a varíola. Essa política de urbanização e saneamento público, apesar de necessária e modernizante, encontrou forte oposição junto à população pobre da cidade e à opinião pública porque:',
        options: [
          {
            label: 'mudava o perfil da cidade e acabava com os altos índices de mortalidade infantil entre a população pobre.',
            value: 1
          },
          {
            label: 'transformava o centro da cidade em área exclusivamente comercial e financeira e acabava com os infectos quiosques.',
            value: 2
          },
          {
            label: 'desabrigava milhares de famílias, em virtude da desapropriação de suas residências, e obrigava a vacinação antivariólica.',
            value: 3
          }
        ]
      },
      {
        disciplina: 'Geografia',
        done: false,
        codigo: '24986',
        assunto: 'Biomas Brasileiros',
        pergunta: 'Os principais biomas mundiais são:',
        options: [
          {
            label: 'Tundra, Taiga, Floresta Temperada, Floresta Equatorial, Floresta Tropical, Savanas, Desertos e Campos.',
            value: 1
          },
          {
            label: 'Tundra, Cerrado, Floresta Subtropical, Floresta Tropical, Mangues, Floresta Mediterrânea, Monções Asiáticas, Desertos.',
            value: 2
          },
          {
            label: 'Floresta Temperada, Chaparral, Mediterrâneo, Floresta Tropical, Campo Sujo, Mata de Araucárias, Pampas, Desertos.',
            value: 3
          },
          {
            label: 'Taiga, gramíneas, Mata de Galeria, Floresta Equatorial, Pantanal, Mata de Araucárias, Vegetação Xerófila, Floresta Tropical.',
            value: 4
          }
        ]
      },
      {
        disciplina: 'Ciências',
        done: false,
        codigo: '43949',
        assunto: 'Darwinismo',
        pergunta: 'A teoria da evolução proposta por Darwin, assim como outras teorias evolucionistas, baseia-se no fato de que organismos sofrem modificações ao longo do tempo, não sendo, portanto, formas fixas. Para escrever sua teoria, Darwin inspirou-se em um estudo em que se dizia que o aumento da população poderia levar todos à miséria e fome e aplicou esse conhecimento para analisar populações de plantas e animais. O estudo no qual Darwin inspirou-se pode ser atribuído a que autor?',
        options: [
          {
            label: 'Hooker',
            value: 1
          },
          {
            label: 'Wallace',
            value: 2
          },
          {
            label: 'Malthus',
            value: 3
          },
          {
            label: 'Lamarck',
            value: 4
          },
          {
            label: 'Cuvier',
            value: 5
          }
        ]
      }
    ]
  }
}
