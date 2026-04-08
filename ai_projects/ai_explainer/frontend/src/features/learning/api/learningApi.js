import { apiClient } from "../../../services/apiClient";

// ---- Courses ----

export function listCourses() {
  return apiClient.request("/api/courses");
}

export function getCourse(courseId) {
  return apiClient.request(`/api/courses/${courseId}`);
}

// ---- Modules ----

export function listModules(courseId) {
  return apiClient.request(`/api/courses/${courseId}/modules`);
}

export function getModule(moduleId) {
  return apiClient.request(`/api/modules/${moduleId}`);
}

// ---- Topics ----

export function listTopics(moduleId) {
  return apiClient.request(`/api/modules/${moduleId}/topics`);
}

export function getTopic(topicId) {
  return apiClient.request(`/api/topics/${topicId}`);
}

export function explainConcept(payload, authHeaders = {}) {
  const prompt = [
    "Return ONLY valid JSON with keys: title, highLevel, deepLevel, realWorldExample, practiceSuggestion.",
    `Concept: ${payload.concept}`,
    `Audience level: ${payload.level || "beginner"}`,
  ].join("\n");
  return apiClient.request("/api/structured", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ prompt }),
  });
}

// ---- Assessments / gates (auth required) ----

export function getAssessmentGate(topicId, authHeaders = {}) {
  return apiClient.request(`/api/topics/${topicId}/assessment-gate`, {
    headers: authHeaders,
  });
}

export function listTopicMcqs(topicId, authHeaders = {}) {
  return apiClient.request(`/api/topics/${topicId}/mcqs`, {
    headers: authHeaders,
  });
}

export function submitTopicMcq(topicId, payload, authHeaders = {}) {
  return apiClient.request(`/api/topics/${topicId}/mcq/submit`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
}

export function listTopicSubjectives(topicId, authHeaders = {}) {
  return apiClient.request(`/api/topics/${topicId}/subjectives`, {
    headers: authHeaders,
  });
}

export function submitTopicSubjectives(topicId, payload, authHeaders = {}) {
  return apiClient.request(`/api/topics/${topicId}/subjective/submit`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
}

// ---- Progress (auth required) ----

export function getMyProgress(courseId, authHeaders = {}) {
  return apiClient.request(`/api/users/me/progress/${courseId}`, {
    headers: authHeaders,
  });
}

export function markTopicViewed(payload, authHeaders = {}) {
  return apiClient.request("/api/users/me/progress/topic-viewed", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
}

export function markTopicComplete(payload, authHeaders = {}) {
  return apiClient.request("/api/users/me/progress/topic-complete", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
}

