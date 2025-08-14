# Права на методы

Права на выполнение тех или иных методов REST API регулируются с помощью механизма скоупов (SCOPE). Когда вы добавляете тиражное решение в партнерском кабинете или локальное решение на своем конкретном Битрикс24, вы указываете перечень необходимых скоупов Битрикс24 для работы конкретного приложения. 

Привязка к конкретному скоупу указывается в описании каждого метода REST в самом начале. Например,

> Scope: `CRM`
>
> Кто может выполнять метод: любой пользователь

Обратите также внимание на пометку «Кто может выполнять метод». Часть методов может вызываться только от имени пользователя с административными правами на конкретном Битрикс24.

Рассмотрим конкретную ситуацию, когда ваше решение интегрирует Битрикс24 с внешней телефонией и вы пользуетесь методами `telephony.externalcall.register` и `telephony.externalcall.finish`, которые добавляют в том числе лиды в CRM, но при этом не обращаетесь явно к методам CRM вроде `crm.lead.add` и `crm.activity.add`. В этом случае вашему приложению потребуется скоуп telephony, а вот скоуп crm — нет.

## Текущие скоупы Битрикс24

#|
|| **Код скоупа** | **Название скоупа**| **Инструмент Битрикс24**||
|| **ai_admin** | [Канал для регистрации пользовательского сервиса для обработки запросов](../ai/index.md)| Копилот ||
|| **biconnector** | [Коннектор BI-аналитики](../biconnector/index.md) | BIconnector ||
|| **bizproc** | [Бизнес-процессы](../bizproc/index.md) | Бизнес-процессы, RPA, роботы CRM ||
|| **booking** | [Онлайн-запись](../booking/index.md) | Онлайн-запись ||
|| **calendar** | [Календарь](../calendar/index.md) | Календарь ||
|| **call** | Телефония (совершение звонков). В скоуп входят методы: [voximplant.infocall.startwithsound](../telephony/voximplant/voximplant-infocall-start-with-sound.md), [voximplant.infocall.startwithtext](../telephony/voximplant/voximplant-infocall-start-with-text.md)| Телефония ||
|| **cashbox** | [Кассы](../sale/cashbox/index.md) | Кассы ||
|| **catalog** | [Торговый каталог](../catalog/index.md) | Торговый каталог, складской учет ||
|| **crm** | [CRM](../crm/index.md) | CRM ||
|| **documentgenerator, crm.documentgenerator** | [Генератор документов](../document-generator/index.md), [Генератор документов CRM](../crm/document-generator/index.md) | Генератор документов ||
|| **delivery** | [Доставки](../sale/delivery/index.md) | Интернет-магазин, CRM ||
|| **department** | [Структура компании](../departments/index.md) | Структура компании ||
|| **disk** | [Диск](../disk/index.md) | Битрикс24.Диск ||
|| **entity** | [Хранилище данных](../entity/index.md) | Хранилище данных ||
|| **im** | [Чат и уведомления](../chats/index.md) | Чат и уведомления ||
|| **imbot** | [Создание и управление Чат-ботами](../chat-bots/index.md) | Боты для чата ||
|| **imopenlines** | [Открытые линии](../imopenlines/index.md) | Открытые линии ||
|| **landing** | [Сайты](../landing/index.md) | Сайты ||
|| **lists** | [Списки](../lists/index.md) | Универсальные списки ||
|| **log** | [Живая лента](../log/index.md) | Лента новостей ||
|| **mailservice** | [Почтовые сервисы](../mailservice/index.md) | Почтовые сервисы ||
|| **messageservice** | [Служба сообщений](../messageservice/index.md) | Служба сообщений ||
|| **pay_system** | [Платежные системы](../pay-system/index.md) | Платежные системы ||
|| **pull** | [Pull&Push](../interactivity/push-and-pull/index.md) | Pull&Push ||
|| **rpa** | [Роботизация бизнеса](../outdated/rpa/index.md) | Роботизация бизнеса ||
|| **sale** | [Интернет-магазин](../sale/index.md) | Интернет-магазин ||
|| **sign.b2e** | [КЭДО + Госключ](../sign/index.md) | КЭДО, Подпись ||
|| **sonet_group, socialnetwork** | [Рабочие группы соцсети](../sonet-group/sonet-group-create.md) | Рабочие группы соцсети ||
|| **task** | [Задачи](../tasks/index.md) | Задачи ||
|| **telephony** | [Телефония](../telephony/index.md) | Телефония ||
|| **timeman** | [Учет рабочего времени](../timeman/index.md) | Учет рабочего времени ||
|| **user** | [Пользователи](../user/index.md) 
Версии: 
- **user_brief** — Пользователи (минимальный) 
- **user_basic** — Пользователи (базовый) | Пользователи ||
|| **user.userfield** | [Пользовательские поля пользователя](../user/userfields/index.md) | Пользовательские поля ||
|| **userfieldconfig** | [Настройки пользовательских полей](../crm/universal/userfieldconfig/index.md) | Настройки пользовательских полей ||
|| **userconsent** | [Работа с соглашениями](../user-consent/index.md) | Работа с соглашениями ||
|| **vote** | [Опросы](../vote/index.md) | Работа с опросами, голосованиями ||
|#

[*ключ_task]: Кроме этого, доступны еще три устаревших скоупа — tasks, tasks_extended, tasksmobile. Их не нужно использовать.