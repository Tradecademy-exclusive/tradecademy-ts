'use client'

import dynamic from 'next/dynamic'

const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  {
    ssr: false,
  }
)

const TextEditor = ({
  content,
  setContent,
}: {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}) => {
  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }

  return (
    <div className='w-full'>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TMC_API_KEY}
        value={content}
        init={{
          height: 300,
          menubar: false,
          plugins: ['link', 'image', 'lists'],
          toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
        }}
        onEditorChange={(newValue) => handleEditorChange(newValue)}
      />
    </div>
  )
}

export default TextEditor
