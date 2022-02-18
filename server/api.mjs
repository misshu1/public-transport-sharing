import express from 'express';
import fetch from 'node-fetch';
import { db } from './db.mjs';

const router = express.Router();

// Get single experience
router.get('/experiences/:experienceId', async (req, res, next) => {
    const { experienceId } = req.params;
    const experience = await db
        .then((experiences) => experiences.findOne({ experienceId }))
        .catch((error) => next(error));

    res.send(experience);
});

// Get all experiences for a specific query
router.get('/experiences', async (req, res, next) => {
    const { query } = req.query;

    const experiences = await db
        .then((experiences) =>
            experiences
                .find(
                    query && {
                        $or: [
                            { startLocation: query },
                            { transportType: query },
                            { endLocation: query }
                        ]
                    }
                )
                .toArray()
        )
        .catch((error) => next(error));

    res.send(experiences);
});

// Update experience
router.put('/experiences/:experienceId', async (req, res, next) => {
    const { experienceId } = req.params;
    const experienceData = req.body;

    delete experienceData._id; // Mongo don't let us update this field

    try {
        const experience = await db.then((experiences) => {
            return experiences.findOneAndUpdate(
                { experienceId },
                { $set: experienceData },
                { returnOriginal: false, upsert: true }
            );
        });

        res.send(experience.value);
    } catch (error) {
        next(error);
    }
});

// Add experience
router.post('/experiences/:experienceId', async (req, res, next) => {
    const { experienceId } = req.params;
    const experienceData = req.body;

    try {
        const experience = await db.then((experiences) =>
            experiences.insertOne({ experienceId, ...experienceData })
        );

        res.send(experience);
    } catch (error) {
        next(error);
    }
});

// Delete experience
router.delete('/experiences/:experienceId', async (req, res, next) => {
    const { experienceId } = req.params;

    try {
        const experience = await db.then((experiences) =>
            experiences.findOne({ experienceId })
        );

        const response = await db.then((experiences) =>
            experiences.deleteOne({ _id: experience._id })
        );

        res.send(response);
    } catch (error) {
        next(error);
    }
});

export { router };
