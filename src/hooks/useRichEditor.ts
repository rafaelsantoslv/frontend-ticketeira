import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TiptapUnderline from "@tiptap/extension-underline"

export function useRichTextEditor(content: string, onChange: (html: string) => void) {
    const editor = useEditor({
        extensions: [StarterKit, TiptapUnderline],
        content: content || "<p>Descreva seu evento...</p>",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "focus:outline-none",
            },
        },
    })

    return { editor }
}
