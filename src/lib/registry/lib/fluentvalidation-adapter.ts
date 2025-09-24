import type {
    StandardSchemaV1,
    StandardSchemaV1Issue,
} from '@tanstack/svelte-form';
import type { Validator, AsyncValidator } from 'fluentvalidation-ts';

function collectIssues(
    node: unknown,
    path: Array<PropertyKey> = [],
    into: Array<StandardSchemaV1Issue> = []
): Array<StandardSchemaV1Issue> {
    if (node == null) return into;

    if (typeof node === 'string') {
        into.push({ message: node, path: path.length ? [...path] : undefined });
        return into;
    }

    if (Array.isArray(node)) {
        node.forEach((child, i) => {
            if (child != null) collectIssues(child as any, [...path, i], into);
        });
        return into;
    }

    if (typeof node === 'object') {
        for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
            if (v != null) collectIssues(v, [...path, k], into);
        }
        return into;
    }

    return into;
}

export function standardFromFluent<T>(
    validator: Validator<T>
): StandardSchemaV1<T> {
    return {
        '~standard': {
            version: 1,
            vendor: 'fluentvalidation-ts',
            validate(value: unknown) {
                // We trust caller to give T at runtime; FV will compute errors.
                const errors = (validator as Validator<T>).validate(value as T);
                const issues = collectIssues(errors);
                return issues.length === 0 ? { value: value as T } : { issues };
            },
            types: undefined as unknown as StandardSchemaV1.Types<T, T>,
        },
    };
}

export function standardFromFluentAsync<T>(
    validator: AsyncValidator<T>
): StandardSchemaV1<T> {
    return {
        '~standard': {
            version: 1,
            vendor: 'fluentvalidation-ts',
            async validate(value: unknown) {
                const errors = await (
                    validator as AsyncValidator<T>
                ).validateAsync(value as T);
                const issues = collectIssues(errors);
                return issues.length === 0 ? { value: value as T } : { issues };
            },
            types: undefined as unknown as StandardSchemaV1.Types<T, T>,
        },
    };
}
