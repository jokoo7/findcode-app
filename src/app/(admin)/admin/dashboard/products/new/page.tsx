'use client'

import { Button } from '@/components/ui/button'
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from '@/components/ui/extension/file-upload'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from '@/components/ui/extension/multi-select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TECH_STACKS } from '@/config'
import { formSchema } from '@/validations/product-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, Paperclip } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const dropZoneConfig = {
  maxFiles: 5,
  maxSize: 1024 * 1024 * 4,
  multiple: true
}

export default function Page() {
  const [files, setFiles] = React.useState<File[] | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      tech_stacks: [],
      price: 0,
      diskon: 0,
      sold: 0
    }
  })

  const { watch, setValue } = form
  const titleToSlug = watch('title')

  React.useEffect(() => {
    if (titleToSlug) {
      const generatedlug = titleToSlug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
      setValue('slug', generatedlug)
    } else {
      setValue('slug', '')
    }
  }, [setValue, titleToSlug])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log({ 'files: ': files, values })

    if (!files || files.length === 0) return
    const formData = new FormData()

    formData.append('title', values.title)
    formData.append('description', values.description ?? '')
    formData.append('slug', values.slug)
    formData.append('price', values.price.toString())
    formData.append('diskon', values.diskon.toString())
    formData.append('sold', values.sold.toString())
    formData.append('tech_stacks', JSON.stringify(values.tech_stacks))

    // Tambahkan file satu per satu ke FormData
    Array.from(files).forEach(file => {
      formData.append('images', file)
    })

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        console.log('gagal bg')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="mx-auto mb-10 max-w-3xl">
        <h1 className="mb-4 text-2xl font-medium">Create new product</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select File</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={files => setFiles(files)}
                      dropzoneOptions={dropZoneConfig}
                      className="relative rounded-lg bg-background p-2"
                    >
                      <FileInput id="fileInput" className="outline-dashed outline-1 outline-slate-500">
                        <div className="flex w-full flex-col items-center justify-center p-8">
                          <CloudUpload className="h-10 w-10 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>Select a file to upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nextnime App" required />
                  </FormControl>
                  <FormDescription>Masukkan title ptoject.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormDescription>Slug dari title project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tech_stacks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stacks</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-xs"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select Tach Stacks" className="text-sm" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {TECH_STACKS.map(tech => (
                            <MultiSelectorItem key={tech.value} value={tech.value}>
                              {tech.label}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormDescription>Masukkan multiple tech stack.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormDescription>Masukkan price.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diskon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diskon</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormDescription>Masukkan diskon.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sold</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormDescription>Masukkan sold.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Placeholder" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>masukkan description product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  )
}
