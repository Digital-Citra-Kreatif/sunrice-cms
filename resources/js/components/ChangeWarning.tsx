import { TriangleAlert } from 'lucide-react';

/** A warning under an input whose new value can break things, as the panel's forms show one (Field::warnWhenChanged()). */
export function ChangeWarning({ id, children }: { id?: string; children: React.ReactNode }) {
    return (
        <p id={id} className="cms:flex cms:items-start cms:gap-2 cms:rounded-md cms:border cms:border-amber-500/40 cms:bg-amber-500/10 cms:px-3 cms:py-2 cms:text-sm cms:text-amber-900 cms:dark:text-amber-200">
            <TriangleAlert className="cms:mt-0.5 cms:size-4 cms:shrink-0" aria-hidden />
            <span className="cms:min-w-0 cms:[overflow-wrap:anywhere] cms:[&_code]:rounded cms:[&_code]:bg-amber-500/15 cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem]">{children}</span>
        </p>
    );
}
