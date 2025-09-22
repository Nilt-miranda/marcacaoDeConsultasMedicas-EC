// src/components/EmptyState.tsx
import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native-elements';

type EmptyStateProps = {
  /** Título principal do estado vazio */
  title?: string;
  /** Subtítulo/descrição opcional */
  subtitle?: string;
  /** Ação opcional (ex.: <Button title="Agendar" onPress={...} />) */
  action?: React.ReactNode;
};

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Title = styled(Text).attrs({ h4: true })`
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled(Text)`
  text-align: center;
  opacity: 0.8;
  margin-bottom: 16px;
`;

export default function EmptyState({ title, subtitle, action }: EmptyStateProps) {
  return (
    <Wrapper>
      {title ? <Title>{title}</Title> : null}
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      {action}
    </Wrapper>
  );
}
