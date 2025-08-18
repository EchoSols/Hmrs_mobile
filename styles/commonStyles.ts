
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#6366f1',      // Indigo
  secondary: '#8b5cf6',    // Purple
  accent: '#06b6d4',       // Cyan
  background: '#ffffff',   // White
  backgroundAlt: '#f8fafc', // Slate 50
  card: '#ffffff',         // White
  text: '#1e293b',         // Slate 800
  textSecondary: '#64748b', // Slate 500
  success: '#10b981',      // Emerald
  warning: '#f59e0b',      // Amber
  error: '#ef4444',        // Red
  border: '#e2e8f0',       // Slate 200
  gradient: {
    start: '#6366f1',      // Indigo
    middle: '#8b5cf6',     // Purple
    end: '#d946ef',        // Fuchsia
  },
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    marginTop: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  metric: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  metricLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  badge: {
    backgroundColor: colors.success,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Updated bottom navigation styles for proper positioning
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.backgroundAlt,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 8,
    paddingTop: 8,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  // Legacy bottom nav styles (kept for compatibility)
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 70,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
