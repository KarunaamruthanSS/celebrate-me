/**
 * Builder-UI theme palette, keyed the same as public/templates.js THEMES.
 * Drives the live crossfading background + accent colors when the user
 * switches celebration tabs. Light-only palette — no dark backgrounds.
 */
window.CELEBRATE_UI_THEMES = {
    birthday: { bg: 'linear-gradient(135deg,#FFF0F6 0%,#FFE1F0 45%,#FFD1E8 100%)', accent: '#FF3D9A', accent2: '#FF8FC7', glow: 'rgba(255,61,154,0.28)' },
    anniversary: { bg: 'linear-gradient(135deg,#FFF8E8 0%,#FFEFD1 45%,#FFE1B0 100%)', accent: '#C9962B', accent2: '#E8B94B', glow: 'rgba(201,150,43,0.28)' },
    valentine: { bg: 'linear-gradient(135deg,#FFF0F1 0%,#FFDDE1 45%,#FFC3CB 100%)', accent: '#FF2E56', accent2: '#FF7A93', glow: 'rgba(255,46,86,0.28)' },
    christmas: { bg: 'linear-gradient(135deg,#F0FFF6 0%,#DFFBEA 45%,#FFE3E3 100%)', accent: '#D93B3B', accent2: '#2FAE66', glow: 'rgba(47,174,102,0.28)' },
    newyear: { bg: 'linear-gradient(135deg,#FFF9E8 0%,#F3E9FF 45%,#E4D6FF 100%)', accent: '#9B6BFF', accent2: '#C9962B', glow: 'rgba(155,107,255,0.28)' },
    studentday: { bg: 'linear-gradient(135deg,#EAFBFF 0%,#DFF7F0 45%,#D6ECFF 100%)', accent: '#0E9E9E', accent2: '#2F80ED', glow: 'rgba(14,158,158,0.28)' },
    independenceday: { bg: 'linear-gradient(180deg,#FFEFD6 0%,#FFFFFF 45%,#E3F7E6 100%)', accent: '#FF7A00', accent2: '#1E8E3E', glow: 'rgba(255,122,0,0.28)' },
    labourday: { bg: 'linear-gradient(135deg,#FFF7EC 0%,#FFEAD1 45%,#FFD9AE 100%)', accent: '#D9720A', accent2: '#B0703F', glow: 'rgba(217,114,10,0.28)' },
    engineerday: { bg: 'linear-gradient(135deg,#EAF4FF 0%,#DCEBFF 45%,#CFE1FF 100%)', accent: '#1D6FE0', accent2: '#4B9BFF', glow: 'rgba(29,111,224,0.28)' }
};
