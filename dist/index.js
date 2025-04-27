var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  curriculumTracks: () => curriculumTracks,
  curriculumTracksRelations: () => curriculumTracksRelations,
  dictionaryEntries: () => dictionaryEntries,
  exerciseAttempts: () => exerciseAttempts,
  exerciseAttemptsRelations: () => exerciseAttemptsRelations,
  exercises: () => exercises,
  exercisesRelations: () => exercisesRelations,
  importJobs: () => importJobs,
  insertCurriculumTrackSchema: () => insertCurriculumTrackSchema,
  insertDictionaryEntrySchema: () => insertDictionaryEntrySchema,
  insertExerciseAttemptSchema: () => insertExerciseAttemptSchema,
  insertExerciseSchema: () => insertExerciseSchema,
  insertImportJobSchema: () => insertImportJobSchema,
  insertLearningSentenceSchema: () => insertLearningSentenceSchema,
  insertLessonSchema: () => insertLessonSchema,
  insertLessonSentenceSchema: () => insertLessonSentenceSchema,
  insertSystemLogSchema: () => insertSystemLogSchema,
  insertUserLessonProgressSchema: () => insertUserLessonProgressSchema,
  insertUserSchema: () => insertUserSchema,
  learningSentences: () => learningSentences,
  learningSentencesRelations: () => learningSentencesRelations,
  lessonSentences: () => lessonSentences,
  lessonSentencesRelations: () => lessonSentencesRelations,
  lessons: () => lessons,
  lessonsRelations: () => lessonsRelations,
  systemLogs: () => systemLogs,
  userLessonProgress: () => userLessonProgress,
  userLessonProgressRelations: () => userLessonProgressRelations,
  userProgress: () => userProgress,
  users: () => users,
  usersRelations: () => usersRelations
});
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var users, insertUserSchema, userProgress, dictionaryEntries, insertDictionaryEntrySchema, learningSentences, insertLearningSentenceSchema, exercises, insertExerciseSchema, exerciseAttempts, insertExerciseAttemptSchema, importJobs, insertImportJobSchema, systemLogs, insertSystemLogSchema, usersRelations, learningSentencesRelations, exercisesRelations, exerciseAttemptsRelations, curriculumTracks, insertCurriculumTrackSchema, lessons, insertLessonSchema, lessonSentences, insertLessonSentenceSchema, userLessonProgress, insertUserLessonProgressSchema, curriculumTracksRelations, lessonsRelations, lessonSentencesRelations, userLessonProgressRelations;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      username: text("username").notNull().unique(),
      password: text("password").notNull(),
      preferBritishEnglish: boolean("prefer_british_english").default(true),
      learningLevel: text("learning_level").default("beginner"),
      // 'beginner', 'intermediate', 'advanced'
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertUserSchema = createInsertSchema(users).pick({
      username: true,
      password: true,
      preferBritishEnglish: true,
      learningLevel: true
    });
    userProgress = pgTable("user_progress", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull(),
      wordsLearned: integer("words_learned").default(0),
      lessonsCompleted: integer("lessons_completed").default(0),
      averageScore: integer("average_score").default(0),
      // 0-100
      lastActive: timestamp("last_active").defaultNow().notNull(),
      strengths: text("strengths").array(),
      // Areas of strength
      weaknesses: text("weaknesses").array()
      // Areas for improvement
    });
    dictionaryEntries = pgTable("dictionary_entries", {
      id: serial("id").primaryKey(),
      sourceWord: text("source_word").notNull(),
      translation: text("translation").notNull(),
      sourceLanguage: text("source_language").notNull(),
      // 'en' or 'es'
      targetLanguage: text("target_language").notNull(),
      // 'en' or 'es'
      examples: text("examples").array(),
      // Optional examples of usage
      ukPronunciation: text("uk_pronunciation"),
      // IPA for British English
      usPronunciation: text("us_pronunciation"),
      // IPA for American English
      partOfSpeech: text("part_of_speech"),
      // noun, verb, adjective, etc.
      difficulty: text("difficulty").default("medium"),
      // easy, medium, hard
      tags: text("tags").array(),
      // For categorization (e.g., "food", "travel")
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertDictionaryEntrySchema = createInsertSchema(dictionaryEntries).omit({
      id: true,
      createdAt: true
    });
    learningSentences = pgTable("learning_sentences", {
      id: serial("id").primaryKey(),
      spanishText: text("spanish_text").notNull(),
      englishText: text("english_text").notNull(),
      difficulty: text("difficulty").notNull(),
      // 'beginner', 'intermediate', 'advanced'
      topic: text("topic"),
      // 'greetings', 'food', 'travel', etc.
      grammarFocus: text("grammar_focus"),
      // specific grammar point this sentence demonstrates
      wordByWordData: jsonb("word_by_word_data"),
      // JSON with word-by-word translation and pronunciation
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertLearningSentenceSchema = createInsertSchema(learningSentences).omit({
      id: true,
      createdAt: true
    });
    exercises = pgTable("exercises", {
      id: serial("id").primaryKey(),
      type: text("type").notNull(),
      // 'fill-in-blank', 'reordering', 'vocabulary', 'multiple-choice'
      sentenceId: integer("sentence_id"),
      // Optional reference to a learning sentence
      question: text("question").notNull(),
      options: text("options").array(),
      correctAnswer: text("correct_answer").notNull(),
      explanation: text("explanation"),
      difficulty: text("difficulty").notNull(),
      // 'beginner', 'intermediate', 'advanced'
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertExerciseSchema = createInsertSchema(exercises).omit({
      id: true,
      createdAt: true
    });
    exerciseAttempts = pgTable("exercise_attempts", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull(),
      exerciseId: integer("exercise_id").notNull(),
      userAnswer: text("user_answer").notNull(),
      isCorrect: boolean("is_correct").notNull(),
      feedback: text("feedback"),
      attemptedAt: timestamp("attempted_at").defaultNow().notNull()
    });
    insertExerciseAttemptSchema = createInsertSchema(exerciseAttempts).omit({
      id: true,
      attemptedAt: true
    });
    importJobs = pgTable("import_jobs", {
      id: serial("id").primaryKey(),
      source: text("source").notNull(),
      // URL or file path
      status: text("status").notNull(),
      // 'pending', 'in_progress', 'completed', 'failed'
      totalEntries: integer("total_entries"),
      // Total number of entries
      processedEntries: integer("processed_entries").default(0),
      // Number of processed entries
      bidirectional: boolean("bidirectional").default(true),
      // Whether to create bidirectional entries
      replace: boolean("replace").default(false),
      // Whether to replace existing entries
      error: text("error"),
      // Error message if failed
      startedAt: timestamp("started_at").defaultNow().notNull(),
      completedAt: timestamp("completed_at")
      // When the import was completed
    });
    insertImportJobSchema = createInsertSchema(importJobs).omit({
      id: true,
      processedEntries: true,
      error: true,
      startedAt: true,
      completedAt: true
    });
    systemLogs = pgTable("system_logs", {
      id: serial("id").primaryKey(),
      level: text("level").notNull(),
      // 'info', 'warn', 'error'
      message: text("message").notNull(),
      timestamp: timestamp("timestamp").defaultNow().notNull()
    });
    insertSystemLogSchema = createInsertSchema(systemLogs).omit({
      id: true,
      timestamp: true
    });
    usersRelations = relations(users, ({ many }) => ({
      progress: many(userProgress),
      exerciseAttempts: many(exerciseAttempts)
    }));
    learningSentencesRelations = relations(learningSentences, ({ many }) => ({
      exercises: many(exercises)
    }));
    exercisesRelations = relations(exercises, ({ one, many }) => ({
      sentence: one(learningSentences, {
        fields: [exercises.sentenceId],
        references: [learningSentences.id]
      }),
      attempts: many(exerciseAttempts)
    }));
    exerciseAttemptsRelations = relations(exerciseAttempts, ({ one }) => ({
      exercise: one(exercises, {
        fields: [exerciseAttempts.exerciseId],
        references: [exercises.id]
      }),
      user: one(users, {
        fields: [exerciseAttempts.userId],
        references: [users.id]
      })
    }));
    curriculumTracks = pgTable("curriculum_tracks", {
      id: serial("id").primaryKey(),
      code: text("code").notNull().unique(),
      // e.g., "survival-spanish"
      title: text("title").notNull(),
      description: text("description"),
      cefrLevel: text("cefr_level").notNull(),
      // A1, A2, B1, B2, C1, C2
      totalLessons: integer("total_lessons").default(0),
      iconName: text("icon_name"),
      // For UI display
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertCurriculumTrackSchema = createInsertSchema(curriculumTracks).omit({
      id: true,
      createdAt: true
    });
    lessons = pgTable("lessons", {
      id: serial("id").primaryKey(),
      trackId: integer("track_id").notNull(),
      lessonNumber: integer("lesson_number").notNull(),
      title: text("title").notNull(),
      description: text("description"),
      grammarFocus: text("grammar_focus"),
      vocabularyFocus: text("vocabulary_focus"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertLessonSchema = createInsertSchema(lessons).omit({
      id: true,
      createdAt: true
    });
    lessonSentences = pgTable("lesson_sentences", {
      id: serial("id").primaryKey(),
      lessonId: integer("lesson_id").notNull(),
      sentenceId: integer("sentence_id").notNull(),
      orderIndex: integer("order_index").notNull(),
      // Order within lesson
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertLessonSentenceSchema = createInsertSchema(lessonSentences).omit({
      id: true,
      createdAt: true
    });
    userLessonProgress = pgTable("user_lesson_progress", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull(),
      lessonId: integer("lesson_id").notNull(),
      completed: boolean("completed").default(false),
      progress: integer("progress").default(0),
      // percentage completed
      lastAccessedAt: timestamp("last_accessed_at").defaultNow().notNull()
    });
    insertUserLessonProgressSchema = createInsertSchema(userLessonProgress).omit({
      id: true,
      lastAccessedAt: true
    });
    curriculumTracksRelations = relations(curriculumTracks, ({ many }) => ({
      lessons: many(lessons)
    }));
    lessonsRelations = relations(lessons, ({ one, many }) => ({
      track: one(curriculumTracks, {
        fields: [lessons.trackId],
        references: [curriculumTracks.id]
      }),
      lessonSentences: many(lessonSentences),
      userProgress: many(userLessonProgress)
    }));
    lessonSentencesRelations = relations(lessonSentences, ({ one }) => ({
      lesson: one(lessons, {
        fields: [lessonSentences.lessonId],
        references: [lessons.id]
      }),
      sentence: one(learningSentences, {
        fields: [lessonSentences.sentenceId],
        references: [learningSentences.id]
      })
    }));
    userLessonProgressRelations = relations(userLessonProgress, ({ one }) => ({
      user: one(users, {
        fields: [userLessonProgress.userId],
        references: [users.id]
      }),
      lesson: one(lessons, {
        fields: [userLessonProgress.lessonId],
        references: [lessons.id]
      })
    }));
  }
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
async function logSystemEvent(level, message) {
  try {
    const [log2] = await db.insert(systemLogs).values({
      level,
      message,
      timestamp: /* @__PURE__ */ new Date()
    }).returning({ id: systemLogs.id, timestamp: systemLogs.timestamp });
    return log2;
  } catch (error) {
    console.error("Failed to log system event to database:", error);
    console.log(`SYSTEM ${level.toUpperCase()}: ${message}`);
    return {
      id: -1,
      timestamp: /* @__PURE__ */ new Date()
    };
  }
}
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema: schema_exports });
  }
});

// server/storage-curriculum.ts
var storage_curriculum_exports = {};
__export(storage_curriculum_exports, {
  addSentenceToLesson: () => addSentenceToLesson,
  countLessons: () => countLessons,
  createCurriculumTrack: () => createCurriculumTrack,
  createLesson: () => createLesson,
  getCurriculumTrack: () => getCurriculumTrack,
  getCurriculumTrackByCode: () => getCurriculumTrackByCode,
  getCurriculumTracks: () => getCurriculumTracks,
  getLesson: () => getLesson,
  getLessonByTrackAndNumber: () => getLessonByTrackAndNumber,
  getLessonSentences: () => getLessonSentences,
  getLessons: () => getLessons,
  getMaxLessonNumber: () => getMaxLessonNumber,
  getUserCompletedLessons: () => getUserCompletedLessons,
  getUserLessonProgress: () => getUserLessonProgress,
  removeSentenceFromLesson: () => removeSentenceFromLesson,
  reorderLessonSentence: () => reorderLessonSentence,
  updateCurriculumTrack: () => updateCurriculumTrack,
  updateLesson: () => updateLesson,
  updateUserLessonProgress: () => updateUserLessonProgress
});
import { eq, and, sql, asc, inArray } from "drizzle-orm";
async function getCurriculumTracks() {
  return await db.select().from(curriculumTracks).orderBy(asc(curriculumTracks.cefrLevel));
}
async function getCurriculumTrack(id) {
  const [track] = await db.select().from(curriculumTracks).where(eq(curriculumTracks.id, id));
  return track;
}
async function getCurriculumTrackByCode(code) {
  const [track] = await db.select().from(curriculumTracks).where(eq(curriculumTracks.code, code));
  return track;
}
async function createCurriculumTrack(track) {
  const [result] = await db.insert(curriculumTracks).values(track).returning();
  await logSystemEvent("info", `Created curriculum track: ${track.title} (${track.cefrLevel})`);
  return result;
}
async function updateCurriculumTrack(id, updates) {
  const [result] = await db.update(curriculumTracks).set(updates).where(eq(curriculumTracks.id, id)).returning();
  return result;
}
async function getLessons(trackId) {
  return await db.select().from(lessons).where(eq(lessons.trackId, trackId)).orderBy(asc(lessons.lessonNumber));
}
async function getLesson(id) {
  const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
  return lesson;
}
async function getLessonByTrackAndNumber(trackId, lessonNumber) {
  const [lesson] = await db.select().from(lessons).where(and(eq(lessons.trackId, trackId), eq(lessons.lessonNumber, lessonNumber)));
  return lesson;
}
async function createLesson(lesson) {
  const [result] = await db.insert(lessons).values(lesson).returning();
  await logSystemEvent("info", `Created lesson: ${lesson.title} for track ID ${lesson.trackId}`);
  return result;
}
async function updateLesson(id, updates) {
  const [result] = await db.update(lessons).set(updates).where(eq(lessons.id, id)).returning();
  return result;
}
async function getMaxLessonNumber(trackId) {
  const [result] = await db.select({
    maxNumber: sql`MAX(${lessons.lessonNumber})`
  }).from(lessons).where(eq(lessons.trackId, trackId));
  return result?.maxNumber || 0;
}
async function countLessons(trackId) {
  const [result] = await db.select({
    count: sql`COUNT(*)`
  }).from(lessons).where(eq(lessons.trackId, trackId));
  return result?.count || 0;
}
async function addSentenceToLesson(lessonId, sentenceId, orderIndex) {
  const [result] = await db.insert(lessonSentences).values({
    lessonId,
    sentenceId,
    orderIndex
  }).returning();
  await logSystemEvent("info", `Added sentence ID ${sentenceId} to lesson ID ${lessonId} at position ${orderIndex}`);
  return result;
}
async function getLessonSentences(lessonId) {
  const results = await db.select({
    sentence: learningSentences,
    order: lessonSentences.orderIndex
  }).from(lessonSentences).innerJoin(learningSentences, eq(lessonSentences.sentenceId, learningSentences.id)).where(eq(lessonSentences.lessonId, lessonId)).orderBy(asc(lessonSentences.orderIndex));
  return results;
}
async function reorderLessonSentence(id, newOrderIndex) {
  const [result] = await db.update(lessonSentences).set({ orderIndex: newOrderIndex }).where(eq(lessonSentences.id, id)).returning();
  return result;
}
async function removeSentenceFromLesson(lessonId, sentenceId) {
  const result = await db.delete(lessonSentences).where(and(eq(lessonSentences.lessonId, lessonId), eq(lessonSentences.sentenceId, sentenceId))).returning({ id: lessonSentences.id });
  return result.length > 0;
}
async function getUserLessonProgress(userId, lessonId) {
  const [progress] = await db.select().from(userLessonProgress).where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.lessonId, lessonId)));
  return progress;
}
async function updateUserLessonProgress(userId, lessonId, progress, completed = false) {
  const existingProgress = await getUserLessonProgress(userId, lessonId);
  if (existingProgress) {
    const [updated] = await db.update(userLessonProgress).set({
      progress,
      completed: completed || progress >= 100,
      lastAccessedAt: /* @__PURE__ */ new Date()
    }).where(eq(userLessonProgress.id, existingProgress.id)).returning();
    return updated;
  } else {
    const [created] = await db.insert(userLessonProgress).values({
      userId,
      lessonId,
      progress,
      completed: completed || progress >= 100
    }).returning();
    return created;
  }
}
async function getUserCompletedLessons(userId, trackId) {
  let query = db.select({
    lessonId: userLessonProgress.lessonId
  }).from(userLessonProgress).where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.completed, true)));
  if (trackId) {
    const trackLessonIds = await db.select({
      id: lessons.id
    }).from(lessons).where(eq(lessons.trackId, trackId));
    const lessonIdList = trackLessonIds.map((l) => l.id);
    query = query.where(inArray(userLessonProgress.lessonId, lessonIdList));
  }
  const completedLessons = await query;
  return completedLessons.map((l) => l.lessonId);
}
var init_storage_curriculum = __esm({
  "server/storage-curriculum.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
init_schema();
init_db();
import { eq as eq2, and as and2, like, desc as desc2, sql as sql2 } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq2(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq2(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    await logSystemEvent("info", `User created: ${insertUser.username}`);
    return user;
  }
  async updateUser(id, updates) {
    const [updatedUser] = await db.update(users).set(updates).where(eq2(users.id, id)).returning();
    return updatedUser;
  }
  async getUserProgress(userId) {
    const [progress] = await db.select().from(userProgress).where(eq2(userProgress.userId, userId));
    if (!progress) {
      return this.updateUserProgress(userId, {
        wordsLearned: 0,
        lessonsCompleted: 0,
        averageScore: 0,
        strengths: [],
        weaknesses: []
      });
    }
    return progress;
  }
  async updateUserProgress(userId, updates) {
    const [existingProgress] = await db.select().from(userProgress).where(eq2(userProgress.userId, userId));
    if (existingProgress) {
      const [updated] = await db.update(userProgress).set(updates).where(eq2(userProgress.userId, userId)).returning();
      return updated;
    } else {
      const [created] = await db.insert(userProgress).values({
        userId,
        ...updates,
        lastActive: /* @__PURE__ */ new Date()
      }).returning();
      return created;
    }
  }
  // Dictionary methods
  async getDictionaryEntry(id) {
    const [entry] = await db.select().from(dictionaryEntries).where(eq2(dictionaryEntries.id, id));
    return entry || void 0;
  }
  async getDictionaryEntries(page = 1, limit = 10, filter) {
    const offset = (page - 1) * limit;
    let query = db.select().from(dictionaryEntries);
    if (filter) {
      if (filter === "en-es") {
        query = query.where(and2(eq2(dictionaryEntries.sourceLanguage, "en"), eq2(dictionaryEntries.targetLanguage, "es")));
      } else if (filter === "es-en") {
        query = query.where(and2(eq2(dictionaryEntries.sourceLanguage, "es"), eq2(dictionaryEntries.targetLanguage, "en")));
      }
    }
    const entries = await query.limit(limit).offset(offset).orderBy(dictionaryEntries.id);
    const [{ count }] = await db.select({ count: sql2`count(*)` }).from(dictionaryEntries).where(filter ? filter === "en-es" ? and2(eq2(dictionaryEntries.sourceLanguage, "en"), eq2(dictionaryEntries.targetLanguage, "es")) : and2(eq2(dictionaryEntries.sourceLanguage, "es"), eq2(dictionaryEntries.targetLanguage, "en")) : sql2`1=1`);
    return { entries, total: count };
  }
  async searchDictionary(term, sourceLang, targetLang) {
    return await db.select().from(dictionaryEntries).where(
      and2(
        eq2(dictionaryEntries.sourceLanguage, sourceLang),
        eq2(dictionaryEntries.targetLanguage, targetLang),
        like(dictionaryEntries.sourceWord, `%${term}%`)
      )
    ).limit(20);
  }
  async createDictionaryEntry(entry) {
    const [result] = await db.insert(dictionaryEntries).values(entry).returning();
    return result;
  }
  async createManyDictionaryEntries(entries) {
    if (entries.length === 0) return 0;
    const result = await db.insert(dictionaryEntries).values(entries).returning();
    return result.length;
  }
  async updateDictionaryEntry(id, entry) {
    const [result] = await db.update(dictionaryEntries).set(entry).where(eq2(dictionaryEntries.id, id)).returning();
    return result;
  }
  async deleteDictionaryEntry(id) {
    const result = await db.delete(dictionaryEntries).where(eq2(dictionaryEntries.id, id)).returning({ id: dictionaryEntries.id });
    return result.length > 0;
  }
  async deleteAllDictionaryEntries() {
    const result = await db.delete(dictionaryEntries).returning({ id: dictionaryEntries.id });
    await logSystemEvent("info", `Deleted all dictionary entries: ${result.length} entries removed`);
    return result.length;
  }
  async countDictionaryEntries() {
    const [totalResult] = await db.select({ count: sql2`count(*)` }).from(dictionaryEntries);
    const [enToEsResult] = await db.select({ count: sql2`count(*)` }).from(dictionaryEntries).where(and2(eq2(dictionaryEntries.sourceLanguage, "en"), eq2(dictionaryEntries.targetLanguage, "es")));
    const [esToEnResult] = await db.select({ count: sql2`count(*)` }).from(dictionaryEntries).where(and2(eq2(dictionaryEntries.sourceLanguage, "es"), eq2(dictionaryEntries.targetLanguage, "en")));
    return {
      total: totalResult.count,
      enToEs: enToEsResult.count,
      esToEn: esToEnResult.count
    };
  }
  // Import job methods
  async createImportJob(job) {
    const [result] = await db.insert(importJobs).values(job).returning();
    await logSystemEvent("info", `Import job created for source: ${job.source}`);
    return result;
  }
  async getImportJob(id) {
    const [job] = await db.select().from(importJobs).where(eq2(importJobs.id, id));
    return job;
  }
  async updateImportJob(id, updates) {
    const [result] = await db.update(importJobs).set(updates).where(eq2(importJobs.id, id)).returning();
    return result;
  }
  async getLatestImportJob() {
    const [job] = await db.select().from(importJobs).orderBy(desc2(importJobs.id)).limit(1);
    return job;
  }
  // Learning sentences methods
  async createLearningSentence(sentence) {
    const [result] = await db.insert(learningSentences).values(sentence).returning();
    await logSystemEvent("info", `Learning sentence created: "${sentence.spanishText}"`);
    return result;
  }
  async getLearningSentence(id) {
    const [sentence] = await db.select().from(learningSentences).where(eq2(learningSentences.id, id));
    return sentence;
  }
  async getLearningSentences(page = 1, limit = 10, filter) {
    const offset = (page - 1) * limit;
    let query = db.select().from(learningSentences);
    if (filter) {
      if (filter.difficulty) {
        query = query.where(eq2(learningSentences.difficulty, filter.difficulty));
      }
      if (filter.topic) {
        query = query.where(eq2(learningSentences.topic, filter.topic));
      }
      if (filter.grammarFocus) {
        query = query.where(eq2(learningSentences.grammarFocus, filter.grammarFocus));
      }
    }
    const sentences = await query.limit(limit).offset(offset).orderBy(desc2(learningSentences.id));
    let countQuery = db.select({ count: sql2`count(*)` }).from(learningSentences);
    if (filter) {
      if (filter.difficulty) {
        countQuery = countQuery.where(eq2(learningSentences.difficulty, filter.difficulty));
      }
      if (filter.topic) {
        countQuery = countQuery.where(eq2(learningSentences.topic, filter.topic));
      }
      if (filter.grammarFocus) {
        countQuery = countQuery.where(eq2(learningSentences.grammarFocus, filter.grammarFocus));
      }
    }
    const [{ count }] = await countQuery;
    return { sentences, total: count };
  }
  async updateLearningSentence(id, updates) {
    const [result] = await db.update(learningSentences).set(updates).where(eq2(learningSentences.id, id)).returning();
    return result;
  }
  async deleteLearningSentence(id) {
    const result = await db.delete(learningSentences).where(eq2(learningSentences.id, id)).returning({ id: learningSentences.id });
    return result.length > 0;
  }
  // Exercises methods
  async createExercise(exercise) {
    const [result] = await db.insert(exercises).values(exercise).returning();
    await logSystemEvent("info", `Exercise created: "${exercise.type}" for difficulty "${exercise.difficulty}"`);
    return result;
  }
  async getExercise(id) {
    const [exercise] = await db.select().from(exercises).where(eq2(exercises.id, id));
    return exercise;
  }
  async getExercises(page = 1, limit = 10, filter) {
    const offset = (page - 1) * limit;
    let query = db.select().from(exercises);
    if (filter) {
      if (filter.type) {
        query = query.where(eq2(exercises.type, filter.type));
      }
      if (filter.difficulty) {
        query = query.where(eq2(exercises.difficulty, filter.difficulty));
      }
      if (filter.sentenceId) {
        query = query.where(eq2(exercises.sentenceId, filter.sentenceId));
      }
    }
    const exercisesList = await query.limit(limit).offset(offset).orderBy(desc2(exercises.id));
    let countQuery = db.select({ count: sql2`count(*)` }).from(exercises);
    if (filter) {
      if (filter.type) {
        countQuery = countQuery.where(eq2(exercises.type, filter.type));
      }
      if (filter.difficulty) {
        countQuery = countQuery.where(eq2(exercises.difficulty, filter.difficulty));
      }
      if (filter.sentenceId) {
        countQuery = countQuery.where(eq2(exercises.sentenceId, filter.sentenceId));
      }
    }
    const [{ count }] = await countQuery;
    return { exercises: exercisesList, total: count };
  }
  async updateExercise(id, updates) {
    const [result] = await db.update(exercises).set(updates).where(eq2(exercises.id, id)).returning();
    return result;
  }
  async deleteExercise(id) {
    const result = await db.delete(exercises).where(eq2(exercises.id, id)).returning({ id: exercises.id });
    return result.length > 0;
  }
  // Exercise attempts methods
  async createExerciseAttempt(attempt) {
    const [result] = await db.insert(exerciseAttempts).values(attempt).returning();
    await this.updateUserProgressAfterExerciseAttempt(attempt.userId, attempt.isCorrect);
    return result;
  }
  async updateUserProgressAfterExerciseAttempt(userId, isCorrect) {
    const progress = await this.getUserProgress(userId);
    const totalAttempts = await db.select({ count: sql2`count(*)` }).from(exerciseAttempts).where(eq2(exerciseAttempts.userId, userId));
    const correctAttempts = await db.select({ count: sql2`count(*)` }).from(exerciseAttempts).where(and2(
      eq2(exerciseAttempts.userId, userId),
      eq2(exerciseAttempts.isCorrect, true)
    ));
    const newAverageScore = Math.round(correctAttempts[0].count / totalAttempts[0].count * 100);
    await this.updateUserProgress(userId, {
      averageScore: newAverageScore,
      lastActive: /* @__PURE__ */ new Date()
    });
  }
  async getUserExerciseAttempts(userId, limit = 50) {
    return await db.select().from(exerciseAttempts).where(eq2(exerciseAttempts.userId, userId)).orderBy(desc2(exerciseAttempts.attemptedAt)).limit(limit);
  }
  // System log methods
  async getSystemLogs(limit = 100) {
    return await db.select().from(systemLogs).orderBy(desc2(systemLogs.timestamp)).limit(limit);
  }
  // Curriculum track methods - import these from the separate file
  async getCurriculumTracks() {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.getCurriculumTracks());
  }
  async getCurriculumTrack(id) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.getCurriculumTrack(id));
  }
  async getCurriculumTrackByCode(code) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.getCurriculumTrackByCode(code));
  }
  async createCurriculumTrack(track) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.createCurriculumTrack(track));
  }
  async updateCurriculumTrack(id, updates) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.updateCurriculumTrack(id, updates));
  }
  // Lesson methods
  async getLessons(trackId) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.getLessons(trackId));
  }
  async getLesson(id) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.getLesson(id));
  }
  async getLessonByTrackAndNumber(trackId, lessonNumber) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.getLessonByTrackAndNumber(trackId, lessonNumber));
  }
  async createLesson(lesson) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.createLesson(lesson));
  }
  async updateLesson(id, updates) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.updateLesson(id, updates));
  }
  // Lesson sentences methods
  async addSentenceToLesson(lessonId, sentenceId, orderIndex) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.addSentenceToLesson(lessonId, sentenceId, orderIndex));
  }
  async getLessonSentences(lessonId) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.getLessonSentences(lessonId));
  }
  async reorderLessonSentence(id, newOrderIndex) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.reorderLessonSentence(id, newOrderIndex));
  }
  async removeSentenceFromLesson(lessonId, sentenceId) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.removeSentenceFromLesson(lessonId, sentenceId));
  }
  // User lesson progress methods
  async getUserLessonProgress(userId, lessonId) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.getUserLessonProgress(userId, lessonId));
  }
  async updateUserLessonProgress(userId, lessonId, progress, completed) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.updateUserLessonProgress(userId, lessonId, progress, completed));
  }
  async getUserCompletedLessons(userId, trackId) {
    return await Promise.resolve().then(() => (init_storage_curriculum(), storage_curriculum_exports)).then((m) => m.getUserCompletedLessons(userId, trackId));
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
init_schema();
init_db();
import { ZodError } from "zod";
import fetch from "node-fetch";

// server/learning-routes.ts
import { Router } from "express";
init_db();

// server/services/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
async function translateSpanishToEnglish(spanishText, preferBritishEnglish = true) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a professional Spanish-English translator. Translate the provided Spanish text into ${preferBritishEnglish ? "British" : "American"} English, ensuring the translation is natural, grammatically correct, and captures the nuances of the original text.`
        },
        {
          role: "user",
          content: spanishText
        }
      ]
    });
    return response.choices[0].message.content || spanishText;
  } catch (error) {
    console.error("Error in translateSpanishToEnglish:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to translate Spanish text: ${errorMessage}`);
  }
}
async function analyzeSpanishSentence(spanishText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a linguist specializing in Spanish language analysis with expertise in grammatical categorization. For the given Spanish sentence, provide:
          1. A high-quality English translation
          2. A rigorously accurate word-by-word analysis with precise part of speech tagging and proper English translations
          3. Detailed pronunciation guidance including IPA notation for both Spanish and English words
          4. Comprehensive grammar notes explaining the sentence structure
          5. Detailed conjugation information for verbs
          6. Grammatical gender, number and formality level for relevant words
          
          IMPORTANT PART OF SPEECH TAGGING RULES:
          - Use standard linguistic part of speech categories: noun, verb, adjective, adverb, pronoun, preposition, conjunction, determiner, interjection, article
          - Be extremely precise about assigning the correct part of speech
          - Pay close attention to context to determine the role of each word
          - For verbs, include their form (e.g., "verb (present)", "verb (conditional)", "verb (infinitive)", "verb (preterite)")
          - For compound forms, identify each component correctly
          - "si" (if/whether) is a conjunction, not an adverb
          - "m\xE1s" (more) is an adverb, not a noun
          - "tener" (to have) is a verb in infinitive form
          - "a" is typically a preposition, not an adverb
          - "para" is a preposition (meaning "for" or "in order to"), not an adverb
          
          PRONUNCIATION REQUIREMENTS:
          - Include IPA transcription for both Spanish and English versions of each word
          - Specify both UK and US pronunciation variants where they differ
          - For Spanish words, provide detailed guidance on regional pronunciation differences if relevant
          
          EXAMPLES AND GRAMMAR NOTES:
          - Provide at least one example sentence for each word showing its usage in a different context
          - Include specific grammar notes about how each word functions in the given sentence
          - For verbs, provide key conjugation forms (present, past, future, subjunctive as relevant)
          
          Format your response as valid JSON with the following structure:
          {
            "englishTranslation": "complete sentence translation",
            "words": [
              {
                "spanishWord": "word as it appears in text",
                "englishWord": "English translation of just this word",
                "lemma": "base form",
                "partOfSpeech": "precise part of speech with additional form info if applicable",
                "ukPronunciation": "British pronunciation guidance",
                "usPronunciation": "American pronunciation guidance",
                "ipaSpanish": "IPA transcription for Spanish pronunciation",
                "ipaEnglish": "IPA transcription for English pronunciation",
                "examples": [
                  {
                    "spanish": "Example sentence in Spanish",
                    "english": "Translation of example"
                  }
                ],
                "grammarNotes": "Specific notes about this word's grammatical function",
                "conjugations": [
                  {
                    "form": "present", 
                    "value": "conjugated form"
                  }
                ],
                "gender": "masculine/feminine/neuter if applicable",
                "number": "singular/plural if applicable",
                "formality": "formal/informal if applicable"
              }
            ],
            "grammar": "explanation of grammar structure",
            "structuralNotes": "detailed analysis of sentence construction"
          }`
        },
        {
          role: "user",
          content: spanishText
        }
      ],
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content || "{}";
    const result = JSON.parse(content);
    if (result.words && Array.isArray(result.words)) {
      result.words = result.words.map((word) => {
        const commonPrepositions = ["a", "de", "en", "con", "por", "para", "sin", "sobre", "hasta", "desde", "entre", "hacia"];
        const commonConjunctions = ["y", "o", "pero", "si", "porque", "aunque", "cuando", "como", "que", "pues", "sino"];
        const commonDeterminers = ["el", "la", "los", "las", "un", "una", "unos", "unas", "este", "esta", "estos", "estas", "ese", "esa", "esos", "esas"];
        if (commonPrepositions.includes(word.spanishWord.toLowerCase()) && !word.partOfSpeech.includes("preposition")) {
          word.partOfSpeech = "preposition";
        } else if (commonConjunctions.includes(word.spanishWord.toLowerCase()) && !word.partOfSpeech.includes("conjunction")) {
          word.partOfSpeech = "conjunction";
        } else if (commonDeterminers.includes(word.spanishWord.toLowerCase()) && !word.partOfSpeech.includes("determiner") && !word.partOfSpeech.includes("article")) {
          word.partOfSpeech = "determiner";
        }
        if ((word.spanishWord.endsWith("ar") || word.spanishWord.endsWith("er") || word.spanishWord.endsWith("ir")) && word.spanishWord.length > 2) {
          if (!word.partOfSpeech.includes("verb")) {
            word.partOfSpeech = "verb (infinitive)";
          }
        }
        if (word.spanishWord.toLowerCase() === "si" && word.englishWord.toLowerCase() !== "if") {
          word.englishWord = "if";
        }
        if (word.spanishWord.toLowerCase() === "m\xE1s" && word.englishWord.toLowerCase() !== "more") {
          word.englishWord = "more";
        }
        if (word.spanishWord.toLowerCase() === "tiempo" && word.englishWord.toLowerCase() !== "time") {
          word.englishWord = "time";
        }
        if (word.spanishWord.toLowerCase() === "libre" && word.partOfSpeech.includes("adjective") && word.englishWord.toLowerCase() !== "free") {
          word.englishWord = "free";
        }
        if (!word.ipaSpanish) {
          word.ipaSpanish = "";
        }
        if (!word.ipaEnglish) {
          word.ipaEnglish = "";
        }
        if (!word.examples || !Array.isArray(word.examples)) {
          word.examples = [];
        }
        return word;
      });
    }
    return result;
  } catch (error) {
    console.error("Error in analyzeSpanishSentence:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to analyze Spanish sentence: ${errorMessage}`);
  }
}
async function generateExercises(spanishText, exerciseType = "mixed") {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a professional Spanish language educator. Generate interactive exercises based on the provided Spanish text.
          
          ${exerciseType === "multiple_choice" ? "Generate only multiple-choice questions with 4 options each." : exerciseType === "fill_blank" ? "Generate only fill-in-the-blank exercises." : "Generate a mix of multiple-choice questions with 4 options each and fill-in-the-blank exercises."}
          
          Format your response as valid JSON with the following structure:
          {
            "exercises": [
              {
                "type": "multiple_choice or fill_blank",
                "question": "The exercise question",
                "options": ["option1", "option2", "option3", "option4"],  // Include only for multiple_choice
                "correctAnswer": "the correct answer",
                "explanation": "Explanation of why this is correct and the learning opportunity"
              }
            ]
          }`
        },
        {
          role: "user",
          content: spanishText
        }
      ],
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content || "{}";
    const result = JSON.parse(content);
    return result;
  } catch (error) {
    console.error("Error in generateExercises:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to generate exercises: ${errorMessage}`);
  }
}
async function provideFeedback(userText, correctText, isTranslation = false) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a supportive and encouraging Spanish language tutor. Provide constructive feedback on the user's ${isTranslation ? "translation attempt" : "Spanish text"}.
          
          Compare the user's response with the correct version and highlight:
          - What they did well
          - Specific areas for improvement 
          - Score their attempt on a scale of 1-100
          
          Format your response as valid JSON with the following structure:
          {
            "feedback": "detailed, encouraging and specific feedback",
            "score": 85,  // a number between 1-100
            "improvements": ["specific point 1", "specific point 2"]
          }`
        },
        {
          role: "user",
          content: `User's response: "${userText}"
          Correct response: "${correctText}"`
        }
      ],
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content || "{}";
    const result = JSON.parse(content);
    return result;
  } catch (error) {
    console.error("Error in provideFeedback:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to provide feedback: ${errorMessage}`);
  }
}

