import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()
    const file = formData.get('image')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is not valid' }, { status: 400 })
    }

    const uploadPath = path.join(process.cwd(), 'public', 'uploads')

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }

    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.name)}`

    const filePath = path.join(uploadPath, uniqueName)

    const fileStream = fs.createWriteStream(filePath)
    const buffer = Buffer.from(await file.arrayBuffer())
    fileStream.write(buffer)
    fileStream.end()

    const fileUrl = `${process.env.NEXT_PUBLIC_ORIGIN}/uploads/${uniqueName}`

    return NextResponse.json({ image: fileUrl }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}
