import { type Editor } from '@tiptap/react'
import { Bold, Italic, Underline, Link, List, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { EditorContent } from '@tiptap/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface RichTextEditorProps {
  editor: Editor | null
}

export function RichTextEditor({ editor }: RichTextEditorProps) {
  const [url, setUrl] = useState<string>('')

  if (!editor) {
    return null
  }

  const addLink = () => {
    if (url === '') {
      return
    }

    // Check if the URL has a protocol, if not add https://
    const validUrl = url.match(/^https?:\/\//) ? url : `https://${url}`

    editor.chain().focus().setLink({ href: validUrl }).run()
    setUrl('')
  }

  return (
    <div className="border border-input bg-transparent rounded-md">
      <div className="flex items-center gap-1 p-1 border-b">
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('underline')}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Toggle>
        <div className="flex items-center gap-0.5 ml-1">
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: 'left' })}
            onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: 'center' })}
            onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: 'right' })}
            onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive('link')}
            >
              <Link className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3">
            <div className="flex gap-2">
              <Input
                placeholder="Paste link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addLink}>Add</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="prose prose-sm max-w-none p-3 min-h-[150px]">
        <EditorContent editor={editor} className="outline-none" />
      </div>
    </div>
  )
}