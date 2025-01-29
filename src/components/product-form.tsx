'use client'

import { Button } from '@/components/ui/button'
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from '@/components/ui/extension/file-upload'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PRODUCT_CATEGORIES as productCategories } from '@/constants/product-categories'
import { CloudUpload, Paperclip } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { TagsInput } from './ui/extension/tags-input'
import { Switch } from './ui/switch'

type FilesProps = {
  files: File[] | null
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>
}

interface IProps {
  filesState: FilesProps
  form: UseFormReturn<
    {
      title: string
      slug: string
      category: string
      price: number
      discountPrice: number
      techStacks: string[]
      tags: string[]
      sold: number
      isPublished: boolean
      imagesUrls?: any[] | undefined
      description?: string | undefined
      demoUrl?: string | undefined
      documentationUrl?: string | undefined
      fileUrl?: string | undefined
    },
    any,
    undefined
  >
  onSubmit: () => void
  isLoading: boolean
  labelButton: string
}

const dropZoneConfig = {
  maxFiles: 5,
  maxSize: 1024 * 1024 * 4,
  multiple: true
}

const ProductForm = ({ form, filesState, onSubmit, isLoading, labelButton }: IProps) => {
  const { files, setFiles } = filesState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* imagesUrls */}
        <FormField
          control={form.control}
          name="imagesUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Images</FormLabel>
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
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
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

        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} required disabled={isLoading} />
              </FormControl>
              <FormDescription>Masukkan title project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* slug */}
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

        {/* category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-muted-foreground">
                    <SelectValue placeholder="Select a category product." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productCategories.map(cat => (
                    <SelectItem disabled={isLoading} key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Masukkan apa saja category product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* tach stacks */}
        <FormField
          control={form.control}
          name="techStacks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stacks</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tech stacks"
                />
              </FormControl>
              <FormDescription>Masukkan tech stacks product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              <FormDescription>Masukkan tags product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* price, diskon, sold */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>Masukkan price.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discountPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diskon Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                    disabled={isLoading}
                  />
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
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    onChange={e => field.onChange(Number(e.target.value) || 0)}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>Masukkan total sold.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* demoUrl */}
        <FormField
          control={form.control}
          name="demoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demo URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" pattern="https?://.+" disabled={isLoading} />
              </FormControl>
              <FormDescription>Masukkan demo url project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* documentationUrl */}
        <FormField
          control={form.control}
          name="documentationUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documentation URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" pattern="https?://.+" disabled={isLoading} />
              </FormControl>
              <FormDescription>Masukkan doc url project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* fileUrl */}
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" pattern="https?://.+" disabled={isLoading} />
              </FormControl>
              <FormDescription>Masukkan file url project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* isPublish */}
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Publish</FormLabel>
                <FormDescription>Aktifkan ini jika product ingin langsung di publish.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly />
              </FormControl>
            </FormItem>
          )}
        />

        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={isLoading} {...field} />
              </FormControl>
              <FormDescription>masukkan description product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : labelButton}
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm
