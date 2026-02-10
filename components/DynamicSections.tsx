import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SectionConfig, type SectionStyle } from '../context/ThemeContext';

const EMPTY_SECTION_STYLE: SectionStyle = { backgroundColor: '', textColor: '', headingLine1Color: '', headingLine2Color: '' };

// ============================================================
// Hjelpefunksjon: hent stil for en seksjon basert på modus
// ============================================================
function useSectionStyle(sectionConfig: SectionConfig) {
  const { isDarkMode } = useTheme();
  const style: SectionStyle = isDarkMode
    ? (sectionConfig.style?.dark ?? EMPTY_SECTION_STYLE)
    : (sectionConfig.style?.light ?? EMPTY_SECTION_STYLE);
  return {
    backgroundColor: style.backgroundColor || undefined,
    color: style.textColor || undefined,
    headingLine1Color: style.headingLine1Color || undefined,
    headingLine2Color: style.headingLine2Color || undefined,
  };
}

// ============================================================
// Bonefish SVG Logo (fra RightSidebar)
// ============================================================
const BonefishLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 678.3 257.6" className={className} fill="currentColor">
    <g>
      <g>
        <path d="M663.4,168.6c-6.2-16.8-8.8-17.7-21.8-7.3l-0.3-12.7c1.2-14.8,5.4-29.6,9.5-44.8c-3.3-2.9-6.7-1.2-9,3.9c-2.1,4.9-4.3,10-5.5,15.2c-2.3,10.3-4.6,20.6-11.6,30.4l-0.5,0.9c-1.8,4.8-4.4,7.1-7.5,11.2c-2.5,3.3-6.8,5-6.8,5.1c0,0,0.8-1.4,0.7-5s0.6-3-4-8.3c-3-1.6-8.5-5-8.5-5s1.1-1.7,3.3-2.8c4.3-2,10.3-2.6,10.3-2.6s-6.9-5.7-8.8-5c-3.3,0.4-6.9,2-6.9,2s-1.6,1.2-3.6,3.1c-6.5,6.1-6.3,9.1-13.8,16.4c-5.1-8.3,5.3-13.8,1.3-22.1c-2.7,0.9-5.2,1.7-9,3c0,0-9.5,3.6-11.7,4.2c-0.9,0.7-1.7,1.3-2.5,1.9c2.6-17.4,7.5-34.4,16.1-50.9c-3.4-1.5-6.1-2.6-9-3.9c-1,2.7-1.7,4.4-2.3,6.2c-6.5,18.4-12.8,36.9-19.6,55.2c-1.8,4.8-4.1,9.6-8.2,12.7c-3.2,2.4-4.1,3.7-10.6,3.6l-4.2,0.3c-12-0.3-14.4-2.9-14.4-2.9c4.8-2.9,7.7-4.8,7.7-4.8l7.3-5.8c0,0-0.8-2.5-4.1-5.5s-10.8-3.2-14.2-3c-2.7,0.1-8.1,4.7-8.6,6.8c-0.4,2.1-0.2,2.5,0,6.5c0,0.7-9.2,4.1-13.5,6.3c-6.2-16.8-8.8-17.7-21.8-7.3c-10.5-7.6-22.1-12.4-35.1-12.8l-14.4,2.8c-0.3-0.6-0.7-1.2-1.2-1.8c-8.2-7-20.8-4.4-33.8-3.9c5.6-4.5,10.4-7.9,14.6-11.9c6-5.7,12.2-11.5,17.3-18c4.6-5.8,2.7-9.9-4.5-11c-5.6-0.9-11.5-1.4-17-0.5c-10.9,1.8-21.6,4.6-33,7.2c0.3-6.1,0.9-11.8,0.8-17.4c-0.1-2.1-1.9-4.2-2.9-6.3c-1.5,2-4,4-4.3,6.2c-0.6,4.7-0.4,9.5,0.1,14.3s-1,7.1-6,8.5c-11.3,3.3-21.1,9.3-29.5,18.6c2.7,1.6,4.7,2.8,5.8,3.4c9.3-6.2,17.9-11.9,26.6-17.7c1.1,1.8,1.5,2.2,1.5,2.6c0.3,3.1,0.6,6.2,0.7,9.3c1.2,22.4,1.1,22.3-18.7,32.7c-3.3,1.7-5.8,4.9-9.7,8.2c13.4,5.7,18.4-8.3,28-8.7c2,17.6,3.7,20.9,10,19.9c-0.5-1.3-1-2.6-1.5-3.9c-5.7-15.3-3.2-21,11.9-26.5c2.5-0.9,4.9-2,7.5-2.3c8.5-1,17-1.7,25.6-2.5c0.3,1,0.6,1.9,0.9,2.9c0.3,1.1,0.5,2.2,0.7,3.2c-9.8,5.1-31.6,19.1-35.5,22.1c-1.9,1.5-2.7,4.5-3.9,6.8c2.5,0.9,5.1,2.9,7.5,2.6c11.4-1.2,21.8-5.1,30.3-13.1c1.8-1.7,3.3-2.4,5.9-5c5.1-4.9,7.1-9.8,7-13.8c5.5-1.2,11.3-1.8,11,0.6c-0.6,5.6-1.2,9.5-0.7,13.3c0.3,2.6,2.5,5.9,4.8,6.9c1.8,0.8,5.5-0.9,7.3-2.6c2.5-2.4,4.6-5.6,5.7-8.9c1.8-5.2,5.4-5.6,8.8-3.3c2.4,1.6,3.5,5.4,5,8.2c1.4,2.7,2.7,5.6,4,8.4c2.5-1.9,5-3.8,7.4-5.9c0.7-0.6,0.8-1.7,1.4-2.5c1.5-1.9,3.1-3.7,4.7-5.5c0.9,2.2,2.6,6.6,2.6,6.6s3.2,8.4,6.1,7.4c5.5-1.8,15.3-4.6,18.7-6.6c3.7,4.9,3.6,4.6,8.3,6.2c0.6,0.2,3,0.8,8,1.1c2.6,0.2,2.9,0.3,7,0.3l5.7-0.7c5.4-0.6,12.4-2.9,15.7-5.9c3.6-3.3,6-7.9,10.2-13.7c-0.5,5.8-0.9,9.4-1.1,12.9c-0.3,7.9-0.7,15.7-0.4,23.6c0.2,3.8,0.3,8.7,5.9,9.4c-0.9-17.3-0.9-34.4,1.1-51.2c1.5-0.5,2.9-1,4.4-1.5l6.7-2c4.9-1.2,2,5,1.4,10.2c-0.2,3.2-0.9,6.2,0.1,8c3.3,6,9,8.4,13.1,3c0.7-0.9,2.7-2,3.5-3.5c1.6-3,2.4,12,18.7,9.2l1.7-0.3l5.8-1.3c3.9-2.2,8.4-3.9,11.6-6.9c3.6-3.3,6-7.9,10.2-13.6c-0.5,5.8-0.6,14.3-0.7,17.8c-0.1,2.5,2.7,3.1,6.5,2.9l0,0c-1.6-0.7,4.1-4,6.2-5.8c0.7-0.6,2-1.8,2.6-2.6c1.5-1.9,3.1-3.7,4.7-5.5c0.9,2.2,2.6,6.6,2.6,6.6s3.2,8.4,6.1,7.4c5.5-1.8,13.8-7.6,17.2-9.7v-1.2C678.3,167.8,667.7,166.5,663.4,168.6z M350.3,152.2c0-10.1-0.1-18.9,0.1-27.6c0-1.5,1.4-3.8,2.7-4.3c14.2-5.3,28.8-8.5,45.5-7.3C385.1,130.2,369.1,142.2,350.3,152.2z M397,163c-3.6,6.2-14.2,15.7-24.5,17.7c1.5-2.4,17.7-14.5,25.2-20.6C397.6,161.1,397.4,162.1,397,163z M430.2,165.9c-0.8,2.5-2.5,3.7-3.6,3.4c-1.5-0.5-1.3-2.3-0.5-4.8s2.6-4.3,3.8-3.9C431.7,161.2,430.9,163.4,430.2,165.9z M501.4,162c-0.8-1.4,0.7-2.5,3-3.7s4.9-1.2,5.5,0c0.8,1.7-1.3,2.7-3.6,3.9C504,163.4,501.9,163,501.4,162z M599.8,170.4c-2,0.9-3,0.6-4.7-0.4c-4-2.3-3.6-5.8-3.6-5.8c0-1.2,3.6-5.5,3.6-5.5s5.5,1.8,7.1,5.1C603.6,166.6,600.9,170,599.8,170.4z" />
        <path d="M576.5,132.5c-3.5,0-4.6-1.6-5.1-3.6c-0.6-2.3,0.1-6.5,2.9-7.7c4.5-1.5,7,0.7,7.5,4.6C582.1,129.2,580.5,132.5,576.5,132.5z" />
      </g>
      <path d="M192,139.4l-6.2-1.3l2-6.3l2.3-7.6l1.3-3.1l-0.1-6.2l1.7-3.5l0.7-3.1l0.6-4.5v-4.2l-1.8-4.8l-2.1-4.8l-3.5-4.8l-1.1-5.5l-2.5-2l-1.1-4.5l3.4-3.9l2.4-2.5l0.7-2.8l1.3-3.5l1-2.4l1-2.8l0.3-3.5l1.3-3.1l1.6-7.3l1.3-2.8l1.5,6.9l0.1,4.8l2.1,3.8l1.5,7.6l1.8,5.2l0.1,5.9l-1,6.9l1.5,7.9l1.8,7.2l2.5,6.2l2.8,5.5l0.7,2.8l0.4,4.1l-4.4,5.6l-0.3,5.2l-1,5.6l0.1,5.2l-0.6,4.2l-1.4,2.4l1.1,1.4l2.4-0.7l1.4,2.7l-0.3,3.5L208,152v3.8l-0.6,4.2l-2.7,4.2l2.5,2.4c0,0-0.3,1.7-2.4,2.1c2.5,1.7,2.1,3.1,1.4,4.5c-0.7,1.4,0.4,3.8,0.8,6.2c0.4,2.4,0.5,8.3,0.8,9.3c0.4,1,1.8,7.6,1.8,7.6l-0.6,5.5l0.4,3.8l-0.3,4.9l-1,5.2l0.4,8l-1,2.4v2.8l1.1,4.1l-0.3,4.2l0.7,2.1l0.1,3.8l1.4,3.8l-3.5-2.7l-1.4-3.8l-1.8-3.4l-2.5-3.1l-1.1-4.5l-4.6-4.1l-4.2-4.4l-1.8-3.1l0.6-4.9l-0.1-4.5l-1.8-6.9l-1.1-5.5l-0.1-3.8l-2.1-3.1l1.3-2.8l0.6-4.2l-1.1-3.4l0.7-2.4v-3.1l4.1-6.3l-5.5,1.1l-1.8-6.6l-1.4-2.4l-0.1-6.9l0.6-3.1l-0.7-1.4l4.1-3.5l1.7-2.1L192,139.4z" />
      <path d="M137.3,174.7l4.3-0.1l-2.6,3.6l-1.6,2.6l0.4,2.6l2,1.9l2,3.6l0.7,3.6l0.7,3.6l1,1.6l-0.6,2.9l1,2.3l0.7,2.6l-1,2.6l1.4,3.3l1.7,3.6l0.7,3.9l2.3,3.9l1,2.9l1.3,2.6l1,3.3l0.7,3.6l2,3.2l2,5.2l1,2.3l-0.3,2.9l1.3,1.3l0.4,3.6l1.7,3.6l1.3-3.9l0.3-3l0.3-4.6l0.6-4.9l1.3-4.9l0.9-5.2l1-1.6l-0.1-6.6l-0.7-1.3l-0.1-6.2l-1-4.2l-1-4.2l-1-1.9l-0.4-7.2l0.2-6.2l1.3-3.3l0.9-3.9l0.3-4.6l0.3-2.3l-1.3-1.6l2-0.5l1.7,1.5l1.5-0.7l-0.5-1.6l0.9-2.6l0.9-3.3v-1.3l2.6-2.7l1.6-0.7v-2.3l-2-3.9l-1.7-1.6l-2.3-3.2l-1.3-2.9l-2.3-2.3l-1.3-2.3l0.9-4.3l2.2-3.6l1.6-1.3l2.5-5.6l0.9-7.9l2.6-4.9l0.5-8.5l-1.4-7.2l-3.1-10.4l-3.8-12.1l-1.1-8.5l-0.1-6.5l-1.4-3.9l-1.4-5.2l0.9-3.6l-0.5-9.5l-0.4-3.6l1.6-2.3l0.2-7.5L167,25l-0.4-5.9l1.2-4.9l-0.4-4.2l1.9-4l-0.4-3.3V0.3l-1.6,1.4l-2.5,3.1L162,8.9l-5,11l-7,21.4v4.5l-0.4,5.7l0.6,6.6l-0.4,8.3l-0.5,6.7l-0.6,6.6l-1.4,7.1l-2.4,7.7l-5.9,18.6l-1.5,10.6l-1.8,6.6l-0.2,5.5l0.6,4.4l3.9-0.1l-2.2,2.4c0,0-5.3,2.1-5.4,2.2c-0.1,0-1.4,1.9-1.4,1.9l-0.7,3.8l0.8,4.2l1.7,3.6l1.2,2.6l-1.4,3.1l-0.8,2c0,0-3.1,3.2-3.1,3.3s1.7,2,1.7,2l3.3,0.5l3.7,0.7l-0.5,1.5L137.3,174.7z" />
      <path d="M115.8,133.1l3.3,0.9l0.7,2.3l1.7,3.6l-1.6,4.3l1,5.2l-0.3,4.9l-0.6,3.6c0,0-1,1.3-1.3,2.3s0.1,4.6,0.1,4.6l0.7,3.6l-0.9,2.8L117,172l-0.3,2.9l1,4.6l1.4,6.2l2,3.9l-0.6,3l-1.6,2.6l-2.6,4.3l1.1,6.9l-1.2,8.5l0.7,6.2l-0.6,6.6l1,4.6l-0.3,5.2l0.7,4.2l0.7,2.3l-1.3,2.6l0.1,5.6l-0.9,3.3l-3.6-1.9l-2-2.9l-2-3.3l-1.7-2.9l-1-3.9l-0.1-4.9l-0.7-4.6l-2.4-5.9l-2.3-4.2l-0.7-6.2l-1.7-2.3l-0.4-3.6l-4-2.9l-3.4-6.8l-2.3-3.9l-3-3.2l0.2-5.6l1.9-6.6l0.3-4.6l-2-0.6l0.3-2.3l-1.7-4.2l-2.6-1.9v-3.6l-0.7-4.6l-0.4-8.8l-0.1-4.3l3.9-5.6l2.6-1.7l1.6,0.3l-0.1-4.6l-0.1-9.2l-0.4-4.6l-2-4.2l1.9-8.2l0.9-8.5l-0.1-5.2l1.2-4.9l6.1-9.3l3.2-7.6l2.8-7.2l3.2-3.3l3.6-3.6l3.9-5.3l2.9-3.3l1.6-3l4.5-3.7l0.1,3.9l-1.3,3.6l0.4,4.6l-0.9,4.3l0.1,5.6l-0.6,6.2l-0.2,8.2l-0.6,6.9l-0.3,5.2l-0.9,5.9l-1.9,4.3l-2.6,4.9l-2.9,3.3l-1.3,2.3v3.6l2.3,3.9l1.4,3.9l1,4.6l0.7,3.3L115.8,133.1z" />
      <polygon points="71.4,146.1 74,146.1 74.7,149 75.1,152.3 74.5,153.9 73.5,157.2 71.3,158.6 71.3,160.8 69.7,161.2 68.3,161.2 70.3,163.5 71.7,165.8 72,168.7 72.1,172.6 72.5,175.2 72.2,178.5 70.9,181.8 70.3,184.8 71,186.4 72.6,188.7 73.3,192.9 74,196.2 75.4,199.4 76.7,201.7 77.4,204.3 76.2,207.3 76.9,211.2 77.6,214.1 77.6,216.1 78.3,224.3 77,221.2 75,219.9 73,215.4 70,213.9 68.3,209 66,204.5 64.6,202.2 62.3,200.3 63.3,197.3 60.3,193.4 60.5,189.5 60.8,184.9 59.8,181 60.7,176.7 61,173.8 59,171.2 57,170.9 53.4,170.2 51.7,167.7 51,162.1 49.3,157.2 50.2,153.6 48.6,151.3 49.5,147.7 51.8,144.7 54.4,144 56.7,144 57.2,135.5 58.5,134.2 58.7,126 60,123 63.2,119 65.8,116.1 66.7,110.1 71.9,106.5 74.8,102.2 75.5,105.1 74.8,107.1 74.3,112.7 73.3,117.6 71.4,121.6 69.2,126.2 68.6,130.1 69,134 70,137.6 70.4,140.2 71,142.2" />
      <path d="M48.5,148.5l-0.9-3.1l-0.2-4.7c0,0-1.2-3.3-1.2-3.7c-0.6,1.3-0.8,3.6-0.8,3.6l-0.3,3.8l-2.7,8.4l1.4-7.7c0,0,0.1-3.8-0.2-4.3s-2.6-9.6-2.6-9.6l-3.6-9l-4.2-5.8l-3.5-6.2l-4.7-7.5c0,0-4-4.2-4.8-5.3c-0.8-1.1-6.8-5.2-6.8-5.2l-3.8-0.6l-5.1-2.4l4.7,10.7l4,8.9l2.8,4.4c0,0,1.7,4.4,1.7,4.9s0.9,5.6,0.9,5.6l1.5,5.2l0.1-5.6l1.7-4.3l2.2,2.1l2.1,10l0.9,5.7l0.1,5.9l-0.6,3.8l-3.9-8l-3-5.2l-3.3-3.2l3.5,8.1l1,12.9l0.6,6.9l1.2,6.2l-1,7.9l-2,6.7l3.2-4.1l2.6-3l1.5-7.1l0.9,7.2l-0.9,6.6l-2.2,6.1l-1.9,5.9l-3.5,5.1l0.6-4.1l0.3-5.6l-4.3,9.1l-3.7,6.6L7,207.6l-3,6.2l-4,4.8l6.5-1.7l3.2-3.3L17,211l4.5-4.8l5-2.4l4.3-7.3l2.2-4.9l3-6.1l3-5.8c0,0,0.3-3.6,0.4-4.4c0.1-0.8-0.6,14.6-0.6,14.6l-0.5,3l3.1-2.8l2.6-4.9l1.6-3.8l0.1-6.9l1.7-4.1l0.9-2.6l0.6-1.8l-1.5-4.7v-3.1l0.9-3.9l-0.5-1.3l-1-0.8L48.5,148.5z" />
      <g>
        <path d="M247,118c-0.4-0.1-1.4,0.1-2.9,0.4c-0.9,0.2-1.9,0.5-3,0.8c-0.8,0.2-1.6,0.5-2.4,0.8c-1.4,0.5-2.9,1.1-4.3,1.8c-1.2,0.6-2.4,1.2-3.6,1.8c-1.4,0.8-2.8,1.7-4,2.7c-2.3,1.9-3.5,3.8-3.4,5.5c0,0.9,0.7,2,2,3.1c0.7,0.6,1.9,1.6,2.9,2.2c2.2,1.3,4.5,2.5,6.8,3.7c2.4,1.2,4.7,2.1,6.2,2.1c2.4,0,4.8-0.7,6.2-3c0.7-1.1,1.5-2.5,2.1-4.1c0.7-1.8,1-3.7,1-5.4c0.1-3.6-0.2-5.3-0.5-6.8C249.8,120.2,248.6,118.4,247,118z M249.3,131.3c-0.6,4.9-3.1,10.3-7,10.3c-3.7,0-14.5-5.3-14.7-8.4c-0.1-1.5,0.9-3.1,2.9-4.7c5.3-4.4,15-7,16.2-6.8C248.8,122.2,249.9,126.3,249.3,131.3z" />
        <path d="M264.6,159.1c0.6,1.9,1.5,8.2,1.6,8c0.6-1.5,1.2-2.9,1.3-3.9c0.1-1.4-1.7-7.8-3.3-13c-1.2-3.8-2.3-7.1-2.6-7.4c-0.6-0.8-1-12.7-1-14.6c0-1.8-8.2-14.7-9.4-14.7s-11.1-15-11.1-15s-24.4-28.4-23.8-26.4c4,14.2,8.4,19.9,8.4,19.9l3.1,12.7l-7-3.1c0,0,0.5,14,0.3,15.8c-0.2,1.9-3,8.3-3.2,9.3s0.1,10.1,0.1,11.3s1.3,4.1,1.3,4.1s0.5,6.6,0.3,7.8s-1.1,6.8-1.3,7.4c-0.2,0.6-1.8,6.8-1.8,6.8s0.5,5.7,0.5,6.4c0,0.6,1.1,7,3,8.8s2.3,4.7,2.3,5.7s1.1,8.4,2,9c0.8,0.6,2.2,8.6,2.4,7.8S239,201,240,201s10.4-4.9,11.4-5.3c1-0.4,5.7-3.4,6.1-4.2s3.3-12.8,3.3-12.8s2.8-5.7,4.7-10.3c0.1-0.1-6,6.3-5.9,6.2c0,0-2.9,0.7-2.5-0.5c0.1-0.5,1.3-6.4,1-11.7c-1.2,4.1-4.9,8.1-5.3,7.9c-1.3-0.6-0.3-2.9-1.1-5.2c-0.4,0.6-1.7,3-1.9,2.8c-0.3-0.5,2.4-9.3,2.2-10.1c0.1,0.7,2.5,10.5,2.5,10.1c0.6,0.1,1.6-8.5,1.8-8.9c0.3-0.4,1.4-2.7,1.7-3.1c0.3-0.6,3.7,9,4.1,9.4c0.1-0.2,0.5-1.4,0.6-1.6c0.1-0.2-0.9-11-0.8-11.2C262,151.6,264,157.2,264.6,159.1z M252.2,129.7c-0.9,7.1-4.5,14.2-10.6,14.2c-4.6,0-19.8-6.4-20.1-11.9c-0.1-2.4,1.3-4.8,4.2-7.2c6.3-5.2,19.2-9.4,21.8-8.7C251.7,117.3,252.9,123.7,252.2,129.7z" />
      </g>
    </g>
  </svg>
);

