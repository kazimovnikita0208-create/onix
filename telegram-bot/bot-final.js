const { Telegraf } = require('telegraf');

// Устанавливаем переменные напрямую
process.env.BOT_TOKEN = '8368275151:AAF9r4WtDRW39EPAv35vHJ4FA1I6AT6P71Q';
process.env.WEB_APP_URL = 'https://onix-wheat.vercel.app/';

const bot = new Telegraf(process.env.BOT_TOKEN);

// Команда /start
bot.start((ctx) => {
  const welcomeMessage = `
🚢 *Добро пожаловать в ONIX Boats!*

Система управления производством премиальных алюминиевых лодок:

👨‍💼 *Для руководителей:*
• Управление сборкой катеров
• Назначение задач работникам
• Анализ статистики и производительности

👷 *Для работников:*
• Просмотр назначенных задач
• Обновление статуса выполнения
• Связь с руководством

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
            web_app: { url: 'https://onix-wheat.vercel.app/' }
          }
        ]
      ]
    }
  });
});

// Обработка callback кнопок
bot.action('stats', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('📊 *Статистика ONIX Boats:*\n\n• Всего катеров в производстве: 12\n• Завершено сборок: 7\n• В работе: 4\n• Эффективность: 87%\n• Сдача в срок: 92%\n\n*Откройте веб-приложение для детальной аналитики по всем аспектам производства.*', {
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
  ctx.reply('📋 *Задачи ONIX Boats:*\n\n• Сборка корпуса ONIX 850 CABIN (В работе)\n• Установка двигателя ONIX 12X CRUISER (Ожидает)\n• Электромонтажные работы (Выполнено)\n• Отделочные работы (В работе)\n\n*Откройте веб-приложение для полного управления задачами и назначения работникам.*', {
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
  ctx.reply('ℹ️ *Помощь ONIX Boats:*\n\n• Выберите роль: Руководитель или Работник\n• Используйте веб-приложение для полного функционала\n• Для поддержки обращайтесь к администратору\n\n*Функции веб-приложения:*\n• 🏭 Управление сборкой катеров\n• 📊 Детальная статистика и аналитика\n• 👥 Управление работниками и задачами\n• 📱 Мобильная оптимизация для Telegram\n• 🎨 Премиальный корпоративный дизайн', {
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

bot.action('back_to_main', (ctx) => {
  ctx.answerCbQuery();
  // Возвращаемся к главному меню
  const welcomeMessage = `
🚢 *Добро пожаловать в ONIX Boats!*

Система управления производством премиальных алюминиевых лодок:

👨‍💼 *Для руководителей:*
• Управление сборкой катеров
• Назначение задач работникам
• Анализ статистики и производительности

👷 *Для работников:*
• Просмотр назначенных задач
• Обновление статуса выполнения
• Связь с руководством

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
            web_app: { url: 'https://onix-wheat.vercel.app/' }
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
console.log('🌐 URL веб-приложения: https://onix-wheat.vercel.app/');

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


