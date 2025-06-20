package com.fitness.tracker.repository;

import com.fitness.tracker.model.User;
import com.fitness.tracker.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUser(User user);
}
