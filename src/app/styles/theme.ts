const theme = {
  colors: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceAlt: '#F7F8F9',
    surfaceHeader: '#F0F3F7',
    border: '#E0E5EB',
    borderInput: '#CED5DE',
    textPrimary: '#1D2432',
    textSecondary: '#697180',
    textMuted: '#5E6674',
    textDark: '#1F2939',
    dangerBg: '#FEE3E3',
    dangerColor: '#C53030',
    coldWaterColor: '#3698FA',
    hotWaterColor: '#E62E05',
  },

  fonts: {
    primary: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
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
