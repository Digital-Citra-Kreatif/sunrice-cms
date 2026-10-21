/** How many of a language's texts are translated (not empty), of how many. */
export function translationProgress(values: string[]): { done: number; total: number } {
    return { done: values.filter((value) => value.trim() !== '').length, total: values.length };
}
