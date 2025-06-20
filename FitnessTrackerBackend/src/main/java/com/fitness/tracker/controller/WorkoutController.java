package com.fitness.tracker.controller;

import com.fitness.tracker.model.Workout;
import com.fitness.tracker.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "*") // Enable if you're calling from frontend like React
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    // POST: Add a workout for a specific user
    @PostMapping("/user/{userId}")
    public ResponseEntity<Workout> createWorkout(@PathVariable Long userId, @RequestBody Workout workout) {
        return ResponseEntity.ok(workoutService.createWorkout(userId, workout));
    }

    // GET: Get all workouts for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Workout>> getUserWorkouts(@PathVariable Long userId) {
        return ResponseEntity.ok(workoutService.getWorkouts(userId));
    }

    // PUT: Update a workout
    @PutMapping("/{workoutId}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable Long workoutId, @RequestBody Workout workout) {
        return ResponseEntity.ok(workoutService.updateWorkout(workoutId, workout));
    }

    // DELETE: Delete a workout
    @DeleteMapping("/{workoutId}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long workoutId) {
        workoutService.deleteWorkout(workoutId);
        return ResponseEntity.noContent().build();
    }
}
