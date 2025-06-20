package com.fitness.tracker.service;

import com.fitness.tracker.model.User;
import com.fitness.tracker.model.Workout;
import com.fitness.tracker.repository.UserRepository;
import com.fitness.tracker.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserRepository userRepository;

    public Workout createWorkout(Long userId, Workout workout) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            workout.setUser(optionalUser.get());
            return workoutRepository.save(workout);
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    public Workout updateWorkout(Long workoutId, Workout workoutDetails) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found with ID: " + workoutId));

        workout.setType(workoutDetails.getType());
        workout.setDescription(workoutDetails.getDescription());
        workout.setDuration(workoutDetails.getDuration());
        workout.setCalories(workoutDetails.getCalories());
        workout.setWorkoutDate(workoutDetails.getWorkoutDate());

        return workoutRepository.save(workout);
    }

    public List<Workout> getWorkouts(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        return workoutRepository.findByUser(user);
    }

    public void deleteWorkout(Long workoutId) {
        workoutRepository.deleteById(workoutId);
    }
}
