// src/screens/AdminDashboardScreen/index.tsx
import React, { useMemo } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components/native';

import Header from '../../components/Header';
import AppointmentCard from '../../components/AppointmentCard';
import EmptyState from '../../components/EmptyState';
import { useAdminDashboard } from './hooks/useAdminDashboard';

/* ===== Estilos locais (independentes de styles.ts) ===== */
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const ScreenPadding = styled.View`
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Subtitle = styled.Text`
  opacity: 0.8;
  margin-bottom: 16px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 16px;
`;

const KpiBox = styled.View`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  background-color: #ffffff;
  /* iOS */
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  /* Android */
  elevation: 2;
`;

const KpiLabel = styled.Text`
  opacity: 0.8;
  margin-bottom: 6px;
`;

const KpiValue = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const SectionContainer = styled.View`
  margin-top: 8px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const LoadingContainer = styled.View`
  padding: 24px;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.Text`
  opacity: 0.8;
`;
/* ======================================================== */

export default function AdminDashboardScreen() {
  const {
    loading,
    refreshing,
    onRefresh,
    stats: hookStats,
    pendingAppointments = [],
    confirmedAppointments = [],
    onAppointmentPress,
  } = useAdminDashboard() as any;

  // KPIs protegidos (usa stats do hook se houver; senão, usa tamanhos das listas)
  const stats = useMemo(() => {
    const pending =
      (hookStats && typeof hookStats.pending === 'number'
        ? hookStats.pending
        : pendingAppointments.length) ?? 0;

    const confirmed =
      (hookStats && typeof hookStats.confirmed === 'number'
        ? hookStats.confirmed
        : confirmedAppointments.length) ?? 0;

    const cancelled =
      (hookStats && typeof hookStats.cancelled === 'number'
        ? hookStats.cancelled
        : 0);

    return { pending, confirmed, cancelled };
  }, [hookStats, pendingAppointments, confirmedAppointments]);

  return (
    <Container>
      <Header title="Painel do Administrador" />

      <ScrollContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ScreenPadding>
          <Title>Visão Geral</Title>
          <Subtitle>Gerencie usuários, médicos e consultas</Subtitle>

          {/* KPIs */}
          <StatsContainer>
            <KpiBox>
              <KpiLabel>Pendentes</KpiLabel>
              <KpiValue>{stats.pending}</KpiValue>
            </KpiBox>
            <KpiBox>
              <KpiLabel>Confirmadas</KpiLabel>
              <KpiValue>{stats.confirmed}</KpiValue>
            </KpiBox>
            <KpiBox>
              <KpiLabel>Canceladas</KpiLabel>
              <KpiValue>{stats.cancelled}</KpiValue>
            </KpiBox>
          </StatsContainer>

          {/* Pendentes */}
          <SectionContainer>
            <SectionTitle>Consultas Pendentes</SectionTitle>

            {loading ? (
              <LoadingContainer>
                <LoadingText>Carregando…</LoadingText>
              </LoadingContainer>
            ) : pendingAppointments.length ? (
              pendingAppointments.map((a: any) => (
                <AppointmentCard
                  key={String(a.id)}
                  doctorName={a.doctorName ?? a.doctor_name ?? 'Médico'}
                  specialty={a.specialty ?? a.especialidade}
                  date={a.date ?? a.data}
                  time={a.time ?? a.hora}
                  status={a.status ?? 'pending'}
                  onPress={() => onAppointmentPress?.(a)}
                  style={{ marginBottom: 8 }}
                />
              ))
            ) : (
              <EmptyState
                title="Nada pendente"
                subtitle="Não há consultas aguardando aprovação."
              />
            )}
          </SectionContainer>

          {/* Confirmadas */}
          <SectionContainer>
            <SectionTitle>Consultas Confirmadas</SectionTitle>

            {loading ? (
              <LoadingContainer>
                <LoadingText>Carregando…</LoadingText>
              </LoadingContainer>
            ) : confirmedAppointments.length ? (
              confirmedAppointments.map((a: any) => (
                <AppointmentCard
                  key={String(a.id)}
                  doctorName={a.doctorName ?? a.doctor_name ?? 'Médico'}
                  specialty={a.specialty ?? a.especialidade}
                  date={a.date ?? a.data}
                  time={a.time ?? a.hora}
                  status={a.status ?? 'confirmed'}
                  onPress={() => onAppointmentPress?.(a)}
                  style={{ marginBottom: 8 }}
                />
              ))
            ) : (
              <EmptyState
                title="Nenhuma confirmada"
                subtitle="Ainda não existem consultas confirmadas."
              />
            )}
          </SectionContainer>
        </ScreenPadding>
      </ScrollContainer>
    </Container>
  );
}
