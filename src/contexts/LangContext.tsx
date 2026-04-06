import React, { createContext, useContext, useState } from 'react';

type Lang = 'pt' | 'en';

const translations = {
  pt: {
    nav: {
      espaco: 'Espaço',
      galeria: 'Galeria',
      testemunhos: 'Testemunhos',
      reservar: 'Reservar',
      contacto: 'Contacto',
    },
    hero: {
      headline: 'Cocktails, Natureza e Bons Momentos',
      sub: 'Um refúgio onde a arte dos cocktails encontra a beleza natural. Relaxe no terraço, respire o ar puro e desfrute do momento.',
      subBefore: 'Um refúgio onde a arte dos cocktails encontra a beleza natural. Relaxe no ',
      subAfter: ', respire o ar puro e desfrute do momento.',
      cta: 'Reservar Mesa',
      cta2: 'Explorar Menu',
    },
    about: {
      label: 'O Conceito',
      title: 'Onde a Natureza Encontra a Arte de Beber Bem',
      p1: 'Situado num cenário natural privilegiado perto do Porto, o Avioso Terrace nasceu da vontade de criar um espaço onde cada momento é uma experiência sensorial.',
      p2: 'Aqui, os cocktails são criados com ingredientes selecionados, o ambiente convida à descontração, e a natureza envolvente transforma qualquer visita num escape da rotina urbana.',
      p3: 'Não somos apenas um bar — somos um destino.',
    },
    cocktails: {
      label: 'Galeria',
      title: 'Os nossos Cocktails',
      sub: 'Cada cocktail é uma viagem sensorial, feito com ingredientes frescos e técnicas de mixologia contemporânea.',
      items: [
        { name: 'Terrace Sunset', desc: 'Gin, sumo de laranja sanguínea, xarope de flor de sabugueiro, espuma de gengibre', tag: 'Assinatura' },
        { name: 'Brisa do Parque', desc: 'Vodka infusionada com pepino, hortelã fresca, lima, tónica artesanal', tag: 'Refrescante' },
        { name: 'Negroni da Casa', desc: 'Gin botânico, Campari, vermute artesanal, twist de laranja fumada', tag: 'Clássico' },
        { name: 'Flor de Outono', desc: 'Bourbon, xarope de mel e tomilho, sumo de limão, bitter aromático', tag: 'Sazonal' },
      ],
      viewFull: 'Ver Menu Completo',
    },
    experience: {
      label: 'A Experiência',
      title: 'Mais do que um Bar',
      items: [
        { icon: '🌿', title: 'Ambiente Natural', desc: 'Inserido num parque natural, cada visita é um escape da cidade.' },
        { icon: '🍸', title: 'Cocktails de Autor', desc: 'Receitas originais com ingredientes premium e sazonais.' },
        { icon: '👥', title: 'Convívio Social', desc: 'O espaço perfeito para encontros, celebrações e momentos partilhados.' },
        { icon: '✨', title: 'Relaxamento Total', desc: 'Deixe-se envolver pela tranquilidade e desfrute sem pressa.' },
      ],
    },
    gallery: {
      label: 'Galeria',
      title: 'Momentos no Terraço',
    },
    testimonials: {
      label: 'O Que Dizem',
      title: 'Experiências Partilhadas',
      googleLabel: 'Avaliações do Google',
      items: [
        { text: '"Um sítio mágico. Os cocktails são incríveis e o pôr-do-sol visto do terraço é inesquecível."', author: 'Mariana Silva', location: 'Porto', rating: 5, photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { text: '"O melhor local para desligar da rotina. Ambiente perfeito, drinks perfeitos, companhia perfeita."', author: 'Ricardo Ferreira', location: 'Maia', rating: 5, photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { text: '"Já fui a muitos bares, mas o Avioso Terrace é diferente. Sentes-te em contacto com a natureza."', author: 'Ana Lopes', location: 'Vila do Conde', rating: 5, photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { text: '"Ambiente fantástico e cocktails de excelência. O staff é super atencioso e simpático."', author: 'Pedro Costa', location: 'Matosinhos', rating: 5, photo: 'https://randomuser.me/api/portraits/men/75.jpg' },
        { text: '"Perfeito para um date night ou para relaxar com amigos. Vista incrível sobre o parque!"', author: 'Sofia Martins', location: 'Porto', rating: 4, photo: 'https://randomuser.me/api/portraits/women/22.jpg' },
        { text: '"Descoberta do ano! Voltarei sempre que puder. Recomendo o Terrace Sunset."', author: 'Miguel Santos', location: 'Trofa', rating: 5, photo: 'https://randomuser.me/api/portraits/men/45.jpg' },
      ],
    },
    reservation: {
      label: 'Reservar',
      title: 'Reserve a Sua Mesa',
      sub: 'Garanta o seu lugar no terraço. Aceite o convite da natureza.',
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone',
      date: 'Data',
      time: 'Hora',
      guests: 'Nº de Pessoas',
      message: 'Mensagem (opcional)',
      submit: 'Confirmar Reserva',
    },
    location: {
      label: 'Localização & Horário',
      title: 'Encontre-nos',
      address: 'Parque Natural, Avioso — Porto, Portugal',
      hours: 'Horário',
      hoursList: ['Terça a Quinta: 16h – 00h', 'Sexta e Sábado: 15h – 02h', 'Domingo: 15h – 23h', 'Segunda: Encerrado'],
      contact: 'Contacto',
      phone: '+351 912 345 678',
      email: 'reservas@aviosoterrace.pt',
    },
    footer: {
      tagline: 'Cocktails, natureza e bons momentos.',
      rights: '© 2026 Avioso Terrace. Todos os direitos reservados.',
    },
  },
  en: {
    nav: {
      espaco: 'Space',
      galeria: 'Gallery',
      testemunhos: 'Testimonials',
      reservar: 'Reserve',
      contacto: 'Contact',
    },
    hero: {
      headline: 'Cocktails, Nature & Good Times',
      sub: 'A retreat where cocktail craft meets natural beauty. Relax on the terrace, breathe in the fresh air, and savour the moment.',
      subBefore: 'A retreat where cocktail craft meets natural beauty. Relax on the ',
      subAfter: ', breathe in the fresh air, and savour the moment.',
      cta: 'Reserve a Table',
      cta2: 'Explore Menu',
    },
    about: {
      label: 'The Concept',
      title: 'Where Nature Meets the Art of Drinking Well',
      p1: 'Nestled in a privileged natural setting near Porto, Avioso Terrace was born from the desire to create a space where every moment becomes a sensory experience.',
      p2: 'Here, cocktails are crafted with selected ingredients, the atmosphere invites relaxation, and the surrounding nature transforms any visit into an escape from the urban routine.',
      p3: 'We\'re not just a bar — we\'re a destination.',
    },
    cocktails: {
      label: 'Gallery',
      title: 'Our Cocktails',
      sub: 'Each cocktail is a sensory journey, made with fresh ingredients and contemporary mixology techniques.',
      items: [
        { name: 'Terrace Sunset', desc: 'Gin, blood orange juice, elderflower syrup, ginger foam', tag: 'Signature' },
        { name: 'Park Breeze', desc: 'Cucumber-infused vodka, fresh mint, lime, artisanal tonic', tag: 'Refreshing' },
        { name: 'House Negroni', desc: 'Botanical gin, Campari, artisanal vermouth, smoked orange twist', tag: 'Classic' },
        { name: 'Autumn Bloom', desc: 'Bourbon, honey & thyme syrup, lemon juice, aromatic bitters', tag: 'Seasonal' },
      ],
      viewFull: 'View Full Menu',
    },
    experience: {
      label: 'The Experience',
      title: 'More Than a Bar',
      items: [
        { icon: '🌿', title: 'Natural Setting', desc: 'Set within a natural park, every visit is an escape from the city.' },
        { icon: '🍸', title: 'Signature Cocktails', desc: 'Original recipes with premium, seasonal ingredients.' },
        { icon: '👥', title: 'Social Gathering', desc: 'The perfect space for meetings, celebrations, and shared moments.' },
        { icon: '✨', title: 'Total Relaxation', desc: 'Let yourself be enveloped by tranquility and enjoy without rush.' },
      ],
    },
    gallery: {
      label: 'Gallery',
      title: 'Moments on the Terrace',
    },
    testimonials: {
      label: 'Testimonials',
      title: 'Shared Experiences',
      items: [
        { text: '"A magical place. The cocktails are incredible and the sunset from the terrace is unforgettable."', author: 'Mariana S.', role: 'Porto' },
        { text: '"The best spot to disconnect. Perfect atmosphere, perfect drinks, perfect company."', author: 'Ricardo F.', role: 'Maia' },
        { text: '"I\'ve been to many bars, but Avioso Terrace is different. You feel in touch with nature."', author: 'Ana L.', role: 'Vila do Conde' },
      ],
    },
    reservation: {
      label: 'Reserve',
      title: 'Reserve Your Table',
      sub: 'Secure your spot on the terrace. Accept nature\'s invitation.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      date: 'Date',
      time: 'Time',
      guests: 'Number of Guests',
      message: 'Message (optional)',
      submit: 'Confirm Reservation',
    },
    location: {
      label: 'Location & Hours',
      title: 'Find Us',
      address: 'Natural Park, Avioso — Porto, Portugal',
      hours: 'Hours',
      hoursList: ['Tuesday to Thursday: 4 PM – 12 AM', 'Friday & Saturday: 3 PM – 2 AM', 'Sunday: 3 PM – 11 PM', 'Monday: Closed'],
      contact: 'Contact',
      phone: '+351 912 345 678',
      email: 'reservas@aviosoterrace.pt',
    },
    footer: {
      tagline: 'Cocktails, nature & good times.',
      rights: '© 2026 Avioso Terrace. All rights reserved.',
    },
  },
};

type Translations = typeof translations.pt;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: 'pt',
  setLang: () => {},
  t: translations.pt,
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('pt');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
