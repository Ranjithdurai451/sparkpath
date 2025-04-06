import express from 'express';
import cors from 'cors';
import {
  conversations,
  fetchLegalComplianceData,
  fetchLegalChecklistItems,
  generateRoadmapTaskGuidance,
  generateStartupRoadmap,
  generateSWOTAnalysis,
  processQuestion,
  getFailurePrediction,
} from './lib/utils.js';
import axios from 'axios';
import { createClient } from 'redis';
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
  })
);

// Initialize Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || '',
});

// Setup Redis error handling
redisClient.on('error', (err) => console.log('[Redis] Connection Error:', err));
redisClient.on('connect', () => console.log('[Redis] Connected successfully'));

// Redis cache helper function
const getCachedData = async (key, fetchFunction, ttl = 3600) => {
  try {
    // Check if data exists in cache
    const cachedData = await redis.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // If not in cache, fetch data and store in cache
    const data = await fetchFunction();

    // Store data in cache
    await redis.set(key, JSON.stringify(data), 'EX', ttl);

    return data;
  } catch (error) {
    console.error(`Redis cache error for key ${key}:`, error);
    // Fallback to original function if caching fails
    return fetchFunction();
  }
};

app.get('/api', (req, res) => {
  res.send('SparkPath Server Started');
});

// Endpoint to generate a startup roadmap
app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const cacheKey = `roadmap:${JSON.stringify(req.body)}`;

    const roadmapData = await getCachedData(
      cacheKey,
      async () => generateStartupRoadmap(req.body),
      // Roadmap data can be cached for 24 hours
      86400
    );

    return res.json({
      success: true,
      roadmap: roadmapData,
    });
  } catch (error) {
    console.error('Roadmap Generation Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate roadmap',
      error: error.message,
    });
  }
});

// Endpoint to generate roadmap task details
app.post('/api/task-guidance', async (req, res) => {
  try {
    const { taskTitle, formData } = req.body;
    if (!taskTitle || !formData) {
      return res.status(400).json({
        success: false,
        message: 'Task title and form data are required.',
      });
    }

    const cacheKey = `taskGuidance:${taskTitle}:${JSON.stringify(formData)}`;

    const taskGuidance = await getCachedData(
      cacheKey,
      async () => generateRoadmapTaskGuidance(taskTitle, formData),
      // Task guidance can be cached for 12 hours
      43200
    );

    return res.json({ success: true, data: taskGuidance });
  } catch (error) {
    console.error('Task Guidance API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate task guidance',
      error: error.message,
    });
  }
});

app.post('/api/failure-prediction', async (req, res) => {
  try {
    const { industry, budget, teamSize, marketSize, country } = req.body;
    const cacheKey = `failurePrediction:${industry}:${budget}:${teamSize}:${marketSize}:${country}`;

    const result = await getCachedData(
      cacheKey,
      async () =>
        getFailurePrediction(industry, budget, teamSize, marketSize, country),
      // Failure prediction can be cached for longer periods as it's less likely to change
      172800 // 48 hours
    );

    return res.json(result);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

app.post('/api/swot-analysis', async (req, res) => {
  try {
    const { startupData } = req.body;

    if (!startupData) {
      return res.status(400).json({
        error: 'Startup profile data is required',
      });
    }

    const cacheKey = `swot:${JSON.stringify(startupData)}`;

    const analysis = await getCachedData(
      cacheKey,
      async () => generateSWOTAnalysis(startupData),
      86400 // 24 hours
    );

    return res.json(analysis);
  } catch (error) {
    return res.status(500).json({
      error: 'An error occurred while generating the analysis',
      details: error.message,
    });
  }
});

app.post('/api/checklist', async (req, res) => {
  const {
    industry,
    budget,
    teamSize,
    targetMarket,
    country,
    region,
    problemStatement,
    targetCustomer,
    uniqueValueProposition,
  } = req.body;

  if (!country || !region) {
    return res.status(400).json({ error: 'Country and region are required' });
  }

  try {
    const cacheKey = `checklist:${country}:${region}:${industry}:${budget}:${teamSize}:${targetMarket}`;

    const items = await getCachedData(
      cacheKey,
      async () =>
        fetchLegalChecklistItems(
          country,
          region,
          industry,
          budget,
          teamSize,
          targetMarket,
          problemStatement,
          targetCustomer,
          uniqueValueProposition
        ),
      86400 // 24 hours - legal requirements don't change very often
    );

    return res.json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/checklist/:itemId/details', async (req, res) => {
  const { itemId } = req.params;
  const {
    country,
    region,
    industry,
    budget,
    teamSize,
    targetMarket,
    problemStatement,
    targetCustomer,
    uniqueValueProposition,
  } = req.body;

  if (!country || !region) {
    return res.status(400).json({ error: 'Country and region are required' });
  }

  try {
    const cacheKey = `checklistDetails:${itemId}:${country}:${region}:${industry}`;

    const complianceData = await getCachedData(
      cacheKey,
      async () =>
        fetchLegalComplianceData(
          itemId,
          country,
          region,
          industry,
          budget,
          teamSize,
          targetMarket,
          problemStatement,
          targetCustomer,
          uniqueValueProposition
        ),
      86400 // 24 hours
    );

    return res.json(complianceData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint to process a question and get mentor advice
app.post('/api/mentor/ask', async (req, res) => {
  try {
    const { sessionId, message, formData } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({
        error: 'Session ID and message are required',
      });
    }

    // Don't cache conversation responses as they're contextual and should be fresh
    const response = await processQuestion(sessionId, message, formData);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({
      error: 'An error occurred while processing your question',
      details: error.message,
    });
  }
});

// Endpoint to get suggested starter questions
app.get('/api/mentor/suggested-questions', async (req, res) => {
  try {
    const cacheKey = 'suggestedQuestions';

    const suggestedQuestions = await getCachedData(
      cacheKey,
      async () => [
        'How do I find my first customers?',
        'When should I hire my first employee?',
        'How much equity should I give to co-founders?',
        'What metrics should I focus on in my first year?',
        'How do I create an effective pitch deck?',
        "What's the best way to approach investors?",
        'How do I know if my startup idea is viable?',
        'What legal structure is best for my startup?',
        'How should I price my product or service?',
        'What are the most common mistakes first-time founders make?',
      ],
      604800 // 7 days - these questions rarely change
    );

    return res.json({ questions: suggestedQuestions });
  } catch (error) {
    return res.status(500).json({
      error: 'An error occurred',
      details: error.message,
    });
  }
});

// Endpoint to reset a conversation - no caching needed
app.post('/api/mentor/reset', (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Clear conversation history
    conversations[sessionId] = [];

    // Also clear any Redis keys related to this session
    redis.keys(`conversation:${sessionId}:*`).then((keys) => {
      if (keys.length > 0) {
        redis.del(keys);
      }
    });

    return res.json({
      success: true,
      message: 'Conversation reset successfully',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'An error occurred',
      details: error.message,
    });
  }
});

const PORT = 4000;
app.listen(PORT, async () => {
  try {
    const res = axios.get(`${process.env.PYTHON_SERVER_URL}/api`);
  } catch (error) {
    console.log('Python server is not running');
  }
  console.log(`Server running on port ${PORT}`);
});
