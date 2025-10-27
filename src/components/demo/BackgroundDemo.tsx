'use client'

import { EtherealBackground } from '@/components/ui/ethereal-background'
import { Ship, Waves } from 'lucide-react'

export function BackgroundDemo() {
  return (
    <div className="w-full h-screen">
      <EtherealBackground
        color="rgba(128, 128, 128, 1)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 1, scale: 1.2 }}
        sizing="fill"
        className="w-full h-full"
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <Ship className="h-16 w-16 text-blue-600 mr-4" />
              <div className="flex items-center space-x-2">
                <Waves className="h-6 w-6 text-blue-600" />
                <Waves className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h1 className="md:text-7xl text-6xl lg:text-8xl font-bold text-center text-foreground relative z-20 mb-4">
              Onix Boats
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
              Система управления производством лодок премиум-класса
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-blue-600">
            <Waves className="h-6 w-6" />
            <span className="text-lg font-medium">Анимированный фон</span>
            <Waves className="h-6 w-6" />
          </div>
        </div>
      </EtherealBackground>
    </div>
  )
}
