"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Plus,
    GripVertical,
    Trash2,
    Edit3,
    ChevronDown,
    ChevronRight,
    PlayCircle,
    FileText,
    HelpCircle,
    Settings,
    Eye,
    Save,
    Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonItem {
    id: string;
    title: string;
    type: "video" | "text" | "quiz";
    duration: string;
}

interface Module {
    id: string;
    title: string;
    lessons: LessonItem[];
    isExpanded: boolean;
}

export function CourseBuilder() {
    const [courseTitle, setCourseTitle] = useState("Untitled Course");
    const [courseDescription, setCourseDescription] = useState("");
    const [modules, setModules] = useState<Module[]>([
        {
            id: "1",
            title: "Introduction",
            isExpanded: true,
            lessons: [
                { id: "1-1", title: "Welcome & Overview", type: "video", duration: "5 min" },
                { id: "1-2", title: "Course Objectives", type: "text", duration: "3 min" },
            ],
        },
        {
            id: "2",
            title: "Core Concepts",
            isExpanded: false,
            lessons: [
                { id: "2-1", title: "Fundamentals", type: "video", duration: "15 min" },
                { id: "2-2", title: "Key Principles", type: "text", duration: "10 min" },
                { id: "2-3", title: "Knowledge Check", type: "quiz", duration: "5 min" },
            ],
        },
    ]);

    const toggleModule = (moduleId: string) => {
        setModules(modules.map((m) =>
            m.id === moduleId ? { ...m, isExpanded: !m.isExpanded } : m
        ));
    };

    const addModule = () => {
        const newModule: Module = {
            id: Date.now().toString(),
            title: "New Module",
            isExpanded: true,
            lessons: [],
        };
        setModules([...modules, newModule]);
    };

    const addLesson = (moduleId: string, type: "video" | "text" | "quiz") => {
        setModules(modules.map((m) => {
            if (m.id === moduleId) {
                const newLesson: LessonItem = {
                    id: `${m.id}-${Date.now()}`,
                    title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
                    type,
                    duration: "0 min",
                };
                return { ...m, lessons: [...m.lessons, newLesson] };
            }
            return m;
        }));
    };

    const deleteModule = (moduleId: string) => {
        setModules(modules.filter((m) => m.id !== moduleId));
    };

    const deleteLesson = (moduleId: string, lessonId: string) => {
        setModules(modules.map((m) => {
            if (m.id === moduleId) {
                return { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) };
            }
            return m;
        }));
    };

    const getLessonIcon = (type: string) => {
        switch (type) {
            case "video": return <PlayCircle className="h-4 w-4 text-blue-500" />;
            case "text": return <FileText className="h-4 w-4 text-emerald-500" />;
            case "quiz": return <HelpCircle className="h-4 w-4 text-purple-500" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const totalDuration = modules.reduce((sum, m) =>
        sum + m.lessons.reduce((lSum, l) => lSum + parseInt(l.duration) || 0, 0), 0
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Course Builder</h1>
                    <p className="text-muted-foreground">Create and organize your course content</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                    </Button>
                    <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Course
                    </Button>
                </div>
            </div>

            {/* Course Info */}
            <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Course Title</label>
                        <input
                            type="text"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Thumbnail</label>
                        <button className="w-full h-10 px-3 rounded-lg bg-white/[0.02] border border-white/10 border-dashed text-sm text-muted-foreground hover:border-white/20 transition-colors flex items-center justify-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload image
                        </button>
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium mb-1.5 block">Description</label>
                        <textarea
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            placeholder="Describe what learners will achieve..."
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mt-4 pt-4 border-t border-border text-sm">
                    <span className="text-muted-foreground">{modules.length} modules</span>
                    <span className="text-muted-foreground">{totalLessons} lessons</span>
                    <span className="text-muted-foreground">{totalDuration} min total</span>
                </div>
            </Card>

            {/* Modules */}
            <div className="space-y-3">
                {modules.map((module, moduleIndex) => (
                    <Card key={module.id} className="overflow-hidden">
                        {/* Module Header */}
                        <div
                            className="p-4 flex items-center gap-3 cursor-pointer hover:bg-white/[0.02]"
                            onClick={() => toggleModule(module.id)}
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            {module.isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                            <span className="text-sm text-muted-foreground w-8">
                                {moduleIndex + 1}.
                            </span>
                            <input
                                type="text"
                                value={module.title}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setModules(modules.map((m) =>
                                        m.id === module.id ? { ...m, title: e.target.value } : m
                                    ));
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 bg-transparent border-0 font-medium focus:outline-none focus:ring-0"
                            />
                            <Badge variant="outline">{module.lessons.length} lessons</Badge>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteModule(module.id);
                                }}
                                className="p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                        </div>

                        {/* Lessons */}
                        {module.isExpanded && (
                            <div className="border-t border-border">
                                {module.lessons.map((lesson, lessonIndex) => (
                                    <div
                                        key={lesson.id}
                                        className="p-3 pl-16 flex items-center gap-3 border-b border-border last:border-0 hover:bg-white/[0.02] group"
                                    >
                                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab opacity-0 group-hover:opacity-100" />
                                        {getLessonIcon(lesson.type)}
                                        <span className="text-sm text-muted-foreground w-12">
                                            {moduleIndex + 1}.{lessonIndex + 1}
                                        </span>
                                        <input
                                            type="text"
                                            value={lesson.title}
                                            onChange={(e) => {
                                                setModules(modules.map((m) => {
                                                    if (m.id === module.id) {
                                                        return {
                                                            ...m,
                                                            lessons: m.lessons.map((l) =>
                                                                l.id === lesson.id ? { ...l, title: e.target.value } : l
                                                            ),
                                                        };
                                                    }
                                                    return m;
                                                }));
                                            }}
                                            className="flex-1 bg-transparent border-0 text-sm focus:outline-none focus:ring-0"
                                        />
                                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                            <Edit3 className="h-3 w-3" />
                                        </Button>
                                        <button
                                            onClick={() => deleteLesson(module.id, lesson.id)}
                                            className="p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="h-3 w-3 text-red-500" />
                                        </button>
                                    </div>
                                ))}

                                {/* Add Lesson */}
                                <div className="p-3 pl-16 flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => addLesson(module.id, "video")}
                                        className="gap-1 text-xs"
                                    >
                                        <PlayCircle className="h-3 w-3" />
                                        Video
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => addLesson(module.id, "text")}
                                        className="gap-1 text-xs"
                                    >
                                        <FileText className="h-3 w-3" />
                                        Text
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => addLesson(module.id, "quiz")}
                                        className="gap-1 text-xs"
                                    >
                                        <HelpCircle className="h-3 w-3" />
                                        Quiz
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            {/* Add Module */}
            <Button variant="outline" onClick={addModule} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Module
            </Button>
        </div>
    );
}
