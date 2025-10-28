'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { OnixBackground } from '@/components/ui/onix-background'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  HelpCircle, 
  FileText,
  Download,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

// Моковые данные для документов
const documents = [
  {
    id: 1,
    title: "Инструкция по сборке корпуса",
    category: "Корпус",
    description: "Подробное руководство по сборке корпуса катера",
    type: "PDF",
    size: "2.4 MB"
  },
  {
    id: 2,
    title: "Электромонтажные работы",
    category: "Электрика",
    description: "Схемы и инструкции по прокладке кабелей",
    type: "PDF",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Установка двигателя",
    category: "Двигатель",
    description: "Пошаговая инструкция по установке двигателя",
    type: "PDF",
    size: "3.2 MB"
  },
  {
    id: 4,
    title: "Отделочные работы",
    category: "Интерьер",
    description: "Руководство по внутренней отделке",
    type: "PDF",
    size: "1.5 MB"
  },
  {
    id: 5,
    title: "Техника безопасности",
    category: "Безопасность",
    description: "Правила безопасности на производстве",
    type: "PDF",
    size: "1.2 MB"
  }
]

const categories = ["Все", "Корпус", "Электрика", "Двигатель", "Интерьер", "Безопасность"]

export default function WorkerHelpPage() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState("Все")

  const filteredDocuments = selectedCategory === "Все" 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory)

  const handleDownload = (documentId: number) => {
    // Здесь будет логика скачивания документа
    console.log(`Downloading document ${documentId}`)
  }

  return (
    <OnixBackground>
      {/* Header */}
      <header className="backdrop-blur-md border-b" style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}>
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/worker">
                <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#111827';
                          e.currentTarget.style.color = '#E7B652';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#F1F5F9';
                        }}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="h-10 w-auto">
                <img 
                  src="/logo.svg" 
                  alt="ONIX Boats" 
                  className="h-full w-auto"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight" style={{ color: '#F1F5F9' }}>ONIX</h1>
                <p className="text-sm font-medium" style={{ color: '#E7B652' }}>ПОМОЩЬ</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(167, 199, 255, 0.2)' }}>
            <HelpCircle className="h-8 w-8" style={{ color: '#A7C7FF' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#F1F5F9' }}>Центр помощи</h2>
          <p style={{ color: '#94A3B8' }}>Документы и инструкции для работы</p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-lg"
              style={{
                backgroundColor: selectedCategory === category ? '#E7B652' : 'transparent',
                color: selectedCategory === category ? '#0B1220' : '#94A3B8',
                borderColor: selectedCategory === category ? '#E7B652' : '#1F2937'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = '#A7C7FF';
                  e.currentTarget.style.color = '#F1F5F9';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = '#1F2937';
                  e.currentTarget.style.color = '#94A3B8';
                }
              }}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="backdrop-blur-md rounded-2xl p-4 border transition-all duration-300 hover:shadow-xl"
                 style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.borderColor = '#A7C7FF';
                   e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(167, 199, 255, 0.1), 0 10px 10px -5px rgba(167, 199, 255, 0.04)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.borderColor = '#1F2937';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(167, 199, 255, 0.2)' }}>
                    <FileText className="h-5 w-5" style={{ color: '#A7C7FF' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1" style={{ color: '#F1F5F9' }}>
                      {document.title}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: '#94A3B8' }}>
                      {document.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs" style={{ color: '#94A3B8' }}>
                      <span>{document.category}</span>
                      <span>•</span>
                      <span>{document.type}</span>
                      <span>•</span>
                      <span>{document.size}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(document.id)}
                  className="rounded-lg"
                  style={{
                    borderColor: '#A7C7FF',
                    color: '#A7C7FF',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#A7C7FF';
                    e.currentTarget.style.color = '#0B1220';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#A7C7FF';
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Скачать
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg"
                  style={{ color: '#94A3B8' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F1F5F9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94A3B8';
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Просмотр
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: '#94A3B8' }} />
            <p style={{ color: '#94A3B8' }}>Документы в этой категории не найдены</p>
          </div>
        )}

        {/* Contact Support */}
        <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <h3 className="font-semibold mb-2" style={{ color: '#F1F5F9' }}>Нужна дополнительная помощь?</h3>
          <p className="text-sm mb-4" style={{ color: '#94A3B8' }}>
            Обратитесь к руководителю или в службу поддержки
          </p>
          <Link href="/worker/contact">
            <Button className="w-full rounded-lg font-semibold"
                    style={{ backgroundColor: '#E7B652', color: '#0B1220' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFD06A';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#E7B652';
                    }}>
              Связаться с руководством
            </Button>
          </Link>
        </div>
      </div>
    </OnixBackground>
  )
}


