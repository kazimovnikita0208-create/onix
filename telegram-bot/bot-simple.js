const { Telegraf } = require('telegraf');
require('dotenv').config();

// Принудительно загружаем переменные
process.env.WEB_APP_URL = process.env.WEB_APP_URL || 'https://www.apple.com/';

// Проверяем переменные окружения
console.log('🔑 BOT_TOKEN:', process.env.BOT_TOKEN ? '✅ Установлен' : '❌ Не найден');
console.log('🌐 WEB_APP_URL:', process.env.WEB_APP_URL || '❌ Не установлен');
console.log('📁 Текущая директория:', process.cwd());
console.log('📄 Содержимое .env файла:');
try {
  const fs = require('fs');
  const envContent = fs.readFileSync('.env', 'utf8');
  console.log(envContent);
} catch (err) {
  console.log('❌ Ошибка чтения .env файла:', err.message);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

// Команда /start
bot.start((ctx) => {
  const welcomeMessage = `
🚢 *Добро пожаловать в систему управления производством лодок!*

Здесь вы можете:
• Просматривать свои задачи
• Отслеживать прогресс сборки катеров
• Получать уведомления о новых заданиях

*Нажмите кнопку ниже, чтобы открыть веб-приложение.*
  `;

  ctx.reply(welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '📊 Моя статистика',
            callback_data: 'stats'
          },
          {
            text: '📋 Мои задачи',
            callback_data: 'tasks'
          }
        ],
        [
          {
            text: 'ℹ️ Помощь',
            callback_data: 'help'
          }
        ],
        [
          {
            text: '🌐 Открыть веб-приложение',
            web_app: { url: process.env.WEB_APP_URL || 'https://www.apple.com/' }
          }
        ]
      ]
    }
  });
});

// Обработка callback кнопок
bot.action('stats', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('📊 *Ваша статистика:*\n\n• Выполнено задач: 15\n• В работе: 3\n• Процент выполнения: 85%\n• Рейтинг: ⭐⭐⭐⭐⭐\n\n*Веб-приложение будет доступно для детальной статистики.*', {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🔙 Назад',
            callback_data: 'back_to_main'
          }
        ]
      ]
    }
  });
});

bot.action('tasks', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('📋 *Ваши задачи:*\n\n• Установка двигателя (В работе)\n• Прокладка электропроводки (Ожидает)\n• Отделка салона (Выполнено)\n\n*Веб-приложение будет доступно для управления задачами.*', {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🔙 Назад',
            callback_data: 'back_to_main'
          }
        ]
      ]
    }
  });
});

bot.action('help', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('ℹ️ *Помощь:*\n\n• Используйте кнопки меню для навигации\n• Веб-приложение будет доступно после развертывания\n• Для получения поддержки обращайтесь к администратору\n\n*Функции веб-приложения:*\n• Полное управление задачами\n• Детальная статистика\n• Управление катерами\n• Работа с командой', {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🔙 Назад',
            callback_data: 'back_to_main'
          }
        ]
      ]
    }
  });
});

// Обработчик для Web App кнопки (не нужен, так как кнопка открывает веб-приложение напрямую)

bot.action('back_to_main', (ctx) => {
  ctx.answerCbQuery();
  // Возвращаемся к главному меню
  const welcomeMessage = `
🚢 *Добро пожаловать в систему управления производством лодок!*

Здесь вы можете:
• Просматривать свои задачи
• Отслеживать прогресс сборки катеров
• Получать уведомления о новых заданиях

*Нажмите кнопку ниже, чтобы открыть веб-приложение.*
  `;

  ctx.editMessageText(welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '📊 Моя статистика',
            callback_data: 'stats'
          },
          {
            text: '📋 Мои задачи',
            callback_data: 'tasks'
          }
        ],
        [
          {
            text: 'ℹ️ Помощь',
            callback_data: 'help'
          }
        ],
        [
          {
            text: '🌐 Открыть веб-приложение',
            web_app: { url: process.env.WEB_APP_URL || 'https://www.apple.com/' }
          }
        ]
      ]
    }
  });
});

// Обработка текстовых сообщений
bot.on('text', (ctx) => {
  ctx.reply('Используйте кнопки меню для навигации или команду /start для возврата в главное меню.');
});

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error('Ошибка бота:', err);
  ctx.reply('Произошла ошибка. Попробуйте позже или обратитесь к администратору.');
});

// Запуск бота
console.log('🔄 Запуск Telegram бота...');
console.log('🔑 Токен бота:', process.env.BOT_TOKEN ? '✅ Установлен' : '❌ Не найден');

bot.launch().then(() => {
  console.log('🚀 Telegram бот успешно запущен!');
  console.log('📱 Бот готов к работе');
  console.log('💬 Отправьте /start боту для тестирования');
}).catch((err) => {
  console.error('❌ Ошибка запуска бота:', err);
  process.exit(1);
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
