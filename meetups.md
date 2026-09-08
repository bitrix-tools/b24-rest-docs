# Митапы, трансляции и записи выступлений для разработчиков

Митапы, вебинары и доклады с конференций Битрикс24 показывают, как разработчики решают задачи на REST API: собирают тиражные приложения, подключают BI-конструктор, обрабатывают события, встраивают виджеты и создают роботов. Ниже — записи выступлений от новых к старым.

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note warning "Записи отражают состояние API на дату выступления" %}

Подход и логика решения задачи остаются актуальными, но методы, параметры и ответы могли измениться. Перед разработкой сверяйтесь со [справочником REST API](./api-reference/index.md) и разделом [Что нового](./whats-new.md).

{% endnote %}

## Как выбрать запись {#how-to-choose}

#|
|| **Задача** | **Запись** ||
|| Начать разработку тиражного приложения с готового кода | [Шаблон тиражного приложения с библиотекой роботов](#app-template-automation-rules) ||
|| Подключить свой источник данных к BI-конструктору | [Коннекторы для Битрикс24 BI-Конструктор](#biconnector-meetup) ||
|| Познакомиться с B24PhpSDK, B24JsSDK и Bitrix24 UI Kit | [Презентации SDK и UI Kit на партнерской конференции](#sdk-presentations) ||
|| Разработать виджеты и шаблоны для Вайба | [Виджеты и шаблоны для Битрикс24 Вайб](#vibe-widgets) ||
|| Начать работу с B24PhpSDK | [B24PhpSDK: быстрый старт](#php-sdk-quick-start), [B24PhpSDK в локальном приложении](#php-sdk-local-app) ||
|| Сделать приложение на базе чатов | [Новый чат в Битрикс24](#chat-apps) ||
|| Принять оплату в сделке или смарт-процессе | [Приложение для оплаты через REST API в сделках и смарт-процессах](#ecommerce-payments) ||
|| Сделать приложение для CoPilot | [AI и CoPilot](#ai-copilot) ||
|| Разобраться, почему событие не пришло приложению | [Разбор механизма событий REST API](#events-mechanism) ||
|| Разобраться в механизме офлайн-событий | [Преимущества офлайн-событий](#offline-events) ||
|| Синхронизировать данные с внешней системой | [Виджеты в Битрикс24 и синхронизация данных](#widgets-sync) ||
|| Создать своих роботов | [Умные сценарии и развитие роботов](#robots-scenarios) ||
|| Создать свои триггеры для CRM | [REST для триггеров CRM](#crm-triggers) ||
|| Спроектировать облачную архитектуру приложения | [Архитектура приложений для высоких нагрузок](#cloud-architecture) ||
|| Получать объемные данные и работать в realtime | [Работа с объемными данными и realtime в приложениях](#rest-apps-tips) ||
|| Разобраться, что уходит в облако из коробочного Битрикс24 | [Приложения «под колпаком»: REST в коробочном Битрикс24](#on-premise-rest) ||
|| Выбрать фреймворк для интерфейса приложения | [Современный JS во фронтенде приложений Битрикс24](#modern-js) ||
|| Построить нестандартную воронку продаж | [Альтернативная воронка продаж на REST API](#sales-funnel) ||
|#

## Шаблон тиражного приложения с библиотекой роботов {#app-template-automation-rules}

Спикеры:

- Игорь Шевчик, разработчик, автор шаблона, B24JsSDK и Bitrix24 UI Kit
- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Материалы:

- [Шаблон приложения на GitHub](https://github.com/bitrix24/app-template-automation-rules) — исходный код шаблона
- [Роботы](./api-reference/bizproc/bizproc-robot/index.md) — методы для регистрации своих роботов
- [B24JsSDK](./sdk/b24jssdk/index.md) — справочник по SDK для JavaScript

<iframe src="https://vk.ru/video_ext.php?oid=-211967493&id=456240208&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

## Коннекторы для Битрикс24 BI-Конструктор {#biconnector-meetup} {#biconnectorMeetup}

Дата: 27.05.2025

Спикер:

- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Материалы:

- [Пример коннектора на GitHub](https://github.com/bitrix24/b24sdk-examples/tree/main/php/special/biconnector) — исходный код примера на PHP
- [B24PhpSDK на GitHub](https://github.com/bitrix24/b24phpsdk) — репозиторий SDK для PHP
- [BI-Конструктор](./api-reference/biconnector/index.md) — методы работы с BI-Конструктором
- [Коннекторы](./api-reference/biconnector/connector/index.md) — регистрация и настройка своего коннектора

<iframe src="https://vkvideo.ru/video_ext.php?oid=-211967493&id=456240207&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

## Презентации SDK и UI Kit на партнерской конференции {#sdk-presentations}

Дата: 26.11.2024

Спикер:

- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Материалы:

- [SDK Битрикс24](./sdk/index.md) — обзор всех официальных SDK
- [B24PhpSDK](./sdk/b24phpsdk/index.md) — справочник по SDK для PHP
- [B24JsSDK](./sdk/b24jssdk/index.md) — справочник по SDK для JavaScript

### B24PhpSDK {#sdk-presentations-php}

<iframe src="https://vkvideo.ru/video_ext.php?oid=-211967493&id=456240183&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

### B24JsSDK {#sdk-presentations-js}

<iframe src="https://vkvideo.ru/video_ext.php?oid=-211967493&id=456240184&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

### Bitrix24 UI Kit {#sdk-presentations-ui-kit}

<iframe src="https://vkvideo.ru/video_ext.php?oid=-211967493&id=456240185&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

## Виджеты и шаблоны для Битрикс24 Вайб {#vibe-widgets}

Дата: 08.11.2024

Третий эпизод цикла «Разработка на Битрикс24 REST API».

Спикеры:

- Дмитрий Самойлов, ведущий разработчик Битрикс24
- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Что разобрали:

- фронтенд и бэкенд виджетов
- интерактивные виджеты
- экспорт шаблонов и публикация в Битрикс24 Маркет.Плюс

Материалы:

- [Пример приложения](https://helpdesk.bitrix24.ru/examples/b24phpsdk-vibe24-widgets.zip) — архив с кодом виджетов и шаблонов
- [B24PhpSDK на GitHub](https://github.com/bitrix24/b24phpsdk) — репозиторий SDK для PHP
- [Вайб](./api-reference/vibe/index.md) — виджеты и интерактивные элементы Вайба
- [Виджеты](./api-reference/widgets/index.md) — места встройки и регистрация виджетов

<iframe src="https://vk.ru/video_ext.php?oid=-211967493&id=456240176&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

## B24PhpSDK в локальном приложении {#php-sdk-local-app}

Дата: 29.10.2024

Второй эпизод цикла «Разработка на Битрикс24 REST API».

Спикер:

- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Что разобрали:

- как подключить SDK к своему проекту
- как использовать SDK в локальном приложении
- какие инструменты разработчика использовать

Материалы:

- [Пример локального приложения](https://helpdesk.bitrix24.ru/examples/b24phpsdk-local-app-example.zip) — архив с кодом приложения
- [B24PhpSDK на GitHub](https://github.com/bitrix24/b24phpsdk) — репозиторий SDK для PHP
- [B24PhpSDK](./sdk/b24phpsdk/index.md) — справочник по SDK для PHP

<iframe src="https://vk.ru/video_ext.php?oid=-211967493&id=456240175&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

## B24PhpSDK: быстрый старт {#php-sdk-quick-start}

Дата: 21.10.2024

Первый эпизод цикла «Разработка на Битрикс24 REST API».

Спикер:

- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Что разобрали:

- в чем преимущества B24PhpSDK для работы с REST API Битрикс24
- как подключить SDK к своему проекту
- как использовать входящие вебхуки
- как работает автокомплит и приведение типов в среде разработки
- как использовать batch с помощью SDK

Материалы:

- [Пример работы с вебхуком](https://helpdesk.bitrix24.ru/examples/b24phpsdk-webhook-example.zip) — архив с кодом примера
- [B24PhpSDK на GitHub](https://github.com/bitrix24/b24phpsdk) — репозиторий SDK для PHP
- [B24PhpSDK](./sdk/b24phpsdk/index.md) — справочник по SDK для PHP

<iframe src="https://vk.ru/video_ext.php?oid=-211967493&id=456240173&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

## Новый чат в Битрикс24 {#chat-apps}

Дата: 13.12.2023

Выпуск цикла Bitrix Talks Tech.

Спикер:

- Евгений Шеленков, ведущий разработчик, тимлид команды «1С-Битрикс»

Что разобрали:

- создание своих приложений на базе чата
- обновленный интерфейс чата
- расширение линейки мест встройки
- планы по развитию чата

Материалы:

- [Чат-боты](./api-reference/chat-bots/index.md) — методы для разработки ботов и приложений чата

<iframe width="720" height="405" src="https://rutube.ru/play/embed/a14343edbd4eb1d4eab1168cda2e3d89/" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Приложение для оплаты через REST API в сделках и смарт-процессах {#ecommerce-payments}

Дата: 08.12.2023

Выпуск цикла Bitrix Talks Tech про e-commerce.

Спикер:

- Максим Лашков, ведущий разработчик, тимлид команды «1С-Битрикс»

Что разобрали:

- знакомство с REST API для оплаты
- live-coding приложения
- лучшие практики и подходы

Материалы:

- [Интернет-магазин](./api-reference/sale/index.md) — методы для работы с оплатой и заказами
- [Смарт-процессы](./api-reference/crm/universal/index.md) — методы универсальных объектов CRM

<iframe width="720" height="405" src="https://rutube.ru/play/embed/75c4a43985d9ca82cd6d73305c030d90/?p=-Yrp9RF2dSF9jL0uVTrnQw" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## AI и CoPilot {#ai-copilot}

Дата: 24.11.2023

Выпуск цикла Bitrix Talks Tech.

Спикеры:

- Тарас Вишник, разработчик «1С-Битрикс»
- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Что разобрали:

- что такое AI и каким он бывает
- как AI применяется в Битрикс24
- как монетизировать приложения для CoPilot в Битрикс24 Маркет

Материалы:

- [AI](./api-reference/ai/index.md) — методы для подключения своих AI-сервисов

<iframe width="720" height="405" src="https://rutube.ru/play/embed/db5e6cf437d28bcd32ce50a72a50f931/?p=oGDZho4T7zQCAfw9xXMhPg" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Разбор механизма событий REST API {#events-mechanism}

Дата: 28.04.2022

Выпуск цикла Bitrix Talks Tech.

Спикер:

- Владислав Бажанов, ведущий разработчик «1С-Битрикс»

Что разобрали:

- путь события внутри Битрикс24
- условия, при которых события не отправляются или не доставляются приложению
- практические примеры соблюдения этих условий

Материалы:

- [События](./api-reference/events/index.md) — регистрация обработчиков и список событий
- [Безопасная обработка событий](./api-reference/events/safe-event-handlers.md) — условия доставки и защита обработчика

<iframe width="720" height="405" src="https://rutube.ru/play/embed/ad1a1cd389f5b65d9609037591619898/?p=azvDTzgKv95G71gZTJzfEQ" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Преимущества офлайн-событий {#offline-events}

Дата: 21.05.2021

Спикеры:

- Александр Денисюк, ведущий разработчик «1С-Битрикс»
- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Что разобрали:

- обзор механизма офлайн-событий для интеграций внешних систем с Битрикс24
- преимущества офлайн-событий перед обычными обработчиками
- примеры на базе связки Битрикс24 и 1С:Синхронизация

Материалы:

- [Презентация доклада](https://video.1c-bitrix.ru/meet21/denisyuk.pptx) — слайды выступления
- [Офлайн-события](./api-reference/events/offline-events.md) — как работает очередь событий

<iframe width="720" height="405" src="https://rutube.ru/play/embed/64d852b521780c31238061edbac8a8f6/?p=3ahdlK3HwqveYWoD1WlH7g" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Работа с объемными данными и realtime в приложениях {#rest-apps-tips}

Дата: 21.05.2021

Спикеры:

- Владислав Бажанов, ведущий разработчик «1С-Битрикс»
- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Что разобрали:

- правила получения объемных данных из Битрикс24
- realtime-приложения
- интерфейс на слайдерах

Материалы:

- [Презентация доклада](https://video.1c-bitrix.ru/meet21/vostrikov-bazhanov.pptx) — слайды выступления
- [Лимиты REST API](./limits.md) — ограничения на частоту и объем запросов

<iframe width="720" height="405" src="https://rutube.ru/play/embed/bae0f19dc003d842858f4f956b67cb9e/?p=PxAB7Cs-2EgwqLfNhFgY1w" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Умные сценарии и развитие роботов {#robots-scenarios}

Дата: 21.05.2021

Спикеры:

- Антон Янжула, ведущий разработчик «1С-Битрикс»
- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Что разобрали:

- обзор новых типов роботов и триггеров в Битрикс24
- настройка автоматизации без разработки
- выход роботов за пределы воронки CRM и новые места встройки
- польза для интеграторов, клиентов и разработчиков Маркета

Материалы:

- [Роботы](./api-reference/bizproc/bizproc-robot/index.md) — методы для регистрации своих роботов
- [Триггеры CRM](./api-reference/crm/automation/index.md) — методы для регистрации своих триггеров

<iframe width="720" height="405" src="https://rutube.ru/play/embed/d348f3c78040cd9ce07fd831950679bd/?p=CDceQ1-pw2ot-UCbKUVRWg" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Архитектура приложений для высоких нагрузок {#cloud-architecture}

Дата: 09.04.2020

Спикер:

- Владислав Бажанов, ведущий разработчик REST API «1С-Битрикс»

Что разобрали:

- как проектировать облачную архитектуру приложения
- как тиражному приложению работать сразу со множеством Битрикс24
- как соответствовать системным требованиям REST API

Материалы:

- [Лимиты REST API](./limits.md) — ограничения на частоту и объем запросов

<iframe width="720" height="405" src="https://rutube.ru/play/embed/29242dde3149a5d8303f52ac36928220/?p=_likQDVraFKEvaf19olSBg" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Современный JS во фронтенде приложений Битрикс24 {#modern-js}

Дата: 23.11.2018

Доклад не о технологиях «1С-Битрикс», а о подходе к фронтенду, который нужен и при разработке приложений Битрикс24.

Спикер:

- Евгений Шеленков, ведущий разработчик «1С-Битрикс»

Что разобрали:

- как использовать современные фреймворки во фронтенде
- как применять vue.js для разработки сложных интерфейсов
- как vue.js используется в CRM-виджете Битрикс24

Материалы:

- [B24JsSDK](./sdk/b24jssdk/index.md) — библиотека для работы с REST API во фронтенде приложения
- [Взаимодействие с интерфейсом](./api-reference/widgets/ui-interaction/index.md) — методы управления интерфейсом Битрикс24 из виджета

<iframe width="720" height="405" src="https://rutube.ru/play/embed/34dbc8e840c09e074f480502b47e1748/?p=oVkOTOjdAmccg3MwaMo2EA" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Виджеты в Битрикс24 и синхронизация данных {#widgets-sync}

Дата: 28.09.2018

Запись доклада на партнерской конференции.

Спикер:

- Сергей Востриков, руководитель направления Маркет и интеграций Битрикс24

Что разобрали:

- новые места встройки виджетов в Битрикс24 на примере задач
- синхронизация данных Битрикс24 с внешними источниками на основе офлайн-событий

Материалы:

- [Виджеты](./api-reference/widgets/index.md) — места встройки и регистрация виджетов
- [Офлайн-события](./api-reference/events/offline-events.md) — как работает очередь событий

<iframe width="720" height="405" src="https://rutube.ru/play/embed/75a1b6eb957c010e64c728dc95b6f1f0/?p=_T5FSNMj430kRwdBUDADyA" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Приложения «под колпаком»: REST в коробочном Битрикс24 {#on-premise-rest}

Дата: 01.03.2018

Запись доклада на Битрикс24.Идея.

Спикер:

- Максим Сидоренко

Что разобрали:

- как работает REST API в коробочном Битрикс24
- почему сервер OAuth-авторизации и очередь событий находятся на облачных серверах Битрикс
- как продолжать пользоваться REST без обращения к внешним ресурсам

Материалы:

- [Сетевой доступ](./settings/cloud-and-on-premise/network-access.md) — какие адреса нужны коробочному Битрикс24 для работы REST
- [Облако и коробка](./settings/cloud-and-on-premise/index.md) — различия в работе приложений

<iframe width="720" height="405" src="https://rutube.ru/play/embed/0becef7c826427edd5e05e55ffb24144/?p=6tgNGVLNFCycVzj1phG1xg" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## REST для триггеров CRM {#crm-triggers}

Дата: 16.01.2018

Что разобрали:

- какие методы позволяют создавать свои триггеры автоматизации CRM
- как тиражировать готовые триггеры в приложении
- как внешнее событие запускает автоматизацию в воронке продаж

Материалы:

- [Триггеры CRM](./api-reference/crm/automation/index.md) — методы для регистрации своих триггеров

@[youtube](https://www.youtube.com/watch?v=bkzppAq3FNs)

## Альтернативная воронка продаж на REST API {#sales-funnel}

Дата: 28.11.2017

Что разобрали:

- как построить сквозную воронку продаж от лидов до выигрышных сделок, когда стандартных возможностей не хватает
- как учитывать выборку больших объемов данных

Материалы:

- [Пример воронки](https://academy.1c-bitrix.ru/upload/academy-docs/kurs_bx24mp/mp-sales-funnel.zip) — архив с кодом примера
- [CRM](./api-reference/crm/index.md) — методы работы с лидами, сделками и воронками

<iframe src="https://vkvideo.ru/video_ext.php?oid=-211967493&id=456239698&hash=a18f2d40cf5dcb14&hd=3" width="720" height="405" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

## Продолжите изучение {#next-steps}

- [Что позволяет REST API Битрикс24](./developing-with-rest-api.md) — обзор возможностей платформы
- [Справочник REST API](./api-reference/index.md) — методы, события и виджеты по разделам
- [SDK Битрикс24](./sdk/index.md) — официальные библиотеки для PHP, JavaScript, Python и Go
- [Поддержка и комьюнити для разработчиков](./support.md) — курсы, чаты и техническая поддержка
- [Что нового](./whats-new.md) — изменения в REST API и документации
