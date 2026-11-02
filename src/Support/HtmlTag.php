<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

/**
 * Reads the attributes of one start tag of stored (sanitised) HTML, for
 * the render-time passes over rich text (RichTextImages, RichTextLinks).
 *
 * @internal
 */
final class HtmlTag
{
    /** One attribute of a tag: its name, and its value in double, single or no quotes. */
    private const ATTRIBUTE = '/\s([^\s"\'>\/=]++)(?:\s*+=\s*+(?:"([^"]*+)"|\'([^\']*+)\'|([^\s>]++)))?/';

    /**
     * A start tag's attributes ("<a href=…>"), by lowercase name (the
     * first of a name counts, as in browsers), their values decoded.
     *
     * @return array<string, string>
     */
    public static function attributes(string $tag): array
    {
        $name = strcspn($tag, " \t\n\r\f/>", 1) + 1;
        preg_match_all(self::ATTRIBUTE, substr($tag, $name), $matches, PREG_SET_ORDER | PREG_UNMATCHED_AS_NULL);
        $attributes = [];
        foreach ($matches as $match) {
            $key = strtolower((string) $match[1]);
            $value = $match[2] ?? $match[3] ?? $match[4] ?? '';
            $attributes[$key] ??= str_contains($value, '&') ? html_entity_decode($value, ENT_QUOTES | ENT_HTML5, 'UTF-8') : $value;
        }

        return $attributes;
    }

    /** An attribute as printed: ` name="value"`, the value escaped. */
    public static function attribute(string $name, string $value): string
    {
        return ' '.$name.'="'.htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML5, 'UTF-8').'"';
    }

    /**
     * The start tag with the first attribute of that name given a new value
     * (however it was quoted), or with the attribute added before its end.
     */
    public static function withAttribute(string $tag, string $name, string $value): string
    {
        $start = strcspn($tag, " \t\n\r\f/>", 1) + 1;
        $rest = substr($tag, $start);
        if (preg_match_all(self::ATTRIBUTE, $rest, $matches, PREG_SET_ORDER | PREG_OFFSET_CAPTURE) > 0) {
            foreach ($matches as $match) {
                if (strtolower($match[1][0]) === strtolower($name)) {
                    return substr($tag, 0, $start + $match[0][1]).self::attribute($name, $value).substr($rest, $match[0][1] + strlen($match[0][0]));
                }
            }
        }
        $closing = str_ends_with($tag, '/>') ? ' />' : '>';

        return rtrim(substr($tag, 0, -strlen(trim($closing)))).self::attribute($name, $value).$closing;
    }
}
