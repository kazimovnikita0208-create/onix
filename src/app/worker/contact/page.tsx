'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { OnixBackground } from '@/components/ui/onix-background'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Ship, 
  ArrowLeft, 
  MessageCircle, 
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

// Моковые данные для контактов
const contacts = [
  {
    id: 1,
    name: "Александр Иванов",
    position: "Руководитель сборки",
    telegram: "@alex_ivanov",
    phone: "+7 (999) 123-45-67",
    email: "a.ivanov@onixboats.com",
    availability: "9:00 - 18:00",
    status: "online"
  },
  {
    id: 2,
    name: "Мария Петрова",
    position: "Заместитель руководителя",
    telegram: "@maria_petrova",
    phone: "+7 (999) 234-56-78",
    email: "m.petrova@onixboats.com",
    availability: "10:00 - 19:00",
    status: "offline"
  }
]

const quickMessages = [
  "Нужна помощь с задачей",
  "Вопрос по техническим требованиям",
  "Проблема с оборудованием",
  "Запрос на дополнительное время",
  "Предложение по улучшению процесса"
]

export default function WorkerContactPage() {
  const { user } = useAuth()
  const [selectedContact, setSelectedContact] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [messageSent, setMessageSent] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessageSent(true)
      setMessage("")
      setTimeout(() => setMessageSent(false), 3000)
    }
  }

  const handleQuickMessage = (quickMessage: string) => {
    setMessage(quickMessage)
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
              <div className="h-8 w-auto">
                <img 
                  src="/logo.svg" 
                  alt="ONIX Boats" 
                  className="h-full w-auto filter brightness-0 invert"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight" style={{ color: '#F1F5F9' }}>ONIX</h1>
                <p className="text-sm font-medium" style={{ color: '#E7B652' }}>СВЯЗЬ С РУКОВОДСТВОМ</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(231, 182, 82, 0.2)' }}>
            <MessageCircle className="h-8 w-8" style={{ color: '#E7B652' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#F1F5F9' }}>Связь с руководством</h2>
          <p style={{ color: '#94A3B8' }}>Обратная связь и поддержка</p>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              className="backdrop-blur-md rounded-2xl p-4 border transition-all duration-300 cursor-pointer hover:shadow-xl"
              style={{ 
                backgroundColor: '#111827', 
                borderColor: selectedContact === contact.id ? '#E7B652' : '#1F2937'
              }}
              onClick={() => setSelectedContact(selectedContact === contact.id ? null : contact.id)}
              onMouseEnter={(e) => {
                if (selectedContact !== contact.id) {
                  e.currentTarget.style.borderColor = '#E7B652';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(231, 182, 82, 0.1), 0 10px 10px -5px rgba(231, 182, 82, 0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedContact !== contact.id) {
                  e.currentTarget.style.borderColor = '#1F2937';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(231, 182, 82, 0.2)' }}>
                    <MessageCircle className="h-5 w-5" style={{ color: '#E7B652' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: '#F1F5F9' }}>
                      {contact.name}
                    </h3>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>
                      {contact.position}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 rounded-full" style={{
                        backgroundColor: contact.status === 'online' ? '#22C55E' : '#94A3B8'
                      }} />
                      <span className="text-xs" style={{ color: '#F1F5F9' }}>
                        {contact.status === 'online' ? 'В сети' : 'Не в сети'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedContact === contact.id && (
                <div className="space-y-3 pt-3" style={{ borderTop: '1px solid #1F2937' }}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4" style={{ color: '#94A3B8' }} />
                      <span style={{ color: '#F1F5F9' }}>{contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4" style={{ color: '#94A3B8' }} />
                      <span style={{ color: '#F1F5F9' }}>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4" style={{ color: '#94A3B8' }} />
                      <span style={{ color: '#F1F5F9' }}>{contact.availability}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm" style={{ color: '#F1F5F9' }}>Быстрые сообщения:</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickMessages.map((quickMessage, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickMessage(quickMessage)}
                          className="text-xs rounded-lg"
                          style={{
                            borderColor: '#1F2937',
                            color: '#94A3B8',
                            backgroundColor: 'transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#E7B652';
                            e.currentTarget.style.color = '#F1F5F9';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#1F2937';
                            e.currentTarget.style.color = '#94A3B8';
                          }}
                        >
                          {quickMessage}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm" style={{ color: '#F1F5F9' }}>Написать сообщение:</h4>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Введите ваше сообщение..."
                      className="w-full p-3 rounded-lg resize-none focus:outline-none"
                      style={{
                        backgroundColor: '#0E1A2B',
                        borderColor: '#1F2937',
                        color: '#F1F5F9',
                        border: '1px solid #1F2937'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#E7B652';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#1F2937';
                      }}
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="flex-1 rounded-lg font-semibold"
                        style={{
                          backgroundColor: message.trim() ? '#E7B652' : '#1F2937',
                          color: message.trim() ? '#0B1220' : '#94A3B8',
                          border: 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (message.trim()) {
                            e.currentTarget.style.backgroundColor = '#FFD06A';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (message.trim()) {
                            e.currentTarget.style.backgroundColor = '#E7B652';
                          }
                        }}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Отправить
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.open(`https://t.me/${contact.telegram.replace('@', '')}`, '_blank')}
                        className="rounded-lg"
                        style={{
                          borderColor: '#1F2937',
                          color: '#94A3B8',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#E7B652';
                          e.currentTarget.style.color = '#F1F5F9';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#1F2937';
                          e.currentTarget.style.color = '#94A3B8';
                        }}
                      >
                        Telegram
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Sent Confirmation */}
        {messageSent && (
          <div className="backdrop-blur-md rounded-2xl p-4 border" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: '#22C55E' }}>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" style={{ color: '#22C55E' }} />
              <span className="font-semibold" style={{ color: '#22C55E' }}>
                Сообщение отправлено!
              </span>
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="backdrop-blur-md rounded-2xl p-4 border" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }}>
          <h3 className="font-semibold mb-2" style={{ color: '#F1F5F9' }}>Экстренная связь</h3>
          <p className="text-sm mb-3" style={{ color: '#94A3B8' }}>
            Для срочных вопросов звоните напрямую
          </p>
          <Button
            variant="outline"
            className="w-full rounded-lg font-semibold"
            onClick={() => window.open('tel:+79991234567')}
            style={{
              borderColor: '#EF4444',
              color: '#EF4444',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#EF4444';
              e.currentTarget.style.color = '#F1F5F9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#EF4444';
            }}
          >
            <Phone className="h-4 w-4 mr-2" />
            +7 (999) 123-45-67
          </Button>
        </div>
      </div>
    </OnixBackground>
  )
}