// ============================================================
// SEKSJON 1 – KLUBBKOLLEKSJON (tekst + bilde, annenhver side)
// ============================================================
const KlubbkolleksjonSection: React.FC<{ config: SectionConfig }> = ({ config }) => {
  const { styleSettings, club } = useTheme();
  const sectionStyle = useSectionStyle(config);
  const flipped = config.flipped ?? false;
  
  const line1Color = sectionStyle.headingLine1Color || `var(--color-${styleSettings.newsBarColor})`;
  const line2Color = sectionStyle.headingLine2Color || 'inherit';
  
  return (
    <section 
      className="py-24 lg:py-32 transition-colors duration-300"
      style={{
        backgroundColor: sectionStyle.backgroundColor || 'var(--section-background)',
        color: sectionStyle.color || 'var(--color-text)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${flipped ? 'direction-rtl' : ''}`}>
          {/* Tekst */}
          <div className={`${flipped ? 'lg:order-2' : 'lg:order-1'}`}>
            <div 
              className="w-12 h-1.5 rounded-full mb-8"
              style={{ backgroundColor: `var(--color-${styleSettings.newsBarColor})` }}
            />
            <h2 className="text-4xl lg:text-6xl font-black mb-8 uppercase tracking-tight">
              <span style={{ color: line1Color }}>{club.name}</span>
              <br />
              <span style={{ color: line2Color }}>Klubbkolleksjon</span>
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed mb-12 opacity-80">
              Her finner du vår klubbkolleksjon med våre klubbfarger i variert utvalg. Vi har også 25% rabatt på 
              ordinære priser. Se hele utvalget i nettbutikken. Du kan også se vårt utvalg av supporterutstyr
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="px-10 py-4 font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl"
                style={{
                  background: `linear-gradient(135deg, var(--color-${styleSettings.ctaButtonColor}) 0%, ${styleSettings.ctaGradientColor} 100%)`,
                  color: styleSettings.ctaTextColor || '#ffffff',
                  borderRadius: 'var(--radius-button)',
                }}
              >
                Gå til klubbkolleksjon
              </button>
              <button 
                className="bg-white/10 backdrop-blur-xl border border-white/20 px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                style={{ 
                  borderRadius: 'var(--radius-button)',
                  color: 'inherit',
                }}
              >
                Supporterutstyr
              </button>
            </div>
          </div>
          {/* Bilde */}
          <div className={`${flipped ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/images/klubbkolleksjon.png" 
                alt="Klubbkolleksjon" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SEKSJON 2 – GRASROTANDELEN (tekst + bilde, annenhver side)
// ============================================================
const GrasrotandelenSection: React.FC<{ config: SectionConfig }> = ({ config }) => {
  const { styleSettings } = useTheme();
  const sectionStyle = useSectionStyle(config);
  const flipped = config.flipped ?? true;
  
  const line1Color = sectionStyle.headingLine1Color || 'inherit';
  const line2Color = sectionStyle.headingLine2Color || `var(--color-${styleSettings.newsBarColor})`;
  
  return (
    <section 
      className="py-24 lg:py-32 transition-colors duration-300"
      style={{
        backgroundColor: sectionStyle.backgroundColor || 'var(--section-background)',
        color: sectionStyle.color || 'var(--color-text)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Tekst */}
          <div className={`${flipped ? 'lg:order-2' : 'lg:order-1'}`}>
            <div 
              className="w-12 h-1.5 rounded-full mb-8"
              style={{ backgroundColor: `var(--color-${styleSettings.newsBarColor})` }}
            />
            <h2 className="text-4xl lg:text-6xl font-black mb-8 uppercase tracking-tight">
              <span style={{ color: line1Color }}>Støtt klubben med</span>
              <br />
              <span style={{ color: line2Color }}>Grasrotandelen</span>
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed mb-12 opacity-80">
              Ved å velge klubben som din grasrotmottaker bidrar du direkte til klubbens arbeid – 
              helt uten ekstra kostnad for deg. Hver krone går til aktivitet, utvikling og idrettsglede.
            </p>
            <button 
              className="px-10 py-4 font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl"
              style={{
                background: `linear-gradient(135deg, var(--color-${styleSettings.ctaButtonColor}) 0%, ${styleSettings.ctaGradientColor} 100%)`,
                color: styleSettings.ctaTextColor || '#ffffff',
                borderRadius: 'var(--radius-button)',
              }}
            >
              Bli grasrotgiver
            </button>
          </div>
          {/* Bilde */}
          <div className={`${flipped ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/images/grasrotandelen.png" 
                alt="Grasrotandelen" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SEKSJON 3 – BLI MED I KLUBBEN
// ============================================================
const BliMedSection: React.FC<{ config: SectionConfig }> = ({ config }) => {
  const { styleSettings } = useTheme();
  const sectionStyle = useSectionStyle(config);
  
  const line1Color = sectionStyle.headingLine1Color || 'inherit';
  const line2Color = sectionStyle.headingLine2Color || 'inherit';
  
  return (
    <section 
      className="py-24 lg:py-32 transition-colors duration-300"
      style={{
        backgroundColor: sectionStyle.backgroundColor || 'var(--section-background)',
        color: sectionStyle.color || 'var(--color-text)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className="w-12 h-1.5 rounded-full mb-8 mx-auto"
            style={{ backgroundColor: `var(--color-${styleSettings.newsBarColor})` }}
          />
          <h2 className="text-4xl lg:text-6xl font-black mb-8 uppercase tracking-tight">
            <span style={{ color: line1Color }}>Bli med</span>{' '}
            <span style={{ color: line2Color }}>i klubben</span>
          </h2>
          <p className="text-lg lg:text-xl leading-relaxed mb-12 opacity-80 max-w-2xl mx-auto">
            Klubben drives av mennesker som bryr seg. Enten du vil være spiller, foresatt, trener 
            eller frivillig, finnes det mange måter å engasjere seg på. Sammen skaper vi aktivitet, 
            samhold og idrettsglede – for alle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-10 py-4 font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl"
              style={{
                background: `linear-gradient(135deg, var(--color-${styleSettings.ctaButtonColor}) 0%, ${styleSettings.ctaGradientColor} 100%)`,
                color: styleSettings.ctaTextColor || '#ffffff',
                borderRadius: 'var(--radius-button)',
              }}
            >
              Bli medlem
            </button>
            <button 
              className="bg-white/10 backdrop-blur-xl border border-white/20 px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all"
              style={{ 
                borderRadius: 'var(--radius-button)',
                color: 'inherit',
              }}
            >
              Se hvordan du kan bidra
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SEKSJON 4 – SPONSORER (med ekte logoer, auto-skalering)
// ============================================================

// Sponsor-logoer (kan utvides med flere)
const SPONSOR_LOGOS: { id: string; type: 'img' | 'svg'; src?: string; component?: React.FC<{ className?: string }>; alt: string }[] = [
  { id: 'sparebank1', type: 'img', src: '/sponsors/sparebank1-oslo-akershus.svg', alt: 'SpareBank 1 Oslo Akershus' },
  { id: 'bonefish', type: 'svg', component: BonefishLogo, alt: 'Bonefish' },
];

const SponsorerSection: React.FC<{ config: SectionConfig }> = ({ config }) => {
  const { styleSettings } = useTheme();
  const sectionStyle = useSectionStyle(config);
  const headingStyle = styleSettings.sponsorHeadingStyle || 'full';
  const showBorder = styleSettings.sponsorLogoShowBorder ?? false;
  
  const line1Color = sectionStyle.headingLine1Color || 'inherit';
  
  // Auto-skalering basert på antall logoer
  const logoCount = SPONSOR_LOGOS.length;
  const logoSize = logoCount <= 2 ? 'h-28 w-72' : logoCount <= 4 ? 'h-20 w-52' : 'h-14 w-40';
  const gapSize = logoCount <= 2 ? 'gap-20' : logoCount <= 4 ? 'gap-12' : 'gap-8';
  // Maks 6 per rad, sentrert – bruk flex for enkel justering
  const gridClass = 'flex flex-wrap items-center justify-center';
  
  return (
    <section 
      className="py-24 lg:py-32 transition-colors duration-300 relative overflow-hidden"
      style={{
        backgroundColor: sectionStyle.backgroundColor || 'var(--section-background)',
        color: sectionStyle.color || 'var(--color-text)',
      }}
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        {headingStyle === 'full' && (
          <>
            <div 
              className="w-12 h-1.5 rounded-full mb-8 mx-auto"
              style={{ backgroundColor: `var(--color-${styleSettings.newsBarColor})` }}
            />
            <h2 className="text-4xl lg:text-6xl font-black mb-16 uppercase tracking-tight" style={{ color: line1Color }}>
              Sponsorer
            </h2>
          </>
        )}
        {headingStyle === 'module' && (
          <h3 
            className="uppercase tracking-[0.3em] mb-10"
            style={{ 
              color: 'var(--module-heading-color)',
              fontSize: 'var(--module-heading-size)',
              fontWeight: 'var(--module-heading-weight)',
              fontFamily: 'var(--module-heading-font)',
            }}
          >
            Hovedsponsorer
          </h3>
        )}
        
        <div className={`${gridClass} ${gapSize} max-w-5xl mx-auto items-center justify-items-center`}>
          {SPONSOR_LOGOS.map((logo) => (
            <div 
              key={logo.id}
              className={`flex items-center justify-center transition-all group ${
                showBorder 
                  ? 'px-8 py-6 rounded-2xl border border-current/10 hover:border-[var(--color-secondary)]' 
                  : 'px-4 py-4'
              }`}
              style={showBorder ? { backgroundColor: 'color-mix(in srgb, currentColor 3%, transparent)' } : undefined}
            >
              {logo.type === 'img' && logo.src ? (
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={`${logoSize} object-contain grayscale group-hover:grayscale-0 transition-all`}
                />
              ) : logo.component ? (
                <div className={`${logoSize} flex items-center`}>
                  <logo.component className="w-full h-full" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SEKSJON 5 – SPONSOR-CTA (Gradient-boks med konfigurerbare farger)
// ============================================================
const SponsorCTASection: React.FC<{ config: SectionConfig }> = ({ config }) => {
  const { styleSettings } = useTheme();
  const sectionStyle = useSectionStyle(config);
  const line1Color = sectionStyle.headingLine1Color || undefined;
  
  const color1 = styleSettings.sponsorCTAColor1 || 'var(--color-primary)';
  const color2 = styleSettings.sponsorCTAColor2 || 'var(--color-secondary)';
  const color3 = styleSettings.sponsorCTAColor3 || 'var(--color-support1)';
  const angle = styleSettings.sponsorCTAAngle ?? 135;
  const boxTextColor = styleSettings.sponsorCTABoxTextColor || 'var(--color-support1)';
  
  return (
    <section 
      className="py-20 transition-colors duration-300"
      style={{
        backgroundColor: sectionStyle.backgroundColor || 'var(--section-background)',
      }}
    >
      <div className="container mx-auto px-6">
        <div 
          className="rounded-[40px] py-20 px-10 text-center relative overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`,
            color: boxTextColor,
          }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-7xl font-black mb-6 uppercase tracking-tight" style={{ color: line1Color }}>
              Vil du bli sponsor?
            </h2>
            <p className="text-lg font-medium mb-12 max-w-xl mx-auto opacity-90">
              Som sponsor bidrar du til klubbens arbeid samtidig som du får synlighet i lokalmiljøet. 
              Sammen skaper vi verdi for både klubb og næringsliv.
            </p>
            <button
              type="button"
              className="px-12 py-5 font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform shadow-xl"
              style={{
                background: `linear-gradient(135deg, var(--color-${styleSettings.ctaButtonColor}) 0%, ${styleSettings.ctaGradientColor} 100%)`,
                color: styleSettings.ctaTextColor || '#ffffff',
                borderRadius: 'var(--radius-button)',
              }}
            >
              Ta kontakt
            </button>
          </div>
          {/* Decorative blur elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SEKSJON 6 – KONTAKT (Footer-seksjon)
// ============================================================
const KontaktSection: React.FC<{ config: SectionConfig }> = ({ config }) => {
  const sectionStyle = useSectionStyle(config);
  const line1Color = sectionStyle.headingLine1Color || 'inherit';
  
  return (
    <section 
      className="py-24 lg:py-32 relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: sectionStyle.backgroundColor || 'var(--color-primary)',
        color: sectionStyle.color || '#ffffff',
      }}
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl lg:text-6xl font-black mb-16 uppercase tracking-tighter" style={{ color: line1Color }}>
          HAR DU NOE PÅ HJERTET?
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 text-2xl">
          <div className="flex flex-col items-center">
            <span className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-60">Ring oss</span>
            <p className="font-black transition-colors hover:text-[var(--color-accent)]">40 00 67 60</p>
          </div>
          <div className="w-px h-16 bg-white/10 hidden md:block"></div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-60">Send e-post</span>
            <p className="font-black transition-colors hover:text-[var(--color-accent)]">hei@klubbnettside.no</p>
          </div>
        </div>
      </div>
      {/* Abstract background art */}
      <div 
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-[100px]"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)' }}
      />
    </section>
  );
};

// ============================================================
// Seksjon-komponent-mapping
// ============================================================
const SECTION_COMPONENTS: Record<string, React.FC<{ config: SectionConfig }>> = {
  'klubbkolleksjon': KlubbkolleksjonSection,
  'grasrotandelen': GrasrotandelenSection,
  'bli-med': BliMedSection,
  'sponsorer': SponsorerSection,
  'sponsor-cta': SponsorCTASection,
  'kontakt': KontaktSection,
};

// ============================================================
// DYNAMISK SEKSJONS-RENDERER
// Rendrer seksjoner i rekkefølge basert på konfigurasjon
// ============================================================
const DynamicSections: React.FC = () => {
  const { styleSettings } = useTheme();
  const sections = styleSettings.sections || [];
  
  return (
    <>
      {sections
        .filter(section => section.enabled)
        .map(section => {
          const Component = SECTION_COMPONENTS[section.id];
          if (!Component) return null;
          return <Component key={section.id} config={section} />;
        })}
    </>
  );
};

export default DynamicSections;