// server/learning-routes.ts
var learningRouter = Router();
var handleError = (res, error) => {
  console.error("API Error:", error);
  const message = error instanceof Error ? error.message : String(error);
  res.status(500).json({ message });
};
learningRouter.get("/sentences", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = {};
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.topic) filter.topic = req.query.topic;
    if (req.query.grammarFocus) filter.grammarFocus = req.query.grammarFocus;
    const { sentences, total } = await storage.getLearningSentences(page, limit, Object.keys(filter).length > 0 ? filter : void 0);
    res.json({ sentences, total, page, limit });
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.get("/sentences/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sentence = await storage.getLearningSentence(id);
    if (!sentence) {
      return res.status(404).json({ message: "Sentence not found" });
    }
    res.json(sentence);
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.post("/sentences", async (req, res) => {
  try {
    const { spanishText, englishText, difficulty, topic, grammarFocus } = req.body;
    if (!spanishText || !englishText || !difficulty) {
      return res.status(400).json({ message: "Spanish text, English text, and difficulty are required" });
    }
    const analysis = await analyzeSpanishSentence(spanishText);
    const sentence = await storage.createLearningSentence({
      spanishText,
      englishText,
      difficulty,
      topic,
      grammarFocus,
      wordByWordData: analysis
    });
    await logSystemEvent("info", `Created learning sentence: "${spanishText}"`);
    res.status(201).json(sentence);
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.put("/sentences/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { spanishText, englishText, difficulty, topic, grammarFocus } = req.body;
    const existingSentence = await storage.getLearningSentence(id);
    if (!existingSentence) {
      return res.status(404).json({ message: "Sentence not found" });
    }
    let wordByWordData = existingSentence.wordByWordData;
    if (spanishText && spanishText !== existingSentence.spanishText) {
      const analysis = await analyzeSpanishSentence(spanishText);
      wordByWordData = analysis;
    }
    const updates = {};
    if (spanishText) updates.spanishText = spanishText;
    if (englishText) updates.englishText = englishText;
    if (difficulty) updates.difficulty = difficulty;
    if (topic) updates.topic = topic;
    if (grammarFocus) updates.grammarFocus = grammarFocus;
    if (wordByWordData) updates.wordByWordData = wordByWordData;
    const updatedSentence = await storage.updateLearningSentence(id, updates);
    res.json(updatedSentence);
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.delete("/sentences/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await storage.deleteLearningSentence(id);
    if (!success) {
      return res.status(404).json({ message: "Sentence not found" });
    }
    await logSystemEvent("info", `Deleted learning sentence with ID: ${id}`);
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.post("/sentences/:id/exercises", async (req, res) => {
  try {
    const sentenceId = parseInt(req.params.id);
    const { exerciseType = "mixed", count = 3 } = req.body;
    const sentence = await storage.getLearningSentence(sentenceId);
    if (!sentence) {
      return res.status(404).json({ message: "Sentence not found" });
    }
    const generatedExercises = await generateExercises(
      sentence.spanishText,
      exerciseType
    );
    const savedExercises = [];
    for (const exercise of generatedExercises.exercises.slice(0, count)) {
      const savedExercise = await storage.createExercise({
        type: exercise.type,
        sentenceId,
        question: exercise.question,
        options: exercise.options || [],
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
        difficulty: sentence.difficulty
      });
      savedExercises.push(savedExercise);
    }
    res.status(201).json(savedExercises);
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.get("/exercises", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.sentenceId) filter.sentenceId = parseInt(req.query.sentenceId);
    const { exercises: exercises2, total } = await storage.getExercises(
      page,
      limit,
      Object.keys(filter).length > 0 ? filter : void 0
    );
    res.json({ exercises: exercises2, total, page, limit });
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.get("/exercises/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const exercise = await storage.getExercise(id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.json(exercise);
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.post("/exercises/:id/attempt", async (req, res) => {
  try {
    const exerciseId = parseInt(req.params.id);
    const { userId, userAnswer } = req.body;
    if (!userId || userAnswer === void 0) {
      return res.status(400).json({ message: "User ID and answer are required" });
    }
    const exercise = await storage.getExercise(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    const isCorrect = userAnswer === exercise.correctAnswer;
    let sentence = null;
    if (exercise.sentenceId) {
      sentence = await storage.getLearningSentence(exercise.sentenceId);
    }
    let feedback = "";
    if (!isCorrect && sentence) {
      const feedbackResponse = await provideFeedback(
        userAnswer,
        exercise.correctAnswer,
        exercise.type.includes("translation")
      );
      feedback = feedbackResponse.feedback;
    }
    const attempt = await storage.createExerciseAttempt({
      userId,
      exerciseId,
      userAnswer,
      isCorrect,
      feedback
    });
    res.json({
      attempt,
      isCorrect,
      correctAnswer: exercise.correctAnswer,
      explanation: exercise.explanation,
      feedback
    });
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.post("/analyze", async (req, res) => {
  try {
    const { text: text2 } = req.body;
    if (!text2) {
      return res.status(400).json({ message: "Text is required" });
    }
    const analysis = await analyzeSpanishSentence(text2);
    res.json(analysis);
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.post("/translate", async (req, res) => {
  try {
    const { text: text2, preferBritishEnglish = true } = req.body;
    if (!text2) {
      return res.status(400).json({ message: "Text is required" });
    }
    const translation = await translateSpanishToEnglish(text2, preferBritishEnglish);
    res.json({ original: text2, translation });
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.post("/feedback", async (req, res) => {
  try {
    const { userText, correctText, isTranslation = false } = req.body;
    if (!userText || !correctText) {
      return res.status(400).json({ message: "User text and correct text are required" });
    }
    const feedback = await provideFeedback(userText, correctText, isTranslation);
    res.json(feedback);
  } catch (error) {
    handleError(res, error);
  }
});
learningRouter.get("/progress/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const progress = await storage.getUserProgress(userId);
    const attempts = await storage.getUserExerciseAttempts(userId, 10);
    res.json({
      progress,
      recentAttempts: attempts
    });
  } catch (error) {
    handleError(res, error);
  }
});

// server/llm-routes.ts
import { Router as Router2 } from "express";

// server/services/llm.ts
init_db();
import OpenAI2 from "openai";
var openai2 = new OpenAI2({ apiKey: process.env.OPENAI_API_KEY });
var MODEL = "gpt-4o";
async function generateSentence(params) {
  try {
    const { difficulty, topic, grammarFocus, cefrLevel } = params;
    const prompt = `Generate a single Spanish sentence with its English translation and detailed word-by-word analysis.

Parameters:
- Difficulty: ${difficulty || "intermediate"}
- Topic: ${topic || "everyday conversation"}
- Grammar Focus: ${grammarFocus || "present tense"}
- CEFR Level: ${cefrLevel || "B1"}

For the word-by-word analysis, provide:
1. Each Spanish word
2. Its English translation
3. Pronunciation guide using simplified IPA or phonetic English
4. Part of speech (noun, verb, adjective, etc.)
5. For nouns: gender (masculine/feminine)
6. For verbs: tense and whether it's conjugated (include base form if conjugated)

Format your response as JSON in EXACTLY this format:
{
  "spanishText": "Complete Spanish sentence",
  "englishText": "Complete English translation",
  "wordByWordData": [
    {
      "spanishWord": "hola",
      "englishTranslation": "hello",
      "pronunciation": "OH-lah",
      "partOfSpeech": "interjection"
    },
    {
      "spanishWord": "c\xF3mo",
      "englishTranslation": "how",
      "pronunciation": "KOH-moh",
      "partOfSpeech": "adverb"
    },
    {
      "spanishWord": "est\xE1s",
      "englishTranslation": "are",
      "pronunciation": "eh-STAHS",
      "partOfSpeech": "verb",
      "tense": "present",
      "isConjugated": true,
      "baseForm": "estar"
    }
  ]
}

IMPORTANT GUIDELINES:
1. Ensure the Spanish is grammatically correct 
2. Match the difficulty level to the CEFR level
3. Focus on the requested grammar point
4. Create natural, useful sentences a language learner would encounter
5. For articles and pronouns, clearly identify them as such (e.g., "el" as article, "yo" as pronoun)
6. Be precise with part of speech classifications

Respond ONLY with the JSON object and nothing else.`;
    const response = await openai2.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: "You are a professional Spanish language curriculum developer, specializing in creating educational content for Spanish learners." },
        { role: "user", content: prompt }
      ],
      temperature: 0.5,
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from LLM");
    }
    const result = JSON.parse(content);
    await logSystemEvent("info", `Generated sentence: "${result.spanishText}" (${difficulty || "intermediate"}, ${cefrLevel || "B1"})`);
    return result;
  } catch (error) {
    console.error("Error generating sentence:", error);
    await logSystemEvent("error", `Sentence generation failed: ${error instanceof Error ? error.message : String(error)}`);
    throw new Error(`Failed to generate sentence: ${error instanceof Error ? error.message : String(error)}`);
  }
}
async function postProcessWordAnalysis(wordData) {
  try {
    const commonPrepositions = [
      "a",
      "ante",
      "bajo",
      "con",
      "contra",
      "de",
      "desde",
      "durante",
      "en",
      "entre",
      "hacia",
      "hasta",
      "mediante",
      "para",
      "por",
      "seg\xFAn",
      "sin",
      "sobre",
      "tras"
    ];
    const commonDeterminers = [
      "el",
      "la",
      "los",
      "las",
      "un",
      "una",
      "unos",
      "unas",
      "este",
      "esta",
      "estos",
      "estas",
      "ese",
      "esa",
      "esos",
      "esas",
      "aquel",
      "aquella",
      "aquellos",
      "aquellas",
      "mi",
      "mis",
      "tu",
      "tus",
      "su",
      "sus",
      "nuestro",
      "nuestra",
      "nuestros",
      "nuestras"
    ];
    const commonConjunctions = [
      "y",
      "e",
      "o",
      "u",
      "ni",
      "pero",
      "sino",
      "aunque",
      "porque",
      "pues",
      "si",
      "como",
      "cuando",
      "mientras",
      "antes",
      "despu\xE9s",
      "ya",
      "que",
      "donde",
      "seg\xFAn"
    ];
    return wordData.map((word) => {
      if (commonPrepositions.includes(word.spanishWord.toLowerCase())) {
        return { ...word, partOfSpeech: "preposition" };
      }
      if (commonDeterminers.includes(word.spanishWord.toLowerCase())) {
        if (["el", "la", "los", "las", "un", "una", "unos", "unas"].includes(word.spanishWord.toLowerCase())) {
          const isDefinite = ["el", "la", "los", "las"].includes(word.spanishWord.toLowerCase());
          return {
            ...word,
            partOfSpeech: "article",
            form: isDefinite ? "definite" : "indefinite"
          };
        }
        return { ...word, partOfSpeech: "determiner" };
      }
      if (commonConjunctions.includes(word.spanishWord.toLowerCase())) {
        return { ...word, partOfSpeech: "conjunction" };
      }
      return word;
    });
  } catch (error) {
    console.error("Error post-processing word analysis:", error);
    await logSystemEvent("error", `Word analysis post-processing failed: ${error instanceof Error ? error.message : String(error)}`);
    return wordData;
  }
}

// server/llm-routes.ts
init_db();
var llmRouter = Router2();
var handleError2 = (res, error) => {
  console.error("LLM API Error:", error);
  const errorMessage = error.message || "An unexpected error occurred";
  logSystemEvent("error", `LLM API Error: ${errorMessage}`).catch((err) => {
    console.error("Failed to log error:", err);
  });
  return res.status(500).json({
    success: false,
    message: errorMessage
  });
};
llmRouter.post("/sentences", async (req, res) => {
  try {
    const { difficulty, theme, grammarFocus, count } = req.body;
    if (!difficulty) {
      return res.status(400).json({
        success: false,
        message: "Difficulty level is required"
      });
    }
    const result = await (void 0)(
      difficulty,
      theme || "any",
      grammarFocus || "any",
      count || 3
    );
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return handleError2(res, error);
  }
});
llmRouter.post("/conversation", async (req, res) => {
  try {
    const {
      messages,
      persona,
      learningLevel,
      shouldProvideTranslation,
      shouldProvideFeedback
    } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid conversation messages are required"
      });
    }
    const result = await (void 0)(
      messages,
      persona || "friendly language tutor",
      learningLevel || "intermediate",
      shouldProvideTranslation !== false,
      shouldProvideFeedback !== false
    );
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return handleError2(res, error);
  }
});
llmRouter.post("/curriculum", async (req, res) => {
  try {
    const { track, level, lessonNumber } = req.body;
    if (!track || !level || !lessonNumber) {
      return res.status(400).json({
        success: false,
        message: "Track, level, and lesson number are required"
      });
    }
    const result = await (void 0)(
      track,
      level,
      lessonNumber
    );
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return handleError2(res, error);
  }
});
llmRouter.post("/analyze-proficiency", async (req, res) => {
  try {
    const { textSamples } = req.body;
    if (!textSamples || !Array.isArray(textSamples) || textSamples.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid text samples are required"
      });
    }
    const result = await (void 0)(textSamples);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return handleError2(res, error);
  }
});
llmRouter.post("/save-sentence", async (req, res) => {
  try {
    const {
      spanishText,
      englishText,
      difficulty,
      topic,
      grammarFocus,
      wordByWordData
    } = req.body;
    if (!spanishText || !englishText) {
      return res.status(400).json({
        success: false,
        message: "Spanish and English text are required"
      });
    }
    const savedSentence = await storage.createLearningSentence({
      spanishText,
      englishText,
      cefr: difficulty || "b1",
      topic: topic || "",
      grammarFocus: grammarFocus || "",
      wordByWordData: wordByWordData || []
    });
    return res.status(201).json({
      success: true,
      data: savedSentence
    });
  } catch (error) {
    return handleError2(res, error);
  }
});
llmRouter.post("/save-conversation", async (req, res) => {
  try {
    const { userId, messages, title } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: "Valid conversation messages are required"
      });
    }
    await logSystemEvent("info", `Conversation saved: ${title || "Untitled"} with ${messages.length} messages`);
    return res.status(201).json({
      success: true,
      message: "Conversation saved successfully"
    });
  } catch (error) {
    return handleError2(res, error);
  }
});

// server/cultural-context-routes.ts
import { Router as Router3 } from "express";

// server/services/cultural-context.ts
import OpenAI3 from "openai";
var openai3 = new OpenAI3({ apiKey: process.env.OPENAI_API_KEY });
async function generateIdioms(difficulty = "beginner", region = "any", category = "any", count = 5) {
  try {
    const systemPrompt = `You are a Spanish language expert specializing in idioms, expressions, and cultural context.`;
    const userPrompt = `Generate ${count} Spanish idioms or expressions ${region !== "any" ? `from ${region}` : "from various Spanish-speaking regions"} that are appropriate for ${difficulty} level Spanish learners ${category !== "any" ? `related to the category: ${category}` : ""}.

    For each idiom or expression, provide:
    1. The Spanish text
    2. The English translation
    3. The literal word-by-word translation if applicable
    4. A detailed explanation of its meaning and usage
    5. Cultural context and usage examples
    6. The region(s) where it's commonly used
    7. At least 2 example sentences with English translations

    Respond with a JSON array where each idiom is an object with these properties:
    - spanishText: string
    - englishTranslation: string
    - literalTranslation: string
    - explanation: string
    - usage: string
    - region: string
    - category: string (e.g., "everyday", "humor", "food", etc.)
    - difficulty: string ("beginner", "intermediate", or "advanced")
    - examples: array of objects with "spanish" and "english" properties
    `;
    const response = await openai3.chat.completions.create({
      model: "gpt-4o",
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in response");
    }
    const responseData = JSON.parse(content);
    return responseData.idioms || [];
  } catch (error) {
    console.error("Error generating idioms:", error);
    throw error;
  }
}
async function generateCulturalContext(region, topic = "general") {
  try {
    const systemPrompt = `You are a cultural anthropologist and linguist specializing in Spanish-speaking cultures and dialects.`;
    const userPrompt = `Provide detailed information about the linguistic and cultural context of Spanish as spoken in ${region}, focusing on ${topic === "general" ? "general language usage and culture" : topic}.

    Include:
    1. Key linguistic features that distinguish this regional variety of Spanish
    2. Common expressions or slang unique to this region
    3. Communication patterns or cultural norms that might affect language use
    4. Cultural aspects that influence the language

    Format your response as a JSON object with these properties:
    - region: string (the region name)
    - linguisticFeatures: array of objects, each with "feature" and "examples" properties
    - regionalExpressions: array of objects with "expression", "meaning", and "usage" properties
    - communicationTips: array of strings with cultural communication advice
    - culturalContext: string (broader cultural information relevant to language)
    `;
    const response = await openai3.chat.completions.create({
      model: "gpt-4o",
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in response");
    }
    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating cultural context:", error);
    throw error;
  }
}
async function generateIdiomExercises(idioms, exerciseType = "multiple-choice") {
  try {
    const idiomsText = idioms.map((idiom) => `- "${idiom}"`).join("\n");
    const systemPrompt = `You are a Spanish language teacher specializing in creating practice exercises for idioms and cultural expressions.`;
    const userPrompt = `Create practice exercises for the following Spanish idioms or expressions:
    ${idiomsText}

    Exercise type: ${exerciseType}

    For each idiom, create 1-2 exercises that test the student's understanding of the idiom's meaning and usage.
    
    For multiple-choice exercises, include:
    - A clear question
    - 4 options (including the correct answer)
    - The correct answer

    For fill-in-blank exercises, include:
    - A sentence with a blank where the idiom should be used
    - The correct answer

    Respond with a JSON array where each exercise is an object with these properties:
    - type: string (the exercise type)
    - idiom: string (the idiom being tested)
    - question: string
    - options: array of strings (for multiple-choice) or null (for fill-in-blank)
    - correctAnswer: string
    - explanation: string (explaining why the answer is correct)
    `;
    const response = await openai3.chat.completions.create({
      model: "gpt-4o",
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in response");
    }
    const responseData = JSON.parse(content);
    return responseData.exercises || [];
  } catch (error) {
    console.error("Error generating idiom exercises:", error);
    throw error;
  }
}
async function provideCulturalFeedback(userResponses) {
  try {
    const responsesText = userResponses.map(
      (response2) => `Question: ${response2.question}
User's answer: ${response2.answer}
Correct answer: ${response2.correctAnswer}`
    ).join("\n\n");
    const systemPrompt = `You are a Spanish language teacher specializing in idioms and cultural expressions.`;
    const userPrompt = `Provide feedback on the student's responses to these idiom exercises:

    ${responsesText}

    For each response:
    1. Assess if the answer is correct
    2. Explain why the answer is correct or incorrect
    3. Provide additional context or tips to help the student understand the idiom better

    Then provide an overall assessment of the student's understanding of Spanish idioms and cultural expressions.

    Respond with a JSON object that has:
    - individualFeedback: array of objects with "question", "userAnswer", "isCorrect", and "feedback" properties
    - overallFeedback: string with a summary assessment
    - improvementTips: array of strings with suggestions for improvement
    - score: number (percentage of correct answers)
    `;
    const response = await openai3.chat.completions.create({
      model: "gpt-4o",
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in response");
    }
    return JSON.parse(content);
  } catch (error) {
    console.error("Error providing cultural feedback:", error);
    throw error;
  }
}

// server/cultural-context-routes.ts
var culturalContextRouter = Router3();
var handleError3 = (res, error) => {
  console.error("Error in cultural context route:", error);
  res.status(500).json({
    success: false,
    message: "An error occurred while processing your request",
    error: error.message || "Unknown error"
  });
};
culturalContextRouter.post("/idioms", async (req, res) => {
  try {
    const { difficulty = "beginner", region = "any", category = "any", count = 5 } = req.body;
    const result = await generateIdioms(
      difficulty,
      region,
      category,
      count
    );
    res.json({
      success: true,
      data: {
        idioms: result
      }
    });
  } catch (error) {
    handleError3(res, error);
  }
});
culturalContextRouter.post("/region", async (req, res) => {
  try {
    const { region, topic = "general" } = req.body;
    if (!region) {
      return res.status(400).json({
        success: false,
        message: "Region parameter is required"
      });
    }
    const result = await generateCulturalContext(
      region,
      topic
    );
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    handleError3(res, error);
  }
});
culturalContextRouter.post("/exercises", async (req, res) => {
  try {
    const { idioms, exerciseType = "multiple-choice" } = req.body;
    if (!idioms || !Array.isArray(idioms) || idioms.length === 0) {
      return res.status(400).json({
        success: false,
        message: "A list of idioms is required"
      });
    }
    const result = await generateIdiomExercises(
      idioms,
      exerciseType
    );
    res.json({
      success: true,
      data: {
        exercises: result
      }
    });
  } catch (error) {
    handleError3(res, error);
  }
});
culturalContextRouter.post("/feedback", async (req, res) => {
  try {
    const { userResponses } = req.body;
    if (!userResponses || !Array.isArray(userResponses) || userResponses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User responses are required"
      });
    }
    const result = await provideCulturalFeedback(
      userResponses
    );
    res.json({
      success: true,
      data: {
        feedback: result
      }
    });
  } catch (error) {
    handleError3(res, error);
  }
});

// server/curriculum-routes.ts
init_storage_curriculum();
import { Router as Router4 } from "express";

// server/services/curriculum.ts
init_db();
init_schema();
import { eq as eq3, sql as sql3 } from "drizzle-orm";
init_storage_curriculum();
function getVocabularyForLevel(level) {
  const vocabularyByLevel = {
    A1: [
      "Greetings and basic phrases",
      "Numbers 1-100",
      "Family members",
      "Days of the week",
      "Telling time",
      "Weather",
      "Colors",
      "Food and drinks",
      "Basic verbs",
      "Classroom objects"
    ],
    A2: [
      "Shopping",
      "Transportation",
      "Directions",
      "Jobs and professions",
      "The house and furniture",
      "Clothing",
      "Daily routines",
      "Hobbies and free time",
      "Months and dates",
      "Places in town"
    ],
    B1: [
      "Travel and tourism",
      "Health and medicine",
      "Technology",
      "Feelings and emotions",
      "Environment",
      "Education",
      "Music and arts",
      "Sports",
      "Personality traits",
      "Food and cooking"
    ],
    B2: [
      "Work and business",
      "News and media",
      "Politics",
      "Science",
      "Law and justice",
      "Urban life",
      "Nature and wildlife",
      "Personal relationships",
      "Social issues",
      "Cultural differences"
    ],
    C1: [
      "Academic language",
      "Philosophy",
      "Psychology",
      "Literature",
      "Economics",
      "Global issues",
      "Idiomatic expressions",
      "Formal language",
      "Abstract concepts",
      "Professional development"
    ],
    Q: [
      "Wisdom and knowledge",
      "Spiritual concepts",
      "Ethics and morality",
      "Personal growth",
      "Universal truths",
      "Character building",
      "Inner qualities",
      "Life lessons",
      "Human values",
      "Existential questions"
    ]
  };
  return vocabularyByLevel[level] || vocabularyByLevel.A1;
}
async function initializeCurriculum() {
  try {
    const existingTracks = await db.select().from(curriculumTracks);
    if (existingTracks.length > 0) {
      await logSystemEvent("info", `Curriculum already initialized with ${existingTracks.length} tracks`);
      return;
    }
    await logSystemEvent("info", "Initializing curriculum with default tracks");
    const defaultTracks = [
      {
        code: "basic",
        title: "Basic Survival",
        description: "Essential Spanish for everyday situations and basic conversation.",
        cefrLevel: "A1",
        iconName: "graduation-cap"
      },
      {
        code: "travel",
        title: "Travel & Conversation",
        description: "Spanish for traveling and having conversations with native speakers.",
        cefrLevel: "A2",
        iconName: "plane"
      },
      {
        code: "grammar",
        title: "Grammar & Usage",
        description: "Focus on Spanish grammar structures and practical usage.",
        cefrLevel: "B1",
        iconName: "book"
      },
      {
        code: "fluency",
        title: "Intermediate Fluency",
        description: "Develop greater fluency and vocabulary for complex topics.",
        cefrLevel: "B2",
        iconName: "comments"
      },
      {
        code: "media",
        title: "Native Media Comprehension",
        description: "Understand native Spanish media, literature, and advanced conversations.",
        cefrLevel: "C1",
        iconName: "film"
      },
      {
        code: "wisdom",
        title: "Quranic-style Wisdom",
        description: "Poetic and philosophical expressions in a style similar to sacred texts.",
        cefrLevel: "Q",
        iconName: "star"
      }
    ];
    for (const trackData of defaultTracks) {
      const track = {
        code: trackData.code,
        title: trackData.title,
        description: trackData.description,
        cefrLevel: trackData.cefrLevel,
        iconName: trackData.iconName
      };
      const [createdTrack] = await db.insert(curriculumTracks).values(track).returning();
      await logSystemEvent("info", `Created curriculum track: ${track.title} (${track.cefrLevel})`);
      const vocabularyTopics = getVocabularyForLevel(track.cefrLevel);
      const lessonCount = track.cefrLevel === "Q" ? 30 : 37;
      for (let i = 1; i <= lessonCount; i++) {
        const topicIndex = (i - 1) % vocabularyTopics.length;
        const vocabularyFocus = vocabularyTopics[topicIndex];
        let grammarFocus = "";
        if (track.cefrLevel === "A1") {
          if (i <= 10) grammarFocus = "Present tense";
          else if (i <= 20) grammarFocus = "Basic questions";
          else if (i <= 30) grammarFocus = "Adjectives and articles";
          else grammarFocus = "Nouns and pronouns";
        } else if (track.cefrLevel === "A2") {
          if (i <= 10) grammarFocus = "Past tense (preterite)";
          else if (i <= 20) grammarFocus = "Past tense (imperfect)";
          else if (i <= 30) grammarFocus = "Future tense expressions";
          else grammarFocus = "Reflexive verbs";
        } else if (track.cefrLevel === "B1") {
          if (i <= 10) grammarFocus = "Present perfect";
          else if (i <= 20) grammarFocus = "Subjunctive mood basics";
          else if (i <= 30) grammarFocus = "Commands (imperative)";
          else grammarFocus = "Conditional tense";
        } else if (track.cefrLevel === "B2") {
          if (i <= 10) grammarFocus = "Past perfect";
          else if (i <= 20) grammarFocus = "Advanced subjunctive";
          else if (i <= 30) grammarFocus = "Conditional perfect";
          else grammarFocus = "Passive voice";
        } else if (track.cefrLevel === "C1") {
          if (i <= 10) grammarFocus = "Advanced verb tenses";
          else if (i <= 20) grammarFocus = "Idiomatic expressions";
          else if (i <= 30) grammarFocus = "Complex sentences";
          else grammarFocus = "Literary language";
        } else {
          grammarFocus = "Poetic structures and expressions";
        }
        const lesson = {
          trackId: createdTrack.id,
          lessonNumber: i,
          title: `Lesson ${i}: ${vocabularyFocus}`,
          description: `Focus on ${vocabularyFocus.toLowerCase()} with ${grammarFocus.toLowerCase()}.`,
          grammarFocus,
          vocabularyFocus
        };
        await db.insert(lessons).values(lesson).returning();
      }
      await db.update(curriculumTracks).set({ totalLessons: lessonCount }).where(eq3(curriculumTracks.id, createdTrack.id));
    }
    await logSystemEvent("info", "Curriculum initialization completed successfully");
  } catch (error) {
    console.error("Error initializing curriculum:", error);
    await logSystemEvent("error", `Curriculum initialization failed: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
async function generateSentenceForLesson(lessonId, options = {}) {
  try {
    const lesson = await getLesson(lessonId);
    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonId} not found`);
    }
    const track = await getCurriculumTrack(lesson.trackId);
    if (!track) {
      throw new Error(`Track with ID ${lesson.trackId} not found`);
    }
    let difficulty = "";
    if (track.cefrLevel === "A1") difficulty = "beginner";
    else if (track.cefrLevel === "A2") difficulty = "elementary";
    else if (track.cefrLevel === "B1") difficulty = "intermediate";
    else if (track.cefrLevel === "B2") difficulty = "upper-intermediate";
    else if (track.cefrLevel === "C1") difficulty = "advanced";
    else difficulty = "advanced";
    if (options.difficulty) {
      difficulty = options.difficulty;
    }
    const generatedData = await generateSentence({
      difficulty,
      topic: options.topic || lesson.vocabularyFocus,
      grammarFocus: options.grammarFocus || lesson.grammarFocus,
      cefrLevel: track.cefrLevel
    });
    const processedWordData = await postProcessWordAnalysis(generatedData.wordByWordData);
    const sentenceData = {
      spanishText: generatedData.spanishText,
      englishText: generatedData.englishText,
      difficulty,
      topic: options.topic || lesson.vocabularyFocus,
      grammarFocus: options.grammarFocus || lesson.grammarFocus,
      wordByWordData: processedWordData
    };
    const [sentence] = await db.insert(learningSentences).values(sentenceData).returning();
    const orderIndexResults = await db.select({
      maxOrder: sql3`MAX(${lessonSentences.orderIndex})`
    }).from(lessonSentences).where(eq3(lessonSentences.lessonId, lessonId));
    const nextOrderIndex = orderIndexResults[0].maxOrder ? orderIndexResults[0].maxOrder + 1 : 0;
    const [lessonSentence] = await db.insert(lessonSentences).values({
      lessonId,
      sentenceId: sentence.id,
      orderIndex: nextOrderIndex
    }).returning();
    return {
      ...sentence,
      lessonSentenceId: lessonSentence.id,
      orderIndex: lessonSentence.orderIndex
    };
  } catch (error) {
    console.error("Error generating sentence for lesson:", error);
    await logSystemEvent("error", `Sentence generation failed for lesson ${lessonId}: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
async function populateLesson(lessonId, count = 5) {
  try {
    let generatedCount = 0;
    for (let i = 0; i < count; i++) {
      await generateSentenceForLesson(lessonId);
      generatedCount++;
      if (generatedCount % 5 === 0 || generatedCount === count) {
        await logSystemEvent("info", `Generated ${generatedCount}/${count} sentences for lesson ${lessonId}`);
      }
    }
    return generatedCount;
  } catch (error) {
    console.error("Error populating lesson with sentences:", error);
    await logSystemEvent("error", `Lesson population failed for lesson ${lessonId}: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
async function generateTrack(trackId, sentencesPerLesson = 5) {
  try {
    const trackLessons = await db.select().from(lessons).where(eq3(lessons.trackId, trackId));
    let totalGenerated = 0;
    for (const lesson of trackLessons) {
      const count = await populateLesson(lesson.id, sentencesPerLesson);
      totalGenerated += count;
      await logSystemEvent("info", `Populated lesson ${lesson.id} (${lesson.title}) with ${count} sentences`);
    }
    return totalGenerated;
  } catch (error) {
    console.error("Error generating track:", error);
    await logSystemEvent("error", `Track generation failed for track ${trackId}: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

// server/curriculum-routes.ts
import { z } from "zod";
var curriculumRouter = Router4();
var handleError4 = (res, error) => {
  console.error("Curriculum API error:", error);
  const message = error instanceof Error ? error.message : String(error);
  res.status(500).json({ success: false, error: message });
};
curriculumRouter.get("/initialize", async (req, res) => {
  try {
    await initializeCurriculum();
    res.json({ success: true, message: "Curriculum initialized successfully" });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.post("/generate-track", async (req, res) => {
  try {
    const schema = z.object({
      trackId: z.number(),
      sentencesPerLesson: z.number().optional().default(5)
    });
    const { trackId, sentencesPerLesson } = schema.parse(req.body);
    const track = await getCurriculumTrack(trackId);
    if (!track) {
      return res.status(404).json({ success: false, error: "Track not found" });
    }
    const generatedCount = await generateTrack(trackId, sentencesPerLesson);
    res.json({
      success: true,
      message: `Generated ${generatedCount} sentences for track "${track.title}"`,
      generatedCount
    });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.get("/tracks", async (req, res) => {
  try {
    const tracks = await getCurriculumTracks();
    res.json({ success: true, tracks });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.get("/tracks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid track ID" });
    }
    const track = await getCurriculumTrack(id);
    if (!track) {
      return res.status(404).json({ success: false, error: "Track not found" });
    }
    res.json({ success: true, track });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.get("/tracks/code/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const track = await getCurriculumTrackByCode(code);
    if (!track) {
      return res.status(404).json({ success: false, error: "Track not found" });
    }
    res.json({ success: true, track });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.get("/lessons/:trackId", async (req, res) => {
  try {
    const trackId = parseInt(req.params.trackId);
    if (isNaN(trackId)) {
      return res.status(400).json({ success: false, error: "Invalid track ID" });
    }
    const track = await getCurriculumTrack(trackId);
    if (!track) {
      return res.status(404).json({ success: false, error: "Track not found" });
    }
    const lessons3 = await getLessons(trackId);
    res.json({ success: true, lessons: lessons3 });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.get("/lesson/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid lesson ID" });
    }
    const lesson = await getLesson(id);
    if (!lesson) {
      return res.status(404).json({ success: false, error: "Lesson not found" });
    }
    const track = await getCurriculumTrack(lesson.trackId);
    res.json({
      success: true,
      lesson: {
        ...lesson,
        trackName: track?.title || "",
        cefrLevel: track?.cefrLevel || ""
      }
    });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.get("/lesson/:id/sentences", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid lesson ID" });
    }
    const lesson = await getLesson(id);
    if (!lesson) {
      return res.status(404).json({ success: false, error: "Lesson not found" });
    }
    const sentences = await getLessonSentences(id);
    res.json({
      success: true,
      lesson,
      sentences: sentences.map((item) => ({
        ...item.sentence,
        orderIndex: item.order
      }))
    });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.post("/generate-sentence", async (req, res) => {
  try {
    const schema = z.object({
      difficulty: z.string().optional(),
      topic: z.string().optional(),
      grammarFocus: z.string().optional(),
      cefrLevel: z.string().optional()
    });
    const params = schema.parse(req.body);
    const result = await generateSentence(params);
    res.json({
      success: true,
      sentence: result
    });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.post("/populate-lesson", async (req, res) => {
  try {
    const schema = z.object({
      lessonId: z.number(),
      count: z.number().optional().default(5)
    });
    const { lessonId, count } = schema.parse(req.body);
    const lesson = await getLesson(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, error: "Lesson not found" });
    }
    const generatedCount = await populateLesson(lessonId, count);
    res.json({
      success: true,
      message: `Generated ${generatedCount} sentences for lesson ${lesson.title}`,
      generatedCount
    });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.post("/post-process", async (req, res) => {
  try {
    const schema = z.object({
      wordData: z.array(z.any())
    });
    const { wordData } = schema.parse(req.body);
    const processed = await postProcessWordAnalysis(wordData);
    res.json({
      success: true,
      wordData: processed
    });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.post("/progress", async (req, res) => {
  try {
    const schema = z.object({
      userId: z.number(),
      lessonId: z.number(),
      progress: z.number().min(0).max(100),
      completed: z.boolean().optional()
    });
    const { userId, lessonId, progress, completed } = schema.parse(req.body);
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    const lesson = await getLesson(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, error: "Lesson not found" });
    }
    const updatedProgress = await updateUserLessonProgress(
      userId,
      lessonId,
      progress,
      completed
    );
    if (updatedProgress.completed) {
      const userProgress2 = await storage.getUserProgress(userId);
      await storage.updateUserProgress(userId, {
        ...userProgress2,
        lessonsCompleted: (userProgress2.lessonsCompleted || 0) + 1,
        lastActive: /* @__PURE__ */ new Date()
      });
    }
    res.json({
      success: true,
      progress: updatedProgress
    });
  } catch (error) {
    handleError4(res, error);
  }
});
curriculumRouter.get("/completed/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, error: "Invalid user ID" });
    }
    const trackId = req.query.trackId ? parseInt(req.query.trackId) : void 0;
    const completedLessons = await getUserCompletedLessons(userId, trackId);
    res.json({
      success: true,
      completedLessons
    });
  } catch (error) {
    handleError4(res, error);
  }
});

// server/routes.ts
async function parseDictionaryData(data, bidirectional) {
  const lines = data.split("\n").filter((line) => line.trim() !== "");
  const entries = [];
  for (const line of lines) {
    if (line.startsWith("#")) continue;
    const parts = line.split("	");
    if (parts.length >= 2) {
      const sourceWord = parts[0].trim();
      const translation = parts[1].trim();
      if (!sourceWord || !translation) continue;
      entries.push({
        sourceWord,
        translation,
        sourceLanguage: "en",
        targetLanguage: "es",
        examples: []
      });
      if (bidirectional) {
        entries.push({
          sourceWord: translation,
          translation: sourceWord,
          sourceLanguage: "es",
          targetLanguage: "en",
          examples: []
        });
      }
    }
  }
  return entries;
}
async function processImportJob(jobId) {
  try {
    const job = await storage.getImportJob(jobId);
    if (!job) {
      await logSystemEvent("error", `Import job ${jobId} not found`);
      return;
    }
    await storage.updateImportJob(jobId, { status: "in_progress" });
    await logSystemEvent("info", `Import process started for ${job.source}`);
    if (job.replace) {
      const deleted = await storage.deleteAllDictionaryEntries();
      await logSystemEvent("info", `Deleted ${deleted} existing dictionary entries`);
    }
    const response = await fetch(job.source);
    const data = await response.text();
    await logSystemEvent("info", `Downloaded ${(data.length / 1024).toFixed(1)}KB of dictionary data`);
    const entries = await parseDictionaryData(data, job.bidirectional);
    await storage.updateImportJob(jobId, {
      totalEntries: entries.length,
      processedEntries: 0
    });
    const batchSize = 1e3;
    let processedCount = 0;
    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);
      await storage.createManyDictionaryEntries(batch);
      processedCount += batch.length;
      if (processedCount % 1e4 === 0 || processedCount === entries.length) {
        await logSystemEvent("info", `Processed ${processedCount} dictionary entries`);
      }
      await storage.updateImportJob(jobId, { processedEntries: processedCount });
    }
    const counts = await storage.countDictionaryEntries();
    await storage.updateImportJob(jobId, {
      status: "completed",
      completedAt: /* @__PURE__ */ new Date()
    });
    await logSystemEvent("info", `Import completed: ${counts.enToEs} English-Spanish entries and ${counts.esToEn} Spanish-English entries`);
  } catch (error) {
    await logSystemEvent("error", `Import job ${jobId} failed: ${error}`);
    await storage.updateImportJob(jobId, {
      status: "failed",
      error: error instanceof Error ? error.message : String(error),
      completedAt: /* @__PURE__ */ new Date()
    });
  }
}
async function registerRoutes(app2) {
  const apiPrefix = "/api";
  const handleError5 = (res, error) => {
    console.error("API Error:", error);
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors
      });
    }
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ message });
  };
  app2.get(`${apiPrefix}/status`, async (req, res) => {
    try {
      const counts = await storage.countDictionaryEntries();
      res.json({
        status: "connected",
        connectionString: process.env.DATABASE_URL?.replace(/:[^:]*@/, ":***@"),
        stats: counts
      });
    } catch (error) {
      res.status(500).json({
        status: "disconnected",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  app2.get(`${apiPrefix}/dictionary`, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filter = req.query.filter;
      const result = await storage.getDictionaryEntries(page, limit, filter);
      res.json(result);
    } catch (error) {
      handleError5(res, error);
    }
  });
  app2.get(`${apiPrefix}/dictionary/search`, async (req, res) => {
    try {
      const term = req.query.term;
      const sourceLang = req.query.sourceLang || "en";
      const targetLang = req.query.targetLang || "es";
      if (!term) {
        return res.status(400).json({ message: "Search term is required" });
      }
      const results = await storage.searchDictionary(term, sourceLang, targetLang);
      res.json(results);
    } catch (error) {
      handleError5(res, error);
    }
  });
  app2.post(`${apiPrefix}/dictionary`, async (req, res) => {
    try {
      const entryData = insertDictionaryEntrySchema.parse(req.body);
      const entry = await storage.createDictionaryEntry(entryData);
      res.status(201).json(entry);
    } catch (error) {
      handleError5(res, error);
    }
  });
  app2.put(`${apiPrefix}/dictionary/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertDictionaryEntrySchema.partial().parse(req.body);
      const updated = await storage.updateDictionaryEntry(id, updates);
      if (!updated) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.json(updated);
    } catch (error) {
      handleError5(res, error);
    }
  });
  app2.delete(`${apiPrefix}/dictionary/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteDictionaryEntry(id);
      if (!deleted) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.status(204).send();
    } catch (error) {
      handleError5(res, error);
    }
  });
  app2.post(`${apiPrefix}/import`, async (req, res) => {
    try {
      const jobData = insertImportJobSchema.parse(req.body);
      const job = await storage.createImportJob({
        ...jobData,
        status: "pending"
      });
      processImportJob(job.id).catch((error) => {
        console.error("Error processing import job:", error);
      });
      res.status(201).json(job);
    } catch (error) {
      handleError5(res, error);
    }
  });
  app2.get(`${apiPrefix}/import/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getImportJob(id);
      if (!job) {
        return res.status(404).json({ message: "Import job not found" });
      }
      res.json(job);
    } catch (error) {
      handleError5(res, error);
    }
  });
  app2.get(`${apiPrefix}/import/latest`, async (req, res) => {
    try {
      const job = await storage.getLatestImportJob();
      if (!job) {
        return res.status(404).json({ message: "No import jobs found" });
      }
      res.json(job);
    } catch (error) {
      handleError5(res, error);
    }
  });
  app2.get(`${apiPrefix}/logs`, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 100;
      const logs = await storage.getSystemLogs(limit);
      res.json(logs);
    } catch (error) {
      handleError5(res, error);
    }
  });
  app2.use(`${apiPrefix}/learning`, learningRouter);
  app2.use(`${apiPrefix}/llm`, llmRouter);
  app2.use(`${apiPrefix}/cultural-context`, culturalContextRouter);
  app2.use(`${apiPrefix}/curriculum`, curriculumRouter);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/db-migrations.ts
init_db();
import { sql as sql4 } from "drizzle-orm";
async function applyMigrations() {
  console.log("Starting database migrations...");
  try {
    console.log("Creating user_progress table if it doesn't exist...");
    await db.execute(sql4`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        words_learned INTEGER DEFAULT 0,
        lessons_completed INTEGER DEFAULT 0,
        average_score INTEGER DEFAULT 0,
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        strengths TEXT[],
        weaknesses TEXT[]
      );
    `);
    console.log("Creating learning_sentences table if it doesn't exist...");
    await db.execute(sql4`
      CREATE TABLE IF NOT EXISTS learning_sentences (
        id SERIAL PRIMARY KEY,
        spanish_text TEXT NOT NULL,
        english_text TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        topic TEXT,
        grammar_focus TEXT,
        word_by_word_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Creating exercises table if it doesn't exist...");
    await db.execute(sql4`
      CREATE TABLE IF NOT EXISTS exercises (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        sentence_id INTEGER,
        question TEXT NOT NULL,
        options TEXT[],
        correct_answer TEXT NOT NULL,
        explanation TEXT,
        difficulty TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Creating exercise_attempts table if it doesn't exist...");
    await db.execute(sql4`
      CREATE TABLE IF NOT EXISTS exercise_attempts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        user_answer TEXT NOT NULL,
        is_correct BOOLEAN NOT NULL,
        feedback TEXT,
        attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Creating curriculum_tracks table if it doesn't exist...");
    await db.execute(sql4`
      CREATE TABLE IF NOT EXISTS curriculum_tracks (
        id SERIAL PRIMARY KEY,
        code TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT,
        cefr_level TEXT NOT NULL,
        total_lessons INTEGER DEFAULT 0,
        icon_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Creating lessons table if it doesn't exist...");
    await db.execute(sql4`
      CREATE TABLE IF NOT EXISTS lessons (
        id SERIAL PRIMARY KEY,
        track_id INTEGER NOT NULL,
        lesson_number INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        grammar_focus TEXT,
        vocabulary_focus TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Creating lesson_sentences table if it doesn't exist...");
    await db.execute(sql4`
      CREATE TABLE IF NOT EXISTS lesson_sentences (
        id SERIAL PRIMARY KEY,
        lesson_id INTEGER NOT NULL,
        sentence_id INTEGER NOT NULL,
        order_index INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Creating user_lesson_progress table if it doesn't exist...");
    await db.execute(sql4`
      CREATE TABLE IF NOT EXISTS user_lesson_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        lesson_id INTEGER NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        progress INTEGER DEFAULT 0,
        last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Database migrations completed successfully");
    return { success: true, message: "Migrations applied successfully" };
  } catch (error) {
    console.error("Migration error:", error);
    return { success: false, message: `Migration failed: ${error.message}` };
  }
}

// server/index.ts
init_db();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  try {
    log("Applying database migrations...");
    const migrationResult = await applyMigrations();
    log(`Migrations result: ${migrationResult.success ? "success" : "failed"} - ${migrationResult.message}`);
    try {
      log("Initializing curriculum data...");
      await initializeCurriculum();
      log("Curriculum initialization complete");
    } catch (curriculumError) {
      log(`Curriculum initialization error: ${curriculumError instanceof Error ? curriculumError.message : String(curriculumError)}`);
      await logSystemEvent("error", `Curriculum initialization error: ${curriculumError instanceof Error ? curriculumError.message : String(curriculumError)}`);
    }
  } catch (error) {
    log(`Migration error: ${error instanceof Error ? error.message : String(error)}`);
    await logSystemEvent("error", `Migration error: ${error instanceof Error ? error.message : String(error)}`);
  }
  app.use("/api/curriculum", curriculumRouter);
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
