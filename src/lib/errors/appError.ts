import { ErrorTag, mergeTags } from '@/lib/errors/errorTags';

export type ErrorLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

export interface AppErrorOptions {
  message: string;
  code?: string;
  level?: ErrorLevel;
  tags?: ErrorTag[];
  extra?: Record<string, unknown>;
  capture?: boolean;
}

export class AppError extends Error {
  code?: string;
  level: ErrorLevel;
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;

  constructor({ message, code, level = 'error', tags, extra, capture = false }: AppErrorOptions) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.level = level;
    this.tags = tags ? mergeTags(...tags) : {};
    this.extra = extra;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    if (capture) {
      this.capture(); // 자동 Sentry 로깅
    }
  }

  capture() {
    // 동적 import
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.captureException(this, {
        level: this.level,
        tags: this.tags,
        extra: this.extra,
      });
    });

    return this; // 체이닝
  }
}
