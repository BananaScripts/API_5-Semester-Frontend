export const bots = [
    { id: 'Bot01', image: require('../../../assets/bot01.png'), descricao: "Tente entrar em contato com a assistência técnica pelo número...", category: 'faq' },
    { id: 'Bot02', image: require('../../../assets/bot02.png'), descricao: "Um database pode ser criado usando o aplicativo...", category: 'tutorial' },
    { id: 'Bot03', image: require('../../../assets/bot03.png'), descricao: "No princípio criou Deus os céus e a terra. E a terra era sem forma e vazia; e havia trevas sobre a face do abismo;", category: 'faq' },
    { id: 'Bot04', image: require('../../../assets/bot04.png'), descricao: "Alguma descrição para o Bot04", category: 'chatbot' },
    { id: 'Bot05', image: require('../../../assets/bot01.png'), descricao: "Exemplo de outro bot com uma descrição muito mais longa...", category: 'tutorial' },
    { id: 'Bot06', image: require('../../../assets/bot03.png'), descricao: "Este é mais um bot com descrição longa para testar a rolagem.", category: 'faq' },
    { id: 'Bot07', image: require('../../../assets/bot02.png'), descricao: "Este é mais um bot com descrição longa para testar a rolagem.", category: 'tutorial' },
    { id: 'Bot08', image: require('../../../assets/bot04.png'), descricao: "Este é mais um bot com descrição longa para testar a rolagem.", category: 'chatbot' },
    { id: 'Bot09', image: require('../../../assets/bot01.png'), descricao: "Prepare-se para o duelo! Este bot pode te ajudar com dicas de Yu-Gi-Oh!", category: 'faq' },
    { id: 'Bot10', image: require('../../../assets/bot02.png'), descricao: "Você morreu. Este bot tem todas as dicas para sobreviver em Dark Souls.", category: 'tutorial' },
    { id: 'Bot11', image: require('../../../assets/bot03.png'), descricao: "A jornada de um herói começa aqui. Este bot tem informações sobre os melhores RPGs.", category: 'faq' },
    { id: 'Bot12', image: require('../../../assets/bot04.png'), descricao: "Este bot é um mestre em estratégias de jogos de tabuleiro.", category: 'chatbot' },
    { id: 'Bot13', image: require('../../../assets/bot01.png'), descricao: "Quer saber mais sobre os animes da temporada? Este bot tem todas as novidades.", category: 'faq' },
    { id: 'Bot14', image: require('../../../assets/bot02.png'), descricao: "Este bot pode te ajudar a montar o melhor deck em Yu-Gi-Oh!", category: 'tutorial' },
    { id: 'Bot15', image: require('../../../assets/bot03.png'), descricao: "Descubra os segredos de Lordran com este bot especialista em Dark Souls.", category: 'faq' },
  ];

  type Bot = {
    id: string;
    descricao: string;
    category: string;
    image: any;
  };

  export { Bot };