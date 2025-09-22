// src/components/Header.tsx
import React from 'react';
import styled from 'styled-components/native';
import { Text, Icon } from 'react-native-elements';

type Props = {
  title: string;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
};

const Wrapper = styled.View`
  padding: 16px;
  padding-top: 20px;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const Title = styled(Text).attrs({ h4: true })`
  flex: 1;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

export default function Header({ title, onBackPress, rightContent }: Props) {
  return (
    <Wrapper>
      {onBackPress ? (
        <BackButton onPress={onBackPress}>
          <Icon name="arrow-back" type="ionicon" />
        </BackButton>
      ) : null}
      <Title>{title}</Title>
      {rightContent ?? null}
    </Wrapper>
  );
}
