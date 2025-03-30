export const bots: Bot[] = [
  {
    id: 'Bot01',
    image: require('../../../assets/bot01.png'),
    descricao: "Este bot explica o que é transformação digital.",
    category: 'faq',
    response: (message: string) => {
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('transformação')) {
        return 'Transformação digital é o uso de tecnologia para melhorar processos, produtos e experiências.';
      } else if (lowerCaseMessage.includes('digital')) {
        return 'Digital refere-se ao uso de tecnologia para criar soluções modernas e eficientes.';
      } else if (lowerCaseMessage.includes('tecnologia')) {
        return 'Tecnologia é a aplicação de conhecimento científico para resolver problemas práticos.';
      } else if (lowerCaseMessage.includes('inovação')) {
        return 'Inovação é a introdução de novas ideias, métodos ou produtos.';
      } else if (lowerCaseMessage.includes('eficiência')) {
        return 'Eficiência é alcançar resultados com o menor desperdício de recursos.';
      }
      return 'Desculpe, não entendi. Pode reformular sua pergunta?';
    },
  },
  {
    id: 'Bot02',
    image: require('../../../assets/bot02.png'),
    descricao: "Este bot fala sobre desenvolvimento web e apps.",
    category: 'faq',
    response: (message: string) => {
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('desenvolvimento')) {
        return 'Desenvolvimento envolve a criação de soluções digitais, como sites e aplicativos.';
      } else if (lowerCaseMessage.includes('web')) {
        return 'Web refere-se à criação de sites e sistemas acessíveis pela internet.';
      } else if (lowerCaseMessage.includes('apps')) {
        return 'Apps são aplicativos móveis projetados para smartphones e tablets.';
      } else if (lowerCaseMessage.includes('aplicativos')) {
        return 'Aplicativos são programas criados para realizar tarefas específicas.';
      } else if (lowerCaseMessage.includes('sites')) {
        return 'Sites são páginas na internet que fornecem informações ou serviços.';
      }
      return 'Desculpe, não entendi. Pode reformular sua pergunta?';
    },
  },
  {
    id: 'Bot03',
    image: require('../../../assets/bot03.png'),
    descricao: "Este bot explica o que é inteligência artificial.",
    category: 'faq',
    response: (message: string) => {
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('inteligência')) {
        return 'Inteligência artificial é a simulação de processos humanos por máquinas.';
      } else if (lowerCaseMessage.includes('artificial')) {
        return 'Artificial refere-se a algo criado pelo homem, como sistemas computacionais.';
      } else if (lowerCaseMessage.includes('ia')) {
        return 'IA é a abreviação de inteligência artificial.';
      } else if (lowerCaseMessage.includes('machine learning')) {
        return 'Machine learning é um ramo da IA que ensina máquinas a aprenderem com dados.';
      } else if (lowerCaseMessage.includes('automação')) {
        return 'Automação é o uso de tecnologia para realizar tarefas sem intervenção humana.';
      }
      return 'Desculpe, não entendi. Pode reformular sua pergunta?';
    },
  },
  {
    id: 'Bot04',
    image: require('../../../assets/bot04.png'),
    descricao: "Este bot fala sobre automação de processos (RPA).",
    category: 'faq',
    response: (message: string) => {
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('automação')) {
        return 'Automação de processos usa tecnologia para executar tarefas repetitivas.';
      } else if (lowerCaseMessage.includes('processos')) {
        return 'Processos são conjuntos de atividades realizadas para alcançar um objetivo.';
      } else if (lowerCaseMessage.includes('rpa')) {
        return 'RPA significa Robotic Process Automation, ou Automação Robótica de Processos.';
      } else if (lowerCaseMessage.includes('eficiência')) {
        return 'Eficiência é um dos principais benefícios da automação de processos.';
      } else if (lowerCaseMessage.includes('robôs')) {
        return 'Robôs de software são usados para executar tarefas automatizadas.';
      }
      return 'Desculpe, não entendi. Pode reformular sua pergunta?';
    },
  },
  {
    id: 'Bot05',
    image: require('../../../assets/bot02.png'),
    descricao: "Este bot explica o que é IoT (Internet das Coisas).",
    category: 'faq',
    response: (message: string) => {
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('iot')) {
        return 'IoT significa Internet das Coisas, conectando dispositivos à internet.';
      } else if (lowerCaseMessage.includes('internet das coisas')) {
        return 'Internet das Coisas conecta dispositivos físicos para coletar e compartilhar dados.';
      } else if (lowerCaseMessage.includes('dispositivos')) {
        return 'Dispositivos IoT incluem sensores, câmeras e outros equipamentos conectados.';
      } else if (lowerCaseMessage.includes('conexão')) {
        return 'Conexão é essencial para que dispositivos IoT funcionem corretamente.';
      } else if (lowerCaseMessage.includes('dados')) {
        return 'Dados coletados por dispositivos IoT ajudam a melhorar processos e decisões.';
      }
      return 'Desculpe, não entendi. Pode reformular sua pergunta?';
    },
  },
  {
    id: 'Bot06',
    image: require('../../../assets/bot03.png'),
    descricao: "Este bot ensina como começar com Business Intelligence.",
    category: 'tutorial',
    response: (message: string) => {
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('business intelligence')) {
        return 'Business Intelligence é o processo de análise de dados para tomada de decisões.';
      } else if (lowerCaseMessage.includes('bi')) {
        return 'BI é a abreviação de Business Intelligence.';
      } else if (lowerCaseMessage.includes('dados')) {
        return 'Dados são a base para criar relatórios e dashboards em BI.';
      } else if (lowerCaseMessage.includes('dashboards')) {
        return 'Dashboards são painéis visuais que mostram métricas importantes em BI.';
      } else if (lowerCaseMessage.includes('análise')) {
        return 'Análise de dados é uma etapa crucial no processo de Business Intelligence.';
      }
      return 'Desculpe, não entendi. Pode reformular sua pergunta?';
    },
  },
  {
    id: 'Bot07',
    image: require('../../../assets/bot04.png'),
    descricao: "Este bot responde como um chatbot interativo.",
    category: 'chatbot',
    response: (message: string) => {
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('ajuda')) {
        return 'Claro! Estou aqui para ajudar. Por favor, diga-me o que você precisa.';
      } else if (lowerCaseMessage.includes('suporte')) {
        return 'Nosso suporte está disponível para resolver suas dúvidas e problemas.';
      } else if (lowerCaseMessage.includes('pro4tech')) {
        return 'A Pro4Tech é uma empresa de transformação digital que oferece soluções inovadoras.';
      } else if (lowerCaseMessage.includes('empresa')) {
        return 'A Pro4Tech é especializada em tecnologia para otimizar operações e impulsionar negócios.';
      } else if (lowerCaseMessage.includes('tecnologia')) {
        return 'Tecnologia é o coração das soluções oferecidas pela Pro4Tech.';
      }
      return 'Desculpe, não entendi. Pode reformular sua pergunta?';
    },
  },
];

export type Bot = {
  id: string;
  descricao: string;
  category: string;
  image: any;
  response: (message: string) => string;
};