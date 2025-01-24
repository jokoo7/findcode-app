'use client'

import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Slash } from 'lucide-react'
import { Fragment } from 'react'

export default function BreadcrumbRoute() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  // Daftar kata kunci untuk menghapus segmen terakhir
  const keywordsToExclude = ['edit', 'view', 'detail']

  // Periksa apakah segmen terakhir mengandung kata kunci tertentu
  const shouldExcludeLastSegment = keywordsToExclude.some(keyword =>
    segments[segments.length - 2]?.toLowerCase().includes(keyword)
  )

  // Filter segmen
  const filteredSegments = shouldExcludeLastSegment
    ? segments.slice(0, -1) // Hapus segmen terakhir
    : segments // Pertahankan semua segmen

  const filteredSegmentsIfMany =
    filteredSegments.length > 2 ? filteredSegments.slice(-2) : filteredSegments

  // Format label segmen
  const segmentLabels = (segment: string) =>
    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        {filteredSegments.length > 2 && (
          <Fragment>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </Fragment>
        )}
        {filteredSegmentsIfMany.map((seg, index) => {
          return (
            <Fragment key={seg}>
              <BreadcrumbItem>{segmentLabels(seg)}</BreadcrumbItem>
              {index < filteredSegmentsIfMany.length - 1 && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
