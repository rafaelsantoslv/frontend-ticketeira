import { EditorContent } from "@tiptap/react"
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { useRichTextEditor } from "@/hooks/useRichEditor"

interface RichTextEditorProps {
    content: string
    onChange: (html: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const { editor } = useRichTextEditor(content, onChange)

    if (!editor) {
        return null
    }

    return (
        <div className="border rounded-md">
            <div className="flex items-center gap-1 mb-2 border rounded-md p-1 bg-muted/30">
                <Toggle
                    size="sm"
                    pressed={editor.isActive("bold")}
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    aria-label="Negrito"
                >
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive("italic")}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    aria-label="Itálico"
                >
                    <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive("underline")}
                    onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                    aria-label="Sublinhado"
                >
                    <Underline className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Toggle
                    size="sm"
                    pressed={editor.isActive("bulletList")}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    aria-label="Lista com marcadores"
                >
                    <List className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive("orderedList")}
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    aria-label="Lista numerada"
                >
                    <ListOrdered className="h-4 w-4" />
                </Toggle>
            </div>
            <div className="p-2 min-h-[150px] max-h-[150px] overflow-y-auto prose prose-sm max-w-none focus-within:outline-none">
                <EditorContent editor={editor} className="focus:outline-none" />
            </div>
        </div>
    )
}
