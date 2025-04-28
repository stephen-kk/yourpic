'use client'

import { useState } from 'react'

const styles = [
  { key: 'auto', label: 'Auto', image: '/styles/auto.jpg' },
  { key: '3d-anime', label: '3D Anime', image: '/styles/3d-anime.jpg' },
  { key: '3d-model', label: '3D Model', image: '/styles/3d-model.jpg' },
  { key: 'japanese-anime', label: 'Japanese Anime', image: '/styles/jp-anime.jpg' },
  { key: 'movie', label: 'Movie', image: '/styles/movie.jpg' },
  { key: 'comic', label: 'Comic', image: '/styles/comic.jpg' }
]

export default function ImageToolsPage() {
  const [selectedStyle, setSelectedStyle] = useState('auto')
  const [prompt, setPrompt] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-3xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-sky-600 dark:text-sky-400">Select Style</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
          {styles.map(style => (
            <button
              key={style.key}
              onClick={() => setSelectedStyle(style.key)}
              className={`rounded-xl overflow-hidden ring-2 transition-all ${
                selectedStyle === style.key ? 'ring-sky-400' : 'ring-transparent'
              }`}
            >
              <img src={style.image} alt={style.label} className="w-full h-20 object-cover" />
              <div className="text-sm text-center py-1 font-medium dark:text-white">{style.label}</div>
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-2 text-sky-600 dark:text-sky-400">Creation Desc</h2>
        <textarea
          className="w-full border-2 border-sky-400 dark:border-sky-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl p-4 text-sm"
          placeholder="Describe the picture in your dream, such as 'quiet riverside sunset'..."
          rows={3}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-300">Try these:</span>
          {['Astronaut in Space', 'Medieval Castle', 'Volcanic Eruption'].map((tag, index) => (
            <button
              key={index}
              onClick={() => setPrompt(tag)}
              className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 px-3 py-1 rounded-full text-gray-700 dark:text-white"
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto text-gray-500 dark:text-gray-300">
            Encountering Issues?{' '}
            <a href="/contact" className="text-sky-500 underline">
              Contact Us
            </a>
          </span>
        </div>

        <div className="mt-6">
          <button className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold">
            Create now
          </button>
        </div>
      </div>
    </div>
  )
}
