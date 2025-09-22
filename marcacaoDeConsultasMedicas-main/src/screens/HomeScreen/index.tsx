// src/screens/HomeScreen/index.tsx
import React from 'react';
import { FlatList, RefreshControl, ListRenderItem } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

import Header from '../../components/Header';
import AppointmentCard from '../../components/AppointmentCard';
import EmptyState from '../../components/EmptyState';

import { useHomeScreen, type Appointment } from './hooks/useHomeScreen';
import { Container, Content, Title, Subtitle, Fab } from './styles';

export default function HomeScreen({ navigation }: any) {
  const {
    appointments,
    loading,
    refreshing,
    onRefresh,
    onCreatePress,
    onAppointmentPress,
  } = useHomeScreen({ navigation });

  const renderItem: ListRenderItem<Appointment> = ({ item }) => (
    <AppointmentCard
      doctorName={item.doctorName}
      specialty={item.specialty}
      date={item.date}
      time={item.time}
      status={item.status}
      onPress={() => onAppointmentPress(item)}
      style={{ marginBottom: 8 }}
    />
  );

  return (
    <Container>
      <Header title="Minhas Consultas" />

      <Content>
        <Title>Bem-vindo(a) 👋</Title>
        <Subtitle>Visualize e gerencie suas consultas</Subtitle>

        <FlatList
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            !loading ? (
              <EmptyState
                title="Nenhuma consulta por aqui"
                subtitle="Você ainda não marcou uma consulta. Que tal começar agora?"
                action={<Button title="Agendar consulta" onPress={onCreatePress} />}
              />
            ) : null
          }
        />
      </Content>

      <Fab onPress={onCreatePress}>
        <FontAwesome name="plus" size={24} color="#fff" />
      </Fab>
    </Container>
  );
}
