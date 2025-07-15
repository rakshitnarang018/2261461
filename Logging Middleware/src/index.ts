import { sendLog } from "./api";
import {
  VALID_STACKS,
  VALID_LEVELS,
  BACKEND_PACKAGES,
  FRONTEND_PACKAGES,
  SHARED_PACKAGES,
} from "./constants";
import { LogPayload, Stack, Level, Package } from "./types";

/**
 * Sends a log to the Affordmed logging service.
 * Validates stack, level, and package before sending.
 */
export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  const isValidStack = VALID_STACKS.includes(stack);
  const isValidLevel = VALID_LEVELS.includes(level);
  const isValidPackage =
    (stack === "backend" && BACKEND_PACKAGES.includes(pkg)) ||
    (stack === "frontend" && FRONTEND_PACKAGES.includes(pkg)) ||
    SHARED_PACKAGES.includes(pkg);

  if (!isValidStack || !isValidLevel || !isValidPackage) {
    console.error(
      `[Logger Error] Invalid parameters -> stack: ${stack}, level: ${level}, package: ${pkg}`
    );
    return;
  }

  const payload: LogPayload = {
    stack,
    level,
    package: pkg,
    message,
  };

  await sendLog(payload);
}
