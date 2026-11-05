import type * as React from 'react';
import type { Errors, FieldDefinition } from '@/types.ts';

/**
 * What a field type's own input gets: the field's definition (its type's
 * toAdmin()), the value, and how to change it; errors by path relative to
 * the value ("" for the value itself, "variants.0.sku" inside it).
 */
export interface FieldInputProps<V = unknown> {
    field: FieldDefinition;
    value: V;
    onChange: (value: V) => void;
    errors: Errors;
    /** The input's id, for the label the editor draws above it. */
    id: string;
    /** The ids describing the input (its hint and error), for aria-describedby. */
    describedBy?: string;
}

export type FieldInputComponent = React.ComponentType<FieldInputProps<any>>; // eslint-disable-line @typescript-eslint/no-explicit-any

const inputs = new Map<string, FieldInputComponent>();

/**
 * The input of a plugin's field type, in every CMS editor (entries,
 * terms, globals, listing pages): `registerFieldInput('rating', RatingInput)`.
 * A plugin's bundle that adds to the CMS's pages (PluginBundle::extends('Cms/'))
 * calls it through `globalThis.SunriceCms`, or queues the call on
 * `globalThis.SunriceCmsQueue` when the CMS's bundle hasn't run yet (its
 * own pages opened first). A type registered twice keeps the second.
 */
export function registerFieldInput(type: string, component: FieldInputComponent): void {
    if (inputs.has(type)) {
        console.warn(`[sunrice] The field input "${type}" was registered twice; the second registration wins.`);
    }
    inputs.set(type, component);
}

/** The registered input of a field type, if a plugin gave one. */
export function fieldInputFor(type: string): FieldInputComponent | undefined {
    return inputs.get(type);
}

/** The CMS's API for other plugins' bundles, on globalThis.SunriceCms. */
export interface SunriceCmsApi {
    version: 1;
    registerFieldInput: typeof registerFieldInput;
}

type Queued = (api: SunriceCmsApi) => void;

/**
 * Sets globalThis.SunriceCms and runs what other bundles queued before it
 * existed (`(globalThis.SunriceCmsQueue ??= []).push((cms) => …)`); later
 * pushes run at once.
 */
export function installCmsApi(): void {
    const scope = globalThis as { SunriceCms?: SunriceCmsApi; SunriceCmsQueue?: Queued[] };
    const api: SunriceCmsApi = { version: 1, registerFieldInput };
    scope.SunriceCms = api;
    const queue = scope.SunriceCmsQueue ?? [];
    const run = (call: Queued) => {
        try {
            call(api);
        } catch (error) {
            console.error('[sunrice] A queued SunriceCms call failed.', error);
        }
    };
    queue.splice(0).forEach(run);
    queue.push = (...calls: Queued[]) => {
        calls.forEach(run);

        return 0;
    };
    scope.SunriceCmsQueue = queue;
}
