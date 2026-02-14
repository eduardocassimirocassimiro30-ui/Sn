
import { Category, NewsItem, NeighborhoodStats } from './types';

const TITLES = [
  "TIROTEIO EM MASSA EM GANTON DEIXA MORADORES EM PÂNICO",
  "PREFEITO DE LOS SANTOS VISTO EM FESTA COM LÍDERES DE GANGUE",
  "DROGA 'MISTERIÓS' APARECE NAS RUAS DE SAN FIERRO",
  "RALLY ILEGAL EM MOUNT CHILIAD TERMINA EM DESASTRE",
  "BIG SMOKE ANUNCIA NOVA LINHA DE FAST FOOD 'SMOKEY BURGERS'",
  "POLÍCIA DE LAS VENTURAS INVESTIGA SUMIÇO DE DINHEIRO EM CASSINO",
  "AVISTAMENTOS DE OVNIS NO DESERTO DE BONE COUNTY",
  "GUERRA DE RAPS: OG LOC VS MAD DOGG EM NOVA DISPUTA",
  "OPERAÇÃO 'LIMPEZA' PRENDE DEZENAS EM DOHERTY",
  "ESCÂNDALO: POLICIAIS SÃO FLAGRADOS RECEBENDO SUBORNO EM VINEWOOD",
  "CRASH: UNIDADE POLICIAL SOB INVESTIGAÇÃO POR ABUSO DE PODER",
  "PROTESTOS EM PERSHING SQUARE CONTRA A VIOLÊNCIA URBANA",
  "LOWRIDERS DOMINAM A NOITE EM UNITY STATION",
  "CUIDADO: SURTO DE RAIVA EM CACHORROS DE RUA EM IDLEWOOD",
  "REFORMA NO AEROPORTO DE LOS SANTOS PROMETE MAIS SEGURANÇA",
  "SINDICATO DOS CAMINHONEIROS AMEAÇA GREVE EM BLUEBERRY",
  "MISTERIOSO 'PÉ GRANDE' É RELATADO POR CAÇADORES EM BACK O' BEYOND",
  "BILHETES DE LOTERIA FALSOS CIRCULAM EM LAS COLINAS",
  "NOVA MODA: CABELO 'THE CAESAR' É O MAIS PEDIDO NOS BARBEIROS",
  "ESTAÇÃO DE RÁDIO K-DST BATE RECORDES DE AUDIÊNCIA"
];

const SUBTITLES = [
  "Testemunhas afirmam que a situação saiu do controle rapidamente.",
  "Documentos vazados mostram transações bancárias suspeitas.",
  "Especialistas alertam para os perigos dessa nova tendência.",
  "A polícia chegou tarde demais para impedir a fuga dos suspeitos.",
  "O anúncio foi feito durante uma coletiva de imprensa tumultuada.",
  "Milhões de dólares desapareceram sem deixar rastros digitais.",
  "Luzes estranhas cortaram o céu durante a madrugada gelada.",
  "As letras das músicas contêm ameaças diretas e pesadas.",
  "A prefeitura prometeu tolerância zero com o crime organizado.",
  "Imagens de câmeras de segurança revelam o crime em detalhes.",
  "Fontes anônimas garantem que a corrupção vai até o topo.",
  "O clima de tensão é palpável em cada esquina da cidade.",
  "A cultura de rua nunca esteve tão vibrante e perigosa.",
  "Autoridades de saúde pedem cautela ao circular pelas zonas baixas.",
  "Investimentos de milhões de dólares estão em jogo na região.",
  "O tráfego de mercadorias pode parar totalmente na próxima semana.",
  "Fotos borradas circulam nos fóruns de conspiração local.",
  "Vítimas perderam as economias de uma vida inteira no golpe.",
  "A tendência começou em Grove Street e se espalhou como fogo.",
  "O DJ diz que a verdade não pode ser silenciada pela censura."
];

const AUTHORS = ["Carl J.", "The Truth", "Officer Tenpenny", "Officer Pulaski", "Big Bear", "Kendl J.", "Lance V.", "Sheila S.", "Jack The Rat", "DeeJay G-Funk"];
const CATEGORIES = [Category.ULTIMAS, Category.POLICIA, Category.CULTURA, Category.NEGOCIOS, Category.RADIO];
const LOCATIONS = [
  { lat: 82, lng: 78, name: "Idlewood" },
  { lat: 15, lng: 75, name: "The Strip" },
  { lat: 45, lng: 18, name: "Juniper Hill" },
  { lat: 85, lng: 85, name: "Ganton" },
  { lat: 30, lng: 30, name: "Easter Bay" },
  { lat: 10, lng: 10, name: "Bayside" },
  { lat: 60, lng: 40, name: "Red County" },
  { lat: 20, lng: 85, name: "Prickle Pine" },
  { lat: 75, lng: 70, name: "Downtown LS" },
  { lat: 50, lng: 15, name: "Doherty" }
];

const generateNews = (count: number): NewsItem[] => {
  const news: NewsItem[] = [];
  for (let i = 0; i < count; i++) {
    const titleIdx = i % TITLES.length;
    const subIdx = i % SUBTITLES.length;
    const authIdx = i % AUTHORS.length;
    const catIdx = i % CATEGORIES.length;
    const locIdx = i % LOCATIONS.length;
    
    news.push({
      id: `news-${i}`,
      title: `${TITLES[titleIdx]} #${i + 1}`,
      subtitle: SUBTITLES[subIdx],
      content: `A cidade de San Andreas enfrenta um momento crucial. Relatos indicam que os eventos ocorridos em ${LOCATIONS[locIdx].name} são apenas a ponta do iceberg. Nossa equipe de jornalistas está investigando os laços entre o governo e as facções locais para trazer a verdade nua e crua até você. Não confie em tudo o que ouve nas rádios oficiais, o San Urban News está aqui para abrir seus olhos.`,
      category: CATEGORIES[catIdx],
      author: AUTHORS[authIdx],
      date: `${(i % 28) + 1} Out 1994`,
      imageUrl: `https://picsum.photos/seed/san-urban-${i}/800/450`,
      likes: Math.floor(Math.random() * 2000),
      comments: [
        { id: `c-${i}-1`, author: "Cidadao_Z", text: "Isso é um absurdo!", likes: 10 },
        { id: `c-${i}-2`, author: "Anon_94", text: "Eu estava lá e vi tudo.", likes: 54 }
      ],
      isFake: i % 15 === 0, // Notícia fake a cada 15
      location: LOCATIONS[locIdx]
    });
  }
  return news;
};

// Gerando 110 notícias para garantir que passe de 100
export const INITIAL_NEWS: NewsItem[] = generateNews(110);

export const NEIGHBORHOODS: NeighborhoodStats[] = [
  { name: 'Idlewood', dangerLevel: 95, activeGangs: ['Ballas', 'Grove Street'] },
  { name: 'Ganton', dangerLevel: 88, activeGangs: ['Grove Street'] },
  { name: 'Rodeo', dangerLevel: 15, activeGangs: ['None (Corporate)'] },
  { name: 'Verona Beach', dangerLevel: 45, activeGangs: ['Beach Boyz'] },
  { name: 'Las Colinas', dangerLevel: 72, activeGangs: ['Vagos'] }
];

export const TRENDS = ['#FreeLoc', '#ManningResign', '#UndergroundRace', '#CassinoLeak', '#90sVibe', '#SanAndreas94', '#CJBackInTown'];
