//deprecated generate components so useing them differently
//import { generateComponents } from '@uploadthing/react'
import { generateReactHelpers } from '@uploadthing/react/hooks'
import {generateUploadDropzone} from '@uploadthing/react'
import {generateUploader} from '@uploadthing/react'
import {generateUploadButton} from '@uploadthing/react'
import type { OurFileRouter } from '@/app/api/uploadthing/core'

//export const { UploadButton, UploadDropzone, Uploader } =
//generateComponents<OurFileRouter>()

export const UploadButton = generateUploadDropzone<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const Uploader = generateUploader<OurFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>()
