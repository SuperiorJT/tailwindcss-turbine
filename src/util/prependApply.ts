export const prependApply = (style: string) => {
    const trimmed = style.trim();
    if (!trimmed.startsWith('@apply')) {
        return '@apply ' + trimmed;
    }
    return style;
};