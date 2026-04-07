const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * FastAPI returns `detail` as a string, an array of validation errors, or an object.
 * Never pass a non-string to `new Error()` or the UI shows "[object Object]".
 */
export function formatApiDetail(detail, statusText = "") {
  if (detail == null || detail === "") {
    return statusText || "Request failed";
  }
  if (typeof detail === "string") {
    return detail;
  }
  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (item && typeof item === "object" && "msg" in item) {
          const loc = Array.isArray(item.loc) ? item.loc.filter(Boolean).join(".") : "";
          return loc ? `${loc}: ${item.msg}` : String(item.msg);
        }
        try {
          return JSON.stringify(item);
        } catch {
          return String(item);
        }
      })
      .join("; ");
  }
  if (typeof detail === "object") {
    try {
      return JSON.stringify(detail, null, 2);
    } catch {
      return String(detail);
    }
  }
  return String(detail);
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = formatApiDetail(data.detail, `${response.status} ${response.statusText}`.trim());
    throw new Error(message);
  }
  return data;
}

export const apiClient = { request, API_BASE_URL };
