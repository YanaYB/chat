import 'dotenv/config'


function getEnvString(key: string, required = true, defaultValue?: string): string {
    const val = process.env[key]
    if (!val) {
        if (required && defaultValue === undefined) {
            throw new Error(`Env variable ${key} is required`)
        }
        return defaultValue ?? ''
    }
    return val
}

function getEnvNumber(key: string, defaultValue: number, min?: number, max?: number): number {
    const raw = process.env[key]
    if (!raw) return defaultValue

    const n = Number(raw)
    if (isNaN(n)) {
        throw new Error(`Env variable ${key} must be a number, got "${raw}"`)
    }
    if (min !== undefined && n < min) {
        throw new Error(`Env variable ${key} must be >= ${min}, got ${n}`)
    }
    if (max !== undefined && n > max) {
        throw new Error(`Env variable ${key} must be <= ${max}, got ${n}`)
    }
    return Math.floor(n)
}

export const CONFIG = {
    OPENAI_API_KEY: getEnvString('OPENAI_API_KEY'),
    OPENAI_MODEL: getEnvString('OPENAI_MODEL'),
    DATABASE_URL: getEnvString('DATABASE_URL'),
    DB_NAME: getEnvString('DB_NAME'),
    PORT: getEnvNumber('PORT', 3000, 1, 65535),
    MAX_CONTEXT_MESSAGES: getEnvNumber('MAX_CONTEXT_MESSAGES', 10, 1),
}
