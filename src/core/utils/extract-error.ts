export function extractError(err: any, fallback = 'Something went wrong'): string {
    if (err?.error?.message) return err.error.message;                     
    if (Array.isArray(err?.error)) return err.error[0]?.error ?? fallback; 
    if (typeof err?.error === 'string') return err.error; 
    return fallback;
}
