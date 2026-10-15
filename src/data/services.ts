export interface Service {
  id: string;
  index: string;
  title: string;
  lead: string;
  missions: string[];
}

export const services: Service[] = [
  {
    id: 'booking',
    index: '01',
    title: 'Booking',
    lead: 'Trouver les dates, ouvrir les portes des salles et des festivals.',
    missions: [
      'Recherche de dates et construction de séries de concerts',
      'Prise de contact avec les salles, festivals et programmateurs',
      'Échanges sur les conditions d’accueil et suivi jusqu’au jour J',
      'Mise en forme des éléments utiles aux professionnels : présentation, visuels, liens d’écoute',
    ],
  },
  {
    id: 'management',
    index: '02',
    title: 'Management',
    lead: 'Un regard extérieur et une méthode pour structurer le développement du groupe.',
    missions: [
      'Définition d’objectifs réalistes, posés avec le groupe',
      'Organisation du calendrier : sorties, concerts, temps de création',
      'Suivi régulier et ajustement de la stratégie',
      'Coordination avec les partenaires du projet : label, tourneurs, techniciens, graphistes',
    ],
  },
  {
    id: 'developpement',
    title: 'Développement artistique',
    index: '03',
    lead: 'Rendre le projet lisible, visible et connecté aux bonnes personnes.',
    missions: [
      'Réflexion sur l’identité et le positionnement du projet',
      'Accompagnement de la communication et de la visibilité',
      'Mises en relation avec des professionnels de la scène',
      'Conseil sur les projets en cours : concerts, sorties, collaborations',
    ],
  },
];
