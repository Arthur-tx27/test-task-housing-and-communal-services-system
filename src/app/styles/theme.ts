const theme = {
  colors: {
    backgroundMain: '#F8F9FA',
    backgroundActive: '#F2F5F8',
    surface: '#FFFFFF',
    surfaceAlt: '#F7F8F9',
    surfaceHeader: '#F0F3F7',
    border: '#E0E5EB',
    borderDark: '#CED5DE',
    borderHover: '#697180',
    borderInput: '#CED5DE',
    textPrimary: '#1D2432',
    textSecondary: '#697180',
    textMuted: '#5E6674',
    textDark: '#1F2939',
    textDisabled: '#9DA6B4',
    dangerBg: '#FEE3E3',
    dangerBgHover: '#FED7D7',
    dangerColor: '#C53030',
    dangerColorHover: '#9B2C2C',
    coldWaterColor: '#3698FA',
    hotWaterColor: '#E62E05',
  },

  fonts: {
    primary: `Roboto, sans-serif`,
    weightRegular: '400',
    weightMedium: '500',
    weightSemibold: '600',
    sizeXs: '12px',
    sizeSm: '13px',
    sizeMd: '14px',
    sizeLg: '16px',
    sizeXl: '20px',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
  },

  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
  },

  table: {
    headerHeight: '52px',
    rowHeight: '52px',
    containerPadding: '16px',
  },
} as const;

export type Theme = typeof theme;

export { theme };
