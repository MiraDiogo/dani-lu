import type { Product, Exercise, EducationVideo, User, WorkoutPlan, PainReport, RehabPlan } from './types';

export const mockUsers: User[] = [
  {
    id: 'user-client',
    name: 'Ana Silva',
    email: 'ana.silva@dani-lu.com.br',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'user-trainer',
    name: 'Dani Personal',
    email: 'dani.trainer@dani-lu.com.br',
    role: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'user-physio',
    name: 'Lu Fisioterapeuta',
    email: 'lu.physio@dani-lu.com.br',
    role: 'physio',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Legging Sculpt Pro Neon',
    description: 'Desenvolvida com tecnologia de compressão inteligente de 2026. Possui toque gelado, zero transparência, proteção UV 50+ e costuras planas para evitar atrito nas sessões mais intensas. O detalhe lateral em verde neon traz o estilo tecnológico moderno.',
    price: 189.90,
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800',
    category: 'clothing',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto / Lime', hex: '#dfff00' },
      { name: 'Cinza / Indigo', hex: '#6366f1' },
      { name: 'Preto Total', hex: '#000000' }
    ],
    stock: 45,
    specs: [
      'Material: 88% Poliamida, 12% Elastano',
      'Proteção UV50+ e Secagem Rápida',
      'Tecnologia de Costura Ultra-Flat',
      'Cós duplo anatômico de alta compressão'
    ],
    reviews: [
      { id: 'rev-1-1', userName: 'Mariana T.', rating: 5, comment: 'Maravilhosa! Não desce durante o agachamento e o tecido é super confortável.', date: '2026-05-15' },
      { id: 'rev-1-2', userName: 'Juliana P.', rating: 4, comment: 'A compressão é ótima, recomendo comprar o tamanho exato da tabela.', date: '2026-05-10' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Top Energy Alta Sustentação',
    description: 'Top projetado para treinos de alto impacto (corrida, crossfit, treinos pesados). Com design nadador, alças largas acolchoadas e bojo removível de alta densidade. O acabamento em poliamida texturizada reduz o calor corporal.',
    price: 119.90,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1388339179975-d1ceb2779fdf?auto=format&fit=crop&q=80&w=800', // cropped top style
    category: 'clothing',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Roxo Deep Space', hex: '#4c1d95' },
      { name: 'Preto', hex: '#000000' },
      { name: 'Coral Elétrico', hex: '#f43f5e' }
    ],
    stock: 30,
    specs: [
      'Bojo removível tecnológico',
      'Forro antitranspirante respirável',
      'Elástico largo na base para estabilidade',
      'Sem aro, com máximo conforto'
    ],
    reviews: [
      { id: 'rev-2-1', userName: 'Beatriz F.', rating: 5, comment: 'Finalmente um top que realmente sustenta sem machucar os ombros. Amei as cores!', date: '2026-05-19' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Shorts Performance Aero',
    description: 'Design duplo para liberdade total. O shorts interno de compressão evita atrito, enquanto o externo de microfibra ultraleve garante ventilação e secagem recorde. Possui bolso interno para celular.',
    price: 139.90,
    rating: 4.7,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
    category: 'clothing',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Grafite / Preto', hex: '#374151' },
      { name: 'Verde Neon / Preto', hex: '#dfff00' }
    ],
    stock: 22,
    specs: [
      'Tecido externo: 100% Poliéster respirável',
      'Tecido interno: 90% Poliamida, 10% Elastano',
      'Bolso lateral no shorts interno para smartphone',
      'Cós elástico com cordão de ajuste embutido'
    ],
    reviews: [
      { id: 'rev-3-1', userName: 'Carlos A.', rating: 4, comment: 'Muito prático o bolso interno para correr na esteira. O tecido é muito leve.', date: '2026-05-12' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Coqueteleira Dani&Lu Smart 700ml',
    description: 'Garrafa inteligente de alta tecnologia. Fabricada em Tritan de alta durabilidade, livre de BPA, com misturador espiral de aço cirúrgico. Compartimento inferior rosqueável para levar seu whey e creatina de forma isolada.',
    price: 69.90,
    rating: 4.6,
    reviewsCount: 150,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
    category: 'accessories',
    sizes: ['Único'],
    colors: [
      { name: 'Black Smoke', hex: '#1f2937' },
      { name: 'Crystal / Lime', hex: '#dfff00' }
    ],
    stock: 120,
    specs: [
      'Capacidade líquida: 700ml',
      'Material Tritan ultra-resistente a quedas',
      'Totalmente livre de BPA e Ftalatos',
      'Compartimento de suplementos acoplável (150g)'
    ],
    reviews: [
      { id: 'rev-4-1', userName: 'Felipe M.', rating: 5, comment: 'Design muito bonito e o misturador dissolve a creatina perfeitamente. O compartimento extra salva no pós-treino.', date: '2026-05-20' }
    ]
  },
  {
    id: 'prod-5',
    name: 'Lifting Straps Pro (Par)',
    description: 'Fitas de pegada em algodão reforçado com costura dupla. Desenvolvido para dar suporte nos exercícios de puxadas e levantamento terra, reduzindo a fadiga dos antebraços e otimizando a carga de treino.',
    price: 49.90,
    rating: 4.9,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800', // gym context
    category: 'accessories',
    sizes: ['Único'],
    colors: [
      { name: 'Preto / Verde Neon', hex: '#dfff00' },
      { name: 'Roxo Neon', hex: '#6366f1' }
    ],
    stock: 80,
    specs: [
      'Algodão 100% Premium com 4cm de largura',
      'Apoio de pulso em neoprene macio (5mm) para conforto',
      'Costuras reforçadas em nylon industrial',
      'Comprimento de 60cm para encaixe ideal na barra'
    ],
    reviews: [
      { id: 'rev-5-1', userName: 'Gustavo L.', rating: 5, comment: 'Excelente qualidade, o neoprene protege muito o punho e a aderência na barra é total.', date: '2026-05-22' }
    ]
  }
];

export const mockExercises: Exercise[] = [
  {
    id: 'ex-squat',
    name: 'Agachamento Livre (Back Squat)',
    description: 'Exercício composto base para membros inferiores. Fortalece quadríceps, glúteos e core. Foco no alinhamento dos joelhos e na profundidade do movimento.',
    videoUrl: 'https://www.youtube.com/embed/gcNh17CykA4', // Agachamento livre tutorial
    category: 'strength',
    targetMuscle: 'Quadríceps e Glúteos',
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex-deadlift',
    name: 'Levantamento Terra (Deadlift)',
    description: 'Exercício completo da cadeia posterior. Envolve eretores da espinha, glúteos, isquiotibiais e dorsais. Mantenha a coluna neutra e empurre o chão com os pés.',
    videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q',
    category: 'strength',
    targetMuscle: 'Cadeia Posterior e Core',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex-bench',
    name: 'Supino Reto com Barra',
    description: 'Exercício multiarticular para empurrar. Foco no peitoral maior, deltoide anterior e tríceps. Mantenha as escápulas retraídas e os pés firmes no chão.',
    videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
    category: 'strength',
    targetMuscle: 'Peitoral e Tríceps',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex-knee-rehab',
    name: 'Extensão Isométrica de Joelho',
    description: 'Fortalecimento do quadríceps focado na estabilização patelar. Indicado para reabilitação de tendinite ou pós-lesão. Segurar por 5 segundos na extensão máxima.',
    videoUrl: 'https://www.youtube.com/embed/3S7t63L2Z60',
    category: 'rehab',
    targetMuscle: 'Quadríceps (Vasto Medial)',
    coverImage: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex-shoulder-y',
    name: 'Elevação Y de Ombros na Polia/Halter',
    description: 'Reabilitação e ativação de trapézio inferior e deltoide posterior. Ajuda a corrigir a postura e prevenir dores no ombro.',
    videoUrl: 'https://www.youtube.com/embed/d3W3D-Y1XjI',
    category: 'rehab',
    targetMuscle: 'Estabilizadores de Escápula',
    coverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex-plank',
    name: 'Prancha Abdominal Isométrica',
    description: 'Estabilização de core profundo. Ativa reto abdominal, transverso do abdômen e glúteos. Mantenha os cotovelos sob os ombros e a bacia neutra.',
    videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw',
    category: 'cardio',
    targetMuscle: 'Core Integro',
    coverImage: 'https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&q=80&w=600'
  }
];

export const mockEducationVideos: EducationVideo[] = [
  {
    id: 'vid-nut-1',
    title: 'Nutrição Fitness: Como Calcular Macronutrientes',
    description: 'Aprenda de forma simples como calcular suas calorias diárias e a proporção de proteínas, carboidratos e gorduras para otimizar o ganho de massa ou queima de gordura.',
    duration: '12:40',
    videoUrl: 'https://www.youtube.com/embed/hO-c9fL10-M',
    category: 'nutrition',
    coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'vid-rec-1',
    title: 'Recuperação Muscular Ativa e Liberação Miofascial',
    description: 'Guia prático utilizando o rolo de espuma (foam roller) e alongamentos dinâmicos para reduzir a rigidez pós-treino e acelerar a regeneração muscular.',
    duration: '08:15',
    videoUrl: 'https://www.youtube.com/embed/yR0x-wJ2c50',
    category: 'recovery',
    coverImage: 'https://images.unsplash.com/photo-1544216717-3bbf52512659?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'vid-warm-1',
    title: 'Rotina de Mobilidade Geral Pré-Treino de Pernas',
    description: '5 exercícios cruciais para fazer antes de agachar ou treinar pernas. Melhore a amplitude de quadril, joelho e tornozelo para treinar com segurança.',
    duration: '06:30',
    videoUrl: 'https://www.youtube.com/embed/3B_4-g-eZ6Y',
    category: 'warmup',
    coverImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600'
  }
];

export const defaultWorkoutPlan: WorkoutPlan = {
  clientId: 'user-client',
  trainerId: 'user-trainer',
  startDate: '2026-05-01',
  endDate: '2026-06-01',
  days: [
    {
      day: 'Segunda-feira (Pernas)',
      exercises: [
        { exerciseId: 'ex-squat', sets: 4, reps: '8-10', weight: '60kg', rest: '2 min', completed: false },
        { exerciseId: 'ex-knee-rehab', sets: 3, reps: '15 segundos', weight: 'Caneleira 5kg', rest: '1 min', completed: false }
      ]
    },
    {
      day: 'Quarta-feira (Superiores)',
      exercises: [
        { exerciseId: 'ex-bench', sets: 4, reps: '10', weight: '40kg', rest: '1:30 min', completed: false },
        { exerciseId: 'ex-shoulder-y', sets: 3, reps: '12', weight: 'Halteres 4kg', rest: '1 min', completed: false }
      ]
    },
    {
      day: 'Sexta-feira (Fullbody)',
      exercises: [
        { exerciseId: 'ex-deadlift', sets: 3, reps: '8', weight: '70kg', rest: '2 min', completed: false },
        { exerciseId: 'ex-plank', sets: 3, reps: '60 segundos', weight: 'Peso corporal', rest: '1 min', completed: false }
      ]
    }
  ]
};

export const defaultPainReports: PainReport[] = [
  {
    id: 'pain-1',
    date: '2026-05-18',
    painLevel: 6,
    description: 'Dor aguda na região patelar esquerda ao agachar profundo.',
    bodyParts: ['knee-left'],
    status: 'pending'
  }
];

export const defaultRehabPlan: RehabPlan = {
  clientId: 'user-client',
  physioId: 'user-physio',
  startDate: '2026-05-20',
  exercises: [
    { exerciseId: 'ex-knee-rehab', sets: 4, reps: '20 segundos isometria', instructions: 'Contraia o quadríceps ao máximo na extensão completa e mantenha a patela alinhada. Fazer sem pressa.', completed: false },
    { exerciseId: 'ex-shoulder-y', sets: 3, reps: '15 repetições controladas', instructions: 'Mantenha o abdômen contraído, focando em aproximar as escápulas na subida. Sem usar impulso.', completed: false }
  ]
};
