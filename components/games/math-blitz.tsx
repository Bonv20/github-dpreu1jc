import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, SlideInDown, FadeInDown } from 'react-native-reanimated';
import { Brain, Timer, Target, Calculator, Plus, Minus, X as Multiply, Divide } from 'lucide-react-native';
import { Button } from '../ui/button';

const { width } = Dimensions.get('window');

type Operation = '+' | '-' | '×' | '÷';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  options: number[];
}

const generateQuestion = (difficulty: Difficulty): Question => {
  let num1: number, num2: number, answer: number;
  const operation: Operation = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)];

  switch (difficulty) {
    case 'easy':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      break;
    case 'medium':
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 10) + 1;
      break;
    case 'hard':
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * 20) + 10;
      break;
  }

  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '×':
      answer = num1 * num2;
      break;
    case '÷':
      // Ensure division results in whole numbers
      answer = num2;
      num1 = num2 * (Math.floor(Math.random() * 10) + 1);
      answer = num1 / num2;
      break;
  }

  // Generate wrong options
  const options = [answer];
  while (options.length < 4) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrongAnswer = answer + offset;
    if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
      options.push(wrongAnswer);
    }
  }

  return {
    num1,
    num2,
    operation,
    answer,
    options: options.sort(() => Math.random() - 0.5),
  };
};

export function MathBlitzGame() {
  const [phase, setPhase] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (phase === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (phase === 'playing' && timeLeft === 0) {
      setPhase('end');
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, phase]);

  const handleStart = (selectedDifficulty: Difficulty) => {
    setPhase('playing');
    setScore(0);
    setTimeLeft(60);
    setStreak(0);
    setBestStreak(0);
    setDifficulty(selectedDifficulty);
    setCurrentQuestion(generateQuestion(selectedDifficulty));
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (!currentQuestion) return;

    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        setBestStreak((best) => Math.max(best, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setCurrentQuestion(generateQuestion(difficulty));
  };

  const getOperationIcon = (operation: Operation) => {
    switch (operation) {
      case '+': return <Plus size={32} color="#ffffff" />;
      case '-': return <Minus size={32} color="#ffffff" />;
      case '×': return <Multiply size={32} color="#ffffff" />;
      case '÷': return <Divide size={32} color="#ffffff" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#845ec2', '#a178df']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Calculator size={48} color="#ffffff" />
          </View>
          <Text style={styles.title}>Math Blitz</Text>

          {phase === 'start' && (
            <Animated.View 
              entering={SlideInDown.duration(1000)}
              style={styles.startContainer}
            >
              <Text style={styles.description}>
                Test your mental math skills with quick calculations! Choose your difficulty level:
              </Text>
              
              <View style={styles.difficultyContainer}>
                <TouchableOpacity
                  style={[styles.difficultyButton, { backgroundColor: '#00cc88' }]}
                  onPress={() => handleStart('easy')}
                >
                  <Text style={styles.difficultyTitle}>Easy</Text>
                  <Text style={styles.difficultyDesc}>Simple calculations</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.difficultyButton, { backgroundColor: '#0088ff' }]}
                  onPress={() => handleStart('medium')}
                >
                  <Text style={styles.difficultyTitle}>Medium</Text>
                  <Text style={styles.difficultyDesc}>Bigger numbers</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.difficultyButton, { backgroundColor: '#ff6b6b' }]}
                  onPress={() => handleStart('hard')}
                >
                  <Text style={styles.difficultyTitle}>Hard</Text>
                  <Text style={styles.difficultyDesc}>Complex problems</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {phase === 'playing' && currentQuestion && (
            <Animated.View entering={FadeIn}>
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Timer size={20} color="#ffffff" />
                  <Text style={styles.statText}>{timeLeft}s</Text>
                </View>
                <View style={styles.statBox}>
                  <Target size={20} color="#ffffff" />
                  <Text style={styles.statText}>{score}</Text>
                </View>
                <View style={styles.statBox}>
                  <Brain size={20} color="#ffffff" />
                  <Text style={styles.statText}>{streak}</Text>
                </View>
              </View>

              <View style={styles.questionContainer}>
                <Animated.View 
                  entering={FadeInDown}
                  style={styles.equation}
                >
                  <Text style={styles.number}>{currentQuestion.num1}</Text>
                  <View style={styles.operationContainer}>
                    {getOperationIcon(currentQuestion.operation)}
                  </View>
                  <Text style={styles.number}>{currentQuestion.num2}</Text>
                </Animated.View>

                <View style={styles.optionsGrid}>
                  {currentQuestion.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionButton}
                      onPress={() => handleAnswer(option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Animated.View>
          )}

          {phase === 'end' && (
            <Animated.View 
              entering={FadeIn}
              style={styles.gameOverContainer}
            >
              <Text style={styles.gameOverTitle}>Time's Up!</Text>
              <View style={styles.resultsContainer}>
                <View style={styles.resultItem}>
                  <Target size={32} color="#ffffff" />
                  <Text style={styles.resultLabel}>Final Score</Text>
                  <Text style={styles.resultValue}>{score}</Text>
                </View>
                <View style={styles.resultItem}>
                  <Brain size={32} color="#ffffff" />
                  <Text style={styles.resultLabel}>Best Streak</Text>
                  <Text style={styles.resultValue}>{bestStreak}</Text>
                </View>
              </View>
              <Button onPress={() => handleStart(difficulty)} style={styles.restartButton}>
                Play Again
              </Button>
            </Animated.View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  startContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  difficultyContainer: {
    width: '100%',
    gap: 16,
  },
  difficultyButton: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  difficultyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  difficultyDesc: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  statBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  statText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  questionContainer: {
    alignItems: 'center',
  },
  equation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 20,
  },
  number: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginHorizontal: 20,
  },
  operationContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  optionButton: {
    width: width * 0.4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 32,
  },
  resultsContainer: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 40,
  },
  resultItem: {
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  restartButton: {
    backgroundColor: '#ffffff',
    width: '100%',
  },
});