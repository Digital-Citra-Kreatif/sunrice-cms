/** A field's validation message, under it (its own module: many pages show one without the field inputs). */
export function FieldError({ message, id }: { message?: string; id?: string }) {
    return message ? <p id={id} className="cms:text-sm cms:text-destructive">{message}</p> : null;
}
