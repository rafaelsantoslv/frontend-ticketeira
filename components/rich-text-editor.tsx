"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Heading1, Heading2, Heading3, List, ListOrdered } from "lucide-react"
import Placeholder from "@tiptap/extension-placeholder"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder || "Write something...",
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class:
                    "min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto prose prose-sm max-w-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) {
        return null
    }

    const setHeading = (level: 1 | 2 | 3) => {
        editor.chain().focus().toggleHeading({ level }).run()
    }

    const toggleBold = () => {
        editor.chain().focus().toggleBold().run()
    }

    const toggleBulletList = () => {
        editor.chain().focus().toggleBulletList().run()
    }

    const toggleOrderedList = () => {
        editor.chain().focus().toggleOrderedList().run()
    }

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex flex-wrap gap-1 border rounded-md p-1 bg-muted/20">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setHeading(1)}
                    className={cn("h-8 px-2 py-1", editor.isActive("heading", { level: 1 }) && "bg-muted")}
                    type="button"
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setHeading(2)}
                    className={cn("h-8 px-2 py-1", editor.isActive("heading", { level: 2 }) && "bg-muted")}
                    type="button"
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setHeading(3)}
                    className={cn("h-8 px-2 py-1", editor.isActive("heading", { level: 3 }) && "bg-muted")}
                    type="button"
                >
                    <Heading3 className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleBold}
                    className={cn("h-8 px-2 py-1", editor.isActive("bold") && "bg-muted")}
                    type="button"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleBulletList}
                    className={cn("h-8 px-2 py-1", editor.isActive("bulletList") && "bg-muted")}
                    type="button"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleOrderedList}
                    className={cn("h-8 px-2 py-1", editor.isActive("orderedList") && "bg-muted")}
                    type="button"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
            </div>
            <EditorContent editor={editor} className="w-full overflow-hidden rounded-md" />
        </div>
    )
}
