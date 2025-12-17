import 'dotenv/config'


const errors: string[] = []

function fail(message: string) {
    errors.push(message)
}

function envString(
    key: string,
    options?: {
        required?: boolean
        default?: string
    }
): string | undefined {
    const val = process.env[key]

    if (!val) {
        if (options?.required ?? true) {
            fail(`ENV ${key} is required`)
            return undefined
        }
        return options?.default ?? ''
    }

    return val
}


function envNumber(
    key: string,
    defaultValue: number,
    min?: number,
    max?: number
): number | undefined {
    const raw = process.env[key]

    if (!raw) return defaultValue

    const n = Number(raw)

    if (isNaN(n)) {
        fail(`ENV ${key} must be a number, got "${raw}"`)
        return undefined
    }

    if (min !== undefined && n < min) {
        fail(`ENV ${key} must be >= ${min}, got ${n}`)
        return undefined
    }

    if (max !== undefined && n > max) {
        fail(`ENV ${key} must be <= ${max}, got ${n}`)
        return undefined
    }

    return Math.floor(n)
}


export const CONFIG = {
    OPENAI_API_KEY: envString('OPENAI_API_KEY'),
    OPENAI_MODEL: envString('OPENAI_MODEL'),
    DATABASE_URL: envString('DATABASE_URL'),
    DB_NAME: envString('DB_NAME'),

    PORT: envNumber('PORT', 3000, 1, 65535),
    MAX_CONTEXT_MESSAGES: envNumber('MAX_CONTEXT_MESSAGES', 10, 1),
}

if (errors.length > 0) {
    throw new Error(
        'Invalid environment configuration:\n' +
        errors.map(e => `  - ${e}`).join('\n')
    )
}


