// src/components/AppointmentCard.tsx
import React from 'react';
import styled from 'styled-components/native';
import { Text as RNText, TouchableOpacity, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-elements';
import { formatDate, formatTime } from '../utils/date';

export type Status = 'pending' | 'confirmed' | 'cancelled' | string;

export type AppointmentCardProps = {
  doctorName: string;
  specialty?: string;
  date?: string;
  time?: string;
  status?: Status;
  onPress?: () => void;
  style?: ViewStyle;
};

const CardTouchable = styled(TouchableOpacity)<{ style?: ViewStyle }>`
  /* style externo virá pela prop style */
`;

const CardContainer = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 12px;
  margin: 4px 0;
  /* iOS */
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  /* Android */
  elevation: 3;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Info = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const TitleText = styled(RNText)`
  font-weight: bold;
`;

const SubText = styled(RNText)`
  opacity: 0.9;
`;

function chipColor(status: Status) {
  if (status === 'confirmed') return '#2e7d32';
  if (status === 'pending') return '#f9a825';
  return '#c62828';
}

const ChipWrap = styled.View`
  align-self: flex-start;
  padding: 4px 8px;
  border-radius: 999px;
  margin-top: 6px;
`;

const ChipText = styled(RNText)`
  font-size: 12px;
  color: #ffffff;
`;

function Chip({ status, children }: { status: Status; children: React.ReactNode }) {
  return (
    <ChipWrap style={{ backgroundColor: chipColor(status) }}>
      <ChipText>{children}</ChipText>
    </ChipWrap>
  );
}

export default function AppointmentCard({
  doctorName,
  specialty,
  date,
  time,
  status = 'pending',
  onPress,
  style,
}: AppointmentCardProps) {
  const dateLabel = formatDate(date);
  const timeLabel = formatTime(time);

  return (
    <CardTouchable onPress={onPress} style={style}>
      <CardContainer>
        <Row>
          <Avatar
            rounded
            title={doctorName?.charAt(0) || 'D'}
            size="medium"
            overlayContainerStyle={{ backgroundColor: '#1976d2' }}
          />
          <Info>
            <TitleText>{doctorName}</TitleText>
            {!!specialty && <SubText>{specialty}</SubText>}
            <SubText>
              {dateLabel} {timeLabel ? `às ${timeLabel}` : ''}
            </SubText>
            <Chip status={status}>
              {status === 'pending'
                ? 'Pendente'
                : status === 'confirmed'
                ? 'Confirmada'
                : 'Cancelada'}
            </Chip>
          </Info>
        </Row>
      </CardContainer>
    </CardTouchable>
  );
}
