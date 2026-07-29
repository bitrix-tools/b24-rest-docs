# Установка и использование B24JsSDK

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

[B24JsSDK](https://github.com/bitrix24/b24jssdk) — официальная библиотека для работы с REST API Битрикс24 на JavaScript и TypeScript. Она берет на себя авторизацию, соблюдение лимитов на частоту запросов и разбор ответов. Вызовы методов устроены одинаково в браузере и в Node.js, а класс подключения зависит от среды.

Примеры на этой странице рассчитаны на вторую мажорную версию библиотеки.

Используйте B24JsSDK, если:

- приложение открывается внутри интерфейса Битрикс24
- интеграция работает на сервере в Node.js
- нужна авторизация через [входящие вебхуки](../../local-integrations/local-webhooks.md) или [OAuth-протокол](../../settings/oauth/index.md)
- нужны [пакетные запросы](../../settings/how-to-call-rest-api/batch.md) и чтение больших списков по частям

[BX24.js](../bx24-js-sdk/index.md) решает более узкую задачу — работает только внутри интерфейса Битрикс24 и авторизуется через OAuth-протокол. Остальные библиотеки Битрикс24 описаны в [обзоре SDK](../index.md).

## Выбор класса для подключения

В SDK есть три класса подключения. Выбор зависит от того, где выполняется код и откуда приложение берет авторизацию.

#|
|| **Сценарий** | **Класс** | **Авторизация** ||
|| Приложение открывается внутри интерфейса Битрикс24 | `B24Frame` | Токен текущего пользователя, SDK получает его от Битрикс24 ||
|| Серверное приложение с постоянным доступом | `B24Hook` | Ключ входящего вебхука ||
|| Серверное приложение с OAuth-авторизацией | `B24OAuth` | OAuth-токены, SDK обновляет их автоматически ||
|#

`B24Hook` и `B24OAuth` готовы к работе сразу после создания. `B24Frame` создается функцией `initializeB24Frame()`: она получает данные от родительского окна Битрикс24 и дожидается инициализации. До этого вызовы REST API недоступны.

{% note warning "" %}

URL входящего вебхука содержит секретный ключ доступа. Используйте `B24Hook` только на сервере и храните URL в переменной окружения. В браузере ключ увидит любой пользователь — на клиенте применяйте `B24Frame`.

{% endnote %}

## Установка

### Node.js и Nuxt

SDK поддерживает Node.js 18, 20, 22 и более новые версии. Для новых проектов берите 22 или новее: поддержка Node.js 18 и 20 сообществом завершена, обновления безопасности для них больше не выходят. Установите пакет:

```bash
npm install @bitrix24/b24jssdk
```

Для проекта на Nuxt есть отдельный модуль:

```bash
npm install @bitrix24/b24jssdk-nuxt
```

Рекомендуемый формат подключения — ESM:

```js
import { B24Hook } from '@bitrix24/b24jssdk'
```

CommonJS тоже поддерживается — вместо `import` используйте `require`:

```js
const { B24Hook } = require('@bitrix24/b24jssdk')
```

Подробности установки описаны в документации B24JsSDK — отдельные страницы для [Node.js](https://bitrix-tools.github.io/b24jssdk/docs/getting-started/installation/nodejs), [Nuxt](https://bitrix-tools.github.io/b24jssdk/docs/getting-started/installation/nuxt), [Vue](https://bitrix-tools.github.io/b24jssdk/docs/getting-started/installation/vue) и [React](https://bitrix-tools.github.io/b24jssdk/docs/getting-started/installation/react).

### Браузер через CDN

Подключите UMD-сборку тегом `script`. Номер мажорной версии в ссылке фиксирует совместимость: обновления внутри второй версии приходят автоматически, а переход на следующую мажорную версию остается вашим решением.

```html
<script src="https://unpkg.com/@bitrix24/b24jssdk@2/dist/umd/index.min.js"></script>
```

Сборку можно скачать с [unpkg.com](https://unpkg.com/@bitrix24/b24jssdk@2/dist/umd/index.min.js) и подключить из своего проекта:

```html
<script src="/path/to/umd/index.min.js"></script>
```

После подключения библиотека доступна через глобальную переменную `B24Js`.

UMD-сборка включает свои зависимости внутрь файла, поэтому `npm audit` их не проверяет. Если проект собирается через npm, подключайте SDK как ESM или CommonJS — там зависимости остаются внешними.

## Первый вызов внутри интерфейса Битрикс24

Код ниже выполняется в приложении, открытом внутри Битрикс24. Он инициализирует `B24Frame` и запрашивает список компаний методом [crm.item.list](../../api-reference/crm/universal/crm-item-list.md). Приложению нужен scope `crm`.

Пример дан для UMD-сборки, где все доступно через глобальную переменную `B24Js`. В проекте на сборщике те же имена импортируются из пакета: `import { initializeB24Frame, LoggerFactory, EnumCrmEntityTypeId, Text } from '@bitrix24/b24jssdk'`.

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bitrix24 Frame Demo</title>
</head>
<body>
<p>Результат выводится в консоль разработчика</p>
<script src="https://unpkg.com/@bitrix24/b24jssdk@2/dist/umd/index.min.js"></script>
<script>
    const logger = B24Js.LoggerFactory.createForBrowser('local-app', true)

    async function main() {
        const $b24 = await B24Js.initializeB24Frame()

        const response = await $b24.actions.v2.call.make({
            method: 'crm.item.list',
            params: {
                entityTypeId: B24Js.EnumCrmEntityTypeId.company,
                select: ['id', 'title'],
                order: { id: 'desc' }
            },
            requestId: B24Js.Text.getUuidRfc4122()
        })

        // Данные доступны только при успешном ответе
        if (!response.isSuccess) {
            logger.error('Ошибка REST API', { messages: response.getErrorMessages() })
            return
        }

        logger.info('Компании', { items: response.getData().result.items })
    }

    document.addEventListener('DOMContentLoaded', () => {
        main().catch((error) => logger.error('Не удалось запустить приложение', { error }))
    })
</script>
</body>
</html>
```

Что делает каждая часть:

- `initializeB24Frame()` возвращает готовый объект `$b24`
- `actions.v2.call.make()` вызывает один метод REST API
- `requestId` необязателен, но уходит вместе с запросом и помогает найти его в логах
- `isSuccess` показывает, вернул ли Битрикс24 результат
- `getErrorMessages()` отдает тексты ошибок REST API

Страница должна открываться как [приложение](../../settings/app-installation/index.md) внутри интерфейса Битрикс24. Вне этого контекста `initializeB24Frame()` не зависает, а сразу отклоняет промис с ошибкой `SdkError` и кодом `JSSDK_CLIENT_SIDE_WARNING`. Поэтому вызов всегда оборачивайте в `try/catch` или обрабатывайте через `catch()`, как в примере выше.

## Первый вызов на сервере через вебхук

Создайте [входящий вебхук](../../local-integrations/local-webhooks.md) в разделе **Разработчикам** и скопируйте URL вида `https://example.bitrix24.ru/rest/1/webhook_key/`. Сохраните URL в переменной окружения — в коде секретного ключа быть не должно.

Пример использует `import` и `await` на верхнем уровне, поэтому файл должен быть модулем ESM: укажите `"type": "module"` в `package.json` или дайте файлу расширение `.mjs`.

```js
import { B24Hook, EnumCrmEntityTypeId, LoggerFactory } from '@bitrix24/b24jssdk'

const logger = LoggerFactory.createForBrowser('node-hook', process.env.NODE_ENV === 'development')

if (!process.env.B24_HOOK) {
    throw new Error('Переменная окружения B24_HOOK не задана')
}

const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

const response = await $b24.actions.v2.call.make({
    method: 'crm.item.list',
    params: {
        entityTypeId: EnumCrmEntityTypeId.company,
        select: ['id', 'title']
    },
    requestId: 'companies-list'
})

if (!response.isSuccess) {
    logger.error('Ошибка REST API', { messages: response.getErrorMessages() })
    process.exit(1)
}

logger.info('Компании', { items: response.getData().result.items })
```

`fromWebhookUrl()` проверяет URL при создании объекта: протокол должен быть HTTPS, идентификатор пользователя — числом. Если URL не подходит, метод выбрасывает исключение сразу, а не при первом запросе.

Права вебхука задаются при его создании: вы отмечаете нужные [scope](../../api-reference/scopes/permissions.md), и они определяют доступный набор методов. Для примера выше вебхуку нужен scope `crm`. Если метод возвращает ошибку доступа, проверьте права вебхука.

`LoggerFactory.createForBrowser()` в примере выше не опечатка: эта же фабрика используется в серверных примерах документации SDK, отдельной фабрики для Node.js в библиотеке нет.

## Подключение с OAuth-авторизацией

Приложения маркетплейса и локальные приложения работают через OAuth-токены. Битрикс24 передает пару токенов при установке приложения и в событиях [ONAPPINSTALL](../../api-reference/common/events/on-app-install.md) и `ONAPPUPDATE`. Сохраните их и передайте в `B24OAuth` вместе с `clientId` и `clientSecret` приложения.

`B24OAuth`, как и `B24Hook`, работает только на сервере: `clientSecret` и токены не должны попадать в код, который выполняется в браузере.

```js
import { B24OAuth, EnumAppStatus } from '@bitrix24/b24jssdk'

const $b24 = new B24OAuth(
    {
        applicationToken: '<application_token>',
        userId: 1,
        memberId: '<member_id>',
        accessToken: '<access_token>',
        refreshToken: '<refresh_token>',
        expires: 1745997853,
        expiresIn: 3600,
        scope: 'crm,user_brief',
        domain: 'example.bitrix24.ru',
        clientEndpoint: 'https://example.bitrix24.ru/rest/',
        serverEndpoint: 'https://oauth.bitrix.info/rest/',
        status: EnumAppStatus.Free
    },
    {
        clientId: '<client_id>',
        clientSecret: '<client_secret>'
    }
)
```

В таблице ниже — поля, которые нужно переименовать или найти в правильном источнике. Битрикс24 присылает их в нижнем регистре через подчеркивание, а конструктор ждет camelCase. Поля `status` и `domain` в таблицу не вошли — они разобраны отдельно после нее.

#|
|| **Поле от Битрикс24** | **Параметр `B24OAuth`** | **Откуда приходит** ||
|| `access_token` | `accessToken` | Событие установки и ответ на запрос токена ||
|| `refresh_token` | `refreshToken` | Событие установки и ответ на запрос токена ||
|| `member_id` | `memberId` | Событие установки и ответ на запрос токена ||
|| `client_endpoint` | `clientEndpoint` | Событие установки и ответ на запрос токена ||
|| `server_endpoint` | `serverEndpoint` | Событие установки и ответ на запрос токена ||
|| `expires_in` | `expiresIn` | Событие установки и ответ на запрос токена ||
|| `application_token` | `applicationToken` | Только событие установки ||
|| `scope` | `scope` | Событие установки и ответ на запрос токена ||
|| `expires` | `expires` | Только [ответ на запрос токена](../../settings/oauth/auto-renewal.md) ||
|| `user_id` | `userId` | Только [ответ на запрос токена](../../settings/oauth/auto-renewal.md) ||
|#

Поле `domain` в таблицу не вошло намеренно. В обоих источниках оно называется одинаково, но означает разное: в событии установки это адрес Битрикс24, а в ответе на запрос токена — адрес сервера авторизации. Конструктору нужен адрес Битрикс24.

Обратите внимание: одного события установки для конструктора недостаточно. В его payload нет `expires` и `user_id`, а в ответе на запрос токена нет `application_token` — обязательные параметры собираются из обоих источников.

Параметр `expires` — момент истечения токена меткой времени Unix, `expiresIn` — время жизни токена. Оба значения задаются в секундах, не в миллисекундах.

Параметр `status` — односимвольный код тарифа приложения, который присылает Битрикс24. Ему соответствуют значения `EnumAppStatus`: `F` — `Free`, `D` — `Demo`, `T` — `Trial`, `P` — `Paid`, `L` — `Local`, `S` — `Subscription`. Для локального приложения приходит `L`.

SDK обновляет токены сам: когда метод возвращает ошибку `expired_token` или срок действия токена истек. Новую пару нужно сохранить на своей стороне, иначе после перезапуска приложение возьмет из хранилища устаревшие токены.

```js
// tokenStore — ваше хранилище токенов: база данных, файл или менеджер секретов
$b24.setCallbackRefreshAuth(async ({ b24OAuthParams }) => {
    await tokenStore.save({
        accessToken: b24OAuthParams.accessToken,
        refreshToken: b24OAuthParams.refreshToken,
        expires: b24OAuthParams.expires
    })
})
```

Если обновить токены не удалось, SDK выбрасывает исключение `RefreshTokenError`. В этом случае приложение нужно авторизовать заново. Полное описание параметров и сценариев обновления токена — в [документации класса B24OAuth](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/oauth).

## Способы вызова методов

Все вызовы идут через `$b24.actions.v2`. Для методов, у которых есть версия в REST API v3, работает параллельный набор `$b24.actions.v3` — включать его не нужно, достаточно вызвать метод через это пространство имен вместо `v2`. Сам SDK на v3 не переключается: форматы фильтров у версий разные, поэтому вызовы не взаимозаменяемы. Как устроен [вызов метода в v3](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/call-rest-api-ver3) и чем [отличаются фильтры](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/filtering) двух версий, описано в документации SDK.

В примерах ниже `$b24` — объект подключения из любого раздела выше, `logger` — созданный рядом с ним логгер.

#|
|| **Задача** | **Действие** | **Возвращает** | **Ограничения** ||
|| Один метод, одна запись или одна операция | `call.make()` | `AjaxResult` | Один запрос к Битрикс24 ||
|| Список целиком в памяти | `callList.make()` | `Result` с массивом записей | Собирает все страницы сам, за один запрос к Битрикс24 приходит до 50 записей ||
|| Большой список по частям | `fetchList.make()` | Асинхронный генератор | Читается циклом `for await` ||
|| Несколько разных методов за один запрос | `batch.make()` | `CallBatchResult` с результатами команд | До 50 команд ||
|| Массовое создание, обновление или удаление | `batchByChunk.make()` | `Result` с массивом записей | Делит команды на пачки по 50, выполняется не атомарно ||
|#

Обертки отдают данные по-разному. У `call.make()` метод `getData()` возвращает ответ REST API целиком, а результат метода лежит в поле `result`. У `callList.make()` метод `getData()` сразу отдает массив записей — обращаться к `result` не нужно.

### Списочные вызовы

У списочных оберток есть два параметра, которые формально необязательны, но нужны почти всегда. `idKey` — имя поля с идентификатором в том виде, в каком оно приходит в ответе: по нему работает постраничный обход. По умолчанию `idKey` равен `ID` в верхнем регистре, а `crm.item.list` возвращает `id` в нижнем — без явного указания обход остановится после первой страницы. `customKeyForResult` — имя ключа, под которым метод отдает массив записей.

Если метод сортирует по одному имени поля, а возвращает другое, добавьте третий параметр — `cursorIdKey`. Так устроен `tasks.task.list`: сортировка идет по `ID`, а в ответе приходит `id`, поэтому нужны и `idKey: 'id'`, и `cursorIdKey: 'ID'`.

Свой `order` списочным оберткам передавать бесполезно. Они всегда сортируют по курсору по возрастанию, а переданное значение отбрасывают с предупреждением в логгер. Чтобы сузить выборку, используйте `filter`.

```js
const response = await $b24.actions.v2.callList.make({
    method: 'crm.item.list',
    params: {
        entityTypeId: EnumCrmEntityTypeId.company,
        select: ['id', 'title']
    },
    idKey: 'id',
    customKeyForResult: 'items',
    requestId: 'companies-all'
})

if (response.isSuccess) {
    for (const company of response.getData()) {
        logger.info('Компания', { id: company.id, title: company.title })
    }
}
```

Если записей слишком много, чтобы держать их в памяти, возьмите `fetchList.make()` с теми же параметрами. Он возвращает асинхронный генератор: каждая итерация цикла `for await` отдает не одну запись, а очередную порцию. Разбор с примером — в [документации SDK](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/fetch-list-rest-api-ver2).

### Пакетные вызовы

`batch.make()` объединяет до 50 команд в один запрос. Команды передаются массивом пар «метод и параметры», результаты приходят в том же порядке:

```js
const response = await $b24.actions.v2.batch.make({
    calls: [
        ['crm.item.get', { entityTypeId: EnumCrmEntityTypeId.company, id: 1 }],
        ['crm.item.get', { entityTypeId: EnumCrmEntityTypeId.company, id: 2 }]
    ],
    options: { requestId: 'companies-batch' }
})

if (response.isSuccess) {
    // В каждом результате лежит содержимое result соответствующей команды
    for (const data of response.getData()) {
        logger.info('Компания', { title: data.item.title })
    }
}
```

Если удобнее обращаться к результатам по имени, а не по порядку, передайте объект с именованными командами — `calls: { company: ['crm.item.get', { ... }] }`. Данные придут под теми же именами.

По умолчанию `isHaltOnError` равен `true` — пакет останавливается на первой ошибке. Передайте `false` в `options`, чтобы получить результаты остальных команд. Неуспешные команды в данные не попадают, поэтому проверяйте наличие результата перед обращением.

Вызов методов в цикле создает по одному запросу на каждую итерацию. Для набора однотипных операций берите `batchByChunk.make()`: он снимает ограничение в 50 команд и сам делит набор на пачки. Формат вызова тот же, но именованные команды он не принимает — только массив, потому что имена не переживают разбиение на пачки. В результат попадают только успешные команды, поэтому сравнивайте длину `getData()` с числом отправленных. Разбор с примером — в [документации SDK](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/batch-by-chunk-rest-api-ver2).

### Лимиты на частоту запросов

Лимиты SDK выдерживает сам. Если нужны другие пороги, их задают методом `setRestrictionManagerParams()` с готовыми наборами. Метод асинхронный, вызывайте его с `await`, иначе новые пороги могут не успеть примениться к ближайшим запросам. [Как выбрать набор](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/limiters).

### Типизация в TypeScript

Тип данных задается параметром типа, но у разных оберток он означает разное: у `call.make()` — содержимое поля `result` целиком, у `callList.make()` и `fetchList.make()` — одну запись.

{% note warning "" %}

Методы `$b24.callMethod()`, `$b24.callListMethod()`, `$b24.fetchListMethod()`, `$b24.callBatch()`, `$b24.callBatchByChunk()` и класс `LoggerBrowser` устарели. Они работают во второй версии SDK и выводят предупреждение при каждом вызове, а в версии 3.0.0 будут удалены. Соответствие старых и новых вызовов описано в [руководстве по миграции](https://bitrix-tools.github.io/b24jssdk/docs/getting-started/migration/v1).

{% endnote %}

## Обработка ошибок

Ошибки приходят на двух уровнях:

- Битрикс24 вернул ответ с ошибкой — `response.isSuccess` равен `false`, тексты ошибок отдает `response.getErrorMessages()`
- запрос не дошел или SDK не смог обработать ответ — выбрасывается исключение `SdkError` с полями `code` и `status`; у сбоев HTTP-вызова это его наследник `AjaxError`, добавляющий данные запроса в `requestInfo`

Обработайте оба уровня — проверку `isSuccess` внутри `try` и исключение в `catch`. Модель одинакова для всех трех классов подключения, пример продолжает серверный код на вебхуке:

```js
try {
    const response = await $b24.actions.v2.call.make({
        method: 'crm.item.list',
        params: { entityTypeId: EnumCrmEntityTypeId.company },
        requestId: 'companies-list'
    })

    if (response.isSuccess) {
        logger.info('Компании', { items: response.getData().result.items })
    } else {
        logger.error('Ошибка REST API', { messages: response.getErrorMessages() })
    }
} catch (error) {
    // Сетевая ошибка, таймаут или ошибка самого SDK
    logger.error('Запрос не выполнен', { error })
}
```

Исключение из этой модели — `fetchList.make()`. Генератор не может завершиться частично, поэтому при сбое он не возвращает мягкую ошибку, а выбрасывает `SdkError`. Цикл `for await` тоже оборачивайте в `try/catch`.

Коды ошибок и иерархия исключений описаны в [документации B24JsSDK](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/errors).

## Примеры

Готовые примеры собраны в репозитории [b24sdk-examples](https://github.com/bitrix24/b24sdk-examples/tree/main/js):

- создание интерфейса в стиле Битрикс24
- работа через входящие вебхуки
- авторизация через OAuth-протокол
- подключение UMD-версии в браузере
- использование SDK на сервере в Node.js

Разбор типовых задач с кодом — в разделе [примеров документации B24JsSDK](https://bitrix-tools.github.io/b24jssdk/docs/examples).

## Дополнительные материалы

- [Взаимодействие встройки с полем ввода мессенджера](./iframe-messenger-textarea.md)
- [Класс B24Frame](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/frame)
- [Класс B24Hook](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/hook)
- [Класс B24OAuth](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/oauth)
- [Выбор способа вызова методов](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/choosing-the-right-method)
