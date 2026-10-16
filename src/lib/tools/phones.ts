/** Recomendador de celular: modelos reales del mercado y especificaciones por juego y presupuesto. */

export const PHONE_GAMES = ['Free Fire', 'Roblox', 'Minecraft', 'Fortnite'] as const;
export type PhoneGame = (typeof PHONE_GAMES)[number];

export const BUDGETS = [
  { id: 'low', label: 'Menos de $150' },
  { id: 'mid', label: '$150 a $300' },
  { id: 'high', label: 'Más de $300' },
] as const;
export type Budget = (typeof BUDGETS)[number]['id'];

export const DEFAULT_PHONE_GAME: PhoneGame = 'Free Fire';
export const DEFAULT_BUDGET: Budget = 'mid';

export interface PhoneRecommendation {
  tier: string;
  advice: string;
  models: readonly string[];
  specs: string;
}

const RECOMMENDATIONS: Record<PhoneGame, Record<Budget, PhoneRecommendation>> = {
  'Free Fire': {
    low: {
      tier: 'Gama de entrada',
      advice:
        'Para jugar Free Fire en este presupuesto necesitas mínimo 6 GB de RAM y procesador Helio G85 o Snapdragon 680. Estos modelos rinden a 60 FPS estables con gráficos en Estándar o Suave sin sobrecalentarse.',
      models: [
        'Xiaomi Redmi 13C (8 GB / 256 GB)',
        'Motorola Moto G24 Power',
        'Samsung Galaxy A05s',
        'Tecno Spark 20',
      ],
      specs: 'Procesador Octa-Core • 6 u 8 GB RAM • Batería 5.000 mAh • Pantalla 90 Hz',
    },
    mid: {
      tier: 'Gama media',
      advice:
        'El punto dulce calidad-precio para Free Fire. Corren el juego en gráficos Ultra con sombras activadas y FPS al máximo. La pantalla de 120 Hz te da ventaja competitiva en velocidad de respuesta y giros de cámara.',
      models: [
        'Poco X6 5G (Snapdragon 7s Gen 2)',
        'Redmi Note 13 Pro 4G/5G',
        'Samsung Galaxy A25 5G (AMOLED 120 Hz)',
        'Infinix Note 40 Pro',
        'Moto G84 5G',
      ],
      specs:
        'Snapdragon 7s Gen 2 / Dimensity 7050 • 8 a 12 GB RAM • Pantalla AMOLED 120 Hz • Carga rápida 33W-67W',
    },
    high: {
      tier: 'Gama media alta',
      advice:
        'Potencia de sobra para competir en torneos de Free Fire y hacer stream directo a TikTok LIVE o YouTube sin lag ni caídas de frames. La cámara de vapor integrada evita bajones de rendimiento en partidas largas.',
      models: [
        'Poco X6 Pro 5G (Dimensity 8300 Ultra)',
        'Poco F6 (Snapdragon 8s Gen 3)',
        'Samsung Galaxy A55 5G',
        'Xiaomi 13T',
        'iPhone 13 / 14',
      ],
      specs:
        'Chip insignia Dimensity 8300 / Snapdragon 8 • 12 GB RAM LPDDR5X • Refrigeración LiquidCool • Wi-Fi 6',
    },
  },
  Roblox: {
    low: {
      tier: 'Gama de entrada',
      advice:
        'Rinde bien en experiencias estándar de Roblox como Brookhaven o Adopt Me con calidad gráfica manual en nivel 3-5. En mundos gigantes con mucha física puede experimentar caídas puntuales.',
      models: ['Xiaomi Redmi 13C', 'Samsung Galaxy A05s', 'Realme C53', 'Motorola Moto G14'],
      specs: '4 a 6 GB RAM • Procesador Unisoc T616 / Helio G85 • Almacenamiento UFS • 5.000 mAh',
    },
    mid: {
      tier: 'Gama media',
      advice:
        'Te permite jugar mapas pesados de Roblox (Blox Fruits, Arsenal, BedWars) con gráficos en nivel 8-10 sin tirones. Los 8 GB de RAM evitan que el juego se cierre solo por falta de memoria en servidores llenos.',
      models: ['Poco X6 5G', 'Redmi Note 13 Pro', 'Samsung Galaxy A35 5G', 'Tecno Camon 30'],
      specs:
        '8 GB RAM • Pantalla AMOLED 120 Hz • Procesador Snapdragon 7 / Dimensity 7000 • Altavoces estéreo',
    },
    high: {
      tier: 'Gama media alta',
      advice:
        'Experiencia de consola en Roblox. Puedes poner los gráficos al nivel 10 en cualquier experiencia compleja y transmitir tu pantalla a TikTok, Kick o YouTube con total estabilidad.',
      models: ['Poco X6 Pro 5G', 'Samsung Galaxy S23 FE / A55', 'Xiaomi 13T', 'iPhone 13 / 14'],
      specs: 'Dimensity 8300 / Exynos 1480 • 12 GB RAM • Pantalla AMOLED HDR10+ • Alta disipación térmica',
    },
  },
  Minecraft: {
    low: {
      tier: 'Gama de entrada',
      advice:
        'Mueve Minecraft Bedrock fluido con distancia de renderizado de 8 a 10 chunks. Recomendado jugar sin paquetes de texturas pesados ni shaders experimentales para cuidar los fotogramas.',
      models: ['Samsung Galaxy A05s', 'Xiaomi Redmi 13C', 'Motorola Moto G24 Power'],
      specs: '6 GB RAM • Batería 5.000 mAh • Distancia sugerida: 8-10 chunks',
    },
    mid: {
      tier: 'Gama media',
      advice:
        'Soporta de 14 a 18 chunks de renderizado fluido en Minecraft, servidores multijugador masivos y paquetes de texturas HD sin ralentizar el juego. Los 120 Hz hacen la exploración suave y descansada a la vista.',
      models: ['Poco X6 5G', 'Samsung Galaxy A25 5G', 'Redmi Note 13 Pro', 'Infinix GT 20 Pro'],
      specs: '8 GB RAM • AMOLED 120 Hz • Procesador Snapdragon / Dimensity con GPU balanceada',
    },
    high: {
      tier: 'Gama media alta',
      advice:
        'Permite jugar a Minecraft a más de 20 chunks de distancia, probar shaders avanzados de Bedrock y jugar conectado a un mando por Bluetooth sin ninguna latencia perceptible.',
      models: [
        'Poco F6 (Snapdragon 8s Gen 3)',
        'Poco X6 Pro (Dimensity 8300)',
        'Samsung Galaxy A55 5G',
        'iPhone 13 / 14',
      ],
      specs: '12 GB RAM • Almacenamiento UFS ultra rápido para mundos pesados • Soporte mando Bluetooth',
    },
  },
  Fortnite: {
    low: {
      tier: 'Gama de entrada',
      advice:
        'Para jugar Fortnite en celulares se usa Unreal Engine y requiere procesador ARM64 de 64 bits con GPU de alta gama. En menos de $150 casi ningún equipo cumple los requisitos oficiales de Epic Games. Es mejor ahorrar para la gama media.',
      models: [
        'Recomendación: Ahorrar para gama media ($180+)',
        'Samsung Galaxy A05s (solo 30 FPS mínimos inestables)',
      ],
      specs: 'Aviso: Epic Games exige arquitectura ARM64 de 64 bits y GPU potente',
    },
    mid: {
      tier: 'Gama media',
      advice:
        'Permite instalar el instalador oficial de Fortnite y jugar en Gráficos Medios a 30 FPS fijos o 60 FPS con resolución 3D al 75%. Es la puerta de entrada económica real para jugar en móvil.',
      models: [
        'Poco X6 5G (Snapdragon 7s Gen 2)',
        'Samsung Galaxy A35 5G',
        'Infinix GT 20 Pro',
        'Poco M6 Pro',
      ],
      specs: '8 GB RAM • Snapdragon 7s Gen 2 / Dimensity 7050 • Almacenamiento 256 GB para parches',
    },
    high: {
      tier: 'Gama media alta',
      advice:
        'Configuración competitiva para Fortnite: corre a 60 FPS constantes o 90 FPS en alta resolución. La memoria UFS carga las texturas del mapa al tirarte del autobús sin tirones.',
      models: [
        'Poco F6 / F6 Pro (Snapdragon 8s Gen 3)',
        'Poco X6 Pro 5G (Dimensity 8300)',
        'Samsung Galaxy S23 FE',
        'iPhone 13 / 14',
      ],
      specs: 'Procesador insignia Snapdragon 8 / Dimensity 8300 • 12 GB RAM • Modo Juego y Gatillos táctiles',
    },
  },
};

export function recommendPhone(game: PhoneGame, budget: Budget): PhoneRecommendation {
  return (
    RECOMMENDATIONS[game]?.[budget] ?? {
      tier: 'Gama media',
      advice: `Para jugar a ${game} con fluidez, busca un equipo con mínimo 8 GB de RAM y pantalla de 90 o 120 Hz.`,
      models: ['Poco X6 5G', 'Samsung Galaxy A25 5G', 'Redmi Note 13 Pro'],
      specs: '8 GB RAM • Pantalla 120 Hz • 5.000 mAh',
    }
  );
}

export function isPhoneGame(value: string | undefined): value is PhoneGame {
  return (PHONE_GAMES as readonly string[]).includes(value ?? '');
}

export function isBudget(value: string | undefined): value is Budget {
  return BUDGETS.some((b) => b.id === value);
}
