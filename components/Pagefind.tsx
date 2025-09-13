import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'

declare global {
  interface Window {
    pagefind: any
  }
}

const MAX_RESULT_COUNT = 5

export const Pagefind = () => {
  const [searchApi, setSearchApi] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      if (window.pagefind) {
        setSearchApi(() => window.pagefind)
        setLoading(false)
        return
      }
      try {
        const pagefind = await import(
          // @ts-expect-error pagefind.js is an external resource
          '/pagefind/pagefind.js'
        )
        await pagefind.options({
          load_meta: ['title'],
        })
        setSearchApi(() => pagefind)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!searchApi) {
      return
    }
    const searchTerm = e.target.value
    if (searchTerm.length < 2) {
      setResults([])
      return
    }
    const search = await searchApi.search(searchTerm)
    const data = await Promise.all(search.results.map((r: any) => r.data()))
    setResults(data)
  }

  if (loading) {
    return <div>Loading search...</div>
  }

  if (!searchApi) {
    return <div>Search not available.</div>
  }

  return (
    <div>
      <Input
        type='text'
        className='min-w-xs'
        placeholder='Search'
        onChange={onSearch}
      />
      {Boolean(results && results.length) && (
        <ul className='fixed px-2 border border-gray-200 rounded-md bg-gray-50 w-xs top-menubar-height-mobile md:top-menubar-height'>
          {results.slice(0, MAX_RESULT_COUNT).map((r) => (
            <li key={r.url} className='pt-2 mb-2 border-t border-gray-200 '>
              <a href={r.url} className='flex flex-col hover:underline'>
                <span className='font-semibold'>{r.meta.title}</span>
                <sub className='w-full text-sm text-gray-500 text-ellipsis line-clamp-2'>
                  {r.content}
                </sub>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
