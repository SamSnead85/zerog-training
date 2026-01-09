"use client";

import { useEffect, useCallback } from "react";

export interface KeyboardShortcut {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    action: () => void;
    description: string;
}

interface UseKeyboardShortcutsProps {
    shortcuts: KeyboardShortcut[];
    enabled?: boolean;
}

export function useKeyboardShortcuts({ shortcuts, enabled = true }: UseKeyboardShortcutsProps) {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!enabled) return;

        // Ignore if user is typing in an input
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
            return;
        }

        for (const shortcut of shortcuts) {
            const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
            const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
            const altMatch = shortcut.alt ? event.altKey : !event.altKey;
            const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

            if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
                event.preventDefault();
                shortcut.action();
                break;
            }
        }
    }, [shortcuts, enabled]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}

// Lesson-specific keyboard shortcuts
export function useLessonShortcuts({
    onNext,
    onPrevious,
    onToggleOutline,
    onToggleNotes,
    onMarkComplete,
}: {
    onNext?: () => void;
    onPrevious?: () => void;
    onToggleOutline?: () => void;
    onToggleNotes?: () => void;
    onMarkComplete?: () => void;
}) {
    const shortcuts: KeyboardShortcut[] = [
        {
            key: 'ArrowRight',
            action: () => onNext?.(),
            description: 'Next section',
        },
        {
            key: 'ArrowLeft',
            action: () => onPrevious?.(),
            description: 'Previous section',
        },
        {
            key: 'o',
            action: () => onToggleOutline?.(),
            description: 'Toggle outline',
        },
        {
            key: 'n',
            action: () => onToggleNotes?.(),
            description: 'Toggle notes',
        },
        {
            key: 'Enter',
            action: () => onMarkComplete?.(),
            description: 'Mark section complete',
        },
    ];

    useKeyboardShortcuts({ shortcuts });

    return shortcuts;
}
