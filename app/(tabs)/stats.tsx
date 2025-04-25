import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Brain, Trophy, Target, Timer, Zap, Crown, Medal, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MOCK_DATA = {
  totalGamesPlayed: 247,
  averageScore: 85,
  timeSpent: '12h 30m',
  highestStreak: 15,
  gamesBreakdown: {
    numberMemory: { played: 82, avgScore: 88, bestScore: 12 },
    wordMemory: { played: 65, avgScore: 82, bestScore: 15 },
    stroopChallenge: { played: 55, avgScore: 78, bestScore: 42 },
    patternMemory: { played: 45, avgScore: 92, bestScore: 16 },
  },
  recentAchievements: [
    { title: 'Memory Master', description: 'Complete 50 memory games', icon: Brain },
    { title: 'Perfect Streak', description: '10 perfect scores in a row', icon: Zap },
    { title: 'Word Wizard', description: 'Remember 100 words correctly', icon: Crown },
  ],
};

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0088ff', '#00c6ff']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Trophy size={48} color="#ffffff" />
          <Text style={styles.headerTitle}>Your Stats</Text>
          <Text style={styles.headerSubtitle}>Track your brain training progress</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Cards */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(1000)}
          style={styles.overviewGrid}
        >
          <View style={styles.overviewCard}>
            <Target size={24} color="#0088ff" />
            <Text style={styles.overviewNumber}>{MOCK_DATA.totalGamesPlayed}</Text>
            <Text style={styles.overviewLabel}>Games Played</Text>
          </View>
          <View style={styles.overviewCard}>
            <Star size={24} color="#ffd700" />
            <Text style={styles.overviewNumber}>{MOCK_DATA.averageScore}%</Text>
            <Text style={styles.overviewLabel}>Avg Score</Text>
          </View>
          <View style={styles.overviewCard}>
            <Timer size={24} color="#00cc88" />
            <Text style={styles.overviewNumber}>{MOCK_DATA.timeSpent}</Text>
            <Text style={styles.overviewLabel}>Time Spent</Text>
          </View>
          <View style={styles.overviewCard}>
            <Zap size={24} color="#ff6b6b" />
            <Text style={styles.overviewNumber}>{MOCK_DATA.highestStreak}</Text>
            <Text style={styles.overviewLabel}>Best Streak</Text>
          </View>
        </Animated.View>

        {/* Game Stats */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(1000)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Game Performance</Text>
          <View style={styles.gameStats}>
            <View style={[styles.gameCard, { backgroundColor: '#0088ff' }]}>
              <Brain size={32} color="#ffffff" />
              <Text style={styles.gameTitle}>Number Memory</Text>
              <View style={styles.gameMetrics}>
                <Text style={styles.metricText}>Played: {MOCK_DATA.gamesBreakdown.numberMemory.played}</Text>
                <Text style={styles.metricText}>Best: {MOCK_DATA.gamesBreakdown.numberMemory.bestScore}</Text>
                <Text style={styles.metricText}>Avg: {MOCK_DATA.gamesBreakdown.numberMemory.avgScore}%</Text>
              </View>
            </View>

            <View style={[styles.gameCard, { backgroundColor: '#00cc88' }]}>
              <Brain size={32} color="#ffffff" />
              <Text style={styles.gameTitle}>Word Memory</Text>
              <View style={styles.gameMetrics}>
                <Text style={styles.metricText}>Played: {MOCK_DATA.gamesBreakdown.wordMemory.played}</Text>
                <Text style={styles.metricText}>Best: {MOCK_DATA.gamesBreakdown.wordMemory.bestScore}</Text>
                <Text style={styles.metricText}>Avg: {MOCK_DATA.gamesBreakdown.wordMemory.avgScore}%</Text>
              </View>
            </View>

            <View style={[styles.gameCard, { backgroundColor: '#ff6b6b' }]}>
              <Brain size={32} color="#ffffff" />
              <Text style={styles.gameTitle}>Stroop Challenge</Text>
              <View style={styles.gameMetrics}>
                <Text style={styles.metricText}>Played: {MOCK_DATA.gamesBreakdown.stroopChallenge.played}</Text>
                <Text style={styles.metricText}>Best: {MOCK_DATA.gamesBreakdown.stroopChallenge.bestScore}</Text>
                <Text style={styles.metricText}>Avg: {MOCK_DATA.gamesBreakdown.stroopChallenge.avgScore}%</Text>
              </View>
            </View>

            <View style={[styles.gameCard, { backgroundColor: '#845ec2' }]}>
              <Brain size={32} color="#ffffff" />
              <Text style={styles.gameTitle}>Pattern Memory</Text>
              <View style={styles.gameMetrics}>
                <Text style={styles.metricText}>Played: {MOCK_DATA.gamesBreakdown.patternMemory.played}</Text>
                <Text style={styles.metricText}>Best: {MOCK_DATA.gamesBreakdown.patternMemory.bestScore}</Text>
                <Text style={styles.metricText}>Avg: {MOCK_DATA.gamesBreakdown.patternMemory.avgScore}%</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Recent Achievements */}
        <Animated.View 
          entering={FadeInDown.delay(600).duration(1000)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievements}>
            {MOCK_DATA.recentAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <View key={index} style={styles.achievementCard}>
                  <View style={styles.achievementIcon}>
                    <Icon size={24} color="#0088ff" />
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  </View>
                  <Medal size={20} color="#ffd700" />
                </View>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: -30,
    paddingHorizontal: 4,
  },
  overviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: width * 0.42,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  gameStats: {
    gap: 16,
  },
  gameCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
  },
  gameMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  metricText: {
    color: '#ffffff',
    fontSize: 14,
  },
  achievements: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666666',
  },
});