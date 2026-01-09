"use client";

import { KeyboardShortcut } from "@/hooks/useKeyboardShortcuts";

interface KeyboardShortcutsHelpProps {
    shortcuts: KeyboardShortcut[];
    show: boolean;
    onClose: () => void;
}

export function KeyboardShortcutsHelp({ shortcuts, show, onClose }: KeyboardShortcutsHelpProps) {
    if (!show) return null;

    const formatKey = (shortcut: KeyboardShortcut) => {
        const parts: string[] = [];
        if (shortcut.ctrl) parts.push('⌘');
        if (shortcut.shift) parts.push('⇧');
        if (shortcut.alt) parts.push('⌥');

        const keyDisplay = shortcut.key === 'ArrowRight' ? '→' :
            shortcut.key === 'ArrowLeft' ? '←' :
                shortcut.key === 'ArrowUp' ? '↑' :
                    shortcut.key === 'ArrowDown' ? '↓' :
                        shortcut.key.toUpperCase();

        parts.push(keyDisplay);
        return parts.join(' + ');
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
                <div className="space-y-3">
                    {shortcuts.map((shortcut, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="text-white/70">{shortcut.description}</span>
                            <kbd className="px-2 py-1 bg-white/10 rounded text-sm font-mono">
                                {formatKey(shortcut)}
                            </kbd>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-white/40 mt-4">
                    Press <kbd className="px-1 bg-white/10 rounded">?</kbd> to toggle this help
                </p>
            </div>
        </div>
    );
}
