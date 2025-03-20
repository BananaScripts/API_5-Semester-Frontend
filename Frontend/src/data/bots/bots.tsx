export const bots: Bot[] = [
    { id: 'Bot01', image: require('../../../assets/bot01.png'), descricao: "Este bot inverte o texto que você envia.", category: 'faq', response: (message: string) => message.split('').reverse().join('') },
    { id: 'Bot02', image: require('../../../assets/bot02.png'), descricao: "Este bot conta o número de letras na sua mensagem.", category: 'tutorial', response: (message: string) => `Sua mensagem tem ${message.length} letras.` },
    { id: 'Bot03', image: require('../../../assets/bot03.png'), descricao: "Este bot converte sua mensagem para maiúsculas.", category: 'faq', response: (message: string) => message.toUpperCase() },
    { id: 'Bot04', image: require('../../../assets/bot04.png'), descricao: "Este bot converte sua mensagem para minúsculas.", category: 'chatbot', response: (message: string) => message.toLowerCase() },
    { id: 'Bot05', image: require('../../../assets/bot01.png'), descricao: "Este bot repete sua mensagem duas vezes.", category: 'tutorial', response: (message: string) => `${message} ${message}` },
    { id: 'Bot06', image: require('../../../assets/bot03.png'), descricao: "Este bot adiciona um ponto de exclamação no final da sua mensagem.", category: 'faq', response: (message: string) => `${message}!` },
    { id: 'Bot07', image: require('../../../assets/bot02.png'), descricao: "Este bot adiciona um ponto de interrogação no final da sua mensagem.", category: 'tutorial', response: (message: string) => `${message}?` },
    { id: 'Bot08', image: require('../../../assets/bot04.png'), descricao: "Este bot substitui espaços por hífens na sua mensagem.", category: 'chatbot', response: (message: string) => message.replace(/ /g, '-') },
    { id: 'Bot09', image: require('../../../assets/bot01.png'), descricao: "Este bot conta o número de palavras na sua mensagem.", category: 'faq', response: (message: string) => `Sua mensagem tem ${message.split(' ').length} palavras.` },
    { id: 'Bot10', image: require('../../../assets/bot02.png'), descricao: "Este bot adiciona 'Olá!' no início da sua mensagem.", category: 'tutorial', response: (message: string) => `Olá! ${message}` },
    { id: 'Bot11', image: require('../../../assets/bot03.png'), descricao: "Este bot adiciona 'Adeus!' no final da sua mensagem.", category: 'faq', response: (message: string) => `${message} Adeus!` },
    { id: 'Bot12', image: require('../../../assets/bot04.png'), descricao: "Este bot converte sua mensagem para camelCase.", category: 'chatbot', response: (message: string) => message.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, '') },
    { id: 'Bot13', image: require('../../../assets/bot01.png'), descricao: "Este bot converte sua mensagem para snake_case.", category: 'faq', response: (message: string) => message.replace(/\s+/g, '_').toLowerCase() },
    { id: 'Bot14', image: require('../../../assets/bot02.png'), descricao: "Este bot converte sua mensagem para kebab-case.", category: 'tutorial', response: (message: string) => message.replace(/\s+/g, '-').toLowerCase() },
    { id: 'Bot15', image: require('../../../assets/bot03.png'), descricao: "Este bot converte sua mensagem para PascalCase.", category: 'faq', response: (message: string) => message.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()).replace(/\s+/g, '') },
  ];
  
  export type Bot = {
    id: string;
    descricao: string;
    category: string;
    image: any;
    response: (message: string) => string;
  };