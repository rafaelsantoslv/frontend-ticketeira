import StarterKit from "@tiptap/starter-kit"
import TiptapUnderline from "@tiptap/extension-underline"
import { useEditor, EditorContent } from "@tiptap/react"
import { EditTextMenuBar } from "../modules/eventos/components/EditTextMenuBar"

export const Tiptap = ({ onChange, content }) => {
    const editor = useEditor({
        extensions: [StarterKit, TiptapUnderline],
        content: content || "",
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "focus:outline-none",
            },
        },
    })

    return (
        <div className="border rounded-md">
            <EditTextMenuBar editor={editor} />
            <div className="p-2 min-h-[150px] prose prose-sm max-w-none focus-within:outline-none">
                <EditorContent editor={editor} className="focus:outline-none" />
            </div>
        </div>
    )
}