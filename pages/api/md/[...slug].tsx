import type { NextApiRequest, NextApiResponse } from 'next'
import { marked } from 'marked'
import * as fs from 'fs'
import * as path from 'path'

 
type ResponseData = {
  message: string,
  q: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let q : string[] = req.query.slug ? req.query.slug as string[] : [""]
  let p : string = path.join(process.cwd(), "static", "md", ...q)
  let r : string | undefined
  fs.readFile(p + ".md", (err, data) => {
    if(!err && data) {
      console.log(data.toString())
      r = data.toString()
      res.status(200).json({ message: 'Hello from Next.js!', q: marked.parse(r!) as string})
    } else {
      res.status(500).json({ message: 'errpor', q: ""})
    }

  })

  //console.log(r!)


  //res.status(200).json({ message: 'Hello from Next.js!', q: r! })
}