/**
 * Contenu de la page SMALF — Scène Musicale À La Française.
 * SMALF est une initiative portée par RIFF. Rien ici n'affirme de résultat, de partenariat ou de réseau établi :
 * les éléments non confirmés sont formulés comme des ambitions ou des pistes.
 */

export const smalfMeta = {
  title: 'SMALF — Scène Musicale À La Française, une initiative RIFF',
  description:
    'SMALF, portée par RIFF, vise à repérer et accompagner les groupes français à fort potentiel : stratégie de développement, visibilité, accès aux salles, aux festivals et aux marchés internationaux.',
};

export const smalfIntro =
  'Portée par RIFF, SMALF est une initiative dédiée au développement des groupes français à fort potentiel. Notre ambition : leur donner les moyens de franchir de nouvelles étapes et de construire une carrière durable, grâce à un accompagnement exigeant et une approche stratégique du développement artistique.';

export const smalfStatement =
  'Accompagner les futurs grands noms de la scène musicale grâce au savoir-faire français.';

export const smalfAmbition: string[] = [
  'SMALF veut contribuer à faire émerger les prochains grands noms du rock et du metal français. Sans uniformiser leurs identités et sans rien retirer à leur indépendance artistique : chaque groupe garde ses choix, SMALF apporte une méthode, de l’exigence et des relations professionnelles.',
  'Aucun résultat n’est garanti. Ce que l’initiative s’engage à apporter, c’est un cadre de travail rigoureux, des objectifs fixés avec chaque groupe et une vision à long terme.',
];

/** Les cinq objectifs : ce que SMALF vise à faire. */
export const smalfObjectives: string[] = [
  'Repérer des artistes à fort potentiel.',
  'Construire avec eux une stratégie de développement adaptée à leur identité.',
  'Développer leur visibilité et leurs opportunités professionnelles.',
  'Favoriser leur accès aux salles, aux festivals, aux partenaires et aux marchés internationaux.',
  'Accompagner leur progression sur le long terme.',
];

export interface Pillar { id: string; index: string; title: string; text: string }
export const smalfPillars: Pillar[] = [
  { id: 'reperer', index: '01', title: 'Repérer', text: 'Identifier les projets artistiques singuliers et mesurer leur potentiel, avec un regard exigeant et un vrai travail de terrain.' },
  { id: 'developper', index: '02', title: 'Développer', text: 'Construire avec chaque groupe une stratégie adaptée à son identité, à son public et à ses objectifs, sans modèle unique.' },
  { id: 'rayonner', index: '03', title: 'Faire rayonner', text: 'Multiplier les opportunités et accompagner la progression des artistes, en France puis au-delà.' },
];

export const smalfRiff = {
  lead: 'SMALF est une initiative portée par RIFF.',
  text: 'RIFF reste l’agence : booking, management, accompagnement et développement des artistes. SMALF prolonge cette démarche avec une ambition particulière : le développement des groupes français à fort potentiel et leur rayonnement.',
};

/** Initiatives et artistes effectivement associés à SMALF. LAISSER VIDE tant que rien n'est confirmé. */
export interface SmalfInitiative { id: string; title: string; text: string; href?: string; hrefLabel?: string }
export const smalfInitiatives: SmalfInitiative[] = [];

/** Pistes d'action envisagées : ce sont des ambitions, pas des réalisations. */
export interface SmalfIdea { id: string; title: string; text: string }
export const smalfIdeas: SmalfIdea[] = [
  { id: 'detection', title: 'Détection de projets', text: 'Repérer des groupes français singuliers, par la rencontre, le concert et l’écoute.' },
  { id: 'parcours', title: 'Parcours de développement', text: 'Construire, avec chaque groupe, une feuille de route claire et des objectifs réalistes.' },
  { id: 'relations', title: 'Mises en relation', text: 'Faciliter les échanges entre les groupes, les salles, les festivals et les partenaires.' },
  { id: 'visibilite', title: 'Visibilité', text: 'Accompagner la communication et la présence des groupes auprès des professionnels et du public.' },
  { id: 'international', title: 'Ouverture internationale', text: 'Préparer, à terme, l’accès à des marchés hors de France.' },
];
