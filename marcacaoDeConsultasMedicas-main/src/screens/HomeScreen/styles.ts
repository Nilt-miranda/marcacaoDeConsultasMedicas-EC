// src/screens/HomeScreen/styles.ts
import styled from 'styled-components/native';
import { Text } from 'react-native-elements';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.View`
  flex: 1;
  padding: 16px;
`;

export const Title = styled(Text).attrs({ h3: true })`
  margin-bottom: 4px;
`;

export const Subtitle = styled(Text)`
  opacity: 0.8;
  margin-bottom: 16px;
`;

export const Fab = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors?.primary ?? '#1976d2'};
  elevation: 4;
`;
