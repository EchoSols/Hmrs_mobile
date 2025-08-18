
import React, { forwardRef, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../styles/commonStyles';

interface CustomBottomSheetProps {
  children: React.ReactNode;
  title?: string;
  snapPoints?: string[];
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  ({ children, title, snapPoints = ['25%', '50%', '90%'] }, ref) => {
    const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    );

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheet
          ref={ref}
          index={-1}
          snapPoints={snapPointsMemo}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            {title && (
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
              </View>
            )}
            {children}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.backgroundAlt,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: colors.textSecondary,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.card,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
});

export default CustomBottomSheet;
